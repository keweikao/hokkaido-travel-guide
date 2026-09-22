const crabPlace='札幌かに本家 札幌駅前本店 札幌市中央区北三条西2丁目1-18';
const crabOfficial='https://www.kani-honke.co.jp/location_sapporo.html';
const crabDetail='9/27 12:00 已訂位，依史蒂芬提供的資訊記錄。訂位人數、套餐、訂位編號與付款狀態尚未提供。地址：札幌市中央区北三条西2丁目1-18；電話 011-222-0018。請帶原始確認信，建議 11:45 抵達。';
const oldPark=days[1].events.find(e=>e.title==='白色戀人公園');
days[1].title='神宮散步，午餐吃螃蟹。';days[1].intro='上午神宮散步，12:00 蟹料理已訂；午後回飯店休息，17:00 牡蠣晚餐仍待確認。';days[1].note='12:00 札幌かに本家 札幌駅前本店已訂位（家人提供）。白色戀人公園移至9/28上午；17:00牡蠣餐廳仍待完成訂位通知。';
days[1].events=days[1].events.filter(e=>!['白色戀人公園','公園內午餐＋甜點'].includes(e.title));days[1].events.splice(2,0,E('12:00','吃飯','札幌かに本家・札幌駅前本店','已訂螃蟹午餐（家人提供），建議11:45抵達。',crabDetail,crabPlace,'confirmed',crabOfficial));
routeDays[1]=[step('08:15','飯店出發','otani','walking','早餐後出門，帶上中午蟹料理的訂位確認。'),step('09:00','北海道神宮＋圓山公園','北海道神宮 札幌','transit','步行到大通站，東西線往宮之澤，在圓山公園站下車後步行入園。10:30前離開神宮，留足回市區緩衝。','含步行抓40–60分'),step('11:45抵達／12:00用餐','札幌かに本家・札幌駅前本店',crabPlace,'transit','已訂12:00午餐（家人提供）。從圓山公園站搭東西線回大通，再步行往札幌站方向；带推車依電梯指標，或改計程車。請認北三条西2丁目1-18的札幌駅前本店。','神宮出發含步行抓45–60分','午餐已訂・家人提供'),step('約14:00','回飯店・午睡','otani','walking','用餐結束後回New Otani。午餐先保留約1.5–2小時，實際依套餐與上菜速度。','步行估5–10分'),step('16:20出發','17:00 牡蠣餐廳','oyster','walking','保留原訂17:00安排，仍需完成訂位通知。中午已吃蟹料理，晚餐依胃口點餐。','移動預留30–40分','訂位待確認'),step('吃完','回 New Otani','otani','walking','回飯店休息，不再增加跨區景點。')];
Object.assign(travelGuides[1],{anchor:'12:00 蟹本家已訂（家人提供） · 17:00 牡蠣待確認',route:'北海道神宮 → 札幌駅前蟹本家 → 午睡 → 牡蠣晚餐',first:'早餐後去神宮，10:30前離開；12:00蟹本家是固定午餐。',cut:'下雨或晚出門就縮短／略過神宮，從飯店直接去蟹本家；不影響12:00訂位。',experience:'神宮以參道、鳥居與本殿周邊散步為主，約60–90分鐘。蟹料理午餐留足用餐時間，下午回飯店讓恩睿午睡。',culture:'上午看神宮與參道，午餐體驗北海道蟹料理；套餐尚未提供，實際料理依訂單與店家菜單，不預設包含特定蟹種。',transit:'飯店 → 圓山公園站 → 神宮；10:30前離開神宮，搭東西線回大通後步行往札幌站方向。回市區抓45–60分鐘，目標11:45到店。',prepare:'攜帶蟹本家原始訂位通知；人數、套餐及付款資訊尚未填入。晚餐牡蠣完成通知另確認。',source:crabOfficial});
travelGuides[1].foods[1]=['午餐','12:00 札幌かに本家・札幌駅前本店｜已訂','家人確認已訂。蟹料理午餐，套餐與人數尚未提供；11:45到店，下午不排白色戀人公園。',crabOfficial];
// Move the park to the following morning, retain university as an optional stop.
days[2].title='巧克力、逛街與美食祭。';days[2].intro='上午白色戀人公園，下午札幌站午餐與購物，保留午睡。北海道大學改為時間充裕時的備選。';
days[2].events=days[2].events.filter(e=>!['北海道大學','札幌站午餐'].includes(e.title));days[2].events.splice(1,0,E('10:00','景點','白色戀人公園','由9/27移至今天，約12:00離開。',oldPark?.detail||'', '白い恋人パーク','plan','https://www.shiroikoibitopark.jp/'),E('13:00','吃飯','札幌站午餐','湯咖哩、壽司或炸雞三選一；候位太久就換店。','','札幌駅'));
const shopping=days[2].events.find(e=>e.title.includes('3COINS'));if(shopping)shopping.time='14:00';days[2].events.push(E('時間充裕再去','景點','北海道大學・備選','保留原本想去的校園，但不壓縮午睡；本日主線不再安排。','','北海道大学 正門 札幌'));
routeDays[2].splice(1,1,step('09:00出發／10:00入園','白色戀人公園','白い恋人パーク 札幌','transit','从飯店走到大通站，搭東西線往宮之澤至終點，再步行到園區。看庭院與巧克力，12:00左右離開；付費區依當日選擇。','去程含步行抓45–60分'));
routeDays[2][2].time='約13:00';routeDays[2][2].mode='transit';routeDays[2][2].how='宮之澤搭東西線回大通，再步行或依導航轉乘到札幌站區。午餐選下方一間，候位太久就換店。';routeDays[2][3].time='約14:00';routeDays[2][4].time='約14:30';
Object.assign(travelGuides[2],{route:'白色戀人公園 → 札幌站午餐與購物 → 午睡 → 美食祭',first:'09:00左右出門搭東西線往宮之澤，10:00到白色戀人公園。',experience:'白色戀人公園抓約2小時，庭院、巧克力參觀與小點心擇重點。12:00左右回札幌站區吃飯，再逛3COINS與大丸。北海道大學保留為時間充裕時的備選，不壓縮午睡。',cut:'下雨以園內室內空間與札幌站商場為主。午餐或購物拖晚就減少逛街，北海道大學不補排。',transit:'大通 → 宮之澤搭地鐵東西線，含步行每方向抓45–60分鐘。午餐回札幌站區，購物後回飯店；傍晚再前往美食祭。',culture:'上午看北海道巧克力與餅乾品牌的製作體驗，下午逛車站商圈，晚餐用市町村料理認識北海道。'});
travelGuides[2].foods[1][2]='約13:00回到札幌站區吃午餐；可選蝦湯咖哩、壽司或炸雞，候位太久就換店。';

