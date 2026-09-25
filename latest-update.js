// Gmail and arrival-transport reconciliation, checked 2026-09-25.
// This runs last so the travel book, meal layer, and static wallet all show one source of truth.
const arrivalBusOfficial='https://www.chuo-bus.co.jp/airport/timetable/?n=34&o=2&ope=det&t=14';
const arrivalBusLuggage='https://www.chuo-bus.co.jp/airport/baggage/';
const arrivalBusStop='ホテルモントレエーデルホフ札幌';

Object.assign(days[0],{
 intro:'先在新千歲機場吃午餐，再搭機場巴士到飯店；休息後依食慾吃晚餐。',
 note:'13:35 落地後先入境、領行李，再到國內線 3F 用餐。餐後搭「札幌都心線」一般班次，在「ホテルモントレエーデルホフ札幌前」下車；不要搭只停札幌站／大通／薄野的都心直行便。'
});
const arrivalEvents=days[0].events;
const jrEventIndex=arrivalEvents.findIndex(e=>e.title.includes('JR Airport'));
if(jrEventIndex>=0){
 arrivalEvents.splice(jrEventIndex,2,
  E('餐後','交通','國內線 1F → 札幌都心線機場巴士','帶行李直接搭到飯店旁，不進 JR 車站。','<b>搭哪一班</b><br>下樓到國內線 1F，依所在位置到 22 號（ANA 前）或 14 號（JAL 前）乘車處。看車頭／站牌確認是「札幌都心線」一般班次，並且停「ホテルモントレエーデルホフ札幌」。<b>不要搭札幌都心直行便</b>，該班不經飯店站。班次密集，吃完再搭下一班，不必為固定車次趕飯。<br><br><b>票價與付款</b><br>成人單程 ¥1,500；1 歲幼兒不另占座時，實際收費請上車前向站務員確認。可用現金、交通 IC、感應信用卡或 PayPay；多人／幼兒使用同一張 IC 卡時，刷卡前先告知司機。<br><br><b>三件行李＋推車</b><br>上車時直接告知「モントレエーデルホフ札幌」，大行李與折疊推車交由人員放入車底行李艙；貴重物品、護照、行動電源與幼兒用品隨身。中央巴士公告可收重量未滿 30kg、容積未滿 0.25m³、長度未滿 2m 的行李；空間仍以現場為準。下車時再提醒司機有寄放行李。','新千歳空港 国内線ターミナル バス乗り場','plan',arrivalBusOfficial),
  E('約70–80分','交通','Monterey Edelhof 前下車 → New Otani','下車後只需短走到飯店，省去札幌站拖行李與找電梯。','下車站日文：<b>ホテルモントレエーデルホフ札幌</b>。取齊 2 大 1 中行李箱與推車後，開啟步行導航到 New Otani Inn Sapporo；步行約 2–5 分鐘，過馬路依號誌。若車上廣播不確定，可提前把站名畫面給司機看。<br><a href="https://www.google.com/maps/dir/?api=1&origin=ホテルモントレエーデルホフ札幌&destination=ニューオータニイン札幌%20北2条西1丁目1-1&travelmode=walking" target="_blank" rel="noopener noreferrer">下車站 → New Otani 步行導航 ↗</a>','ホテルモントレエーデルホフ札幌','plan',arrivalBusOfficial)
 );
}

Object.assign(travelGuides[0],{
 anchor:'13:35 抵達日本 · 餐後搭機場巴士',
 route:'抵達 → 國內線 3F 午餐 → 機場巴士 → New Otani → 晚餐候選',
 first:'下機後先入境、領行李與換尿布；到國內線 3F 吃完午餐，再下到 1F 搭札幌都心線一般班次。',
 transit:'國內線 1F 搭札幌都心線一般班次：22 號 ANA 前或 14 號 JAL 前上車，在「ホテルモントレエーデルホフ札幌」下車，再步行約 2–5 分鐘到 New Otani。不要搭都心直行便。',
 prepare:'護照、住宿確認信、可用網路、推車與幼兒備用餐；行動電源和貴重物品不要放車底行李艙。'
});
routeDays[0].splice(2,3,
 step('餐後','國內線 1F・機場巴士乘車處','新千歳空港 国内線ターミナル バス乗り場','walking','搭電梯下到 1F，依所在位置選 22 號 ANA 前或 14 號 JAL 前。只搭會停「ホテルモントレエーデルホフ札幌」的札幌都心線一般班次；不要搭都心直行便。上車時告知下車站，將 2 大 1 中行李箱與折疊推車交給人員放行李艙。','餐後搭下一班','交通重點'),
 step('車程約70–80分','札幌都心線・飯店旁下車',arrivalBusStop,'transit','成人單程 ¥1,500。可用現金、交通 IC、感應信用卡或 PayPay；幼兒與多人刷卡先告知司機。下車時提醒司機取出行李。','依路況','交通重點'),
 step('下車後','New Otani・入住','otani','walking','從「ホテルモントレエーデルホフ札幌」步行約 2–5 分鐘到 New Otani。先清點行李和推車，再開 Google Maps 步行導航。','短距離步行','住宿已確認')
);

