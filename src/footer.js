import { sumThree } from 'my-math';

export function mountFooter(rootId = 'footer-root') {
    const root = document.getElementById(rootId);
    if (!root) {
        return;
    }

    const total = sumThree(7, 8, 9);
    root.innerHTML = `
        <h2>Footer Shell</h2>
        <p>sumThree(7, 8, 9) = <strong>${total}</strong></p>
    `;
}
