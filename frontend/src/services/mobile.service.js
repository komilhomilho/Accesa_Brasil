import api from './api.js';

async function checkUpdate(lastSyncDate) {
    try {
        const response = await api.get('/mobile/check-update', {
            params: { last_sync: lastSyncDate }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error checking for updates:", error);
        throw error;
    }
}

async function syncData(lastSyncDate) {
    const check = await checkUpdate(lastSyncDate);
    console.log(check.is_update);
    if (check.is_update) {
        try {
            const response = await api.get('/mobile/sync-service', {
                params: { last_sync: lastSyncDate }
            });
            console.log(response.data);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default { checkUpdate, syncData };
