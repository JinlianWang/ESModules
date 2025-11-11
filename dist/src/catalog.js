import{sumThree as s,getLoadCount as i}from"my-math";function f(n,r){if(!n)throw new Error("mountCatalog requires a rootId");const a=document.getElementById(n);if(!a)return;const d=s(5,10,15),c=i();a.innerHTML=`
        <h2>Catalog Shell</h2>
        <p>sumThree(5, 10, 15) = <strong>${d}</strong></p>
        <p class="load-count">Shared bundle load count: <strong>${c}</strong></p>
        <button type="button" class="happy-face-loader">Load Happy Face Widget</button>
        <button type="button" class="footer-loader">Load Footer Section</button>
        <div class="happy-face-slot" aria-live="polite"></div>
    `;const t=a.querySelector(".happy-face-loader"),e=a.querySelector(".footer-loader"),l=a.querySelector(".happy-face-slot");t&&l&&t.addEventListener("click",async()=>{t.disabled=!0,t.textContent="Loading widget...";try{const{HAPPY_FACE_TAG:o}=await import("./happy-face-widget.js");l.innerHTML="",l.appendChild(u(o)),t.textContent="Happy face loaded"}catch(o){console.error("Failed to load happy face widget",o),t.disabled=!1,t.textContent="Retry loading widget"}},{once:!0}),e&&e.addEventListener("click",async()=>{e.disabled=!0,e.textContent="Loading footer...";try{const{mountFooter:o}=await import("./footer.js");o(r??"footer-root"),e.textContent="Footer loaded"}catch(o){console.error("Failed to load footer shell",o),e.disabled=!1,e.textContent="Retry loading footer"}},{once:!0})}function u(n){const r=document.createElement(n);return r.classList.add("happy-face-widget"),r}export{f as mountCatalog};
