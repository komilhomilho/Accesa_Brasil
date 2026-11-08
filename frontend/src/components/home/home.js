const doc = document.getElementById('doc');
if (doc) {
    doc.addEventListener('click', () => {
        window.switchPage("doc");
    });
}

const transit = document.getElementById('transit');
if (transit) {
    transit.addEventListener('click', () => {
        window.switchPage("transit");
    });
}

const benefits = document.getElementById('benefits');
if (benefits) {
    benefits.addEventListener('click', () => {
        window.switchPage("benefits");
    });
}

const health = document.getElementById('health');
if (health) {
    health.addEventListener('click', () => {
        window.switchPage("health");
    });
}
