import{sumThree as n,getLoadCount as u}from"my-math";function a(o){if(!o)throw new Error("mountHeader requires a rootId");const t=document.getElementById(o);if(!t)return;const e=n(2,3,4),r=u();t.innerHTML=`
        <h2>Header Shell</h2>
        <p>sumThree(2, 3, 4) = <strong>${e}</strong></p>
        <p class="load-count">Shared bundle load count: <strong>${r}</strong></p>
    `}export{a as mountHeader};
