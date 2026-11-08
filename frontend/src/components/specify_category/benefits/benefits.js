import storageService from '../../../services/storage.service.js';

export function init() {
    const container = document.querySelector('.specify-container');
    const searchInput = document.querySelector('.specify-search input');

    if (!container) return;

    const allData = storageService.getLocalData();

    const benefitsData = allData.filter(item => {
        let tagsText = '';

        if (Array.isArray(item.tags)) {
            tagsText = item.tags.join(' ').toLowerCase();
        } else {
            tagsText = (item.tag || item.categoria || item.category || '').toLowerCase();
        }

        return tagsText.includes('beneficio') || tagsText.includes('dinheiro');
    });

    function renderCategoryResults(itemsToRender) {
        container.innerHTML = '';

        if (!itemsToRender || itemsToRender.length === 0) {
            container.innerHTML = '<p class="text-muted text-center mt-4" role="status">Nenhum serviço encontrado nesta categoria.</p>';
            return;
        }

        const sortedItems = [...itemsToRender].sort((a, b) => {
            const titleA = a.titulo || a.title || a.nome || a.name || '';
            const titleB = b.titulo || b.title || b.nome || b.name || '';
            return titleA.localeCompare(titleB);
        });

        sortedItems.forEach(item => {
            const cardElement = document.createElement('div');

            cardElement.classList.add('custom-card', 'shadow-sm', 'p-3', 'mb-3', 'rounded', 'w-100');

            cardElement.style.cursor = 'pointer';
            cardElement.style.maxWidth = '100%';
            cardElement.style.overflow = 'hidden';
            cardElement.style.backgroundColor = '#72101D';
            cardElement.style.color = 'white';

            const displayTitle = item.titulo || item.title || item.nome || item.name || 'Serviço sem título';
            const displayUrl = item.url || item.link || '#';

            // Accessibility attributes
            cardElement.setAttribute('role', 'button');
            cardElement.setAttribute('tabindex', '0');
            cardElement.setAttribute('aria-label', `Acessar serviço: ${displayTitle}`);

            cardElement.innerHTML = `
                <div aria-hidden="true" style="min-width: 0; width: 100%;">
                    <h5 class="mb-1 text-truncate" style="color: white; width: 100%;">${displayTitle}</h5>
                    <p class="mb-0 small text-truncate" style="color: #e0e0e0; width: 100%;">${displayUrl}</p>
                </div>
            `;

            // Click action (mouse/touch)
            cardElement.addEventListener('click', () => {
                if (displayUrl && displayUrl !== '#') {
                    storageService.storageClickLink(displayTitle, displayUrl);
                    sessionStorage.setItem('redirectTarget', displayUrl);
                    window.switchPage('redirect');
                }
            });

            // Keyboard action (Enter or Space)
            cardElement.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    cardElement.click();
                }
            });

            container.appendChild(cardElement);
        });
    }

    renderCategoryResults(benefitsData);

    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            const searchTerm = event.target.value.toLowerCase().trim();

            if (searchTerm === '') {
                renderCategoryResults(benefitsData);
                return;
            }

            const filteredResults = benefitsData.filter(item => {
                const title = (item.titulo || item.title || item.nome || item.name || '').toLowerCase();
                return title.includes(searchTerm);
            });

            renderCategoryResults(filteredResults);
        });
    }
}
