export function init() {
    const targetUrl = sessionStorage.getItem('redirectTarget');

    if (!targetUrl) {
        window.switchPage('home');
        return;
    }

    // Wait 1 second for the user to read the message
    setTimeout(() => {
        sessionStorage.removeItem('redirectTarget');

        let finalUrl = targetUrl;
        if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
            finalUrl = 'https://' + finalUrl;
        }

        // Change page internally
        try {
            window.switchPage('home');
        } catch (e) {}

        // Short pause so the page switch can complete before external redirect
        setTimeout(() => {
            window.location.href = finalUrl;
        }, 100);

    }, 1000);
}
