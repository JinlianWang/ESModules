import { sumThree, getLoadCount } from 'my-math';

export function mountCatalog(rootId = 'catalog-root') {
    const root = document.getElementById(rootId);
    if (!root) {
        return;
    }

    const total = sumThree(5, 10, 15);
    const loadCount = getLoadCount();

    root.innerHTML = `
        <h2>Catalog Shell</h2>
        <p>sumThree(5, 10, 15) = <strong>${total}</strong></p>
        <p class="load-count">Shared bundle load count: <strong>${loadCount}</strong></p>
        <button type="button" class="happy-face-loader">Load Happy Face Widget</button>
        <div class="happy-face-slot" aria-live="polite"></div>
    `;

    const loadButton = root.querySelector('.happy-face-loader');
    const slot = root.querySelector('.happy-face-slot');

    if (loadButton && slot) {
        loadButton.addEventListener('click', async () => {
            loadButton.disabled = true;
            loadButton.textContent = 'Loading widget...';

            try {
                const { HAPPY_FACE_TAG } = await import('./happy-face-widget.js');
                slot.innerHTML = '';
                slot.appendChild(createHappyFaceElement(HAPPY_FACE_TAG));
                loadButton.textContent = 'Happy face loaded';
            } catch (error) {
                console.error('Failed to load happy face widget', error);
                loadButton.disabled = false;
                loadButton.textContent = 'Retry loading widget';
            }
        }, { once: true });
    }
}

function createHappyFaceElement(tagName) {
    const element = document.createElement(tagName);
    element.classList.add('happy-face-widget');
    return element;
}
