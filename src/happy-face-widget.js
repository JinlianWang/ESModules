export const HAPPY_FACE_TAG = 'happy-face-widget';
const FACE_ART = String.raw`
  .-""-.
 /  _  \
|  ( )  |
 \  ^  /
  '---'
`;

class HappyFaceWidget extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <pre class="happy-face-art">${FACE_ART}</pre>
        `;
    }
}

if (!customElements.get(HAPPY_FACE_TAG)) {
    customElements.define(HAPPY_FACE_TAG, HappyFaceWidget);
}
