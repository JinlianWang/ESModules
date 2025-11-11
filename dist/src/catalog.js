import { sumThree, getLoadCount } from 'my-math';

export function mountCatalog(rootId, footerRootId) {
    if (!rootId) {
        throw new Error('mountCatalog requires a rootId');
    }
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
        <button type="button" class="footer-loader">Load Footer Section</button>
        <div class="happy-face-slot" aria-live="polite"></div>
    `;

    const loadButton = root.querySelector('.happy-face-loader');
    const footerButton = root.querySelector('.footer-loader');
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

    if (footerButton) {
        footerButton.addEventListener('click', async () => {
            footerButton.disabled = true;
            footerButton.textContent = 'Loading footer...';

            try {
                const { mountFooter } = await import('./footer.js');
                mountFooter(footerRootId ?? 'footer-root');
                footerButton.textContent = 'Footer loaded';
            } catch (error) {
                console.error('Failed to load footer shell', error);
                footerButton.disabled = false;
                footerButton.textContent = 'Retry loading footer';
            }
        }, { once: true });
    }
}

function createHappyFaceElement(tagName) {
    const element = document.createElement(tagName);
    element.classList.add('happy-face-widget');
    return element;
}
