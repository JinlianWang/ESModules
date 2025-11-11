const e="happy-face-widget",t=String.raw`
  .-""-.
 /  _  \
|  ( )  |
 \  ^  /
  '---'
`;class n extends HTMLElement{connectedCallback(){this.render()}render(){this.innerHTML=`
            <pre class="happy-face-art">${t}</pre>
        `}}customElements.get(e)||customElements.define(e,n);export{e as HAPPY_FACE_TAG};
