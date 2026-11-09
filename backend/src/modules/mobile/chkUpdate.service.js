import model from '../../shared/models/link.model.js';
import redis, { ensureRedis } from '../../config/redis.js';

const VERSION_KEY = "mobile:check-update:version";
const CACHE_TTL = 60 * 60 * 24;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
});

function getDayKey() {
    const parts = dateFormatter.formatToParts(new Date());
    const date = Object.fromEntries(
        parts.map(({ type, value }) => [type, value])
    );
    return `${date.year}-${date.month}-${date.day}`;
}

async function checkDatabase(lastSync) {
    const response = await model.exists({
        historicoAtualizacoes: {
            $gt: lastSync
        }
    });

    return response !== null;
}

export async function invalidateChkUpdateCache() {
    try {
        if (await ensureRedis()) {
            await redis.incr(VERSION_KEY);
            console.log.green("[Cache] Version Increment.");
        }
    } catch (error) {
        console.error("[Cache] Failed to invalidate:", error.message);
    }
}

export default async function chkUpdate(last_sync) {
    const timestamp = Number(last_sync);

    if (
        last_sync === null ||
        last_sync === undefined ||
        String(last_sync).trim() === "" ||
        !Number.isFinite(timestamp) ||
        !Number.isSafeInteger(timestamp) ||
        timestamp < 0
    ) {
        throw new Error(
            "Invalid last_sync parameter. Expected Unix timestamp in milliseconds."
        );
    }

    const lastSync = new Date(timestamp);

    const redisAvailable = await ensureRedis();

    if (!redisAvailable) {
        return await checkDatabase(lastSync);
    }

    let cacheKey;

    try {
        const version = await redis.get(VERSION_KEY) ?? "0";

        cacheKey = `mobile:check-update:${version}:${timestamp}:${getDayKey()}`;

        const cached = await redis.get(cacheKey);

        if (cached !== null) {
            console.log.gray("[Cache] hit");
            return cached === "1";
        }

        console.log.yellow("[Cache] miss");

    } catch (error) {
        console.error("[Cache] Read error:", error.message);
        return await checkDatabase(lastSync);
    }

    const isUpdate = await checkDatabase(lastSync);

    try {
        await redis.set(
            cacheKey,
            isUpdate ? "1" : "0",
            { EX: CACHE_TTL }
        );
    } catch (error) {
        console.error("[Cache] Save error:", error.message);
    }

    return isUpdate;
}