// Gmail-confirmed records.
chapterBookings[0]=[
 'CI0130｜08:35 TPE → 13:35 CTS；華航訂位代號 FLJEA5',
 'New Otani｜9/26–9/29，3晚；Agoda 1749918372；早餐待核對',
 '抵達交通｜札幌都心線一般班次 → Monterey Edelhof 前下車；成人 ¥1,500'
];
chapterBookings[3][0]='HA701｜09:50 New Otani 大廳集合，10:00出發 → 13:05 RISONARE；1020704316；已付 ¥14,001';
chapterBookings[5][0]='HA704｜14:40 RISONARE 大廳集合，14:50出發 → 18:00 New Otani；1020704334；已付 ¥14,001';
chapterBookings[6]=[
 'Nippon札幌駅前｜09:00取車；W68494；Kei禁菸；線上信用卡付款',
 'Waraku｜10/2 18:00；2大1幼兒；晚秋會席 ¥18,000×2；兒童椅已安排',
 '生日蛋糕｜20:30送房；13cm巧克力 ¥4,889；1根蠟燭；Happy Birthday, Ann!；退房付款'
];
chapterBookings[8][0]='CI0131｜15:05 CTS → 18:15 TPE；華航訂位代號 FLJEA5';

const warakuEvent=days[6].events.find(e=>e.title.includes('Garden Dining Waraku'));
if(warakuEvent)Object.assign(warakuEvent,{status:'confirmed',desc:'飯店 4F 的生日晚餐已正式確認。',detail:'10/2 18:00，2 位成人＋1 位幼兒；Late Autumn Kaiseki（晚秋會席）¥18,000／成人 ×2。飯店已安排 1 張兒童椅；幼兒餐尚未加訂，可於前一日以前選 ¥3,500 西式兒童餐、¥4,500 日式兒童餐，或現場單點。窗邊席並未在確認信中保證。20:30 將 13cm 巧克力蛋糕送至房間，¥4,889、1 根蠟燭、巧克力牌「Happy Birthday, Ann!」，退房時付款。'});
const parkingEvent=days[6].events.find(e=>e.title.includes('回飯店'));
if(parkingEvent)parkingEvent.detail='飯店已回覆：停車不需預約；立體停車場住客 ¥2,500／日，戶外 ¥3,500／日。立體限制高 2.05m、寬 2.05m、長 5.75m、重 2,500kg；可於住宿期間進出，停車人員 07:00–23:00。';
Object.assign(travelGuides[6],{
 anchor:'09:00 取車 · 18:00 Waraku 已確認',
 route:'取車 → 定山溪午餐與溪谷 → 紅葉纜車 → 已訂生日晚餐',
 prepare:'駕照與租車要求文件、兒童座椅確認；飯店停車不用預約，回程目標 16:30。18:00 前到 4F Waraku。'
});
travelGuides[6].foods=travelGuides[6].foods.map(f=>f[0]==='晚餐'?['晚餐','18:00 Garden Dining Waraku｜已確認','晚秋會席 ¥18,000×2；兒童椅已安排，幼兒餐可前一日以前加訂。20:30 回房收生日蛋糕。','https://grand1934.com/restaurant/waraku/']:f);
const warakuStep=routeDays[6].find(s=>s.title.includes('Waraku'));
if(warakuStep)Object.assign(warakuStep,{how:'飯店 4F，18:00 已確認：2 位成人＋1 位幼兒，晚秋會席 ¥18,000×2，兒童椅已安排。窗邊席未獲保證。20:30 回房收 13cm 巧克力生日蛋糕。',kind:'晚餐已確認'});
const returnGrandStep=routeDays[6].find(s=>s.title.includes('回 Grand Hotel'));
if(returnGrandStep)returnGrandStep.how='15:00 前從滑雪場回程。飯店停車不需預約；立體住客 ¥2,500／日（高 2.05m 上限），戶外 ¥3,500／日。目標 16:30 抵達，留出晚餐前休息時間。';
familyMeals[6][1]='18:00 和樂生日晚餐｜已確認';
familyMeals[6][2]='午餐適量；晚秋會席 ¥18,000×2，兒童椅已安排。20:30 回房收巧克力生日蛋糕。';

// Confirmed items must no longer appear in Before You Go.
for(const id of ['birthday-dinner','hotel-parking']){
 const i=preparationItems.findIndex(x=>x[0]===id);if(i>=0)preparationItems.splice(i,1);
}

