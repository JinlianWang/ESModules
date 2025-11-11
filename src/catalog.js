import { sumThree } from 'my-math';

export function mountCatalog(rootId = 'catalog-root') {
    const root = document.getElementById(rootId);
    if (!root) {
        return;
    }

    const total = sumThree(5, 10, 15);
    root.innerHTML = `
        <h2>Catalog Shell</h2>
        <p>sumThree(5, 10, 15) = <strong>${total}</strong></p>
    `;
}
