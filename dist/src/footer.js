import{sumThree as e,getLoadCount as u}from"my-math";function l(o){if(!o)throw new Error("mountFooter requires a rootId");const t=document.getElementById(o);if(!t)return;const r=e(7,8,9),n=u();t.innerHTML=`
        <h2>Footer Shell</h2>
        <p>sumThree(7, 8, 9) = <strong>${r}</strong></p>
        <p class="load-count">Shared bundle load count: <strong>${n}</strong></p>
    `}export{l as mountFooter};
