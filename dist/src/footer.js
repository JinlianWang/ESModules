import { sumThree, getLoadCount } from 'my-math';

export function mountFooter(rootId) {
    if (!rootId) {
        throw new Error('mountFooter requires a rootId');
    }
    const root = document.getElementById(rootId);
    if (!root) {
        return;
    }

    const total = sumThree(7, 8, 9);
    const loadCount = getLoadCount();

    root.innerHTML = `
        <h2>Footer Shell</h2>
        <p>sumThree(7, 8, 9) = <strong>${total}</strong></p>
        <p class="load-count">Shared bundle load count: <strong>${loadCount}</strong></p>
    `;
}
