export function init() {
    const faqItems = document.querySelectorAll('details.accordion-item');

    faqItems.forEach((item) => {
        item.addEventListener('toggle', () => {
            if (item.open) {
                setTimeout(() => {
                    item.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 100);
            }
        });
    });
}
