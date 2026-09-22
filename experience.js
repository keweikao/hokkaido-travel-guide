const modeNames={walking:'步行',transit:'大眾運輸',driving:'自駕',resort:'園區接駁／步道',reserved:'已訂巴士',airport:'航廈內移動'};
const tripDates=['2026-09-26','2026-09-27','2026-09-28','2026-09-29','2026-09-30','2026-10-01','2026-10-02','2026-10-03','2026-10-04'];
const jpDate=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
let page='day';
const $=id=>document.getElementById(id);
function toast(text){$('notice').textContent=text;clearTimeout(window.noticeTimer);window.noticeTimer=setTimeout(()=>$('notice').textContent='',4000)}
function saveProgress(){try{localStorage.setItem('hokkaido-journey-v1',JSON.stringify(completed))}catch{toast('無法保存進度；關閉此頁後可能重設。')}}
function hotelForDay(i){return i<3?{title:'New Otani Inn Sapporo',place:places.otani}:i<5?{title:'星野 TOMAMU',place:null}:i<8?{title:'Sapporo Grand Hotel',place:places.grand}:null}
const chapterScroll={};
let activeChapter=0;
function gotoPage(p,hash=true){
 if(page==='day')chapterScroll[activeChapter]=window.scrollY||0;
 page=p;['prep','day','overview','food','documents'].forEach(x=>$('page-'+x).hidden=x!==p);
 document.querySelectorAll('[data-page]').forEach(b=>b.setAttribute('aria-current',b.dataset.page===p?'page':'false'));
 if(p==='food'){foodHotel=current<3?'otani':current<5?'tomamu':'grand';renderRestaurants()}
 if(hash)history.replaceState(null,'',p==='day'?'#day-'+(current+1):'#'+p);
 if(p==='day'){activeChapter=current;window.scrollTo({top:chapterScroll[current]||0,behavior:'instant'})}else window.scrollTo({top:0,behavior:'instant'});
}
function selectDay(i){if(page==='day')chapterScroll[activeChapter]=window.scrollY||0;current=Math.max(0,Math.min(8,i));renderExperience();gotoPage('day');}
function navigationFor(s,prev){
 if(mealGroup(s))return '';
 if(prev&&mealGroup(prev))prev=null;
 if(['resort','reserved','airport'].includes(s.mode))return mapsFor(s,prev);
 return external(gmRoute(prev?.place||'',s.place,s.mode),prev?'導航：上一站 → 這裡':'從目前位置導航','primarymap')+external(gmPlace(s.place),'查看地點')+(prev?external(gmRoute('',s.place,s.mode),'改從目前位置出發'):'');
}
function chapterPhoto(i){
 if(i===1)return {file:'sapporo-red-brick.jpg',alt:'赤磚廳舍與前方林蔭步道',caption:'赤磚廳舍 · 參考照片，非旅行當日景色',source:'https://www.sapporo.travel/sightseeing.photolibrary/area/area01/9054/',credit:'札幌觀光照片庫'};
 if(i>=3&&i<=5)return {file:'tomamu-family-farm.jpg',alt:'TOMAMU牧場的牛與草地',caption:'TOMAMU農場 · 既有活動照片，非本次預訂體驗',source:'https://www.snowtomamu.jp/summer/topics/2508/',credit:'星野TOMAMU'};
 if(i===7)return {file:'otaru.jpg',alt:'小樽運河與石造倉庫',caption:'小樽 · 運河旁的老倉庫',source:'https://japan-heritage.bunka.go.jp/ja/stories/story105/',credit:'日本遺產'};
 return null;
}
function weatherCard(i){const w=bookWeather[i],mountain=i>=3&&i<=6;return `<section class="weather-card"><span class="eyebrow">${mountain?'山區與市區分開看':'札幌天氣'} · 出門前再確認</span><b>${w?w[0]+' · '+w[1]:'當日預報尚未收錄'}</b><p>${w?w[2]:mountain?'市區外套之外，另備保暖層與防風防雨外層；TOMAMU清晨及纜車山頂依現場氣溫增減。':'以可增減的薄上衣、外套和長褲為主；臨海風大時加防風層。'}</p><small>${w?'9/22查詢的預報快照，非即時；出門前重新查閱。':'這是穿著建議，並非當日天氣預報。'}</small>${external(weatherSource,'氣象廳最新預報')}</section>`}
function stopCulture(s){const x=culturalStops.find(x=>s.title.includes(x.match)||(x.match==='農場'&&s.title.includes('Farm Area')));if(!x)return '';return `<section class="culture-note"><span class="eyebrow">停下來，感受一下</span><h4>${x.title}</h4><p>${x.body}</p><div class="mapactions">${external(x.url,'官方介紹')}${x.place?external(x.resort?'https://www.snowtomamu.jp/summer/areamap/':gmRoute('',x.place,'walking'),x.resort?'園區接駁與步道':'前往這個體驗'):''}</div></section>`}
function stopFood(s){const food=renderMealChoices(s);if(!food)return '';const group=mealGroup(s);if(!group)return food;return `<details class="meal-chooser"><summary>這一餐的 ${group.list.length} 個選項 <span>${group.list.map(x=>x.kind).join('／')}</span></summary>${food}</details>`}
function renderExperience(){
 const d=days[current],g=travelGuides[current],r=routeForDay(),hotel=hotelForDay(current),photo=chapterPhoto(current),n=r.findIndex(s=>!completed[stepKey(s)]),count=r.filter(s=>completed[stepKey(s)]).length;
 $('days').innerHTML=`<a href="#prep" class="prep-tab">出發前</a>`+days.map((x,i)=>`<button data-day="${i}" aria-pressed="${i===current}"><small>DAY ${i+1} · ${x.week}</small><strong>${x.date}</strong><span>${x.area}</span></button>`).join('');
 $('day').innerHTML=`<header class="chapter-head"><div class="chapter-number">${String(current+1).padStart(2,'0')}</div><div><span class="eyebrow">${d.date} 星期${d.week} · ${d.area}</span><h2>${bookTitles[current]}</h2><p>${g.route}</p></div></header><div class="deadline"><span>固定時間</span><b>${g.anchor}</b></div><div class="chapter-glance"><p><b>出門帶上</b>${bookCarry[current]}</p><p><b>${hotel?'今晚住宿':'回程航班'}</b>${hotel?hotel.title:'CI0131 · 15:05'} ${hotel?.place?external(gmRoute('',hotel.place,current===6?'driving':'walking'),'回飯店導航'):hotel?external('https://www.snowtomamu.jp/summer/areamap/','園區地圖'):''}</p></div>
 <nav class="chapter-shortcuts" aria-label="當日快速跳轉"><a href="#chapter-route">完整行程</a><a href="#chapter-meals">今天吃什麼</a><a href="#chapter-bookings">今天的訂位</a><a href="#chapter-backup">彈性備案</a></nav>
 ${photo?`<figure class="chapter-photo"><img src="${photo.file}" alt="${photo.alt}" width="1200" height="800" loading="lazy"><figcaption>${photo.caption} · ${external(photo.source,photo.credit)}</figcaption></figure>`:''}
 <div class="chapter-layout"><div><section class="chapter-section" id="chapter-route"><div class="section-heading"><h3>沿著今天，慢慢走。</h3><span>${count}/${r.length} 已完成</span></div><div class="next-jump">${n>=0?`<a href="#stop-${n}">接著看：${r[n].time} ${r[n].title} ↓</a>`:'今天走完了，好好休息。'}<small>依手動勾選，不會隨時間自動跳過行程。</small></div>
 ${current===7?`<div class="coastchoice"><button data-coast="easy" aria-pressed="${coastMode==='easy'}">小樽一日 · 建議</button><button data-coast="long" aria-pressed="${coastMode==='long'}">積丹＋小樽 · 長途</button></div>`:''}
 <div class="book-stops">${r.map((s,i)=>`<article class="book-stop ${completed[stepKey(s)]?'done':''}" id="stop-${i}"><div class="stop-heading"><span class="stop-number">${completed[stepKey(s)]?'✓':String(i+1).padStart(2,'0')}</span><div><small>${s.time} · ${s.kind}</small><h3>${s.title}</h3></div></div><div class="transport-strip"><b>${modeNames[s.mode]}</b><span>${s.duration||'依當下路況與現場指標'}</span></div><p>${s.how}</p><div class="mapactions">${navigationFor(s,r[i-1])}</div>${stopCulture(s)}${stopFood(s)}${renderSnackChoices(s)}<label class="donecontrol"><input type="checkbox" data-check="${i}" ${completed[stepKey(s)]?'checked':''}>${completed[stepKey(s)]?'已完成，取消勾選可復原':'這一站完成了'}</label></article>`).join('')}</div><p class="footnote">路程為規劃估算；導航請核對班次、入口與路況。勾選只保存在這個瀏覽器。</p><button class="text-button" id="reset-day">重設這一天的勾選</button></section>
 <section id="chapter-meals" class="chapter-section"><span class="eyebrow">A TASTE OF TODAY</span><h3>今天的餐桌</h3>${g.foods.map(([meal,name,desc,url])=>`<div class="book-meal"><small>${meal}</small><div><h4>${name}</h4><p>${desc}</p>${external(url,'店家資訊／菜單')}</div></div>`).join('')}<button class="text-button" data-food>住宿附近的餐廳口袋名單 →</button></section>
 <section id="chapter-bookings" class="chapter-section booking-inline"><span class="eyebrow">TODAY’S RESERVATIONS</span><h3>今天會用到的訂位</h3>${chapterBookings[current].map(x=>`<p>${x}</p>`).join('')}<p class="footnote">這裡是摘要；原始確認信請存手機。建議行程不代表已訂位。</p><button class="text-button" data-docs>開啟完整訂位夾 →</button></section>
 <details class="panel original"><summary>詳細資料：票價、出口與確認資訊</summary>${d.events.filter(e=>current!==7||e.status==='confirmed').map(e=>`<details class="record"><summary>${e.time} · ${e.title} ${badge(e.status)}</summary><p>${e.desc}</p><div class="record-body">${e.detail||'依當日情況安排。'}</div><div class="mapactions">${e.place?external(gmPlace(e.place),'地點定位'):''}${e.source?external(e.source,'資訊來源'):''}</div></details>`).join('')}</details></div>
 <aside class="chapter-notes">${weatherCard(current)}<section class="margin-note"><span class="eyebrow">這一天的北海道</span><p>${g.culture}</p>${external(g.source,'延伸閱讀')}</section><section id="chapter-backup" class="backup"><span class="eyebrow">留點彈性</span><h3>累了，就這樣改。</h3><p>${g.cut}</p>${current===1?`<div class="mapactions">${external(gmRoute('','札幌市時計台','walking'),'睡晚：時計台')}${external(gmRoute('','赤れんがテラス 札幌','walking'),'下雨：赤れんがテラス')}</div>`:''}</section>${current===6?`<details class="panel"><summary>支線：頭大佛／摩艾像</summary><p>需縮短定山溪或放棄纜車，確保晚餐前返回。</p>${external(gmPlace('真駒内滝野霊園 頭大仏'),'頭大佛')}${external(gmPlace('真駒内滝野霊園 モアイ像'),'摩艾像')}</details>`:''}<details class="panel"><summary>現場常用日文</summary><p>有兒童椅嗎？<br>子ども用の椅子はありますか？</p><p>電梯在哪裡？<br>エレベーターはどこですか？</p><p>推車可以進去嗎？<br>ベビーカーで入れますか？</p></details></aside></div>
 <section class="tomorrow"><span class="eyebrow">翻頁之前</span><p>${bookNext[current]}</p></section><div class="bottomnav"><a href="${current===0?'#prep':'#day-'+current}">← ${current===0?'出發前':'前一天'}</a><a href="#overview">章節目錄</a>${current<8?`<a href="#day-${current+2}">下一天 →</a>`:'<a href="#prep">準備與文件</a>'}</div>`;
 document.querySelectorAll('[data-day]').forEach(b=>b.onclick=()=>selectDay(+b.dataset.day));
 document.querySelectorAll('[data-coast]').forEach(b=>b.onclick=()=>{coastMode=b.dataset.coast;renderExperience()});
 document.querySelectorAll('[data-check]').forEach(b=>b.onchange=()=>{const y=window.scrollY;completed[stepKey(r[+b.dataset.check])]=b.checked;saveProgress();renderExperience();window.scrollTo({top:y,behavior:'instant'})});
 $('reset-day').onclick=()=>{r.forEach(s=>delete completed[stepKey(s)]);saveProgress();renderExperience()};
 document.querySelectorAll('[data-docs]').forEach(b=>b.onclick=()=>gotoPage('documents'));document.querySelectorAll('[data-food]').forEach(b=>b.onclick=()=>gotoPage('food'));
}
function renderBookPreparation(){
 $('prep-weather').innerHTML=`<section class="prep-weather"><div><span class="eyebrow">WEATHER & CLOTHING</span><h2>市區輕便，山裡多一層。</h2><p>札幌前3天預报：9/26 15–22°C、9/27 15–24°C、9/28 14–22°C。9/27–28上午可能有雨。</p><p class="footnote">9/22查詢的預報快照，非即時；後段日期尚未收錄，不以季節平均替代預報。</p>${external(weatherSource,'出門前看最新預報')}</div><div><b>札幌／小樽</b><p>可增減的上衣＋薄外套、長褲與好走的鞋。</p><b>TOMAMU清晨／纜車山頂</b><p>另備保暖層、防風防雨外層；清晨出發前核對山區氣溫。</p></div></section>`;
 $('packing-guide').innerHTML=`<div class="prep-reference"><section><span class="eyebrow">DOCUMENTS</span><h2>帶什麼，什麼時候用？</h2><table><thead><tr><th>文件</th><th>使用情境</th></tr></thead><tbody><tr><td>全家護照／航班資料</td><td>報到、入境、住宿登記</td></tr><tr><td>巴士確認信</td><td>9/29與10/1集合時出示</td></tr><tr><td>駕駛人正本與適用翻譯文件</td><td>10/2取車，依租車公司要求核對</td></tr><tr><td>飯店／餐廳確認信</td><td>抵達時出示；TOMAMU由太太保管</td></tr></tbody></table><div class="mapactions">${external('https://services.digital.go.jp/visit-japan-web/','Visit Japan Web 官方說明')}${external('https://www.nipponrentacar.co.jp/','Nippon 官方文件要求')}<a href="#documents">開啟訂位夾 →</a></div></section><section><span class="eyebrow">WITH ENRUI</span><h2>隨身包，比大行李更先用到。</h2><p>尿布、濕紙巾、一套換洗、圍兜、飲水、幼兒備用餐與安撫物放同一包。推車雨罩與背巾保持好拿；山區外套不壓在箱底。</p><p>每天午睡與休息時間算進行程。若用餐或搭車拖晚，先刪可選體驗，不趕下一個景點。</p></section></div>`;
}

