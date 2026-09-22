// Family meal plan, 2026-09-22. Suggestions do not change reservations.
const familyMeals=[
 ['機場輕午餐：少量壽司或簡餐','札幌湯咖哩｜建議','午餐偏晚，少量吃；入住休息後看食慾，晚餐不綁套餐。'],
 ['12:00 螃蟹本家｜已訂','17:00 牡蠣｜完成通知待確認','晚餐少量單點搭配熟食，避免兩頓海鮮套餐；不再加下午茶。'],
 ['十勝風味豚丼｜建議，市區店家待選','Autumn Fest｜分食','若9/26未吃湯咖哩，午餐改湯咖哩；豚丼留機場，不重複安排。'],
 ['TOMAMU 園區簡餐｜待選','18:00 hal｜已訂','約13:05抵達後就近吃。GARAKU為替換候選，札幌吃過咖哩可改其他簡餐。'],
 ['麺屋竹蔵拉麵｜候選','17:30 SORA｜已訂座位，套餐未選','可考慮和牛涮涮鍋；是否選鍋物仍待確認，不預設套餐。'],
 ['TOMAMU 園區簡餐｜待選','富良野和牛燒肉｜候選','先回札幌入住，再依抵達時間前往；未訂位。晚到或疲倦改就近簡餐。'],
 ['定山溪披薩／簡餐｜候選','18:00 和樂生日晚餐｜正式回覆待核對','午餐適量，保留會席與蛋糕胃口；晚秋會席為希望安排的方案，非已核實完成。'],
 ['なると半身炸雞｜候選','還車後就近簡餐｜待選','下午甜點適量分食，晚餐依食慾與還車時間決定。'],
 ['機場豚丼／味噌拉麵擇一','返台','先完成報到；補前幾天未吃到的一項，時間不足就在國際線就近吃。']
];
const familyCandidates=[
 ['石狩鍋・秋鮭料理','替換晚餐','札幌；SORA若未選鍋物可考慮，與燒肉擇一。店家待篩選。'],
 ['北海道握壽司','替換正餐／少量點食','機場或9/28臨時換口味，不列必吃。'],
 ['成吉思汗烤羊肉','替換晚餐','喜歡羊肉再選；店家禁菸與座位空間待核實。'],
 ['GARAKU 湯咖哩','替換園區午餐','TOMAMU；札幌已吃過就降為備選。'],
 ['Zangi 北海道炸雞・布袋','替換正餐／分食','札幌就近簡餐；小樽已吃半身炸雞可略過。'],
 ['さえら 三明治','替換輕午餐','9/28不太餓時；地下樓層與推車動線先確認。'],
 ['竹輪麵包／coron 玉米麵包','外帶點心／移動補餐','札幌購物途中；竹輪麵包店家待選，coron資料見下方。'],
 ['北菓樓泡芙','一份分食','札幌、小樽選一次即可。'],
 ['山中牧場霜淇淋','小份甜點','小樽午餐後；與蛋糕依胃口取捨。'],
 ['LeTAO 乳酪蛋糕／北一 Hall 咖啡茶','擇一坐下休息','小樽堺町；不必兩間都吃下午茶。'],
 ['北海道牛奶拿鐵／MORIHICO.','飲料／休息站','依當天所在位置選，店家與導航見下方。'],
 ['INITIAL 收尾聖代','可略過的餐後甜點','札幌晚餐後，有胃口與體力才去，不延後恩睿休息。']
];
const yoshiushi={name:'ふらの和牛よしうし 札幌本店',kind:'富良野和牛燒肉｜候選',score:'3.60',reviews:172,dish:'A5富良野和牛、牛舌／橫膈膜，依當日菜單',taste:'全席禁菸，Tabelog列座位寬敞、沙發席、可供兩人使用的包廂，接受兒童並提供兒童椅。推車能否停桌旁、兒童椅安全帶待確認。實際評論晚餐預算¥10,000–14,999／成人；尚未訂位。',address:'札幌市中央区南4条西2丁目11-7 TOMORUビル3F',url:'https://tabelog.com/hokkaido/A0101/A010103/1055460/'};
familyMeals.forEach((m,i)=>{travelGuides[i].foods=travelGuides[i].foods.map(f=>f[0]==='午餐'?['午餐',m[0],m[2],'']:f[0]==='晚餐'?['晚餐',m[1],m[2],'']:f);});
const firstDinner=routeDays[0].find(s=>s.title.includes('美食祭'));
Object.assign(firstDinner,{time:'18:00–18:30',title:'札幌湯咖哩・晚餐候選',place:'奥芝商店 駅前創成寺 札幌 ホクレンビル',how:'先入住休息，依食慾選湯咖哩。奥芝為候選：地下樓層、兒童椅與推車動線待確認；排隊久就改附近簡餐。美食祭留9/28，不再加一餐。',kind:'用餐建議'});
travelGuides[0].route='抵達 → 機場輕午餐 → JR → New Otani → 湯咖哩候選';
const porkLunch=routeDays[2].find(s=>s.title.includes('午餐'));
Object.assign(porkLunch,{title:'午餐・十勝風味豚丼／湯咖哩備選',place:'札幌駅',how:'主選豚丼，札幌市區店家尚未選定；本卡地圖只定位札幌站，不代表餐廳。若9/26沒吃湯咖哩，改下方奥芝候選；不想等候可改布袋。挑店先確認全席禁菸、桌席與幼兒餐食。',kind:'用餐建議'});
const beefDinner=routeDays[5].find(s=>s.title.includes('燒肉'));
Object.assign(beefDinner,{time:'入住後',title:'富良野和牛燒肉・よしうし候選',place:yoshiushi.name+' '+yoshiushi.address,how:'先入住Grand，再依實際抵達時間前往薄野。全席禁菸、有兒童椅與包廂；推車停放待確認。尚未訂位，巴士晚到或孩子疲倦就改飯店附近簡餐。',duration:'依導航與抵達時間安排'});
routeDays[3].filter(s=>s.title.includes('GARAKU')).forEach(s=>{s.title='園區簡餐・GARAKU等候選';s.how+=' 札幌若已吃湯咖哩，可改園區其他簡餐；不需要重複吃。';});
const priorFamilyMealGroup=mealGroup;
mealGroup=function(s){
 if(current===0&&s.title.includes('湯咖哩'))return {list:restaurants.filter(r=>r.id==='okushiba'),note:'第一晚主選湯咖哩，尚未訂位。先確認幼兒座位與推車動線，入住後依食慾決定。'};
 if(current===5&&s.title.includes('燒肉'))return {list:[yoshiushi,yakinikuOption],note:'よしうし優先；徳寿K-place為札幌站附近備選。皆全席禁菸；徳寿接受兒童，但兒童椅與推車空間待確認，包廂有最低人數限制。兩間皆未訂位。'};
 if(current===2&&s.title.includes('午餐'))return {list:restaurants.filter(r=>['okushiba','hotei'].includes(r.id)),note:'本餐主選十勝風味豚丼，但市區店家尚未核實，因此不附錯誤店址或評分。以下是可直接替換的已查店家；機場豚丼名人另在回程候選中。'};
 if(current===8&&s.title.includes('CI0131'))return {list:airportMeals.slice(0,2),note:'先報到再看時間：國內線3F距國際線有步行距離，留足返回、安檢及登機時間；時間不夠就國際線就近吃。豚丼／拉麵補前幾天未吃到的一項。'};
 return priorFamilyMealGroup(s);
};
const beforeFamilyFoodPage=renderRestaurants;
renderRestaurants=function(){beforeFamilyFoodPage();const root=document.getElementById('restaurants');root.innerHTML=`<section class="ticket-food"><h2>這趟怎麼吃</h2><p>已訂餐固定；主選皆為建議。候選用來替換一餐，小吃少量分食，不增加必吃任務。</p>${familyMeals.map((m,i)=>`<details class="ticket-option"><summary>${days[i].date} · ${m[0]}</summary><p><b>午餐：</b>${m[0]}</p><p><b>晚餐：</b>${m[1]}</p><p>${m[2]}</p></details>`).join('')}</section><section class="ticket-food"><h2>候選料理＋小吃</h2><p>先看用途，再決定替換正餐或少量加吃。具體店家評分、人數和導航保留在下方；未選店的料理不假設禁菸與幼兒設備。</p>${familyCandidates.map(c=>`<article class="ticket-option"><span class="meal-type">${c[1]}</span><h4>${c[0]}</h4><p>${c[2]}</p></article>`).join('')}</section>`+root.innerHTML;};
// Keep archive event headings consistent with the daily travel book.
days[0].events.filter(e=>e.title.includes('美食祭')).forEach(e=>{e.title='晚餐・札幌湯咖哩候選';e.desc=familyMeals[0][2];e.detail='入住後依食慾決定，實際餐廳資訊見每日交通與用餐卡。';});
