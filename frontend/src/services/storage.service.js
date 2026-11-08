const KEYS = {
    DATA: '@accela:data',
    LAST_SYNC: '@accela:last_sync',
    HISTORY: 'linkHistory'
};

function getLastSync() {
    const data = localStorage.getItem(KEYS.LAST_SYNC);
    return data ? Number(data) : 0;
}

function getLocalData() {
    const data = localStorage.getItem(KEYS.DATA);
    return data ? JSON.parse(data) : [];
}

function saveNewData(newData) {
    console.log('[storage] Trying to save');
    if (!newData || newData.length === 0) return;

    localStorage.setItem(KEYS.DATA, JSON.stringify(newData));
    localStorage.setItem(KEYS.LAST_SYNC, Date.now().toString());
}

function storageClickLink(title, url) {
    const savedHistory = localStorage.getItem(KEYS.HISTORY);
    let historyArray = savedHistory ? JSON.parse(savedHistory) : [];

    const newRecord = {
        title: title,
        url: url,
        accessDate: new Date().toISOString()
    };

    historyArray.unshift(newRecord);

    if (historyArray.length > 50) {
        historyArray.pop();
    }

    localStorage.setItem(KEYS.HISTORY, JSON.stringify(historyArray));
}

function getHistory() {
    const savedHistory = localStorage.getItem(KEYS.HISTORY);
    return savedHistory ? JSON.parse(savedHistory) : [];
}

export default { getLastSync, getLocalData, saveNewData, storageClickLink, getHistory };
