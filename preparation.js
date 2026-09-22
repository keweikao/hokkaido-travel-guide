const preparationItems=[
 ['oyster-confirmation','9/27 牡蠣餐廳：取得完成訂位通知','目前只有預約輸入截圖，核對 17:00、3 位與禁菸桌席。'],
 ['birthday-dinner','10/2 生日晚餐：確認飯店正式回覆','核對餐廳、時間、菜單與座位；新版正式確認信尚未補入手冊。'],
 ['hotel-parking','Grand Hotel：確認停車方式','確認入口、費用、車高限制與是否需要預約。'],
 ['otani-breakfast','New Otani：確認早餐是否包含','若未含，決定加購或自行用餐。'],
 ['tomamu-stay','TOMAMU：核對住宿棟別與早餐方案','住宿已安排，請用太太保管的確認信核對房型、棟別與早餐權益。'],
 ['rental-extras','租車：確認兒童座椅、ETC、保險與總費用','租車本身已確認；以上細節未列在目前確認信。'],
 ['unkai-slot','雲海 Terrace：確認入場時段與前往方式','若決定上山，完成時段安排並確認園區交通；當日運行仍須出發前查看。']
];
const preparationStorage='hokkaido-preparation-v1';
let preparationDone={};try{const saved=JSON.parse(localStorage.getItem(preparationStorage)||'{}');if(saved&&typeof saved==='object')preparationDone=saved}catch{}
function renderPreparation(){
 const pending=preparationItems.filter(([id])=>!preparationDone[id]);const done=preparationItems.filter(([id])=>preparationDone[id]);
 document.getElementById('before-you-go').hidden=!pending.length;
 document.getElementById('prep-nav').hidden=!pending.length;
 document.getElementById('prep-nav').textContent=`出發前待辦 ${pending.length}`;
 document.getElementById('prep-list').innerHTML=pending.map(([id,title,detail])=>`<label class="prepitem"><input type="checkbox" data-prep="${id}"><span><b>${title}</b><small>${detail}</small></span><em>確認完成</em></label>`).join('');
 document.getElementById('prep-history').hidden=!done.length;
 document.getElementById('prep-completed').innerHTML=done.map(([id,title])=>`<div class="prepfinished"><span>${title}</span><button data-prep-restore="${id}">放回待辦</button></div>`).join('');
 document.querySelectorAll('[data-prep]').forEach(box=>box.onchange=()=>setPreparation(box.dataset.prep,true));
 document.querySelectorAll('[data-prep-restore]').forEach(button=>button.onclick=()=>setPreparation(button.dataset.prepRestore,false));
}
function setPreparation(id,done){
 preparationDone[id]=done;let saved=true;try{localStorage.setItem(preparationStorage,JSON.stringify(preparationDone))}catch{saved=false}
 renderPreparation();
 document.getElementById('prep-feedback').textContent=saved?(done?'已移到「訂位與交通資料」下的已完成清單，可在那裡復原。':'已放回待辦。'):'此瀏覽器無法保存記錄，重新整理後可能再次顯示。';
 const next=document.querySelector('[data-prep]');if(done){if(next)next.focus();else document.querySelector('#prep-history summary')?.focus()}
}
renderPreparation();
