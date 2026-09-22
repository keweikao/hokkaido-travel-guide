// Tabelog listing score and displayed review-person count checked 2026-09-22.
const foodChecked='2026/9/22';
const reviewPeople={hanamaru:899,hotei:753,okushiba:1251,garaku:261,takezo:241};
restaurants.forEach(r=>r.reviews=reviewPeople[r.id]);
const airportMeals=[
 {name:'えびそば一幻・新千歲機場店',kind:'蝦湯拉麵',score:'3.59',reviews:4220,dish:'蝦味噌拉麵',taste:'想吃濃郁熱湯選這間；蝦湯是主角。入選 Tabelog 拉麵 HOKKAIDO 百名店 2025。',address:'新千歳空港 国内線3F 北海道ラーメン道場',url:'https://tabelog.com/hokkaido/A0107/A010701/1034338/'},
 {name:'ドライブインいとう豚丼名人・新千歲機場店',kind:'十勝豬肉丼',score:'3.49',reviews:1470,dish:'招牌豚丼',taste:'想吃肉與白飯選這間；以醬汁調味的豬肉丼，和海鮮、拉麵換個口味。',address:'新千歳空港 国内線3F グルメワールド',url:'https://tabelog.com/hokkaido/A0107/A010701/1034346/'},
 {name:'味処 きくよ食堂・新千歲機場店',kind:'海鮮丼',score:'3.49',reviews:825,dish:'元祖函館巴丼／當日海鮮丼',taste:'想把第一餐留給海鮮選這間；先看當日魚料與菜單價格，再選丼飯。',address:'新千歳空港 国内線3F 市電通り食堂街',url:'https://tabelog.com/hokkaido/A0107/A010701/1054111/'}
];
const jozankeiMeal={name:'雨ノ日と雪ノ日',kind:'披薩＋義式冰淇淋',score:'3.49',reviews:265,dish:'披薩＋gelato',taste:'先用披薩與湯吃午餐，再選冰淇淋分食；出發前看當日營業，保留下午纜車時間。',address:'札幌市南区定山渓温泉西2丁目41',url:'https://tabelog.com/hokkaido/A0101/A010305/1059444/'};
const otaruMeal={name:'若鶏時代 なると 本店',kind:'半身炸雞',score:'3.52',reviews:2108,dish:'若鶏半身揚げ／炸雞定食',taste:'小樽午餐想吃熱食、換掉海鮮時的選擇。兩人可看份量分食，先詢問候位。',address:'北海道小樽市稲穂3丁目16-13',url:'https://tabelog.com/hokkaido/A0106/A010601/1000906/'};
function mealGroup(s){
 const t=s.title;
 if(current===0&&t.includes('3F'))return {list:airportMeals,note:'都在國內線 3F，一餐選一間即可。先問候位，超過約 20 分鐘就換口味；用餐抓 45–60 分鐘，吃完搭電梯到 B1F 的 JR 車站。機場室內請配合樓層圖與指標。'};
 if((current===2&&t.includes('午餐'))||(current===5&&t.includes('布袋'))||(current===7&&t.includes('晚餐就近')))return {list:restaurants.filter(r=>r.hotels.includes('grand')),note:'壽司、北海道炸雞、湯咖哩三種選擇。一餐選一間；從目前位置導航，出發前查看營業與最後點餐時間。'};
 if([3,4,5].includes(current)&&(t.includes('GARAKU')||t.includes('竹蔵')||t.includes('午餐')))return {list:restaurants.filter(r=>r.hotels.includes('tomamu')),resort:true,note:'目前核實的園區午餐選項共 2 間，評論量較市區少；不為湊數離開園區。Maps 用於確認位置，實際接駁與步道請看園區交通圖。'};
 if(current===6&&t.includes('午餐'))return {list:[jozankeiMeal],drive:true,note:'此站目前核實 1 間。尚未找到更多同時符合路線與評分條件的選項，不列未核實分數。'};
 if(current===7&&t.includes('なると'))return {list:[otaruMeal],note:'此站目前核實 1 間。先看候位，避免午餐壓縮小樽散步與還車緩衝。'};
 return null;
}
function renderMealChoices(s){if(current===1&&s.title.includes('かに本家'))return `<section class="ticket-food"><b>已訂蟹料理午餐 · 9/27 12:00</b><p class="meal-note">${crabDetail}</p><a class="review-line" href="https://tabelog.com/hokkaido/A0101/A010101/1000299/" target="_blank" rel="noopener noreferrer">Tabelog <b>3.50</b> · 評論 <b>176</b> 人 ↗</a><p class="meal-note">查核2026/9/22。推薦以已訂套餐為準；目前未提供菜單，不預設蟹種或加點內容。</p>${external(crabOfficial,'官方店家資訊')}</section>`;const group=mealGroup(s);if(!group)return '';
 return `<section class="ticket-food"><div class="ticket-food-heading"><b>這一餐，選你想吃的</b><small>${group.list.length} 間選項</small></div><p class="meal-note">${group.note}</p><div class="ticket-options">${group.list.map(r=>`<article class="ticket-option"><span class="meal-type">${r.kind}</span><h4>${r.name}</h4><a class="review-line" href="${r.url}" target="_blank" rel="noopener noreferrer"><span>Tabelog <b>${r.score}</b></span><span>評論 <b>${r.reviews.toLocaleString('en-US')}</b> 人 ↗</span></a><p><b>推薦點餐：</b>${r.dish}</p><p>${r.taste}</p><small class="meal-address">${r.address}</small><div class="mapactions">${external(gmRoute('',r.name+' '+r.address,group.drive?'driving':'walking'),'Google Maps 導航','primarymap')}${external(r.url,'Tabelog 評論／菜單')}${group.resort?external('https://www.snowtomamu.jp/summer/areamap/','園區接駁與步道'):''}</div></article>`).join('')}</div><p class="meal-footnote">查核 ${foodChecked} · 評論人數依 Tabelog 店家頁顯示，並非當地居民票選；分數與人數會變動。以上皆為候選，尚未訂位。</p></section>`;
}