// 9/27 approved afternoon: short city walk after a real nap.
const brick='北海道庁旧本庁舎 札幌市中央区北3条西6丁目';
routeDays[1][3].time='14:00–15:15';
routeDays[1][3].how='蟹料理預留1.5–2小時；回New Otani午睡、換尿布。若午餐拖晚，下午散步縮短，不壓縮休息。';
routeDays[1].splice(4,0,step('15:30–16:15','赤磚廳舍・前庭散步',brick,'walking','午睡後從飯店步行過來，看紅磚建築、五稜星裝飾與前庭池塘。今天以戶外短走為主；完整室內展覽另需時間。16:15離開往晚餐。','步行估10–15分；停留約45分'));
routeDays[1][5].time='16:15出發';routeDays[1][5].how='17:00晚餐仍待完成通知。從赤磚廳舍出發預留45分鐘，依導航與恩睿狀況選步行或叫車；核對原確認信的實際分店。';
Object.assign(travelGuides[1],{route:'神宮 → 蟹本家 → 午睡 → 赤磚廳舍 → 牡蠣晚餐',experience:'午睡後看赤磚廳舍外觀與前庭，找五稜星裝飾、池塘中的鴨子。睡晚就縮短成飯店附近時計台；下雨可到赤れんがテラス室內休息。',cut:'午餐拖晚或恩睿睡晚：改時計台20–30分鐘或直接去晚餐。下雨改赤れんがテラス；三個選項擇一，不全部補走。',culture:'上午神宮散步，午餐吃蟹料理。下午看1888年落成的赤磚廳舍；若改日深入入館，可看北海道歷史、愛努文化與北海道遺產展示。'});
days[1].intro='神宮與已訂蟹料理；午睡後赤磚廳舍短走，17:00牡蠣晚餐待確認。';
const napIndex=days[1].events.findIndex(e=>e.title.includes('午睡'));
days[1].events.splice(napIndex<0?days[1].events.length:napIndex+1,0,E('15:30–16:15','景點','赤磚廳舍・前庭散步','午睡後走走；睡晚改時計台，下雨改赤れんがテラス。','看紅磚建築、五稜星與前庭池塘；16:15離開前往晚餐。',brick,'plan','https://www.sapporo.travel/spot/facility/former_hokkaido_government_office/'));
routeDays[0][routeDays[0].length-1].how='今天先睡飽；明天上午神宮，12:00已訂蟹料理。';
