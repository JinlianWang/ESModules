import { sumThree } from 'my-math';

export function mountHeader(rootId = 'header-root') {
    const root = document.getElementById(rootId);
    if (!root) {
        return;
    }

    const total = sumThree(2, 3, 4);
    root.innerHTML = `
        <h2>Header Shell</h2>
        <p>sumThree(2, 3, 4) = <strong>${total}</strong></p>
    `;
}
