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
    `;
}
