import { sumThree, getLoadCount } from 'my-math';

export function mountHeader(rootId) {
    if (!rootId) {
        throw new Error('mountHeader requires a rootId');
    }
    const root = document.getElementById(rootId);
    if (!root) {
        return;
    }

    const total = sumThree(2, 3, 4);
    const loadCount = getLoadCount();

    root.innerHTML = `
        <h2>Header Shell</h2>
        <p>sumThree(2, 3, 4) = <strong>${total}</strong></p>
        <p class="load-count">Shared bundle load count: <strong>${loadCount}</strong></p>
    `;
}
