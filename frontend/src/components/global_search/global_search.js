import storageService from '../../services/storage.service.js';

export function init() {
    const searchInput = document.getElementById('searchBarGlobal');
    const searchResultsContainer = document.getElementById('searchResults');

    const databaseItems = storageService.getLocalData();

    if (searchInput) {
        searchInput.focus();
    }

    function renderResults(itemsToRender) {
        if (!searchResultsContainer) return;

        searchResultsContainer.innerHTML = '';

        if (!itemsToRender || itemsToRender.length === 0) {
            searchResultsContainer.innerHTML = '<p class="text-muted p-2">Nenhum resultado encontrado.</p>';
            return;
        }

        const sortedItems = [...itemsToRender].sort((a, b) => {
            const titleA = a.titulo || a.title || a.nome || a.name || '';
            const titleB = b.titulo || b.title || b.nome || b.name || '';
            return titleA.localeCompare(titleB);
        });

        sortedItems.forEach(item => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('custom-card', 'shadow-sm', 'p-3', 'mb-2', 'bg-body-tertiary', 'rounded');
            cardElement.style.cursor = 'pointer';

            const displayTitle = item.titulo || item.title || item.nome || item.name || 'Link sem título';
            const displayUrl = item.url || item.link || '#';

            cardElement.innerHTML = `
    <div class="w-100" style="overflow: hidden;">
        <h5 class="mb-1 text-truncate" style="max-width: 100%;">${displayTitle}</h5>
        <p class="mb-0 small text-primary text-truncate" style="max-width: 100%;">${displayUrl}</p>
    </div>
`;

            cardElement.addEventListener('click', () => {
                if (displayUrl && displayUrl !== '#') {
                    storageService.storageClickLink(displayTitle, displayUrl);
                    sessionStorage.setItem('redirectTarget', displayUrl);
                    window.switchPage('redirect');
                }
            });

            searchResultsContainer.appendChild(cardElement);
        });
    }

    renderResults(databaseItems);

    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            const searchTerm = event.target.value.toLowerCase().trim();

            if (searchTerm === '') {
                renderResults(databaseItems);
                return;
            }

            const filteredResults = databaseItems.filter(item => {
                const title = (item.titulo || item.title || item.nome || item.name || '').toLowerCase();
                const url = (item.url || item.link || '').toLowerCase();

                let tagsText = '';
                if (Array.isArray(item.tags)) {
                    tagsText = item.tags.join(' ').toLowerCase();
                } else {
                    tagsText = (item.tag || item.tags || item.categoria || item.category || '').toLowerCase();
                }

                return title.includes(searchTerm) || url.includes(searchTerm) || tagsText.includes(searchTerm);
            });

            renderResults(filteredResults);
        });
    }
}