function renderOverview(){
 $('overview').innerHTML=`<div class="flight-strip"><div><small>去程 · 9/26</small><b>CI0130</b><span>08:35 台灣 → 13:35 北海道</span></div><div><small>回程 · 10/4</small><b>CI0131</b><span>15:05 北海道 → 18:15 台灣</span></div></div><p class="footnote">起降時間為各地當地時間，日本比台灣快 1 小時。</p><div class="overview-grid">${days.map((d,i)=>`<button class="overview-day" data-overview="${i}"><div class="overview-date"><span>DAY ${String(i+1).padStart(2,'0')}</span><b>${d.date}</b><small>星期${d.week}</small></div><div><span class="eyebrow">${d.area}</span><h2>${d.title}</h2><p>${travelGuides[i].route}</p><div class="overview-anchor">${travelGuides[i].anchor}</div><small>${i<8?'住宿 · '+d.stay:'旅程最後一天'} <span>打開行程 ↗</span></small></div></button>`).join('')}</div>`;
 document.querySelectorAll('[data-overview]').forEach(b=>b.onclick=()=>selectDay(+b.dataset.overview));
}
function followHash(){const hash=location.hash;if(/^#day-[1-9]$/.test(hash))selectDay(+hash.slice(5)-1);else if(['#prep','#overview','#food','#documents'].includes(hash))gotoPage(hash.slice(1),false);else if(['#trip-bookings','#before-you-go','#preparation'].includes(hash)){gotoPage(hash==='#trip-bookings'?'documents':'prep',false);$(hash==='#trip-bookings'?'trip-bookings':'before-you-go').scrollIntoView({block:'start'})}}
$('today-button').onclick=()=>{const i=tripDates.indexOf(jpDate());selectDay(i<0?0:i);if(i<0)toast('目前還不在旅行日期內，先看抵達日 9/26。')};
document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>gotoPage(b.dataset.page));
document.querySelectorAll('[data-hotel]').forEach(b=>b.onclick=()=>{foodHotel=b.dataset.hotel;renderRestaurants()});
$('sources').innerHTML=Object.entries({'New Otani 交通':'https://newotanisapporo.com/access/','新千歲機場樓層':'https://www.hokkaido-airports.com/ja/new-chitose/floormap/','JR Airport':'https://www.jrhokkaido.co.jp/airport/','Autumn Fest':SRC.fest,'TOMAMU 餐廳':SRC.tomamu,'雲海 Terrace':SRC.unkai,'紅葉纜車':SRC.gondola,'牡蠣餐廳':SRC.oyster,'租車門市':SRC.car,'小樽照片：日本遺產':'https://japan-heritage.bunka.go.jp/ja/stories/story105/'}).map(([n,u])=>external(u,n)).join('');
// Retain corrected return-day guidance in the detailed archive.
const returnEvent=days[8].events.find(e=>e.title==='退房 → 新千歲機場');if(returnEvent){returnEvent.time='10:15';returnEvent.desc='建議 10:15 離開飯店，目標 12:00 到國際線報到區。'}
current=Math.max(0,tripDates.indexOf(jpDate()));renderExperience();renderOverview();renderRestaurants();renderBookPreparation();gotoPage(tripDates.includes(jpDate())?'day':'prep',false);followHash();window.addEventListener('hashchange',followHash);