routeDays[0][1].how='沿 Domestic Terminal 指標走連絡通道，到國內線 3F。下方三種口味選一間，再點該餐廳的導航；店內位置請配合樓層圖與指標。';
const airportSnacks=[
 {name:'美瑛選果・新千歲機場店',score:'3.62',reviews:1208,dish:'玉米麵包',note:'想吃鹹甜小點選這間。依出爐批次與現場供應，只有剛好有貨或短隊才買，不為等出爐延誤行程。',place:'美瑛選果 新千歳空港店 国内線2F',url:'https://tabelog.com/hokkaido/A0107/A010701/1034722/'},
 {name:'きのとや・新千歲機場店',score:'3.54',reviews:1726,dish:'極上牛乳霜淇淋',note:'想吃冰的選這間；牛乳風味濃郁，兩位大人可分食一支。現場吃完再移動。',place:'きのとや 新千歳空港店 国内線2F',url:'https://tabelog.com/hokkaido/A0107/A010701/1034351/'},
 {name:'SNAFFLE’S・新千歲機場店',score:'3.57',reviews:251,dish:'起司歐姆蛋糕',note:'想吃柔軟起司小蛋糕選這間。評論量較另外兩間少；若外帶，先問保冷與保存時間。',place:'ペイストリー スナッフルス 新千歳空港店 国内線2F スイーツアベニュー',url:'https://tabelog.com/hokkaido/A0107/A010701/1034341/'}
];
function renderSnackChoices(s){
 if(!((current===0&&s.title.includes('3F'))||(current===8&&s.title.includes('CI0131 報到'))))return '';
 return `<details class="ticket-food snack-options"><summary>順路小吃・點心｜3 間，可略過</summary><p class="meal-note">${current===8?'先完成國際線報到；只有時間充裕才回國內線，保留回國際線、安檢與登機時間。':'午餐在 3F；這三間在國內線 2F，吃完往 B1F 搭 JR 前可選一間。'}不同樓層，不能只跟著平面導航；請搭電梯並配合航廈指標。</p>${airportSnacks.map(r=>`<article class="ticket-option"><span class="meal-type">點心 · 國內線 2F</span><h4>${r.name}</h4><a class="review-line" href="${r.url}" target="_blank" rel="noopener noreferrer"><span>Tabelog <b>${r.score}</b></span><span>評論 <b>${r.reviews.toLocaleString('en-US')}</b> 人 ↗</span></a><p><b>推薦點：</b>${r.dish}</p><p>${r.note}</p><div class="mapactions">${external(gmRoute('',r.place,'walking'),'Google Maps 導航','primarymap')}${external(r.url,'Tabelog 評論／菜單')}</div></article>`).join('')}<p class="meal-footnote">查核 ${foodChecked} · 分數與評論人數會變動。選一間就好，不必每間都吃。</p></details>`;
}
