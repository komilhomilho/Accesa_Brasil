import { mapsPages } from './componentController.js';
import mobileService from '../services/mobile.service.js';
import storageService from '../services/storage.service.js';

const app = document.getElementById('app');

let currentFontSize = parseInt(localStorage.getItem('fontSize')) || 100;

function applyFontSize() {
    document.documentElement.style.fontSize = `${currentFontSize}%`;
    localStorage.setItem('fontSize', currentFontSize);
}

applyFontSize();

async function switchPage(pageId, registerHistory = true) {
    const pageData = mapsPages[pageId];

    if (!pageData) {
        app.innerHTML = "<h1>Erro</h1><p>Página não encontrada.</p>";
        return;
    }

    if (registerHistory) {
        window.history.pushState({ page: pageId }, "", "");
    }

    const navbar = document.querySelector('nav');

    if (pageId === 'redirect') {
        navbar.style.display = 'none';
    } else {
        navbar.style.display = '';
    }

    app.innerHTML = pageData.html;

    if (pageData.js) {
        try {
            const module = await import(pageData.js);
            if (module.init) {
                module.init();
            }
        } catch (error) {
            console.error(`Error loading script for page ${pageId}:`, error);
        }
    }

    if (window.VLibras && window.VLibras.Widget) {
        window.dispatchEvent(new Event('load'));
    }
}

async function initializeApp() {
    const lastDate = storageService.getLastSync();

    console.log(`Checking for updates since: ${lastDate}`);
    const apiResponse = await mobileService.syncData(lastDate);
    console.log(apiResponse);

    if (apiResponse && apiResponse.data.links && apiResponse.data.links.length > 0) {
        console.log(`Found ${apiResponse.data.links.length} new links.`);
        storageService.saveNewData(apiResponse.data.links);
    } else {
        console.log("The app is already up to date.");
    }

    const allLocalData = storageService.getLocalData();
    console.log("Local data ready for display:", allLocalData);
}

const buttons = document.querySelectorAll('.bottom-nav .nav-link');

const categories = {
    "Documentos": "doc",
    "Transporte": "transit",
    "Saúde": "health",
    "Benefícios": "benefits"
};

function updateNavbar(page) {
    buttons.forEach(button => {
        const isActive = button.dataset.page === page;
        button.classList.toggle('active', isActive);
        if (isActive) {
            button.setAttribute('aria-current', 'page');
        } else {
            button.removeAttribute('aria-current');
        }
    });
}

document.addEventListener('click', async (event) => {
    // Font size increase button
    const increaseFontBtn = event.target.closest('#btn-fonte-aumentar');
    if (increaseFontBtn) {
        if (currentFontSize < 160) {
            currentFontSize += 10;
            applyFontSize();
        }
        return;
    }

    // Font size decrease button
    const decreaseFontBtn = event.target.closest('#btn-fonte-diminuir');
    if (decreaseFontBtn) {
        if (currentFontSize > 80) {
            currentFontSize -= 10;
            applyFontSize();
        }
        return;
    }

    // Accessibility menu open/close
    const accessibilityBtn = event.target.closest('#accesibility');
    if (accessibilityBtn) {
        const icon = accessibilityBtn.querySelector('.toggle-icon');
        const isOpen = accessibilityBtn.classList.contains('expandido');
        const clickedOnIcon = event.target.closest('.toggle-icon');

        if (isOpen && !clickedOnIcon) {
            return;
        }

        if (!isOpen) {
            accessibilityBtn.classList.add('expandido');
            icon.classList.replace('bi-universal-access', 'bi-x-circle');
        } else {
            accessibilityBtn.classList.remove('expandido');
            icon.classList.replace('bi-x-circle', 'bi-universal-access');
        }
        return;
    }

    const navButton = event.target.closest('.bottom-nav [data-page]');
    if (navButton) {
        const page = navButton.dataset.page;
        await window.switchPage(page);
        updateNavbar(page);
        return;
    }

    const card = event.target.closest('.home-card');
    if (card) {
        if (!card.isConnected) return;
        const name = card.querySelector('span')?.textContent.trim();
        const page = categories[name];

        if (page) {
            event.preventDefault();
            event.stopImmediatePropagation();
            await window.switchPage(page);
            updateNavbar('home');
        }
    }

    // Return to home page when clicking the logo
    const logo = event.target.closest('#logo-home');

    if (logo) {
        await window.switchPage('home');
        updateNavbar('home');
        return;
    }
});

window.addEventListener('popstate', (event) => {
    if (event.state && event.state.page) {
        window.switchPage(event.state.page, false);
        if (typeof updateNavbar === 'function') {
            updateNavbar(event.state.page);
        }
    } else {
        window.switchPage('home', false);
        if (typeof updateNavbar === 'function') {
            updateNavbar('home');
        }
    }
});

if (window.VLibras) {
    new window.VLibras.Widget('https://vlibras.gov.br/app');
}

document.getElementById('vlibras-button').addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    const shadowWrapper = document.querySelector('#vlibras-access-wrapper');
    if (shadowWrapper && shadowWrapper.shadowRoot) {
        const shadowBtn = shadowWrapper.shadowRoot.querySelector('#vlibras-button');
        if (shadowBtn) shadowBtn.click();
    } else {
        const originalVlibrasButton = document.querySelector('[vw-access-button]');
        if (originalVlibrasButton) {
            originalVlibrasButton.click();
        }
    }

    const accessibilityContainer = document.getElementById('accesibility');
    const icon = accessibilityContainer.querySelector('.toggle-icon');

    if (accessibilityContainer.classList.contains('expandido')) {
        accessibilityContainer.classList.remove('expandido');
        icon.classList.replace('bi-x-circle', 'bi-universal-access');
    }
});

const contrastSwitch = document.getElementById('switch-contraste');

let darkModeActive = localStorage.getItem('darkMode') === 'true';

function applyDarkMode(active) {
    const mainApp = document.getElementById('app');
    const logoImg = document.getElementById('logo-img');

    if (active) {
        document.body.classList.replace('bg-white', 'bg-1');
        if (mainApp) {
            mainApp.classList.replace('bg-white', 'bg-1');
            mainApp.classList.replace("fg-black", "fg-white");
        }

        if (logoImg) logoImg.src = "/src/assets/img/logo_texto_branco.svg";

        if (contrastSwitch) contrastSwitch.checked = true;
    } else {
        document.body.classList.replace('bg-1', 'bg-white');
        if (mainApp) mainApp.classList.replace('bg-1', 'bg-white');

        if (logoImg) logoImg.src = "/src/assets/img/logo_texto_preto.svg";

        if (mainApp) mainApp.classList.replace("fg-white", "fg-black");
        if (contrastSwitch) contrastSwitch.checked = false;
    }
}

applyDarkMode(darkModeActive);

if (contrastSwitch) {
    contrastSwitch.addEventListener('change', (event) => {
        const isEnabled = event.target.checked;
        applyDarkMode(isEnabled);
        localStorage.setItem('darkMode', isEnabled);
    });
}

document.addEventListener('focusin', (event) => {
    if (event.target && event.target.id === 'searchBar') {
        window.switchPage('global_search');
    }
});

window.switchPage = switchPage;
const hasSeenWelcome = localStorage.getItem('@accela:welcome_seen') === 'true';

if (hasSeenWelcome) {
    switchPage('home');
} else {
    switchPage('welcome');
}

initializeApp();
