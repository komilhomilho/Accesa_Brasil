import storageService from '../../services/storage.service.js';

export function init() {
    const container = document.getElementById('historyResults');
    if (!container) return;

    const historyArray = storageService.getHistory();

    container.innerHTML = '';

    if (historyArray.length === 0) {
        container.innerHTML = '<p class="text-center text-muted mt-5">Você ainda não acessou nenhum link.</p>';
        return;
    }

    historyArray.forEach(item => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('custom-card', 'shadow-sm', 'p-3', 'mb-3', 'bg-body-tertiary', 'rounded');
        cardElement.style.cursor = 'pointer';

        const dateObj = new Date(item.accessDate || item.dataAcesso);
        const formattedDate = dateObj.toLocaleDateString('pt-BR') + ' às ' + dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        const displayTitle = item.title || item.titulo || 'Sem título';
        const displayUrl = item.url || '#';

        cardElement.innerHTML = `
            <h5 class="mb-1">${displayTitle}</h5>
            <p class="mb-0 small text-primary text-truncate">${displayUrl}</p>
            <small class="text-muted"><i class="bi bi-clock"></i> Acessado em: ${formattedDate}</small>
        `;

        cardElement.addEventListener('click', () => {
            sessionStorage.setItem('redirectTarget', displayUrl);
            window.switchPage('redirect');
        });

        container.appendChild(cardElement);
    });
}
