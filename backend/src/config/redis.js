import { createClient } from "redis";

const redis = createClient({
    url: process.env.REDIS_URL
});

let connecting;

redis.on("error", (error) => {
    console.error("[Redis]", error.message);
});

export async function ensureRedis() {
    if (redis.isReady) return true;
    if (connecting) return connecting;
    if (redis.isOpen) return false;

    connecting = redis.connect()
        .then(() => true)
        .catch((error) => {
            console.error("[Redis] Error on Connection:", error.message);
            return false;
        })
        .finally(() => {
            connecting = null;
        });

    return connecting;
}

export default redis;