function updateWallet(){
 const panels=[...document.querySelectorAll('#trip-bookings > details.panel')];
 const summary=panels.find(p=>p.querySelector('summary')?.textContent.includes('住宿與重要交通'))?.querySelector('.smallbody');
 if(summary)summary.innerHTML=`
 <p class="mailcheck"><b>Gmail 已於 2026/9/25 重新核對</b><br><span class="muted">下列編號來自確認信；TOMAMU 住宿確認仍由太太保管。</span></p>
 <p><b>9/26–9/29 · New Otani</b><br>Moderate Twin 禁菸 · Agoda <b>1749918372</b><br><span class="muted">3 晚；早餐未列為包含。</span></p>
 <p><b>9/29–10/1 · 星野 TOMAMU</b><br><span class="muted">2 晚；確認信在太太信箱，房型與早餐方案仍待對照。</span></p>
 <p><b>10/1–10/4 · Sapporo Grand Hotel</b><br>東館 Comfort Large Hollywood Twin 禁菸 · Agoda <b>1759408558</b><br><span class="muted">飯店已直接回信確認：2 成人＋1 位 1 歲幼兒；含早餐。</span></p><hr>
 <p><b>航班｜華航訂位代號 FLJEA5</b><br>9/26 CI0130：08:35 TPE → 13:35 CTS<br>10/4 CI0131：15:05 CTS → 18:15 TPE<br><span class="muted">時間皆為當地時間；完整電子機票仍請離線保存。</span></p>
 <p><b>9/26 抵達交通｜機場巴士</b><br>國內線 1F 22 號 ANA 前／14 號 JAL 前 →「ホテルモントレエーデルホフ札幌」→ 步行到 New Otani<br><span class="muted">搭札幌都心線一般班次，不搭都心直行便。成人 ¥1,500；車程約 70–80 分鐘，依路況。</span><br><a href="${arrivalBusOfficial}" target="_blank" rel="noopener noreferrer">官方即時時刻表 ↗</a>　<a href="${arrivalBusLuggage}" target="_blank" rel="noopener noreferrer">官方行李限制 ↗</a></p>
 <p><b>租車｜Nippon 札幌駅前</b><br>10/2 09:00 → 10/3 20:00 · 預約 <b>W68494</b><br>Kei／Compact 禁菸 · 同店取還 · 線上信用卡付款<br><span class="muted">電話 050-1712-2997；兒童座椅、ETC、保險與總價仍未出現在郵件內。</span></p>`;
 const folder=panels.find(p=>p.querySelector('summary')?.textContent.includes('預訂資料夾'))?.querySelector('.smallbody');
 if(folder)folder.innerHTML=`
 <p><b>New Otani｜Agoda 1749918372</b><br>9/26–9/29 · Moderate Twin 禁菸 · 已付 NT$8,263.28 · 不可退款</p>
 <p><b>Grand Hotel｜Agoda 1759408558</b><br>10/1–10/4 · 東館 Comfort Large Hollywood Twin 禁菸 · 含早餐<br>飯店 8/10 已直接回信確認。</p>
 <p><b>TOMAMU 住宿</b><br>9/29–10/1；確認信由太太保管，本信箱沒有住宿訂單號。</p>
 <p><b>HA701｜1020704316</b><br>9/29 09:50 New Otani 大廳集合／10:00 出發 → 13:05 RISONARE<br>2 大 1 小 · 已付 ¥14,001 · 車內有廁所 · 自由座</p>
 <p><b>HA704｜1020704334</b><br>10/1 14:40 RISONARE 大廳集合／14:50 出發 → 18:00 New Otani<br>2 大 1 小 · 已付 ¥14,001 · 車內有廁所 · 自由座</p>
 <p><b>9/29 hal｜10160</b><br>18:00–19:30 · 2 成人＋1 位 0–3 歲幼兒 · 信件列 ¥11,000</p>
 <p><b>9/30 SORA｜R20260930-105574</b><br>17:30 · 2 成人＋1 位 3 歲以下幼兒 · 禁菸 · 只訂座位、套餐未選</p>
 <p><b>10/2 Waraku｜飯店正式確認</b><br>18:00 · Sapporo Grand Hotel 4F · 2 成人＋1 幼兒<br>晚秋會席 ¥18,000×2 · 兒童椅已安排；幼兒餐尚未加訂。<br>20:30 房內生日蛋糕：13cm 巧克力 ¥4,889、1 根蠟燭、「Happy Birthday, Ann!」；退房付款。</p>
 <p><b>租車｜W68494</b><br>10/2 09:00 → 10/3 20:00 · Nippon 札幌駅前 · Kei 禁菸 · 線上信用卡付款</p>
 <p class="muted">Gmail 查核：2026/9/25。9/27 蟹本家與牡蠣餐廳資料來自家人提供／截圖，不在本次 Gmail 確認信內。</p>`;
 const sourceDetails=[...document.querySelectorAll('#page-documents > details.panel')].find(p=>p.querySelector('summary')?.textContent.includes('資訊來源'));
 if(sourceDetails){const p=sourceDetails.querySelector('p');if(p)p.textContent='Gmail 訂位資料查核於 2026/9/25；機場巴士運行與票價查核於 2026/9/25，當日仍以站牌與官方公告為準。';}
}

renderPreparation();
renderExperience();
renderOverview();
renderRestaurants();
updateWallet();
const sourcesRoot=document.getElementById('sources');
if(sourcesRoot)sourcesRoot.insertAdjacentHTML('afterbegin',`<a class="" href="${arrivalBusOfficial}" target="_blank" rel="noopener noreferrer">新千歲機場巴士時刻表 ↗</a><a class="" href="${arrivalBusLuggage}" target="_blank" rel="noopener noreferrer">機場巴士行李限制 ↗</a>`);
