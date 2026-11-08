export function init() {
    const welcomeBtn = document.getElementById('welcomeBtn');

    if (!welcomeBtn) return;

    welcomeBtn.disabled = true;
    welcomeBtn.textContent = 'Aguarde 3 segundos...';

    setTimeout(() => {
        if (!document.getElementById('welcomeBtn')) return;

        welcomeBtn.disabled = false;
        welcomeBtn.textContent = 'Entendi! Me leve para a página inicial';
    }, 3000);
}
