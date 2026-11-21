/* Test 1 聽力 Part 4 簡短獨白（Q71–100，10 段 × 3 題；其中兩段搭配圖表） */
(function () {
  const set = (group, base, rows) => window.TOEIC_T1.set('L', 'Part 4', group, base, rows);
  const T = (voice, paras) => ({ voices: { S: voice }, script: paras.map((text) => ({ speaker: 'S', text })) });

  set('L-71-73', Object.assign(T('af_heart', [
    "Hello, this message is for Mr. Fischer. This is Amy calling from Greenfield Dental Clinic about your appointment with Dr. Hart on Wednesday at four thirty.",
    "Unfortunately, Dr. Hart will be attending a conference that afternoon, so we need to reschedule. We have openings on Thursday morning or Friday at five.",
    "Please call us back at 555-0192 before Tuesday to confirm a new time. Also, remember to bring your updated insurance card when you come in. Thank you."
  ]), {
    translation: '您好，這是給 Fischer 先生的留言。我是 Greenfield 牙醫診所的 Amy，打來是關於您週三下午四點半跟 Hart 醫師的預約。很遺憾，Hart 醫師那天下午要參加研討會，所以需要改期。我們週四上午或週五五點有空檔。請在週二前回電 555-0192 確認新的時間。另外，來診時記得帶您更新後的保險卡。謝謝。',
    vocab: [['appointment', 'n.', '預約'], ['attend a conference', 'phr.', '參加研討會', 'attending a conference'], ['reschedule', 'v.', '改期'], ['opening', 'n.', '空檔', 'openings'], ['confirm', 'v.', '確認'], ['insurance card', 'n.', '保險卡']]
  }), [
    [71, 'Who most likely is the speaker?', ['A dentist', 'A clinic receptionist', 'An insurance agent', 'A conference organizer'], 'B',
      '說話者最可能是誰？', ['牙醫師', '診所櫃台人員', '保險業務員', '研討會主辦人'], ['This is Amy calling from Greenfield Dental Clinic'], ['Who', 'speaker'], '她代表診所打電話處理預約；醫師是 Dr. Hart，不是她本人。'],
    [72, 'Why does the appointment need to be changed?', ['The clinic is closing early.', 'The listener requested a new time.', 'A machine is being repaired.', 'The doctor will be at a conference.'], 'D',
      '預約為什麼需要更改？', ['診所要提早關門。', '聽者要求換時間。', '有台機器正在修理。', '醫師要去研討會。'], ['Dr. Hart will be attending a conference that afternoon'], ['Why', 'changed'], '醫師要參加研討會。'],
    [73, 'What is the listener asked to bring?', ['An updated insurance card', 'A payment receipt', 'Medical records', 'A referral letter'], 'A',
      '聽者被要求帶什麼？', ['更新後的保險卡', '付款收據', '病歷', '轉診信'], ['remember to bring your updated insurance card'], ['asked to bring'], 'bring your updated insurance card。']
  ]);

  set('L-74-76', Object.assign(T('bm_george', [
    "Welcome to the Brightwater Chocolate Factory. My name is Oliver, and I'll be your guide this morning. The tour lasts about an hour.",
    "We'll begin in the room where the cocoa beans are roasted, and then we'll watch our machines shape the chocolate bars. For safety reasons, photography is not permitted inside the production area.",
    "At the end of the tour, you'll receive a free sample bag, and our gift shop is offering twenty percent off for tour participants today. Now, if everyone could put on the hairnets I'm handing out, we'll get started."
  ]), {
    translation: '歡迎來到 Brightwater 巧克力工廠。我是 Oliver，今天上午由我導覽，行程大約一小時。我們會先到烘焙可可豆的房間，接著看機器把巧克力塑形成條狀。基於安全理由，生產區內禁止拍照。行程結束時每位都會拿到一袋免費試吃品，今天禮品店給導覽來賓打八折。現在請大家戴上我發的髮網，我們就開始吧。',
    vocab: [['roast', 'v.', '烘焙', 'roasted'], ['for safety reasons', 'phr.', '基於安全理由'], ['permitted', 'adj.', '被允許的'], ['production area', 'n.', '生產區'], ['participant', 'n.', '參加者', 'participants'], ['hand out', 'phr.', '分發', 'handing out']]
  }), [
    [74, 'Where is the talk taking place?', ['At a restaurant', 'At a farm', 'At a factory', 'At a supermarket'], 'C',
      '這段話在哪裡發表？', ['在餐廳', '在農場', '在工廠', '在超市'], ['Welcome to the Brightwater Chocolate Factory.'], ['Where'], 'Chocolate Factory。'],
    [75, 'What are listeners not allowed to do?', ['Take photographs in the production area', 'Eat in the gift shop', 'Touch the machines', 'Leave the group'], 'A',
      '聽者不可以做什麼？', ['在生產區拍照', '在禮品店吃東西', '摸機器', '脫隊'], ['photography is not permitted inside the production area'], ['not allowed'], 'photography is not permitted。'],
    [76, 'What will listeners do next?', ['Watch a video', 'Buy some chocolate', 'Fill out a survey', 'Put on hairnets'], 'D',
      '聽者接下來會做什麼？', ['看影片', '買巧克力', '填問卷', '戴上髮網'], ["if everyone could put on the hairnets I'm handing out"], ['next'], '戴上髮網後開始導覽。']
  ]);

  set('L-77-79', Object.assign(T('af_sarah', [
    "Before we finish today's meeting, I'd like to share some results from our customer survey. Overall, customers are happy with the quality of our products, but many said our delivery times are too long.",
    "On average, orders take six days to arrive, while our main competitor delivers in three. To address this, we're opening a new distribution center in Riverside next month. That should cut delivery times in half for most of the region.",
    "I know this means extra work for the logistics team, so we'll be hiring ten temporary staff to help during the transition. Please let me know by Friday if your department needs additional support."
  ]), {
    translation: '今天會議結束前，我想分享顧客問卷的結果。整體來說顧客對產品品質很滿意，但很多人說出貨太慢。訂單平均六天才送達，主要競爭對手只要三天。為了解決這個問題，我們下個月會在 Riverside 開新的物流中心，應該能讓這個地區大部分的送貨時間縮短一半。我知道這會讓物流團隊多出不少工作，所以我們會雇用十名臨時人員協助過渡期。如果你們部門需要額外支援，請在週五前告訴我。',
    vocab: [['customer survey', 'n.', '顧客問卷'], ['on average', 'phr.', '平均'], ['competitor', 'n.', '競爭對手'], ['address', 'v.', '處理（問題）'], ['distribution center', 'n.', '物流中心'], ['cut … in half', 'phr.', '減半', 'cut delivery times in half'], ['temporary staff', 'n.', '臨時人員'], ['transition', 'n.', '過渡期']]
  }), [
    [77, 'What did many customers complain about?', ['Product quality', 'Slow delivery', 'High prices', 'Rude employees'], 'B',
      '許多顧客抱怨什麼？', ['產品品質', '送貨太慢', '價格太高', '員工不禮貌'], ['many said our delivery times are too long'], ['complain'], '品質是滿意的；抱怨的是送貨時間太長。'],
    [78, 'What will the company do next month?', ['Merge with a competitor', 'Lower its prices', 'Open a distribution center', 'Launch a new product'], 'C',
      '公司下個月會做什麼？', ['與競爭對手合併', '降價', '開物流中心', '推出新產品'], ["we're opening a new distribution center in Riverside next month"], ['next month'], '下個月開新的物流中心。'],
    [79, 'What does the speaker ask the listeners to do by Friday?', ['Tell her if they need more staff', 'Submit a sales report', 'Interview job candidates', 'Visit the new center'], 'A',
      '說話者要聽者在週五前做什麼？', ['需要更多人手就告訴她', '交業績報告', '面試應徵者', '去參觀新中心'], ['Please let me know by Friday if your department needs additional support.'], ['by Friday'], 'additional support＝更多人手。']
  ]);

  set('L-80-82', Object.assign(T('am_michael', [
    "Good morning, passengers. This is your captain speaking. We're currently cruising at thirty-five thousand feet, and we expect to arrive in Vancouver about fifteen minutes ahead of schedule.",
    "The weather in Vancouver is cloudy, with light rain expected this afternoon. In a few minutes, our flight attendants will be coming through the cabin with breakfast and hot drinks.",
    "If you're connecting to another flight, please check the screens in the arrival hall. Our ground staff will also be waiting at the gate to help passengers with tight connections."
  ]), {
    translation: '各位旅客早安，我是機長。我們目前在三萬五千呎高空巡航，預計比原定時間提早約十五分鐘抵達溫哥華。溫哥華天氣多雲，今天下午預計有小雨。再過幾分鐘，空服員會到客艙供應早餐和熱飲。要轉機的旅客，請查看入境大廳的螢幕。我們的地勤人員也會在登機門等候，協助轉機時間緊迫的旅客。',
    vocab: [['cruise', 'v.', '（飛機）巡航', 'cruising'], ['ahead of schedule', 'phr.', '比預定提早'], ['flight attendant', 'n.', '空服員', 'flight attendants'], ['cabin', 'n.', '客艙'], ['connecting flight', 'n.', '轉機航班'], ['ground staff', 'n.', '地勤人員'], ['tight connection', 'n.', '轉機時間緊迫', 'tight connections']]
  }), [
    [80, 'Who is the speaker?', ['A tour guide', 'A weather reporter', 'A flight attendant', 'A pilot'], 'D',
      '說話者是誰？', ['導遊', '氣象播報員', '空服員', '機長'], ['This is your captain speaking.'], ['Who'], 'captain 是機長，即 pilot。空服員是另外被提到的人。'],
    [81, 'What does the speaker say about the flight?', ['It will arrive early.', 'It has been delayed.', 'It will land in heavy rain.', 'It is fully booked.'], 'A',
      '說話者說這班飛機怎麼樣？', ['會提早抵達。', '已經延誤了。', '會在大雨中降落。', '客滿了。'], ['about fifteen minutes ahead of schedule'], ['flight'], 'ahead of schedule＝提早。雨是小雨（light rain）而且是下午。'],
    [82, 'According to the speaker, who will help some passengers?', ['Customs officers', 'Flight attendants', 'Ground staff', 'Hotel employees'], 'C',
      '根據說話者，誰會協助部分旅客？', ['海關人員', '空服員', '地勤人員', '飯店員工'], ['Our ground staff will also be waiting at the gate to help passengers with tight connections.'], ['who', 'help'], '地勤人員會在登機門協助轉機旅客。']
  ]);

  set('L-83-85', Object.assign(T('bf_emma', [
    "Thanks for tuning in to Business Today. Our top story this morning: Halston Foods has announced that it will acquire the regional grocery chain FreshWay for two hundred million dollars.",
    "The deal will add over forty stores to Halston's network, mainly in the northern part of the state. Halston's chief executive said the company plans to keep the FreshWay name for at least two years.",
    "Some analysts, however, worry that grocery prices in the area could rise. We'll talk with one of them, economist Paul Grant, right after this short break."
  ]), {
    translation: '感謝收聽《今日商業》。今天早上的頭條：Halston 食品宣布將以兩億美元收購區域性連鎖超市 FreshWay。這筆交易會讓 Halston 的通路增加四十多家門市，主要在本州北部。Halston 的執行長表示，公司打算至少保留 FreshWay 這個品牌名稱兩年。不過有些分析師擔心當地的生鮮雜貨價格可能上漲。短暫休息後，我們將與其中一位分析師、經濟學家 Paul Grant 對談。',
    vocab: [['tune in', 'phr.', '收聽；收看'], ['acquire', 'v.', '收購'], ['grocery chain', 'n.', '連鎖超市'], ['deal', 'n.', '交易'], ['chief executive', 'n.', '執行長'], ['analyst', 'n.', '分析師', 'analysts'], ['economist', 'n.', '經濟學家']]
  }), [
    [83, 'What is the broadcast mainly about?', ['A company acquisition', 'A new store opening', 'A change in leadership', 'A food safety recall'], 'A',
      '這段廣播主要在講什麼？', ['一樁公司收購案', '新店開幕', '領導階層異動', '食品安全回收'], ['Halston Foods has announced that it will acquire the regional grocery chain FreshWay'], ['mainly about'], 'acquire＝收購（acquisition）。'],
    [84, 'What does Halston plan to do for at least two years?', ['Close some stores', 'Lower its prices', 'Hire new managers', 'Keep the FreshWay name'], 'D',
      'Halston 打算至少兩年內做什麼？', ['關閉部分門市', '降價', '雇用新經理', '保留 FreshWay 名稱'], ['plans to keep the FreshWay name for at least two years'], ['at least two years'], 'keep the FreshWay name。'],
    [85, 'What will listeners hear next?', ['A weather report', 'An interview with an economist', 'A commercial for a store', 'A traffic update'], 'B',
      '聽眾接下來會聽到什麼？', ['氣象報告', '與經濟學家的訪談', '商店廣告', '路況更新'], ["We'll talk with one of them, economist Paul Grant, right after this short break."], ['next'], '題目問「接下來」的節目內容：休息後會訪問經濟學家。']
  ]);

  set('L-86-88', Object.assign(T('am_adam', [
    "Hi, Teresa. It's Brian from the warehouse. I'm calling about the order for Harbor Electronics that's supposed to ship tomorrow.",
    "We're short twenty units of the wireless speakers they ordered. Our supplier says the next delivery won't arrive until Monday.",
    "I see two options. We could send what we have now and ship the rest next week, or hold the entire order until Monday. Harbor is your client, so I'll leave it up to you. Just let me know before three today so I can arrange the trucks."
  ]), {
    translation: '嗨，Teresa，我是倉庫的 Brian。打來是關於原定明天出貨給 Harbor 電子的訂單。他們訂的無線喇叭我們少了二十台。供應商說下一批要到週一才會到。我看有兩個做法：先把現有的寄出，剩下的下週再寄；或整批等到週一。Harbor 是你的客戶，所以由你決定。請在今天三點前告訴我，我才能安排卡車。',
    vocab: [['warehouse', 'n.', '倉庫'], ['ship', 'v.', '出貨'], ['be short', 'phr.', '短缺', "We're short"], ['unit', 'n.', '（商品）台；件', 'units'], ['supplier', 'n.', '供應商'], ['leave it up to', 'phr.', '交由…決定'], ['arrange', 'v.', '安排']]
  }), [
    [86, 'What problem does the speaker mention?', ['A delivery address is wrong.', 'A truck has broken down.', 'Some items are out of stock.', 'A client canceled an order.'], 'C',
      '說話者提到什麼問題？', ['送貨地址錯了。', '有台卡車拋錨。', '有些商品缺貨。', '客戶取消訂單。'], ["We're short twenty units of the wireless speakers they ordered."], ['problem'], 'short twenty units＝少二十台，缺貨。'],
    [87, 'Why does the speaker say, "Harbor is your client"?', ['To ask the listener to make a decision', 'To correct a mistake', 'To introduce a new customer', 'To complain about a client'], 'A',
      '說話者為什麼說「Harbor 是你的客戶」？', ['請聽者做決定', '更正一個錯誤', '介紹新客戶', '抱怨客戶'], ["Harbor is your client, so I'll leave it up to you."], ['Why', 'Harbor is your client'], '意圖題：接著說 I\'ll leave it up to you，意思是由對方決定。'],
    [88, 'What does the speaker need to do before three o\'clock?', ['Call the supplier', 'Arrange transportation', 'Count the inventory', 'Visit the client'], 'B',
      '說話者三點前需要做什麼？', ['打給供應商', '安排運輸', '盤點庫存', '拜訪客戶'], ['Just let me know before three today so I can arrange the trucks.'], ['before three'], 'arrange the trucks＝安排運輸。']
  ]);

  set('L-89-91', Object.assign(T('bf_isabella', [
    "Good afternoon, everyone, and welcome to this workshop on writing effective business e-mails. I'm Claire Dawson, and I've trained staff at over fifty companies.",
    "Today we'll focus on three areas: writing clear subject lines, keeping messages short, and choosing the right tone for different readers.",
    "I've put a handout with sample e-mails on each table. In a moment, I'd like you to read the first sample and mark anything you think is unclear. Then we'll discuss it as a group."
  ]), {
    translation: '各位午安，歡迎參加這場「撰寫有效商業郵件」工作坊。我是 Claire Dawson，曾為五十多家公司培訓員工。今天我們會著重三個部分：寫清楚的主旨、讓訊息簡短、針對不同讀者選擇適當的語氣。每張桌上都有一份附範例郵件的講義。待會請大家先讀第一份範例，標出你覺得不清楚的地方，然後我們一起討論。',
    vocab: [['workshop', 'n.', '工作坊'], ['effective', 'adj.', '有效的'], ['subject line', 'n.', '（郵件）主旨', 'subject lines'], ['tone', 'n.', '語氣'], ['handout', 'n.', '講義'], ['mark', 'v.', '標記']]
  }), [
    [89, 'What is the workshop about?', ['Giving presentations', 'Managing a budget', 'Using new software', 'Writing business e-mails'], 'D',
      '這個工作坊的主題是什麼？', ['做簡報', '管理預算', '使用新軟體', '撰寫商業郵件'], ['welcome to this workshop on writing effective business e-mails'], ['workshop'], 'writing effective business e-mails。'],
    [90, 'What does the speaker say about herself?', ['She wrote a book on the topic.', 'She used to work in marketing.', 'She has trained many companies\' staff.', 'She is a new employee.'], 'C',
      '說話者提到自己什麼？', ['她寫過這個主題的書。', '她以前做行銷。', '她培訓過許多公司的員工。', '她是新員工。'], ["I've trained staff at over fifty companies"], ['herself'], 'trained staff at over fifty companies。'],
    [91, 'What will the listeners do first?', ['Read a sample e-mail', 'Introduce themselves', 'Watch a video', 'Form small groups'], 'A',
      '聽眾首先要做什麼？', ['讀一份範例郵件', '自我介紹', '看影片', '分小組'], ["I'd like you to read the first sample and mark anything you think is unclear"], ['first'], '先讀第一份範例並標出不清楚的地方，之後才一起討論。']
  ]);

  set('L-92-94', Object.assign(T('am_eric', [
    "Attention, Fairview Mall shoppers. Due to a water leak, the north entrance near the food court is temporarily closed.",
    "Please use the main entrance on Oak Street or the east entrance next to the parking garage. Our maintenance team is working on the problem and expects to reopen the north entrance by this evening.",
    "We apologize for the inconvenience. As a thank-you for your patience, all food court restaurants are offering a free drink with any meal until closing time today."
  ]), {
    translation: 'Fairview 購物中心的顧客請注意：由於漏水，美食街附近的北側入口暫時關閉。請改走 Oak 街的正門，或停車場旁的東側入口。我們的維修團隊正在處理，預計今晚以前重新開放北側入口。造成不便敬請見諒。為感謝各位的耐心，今天營業結束前，美食街所有餐廳點任何餐點都送一杯免費飲料。',
    vocab: [['attention', 'n.', '（廣播）請注意'], ['water leak', 'n.', '漏水'], ['entrance', 'n.', '入口'], ['temporarily', 'adv.', '暫時地'], ['maintenance team', 'n.', '維修團隊'], ['inconvenience', 'n.', '不便'], ['patience', 'n.', '耐心']]
  }), [
    [92, 'Why is the north entrance closed?', ['It is being repainted.', 'There is a water leak.', 'A special event is being held.', 'The parking garage is full.'], 'B',
      '北側入口為什麼關閉？', ['正在重新粉刷。', '有漏水。', '正在舉辦特別活動。', '停車場滿了。'], ['Due to a water leak, the north entrance near the food court is temporarily closed.'], ['Why', 'north entrance'], 'Due to a water leak。'],
    [93, 'When is the north entrance expected to reopen?', ['In one hour', 'Tomorrow morning', 'Next week', 'By this evening'], 'D',
      '北側入口預計什麼時候重新開放？', ['一小時後', '明天早上', '下週', '今晚以前'], ['expects to reopen the north entrance by this evening'], ['When', 'reopen'], 'by this evening。'],
    [94, 'What are the food court restaurants offering?', ['A discount on desserts', 'Free parking', 'A free drink with a meal', 'Extended hours'], 'C',
      '美食街餐廳提供什麼？', ['甜點折扣', '免費停車', '點餐送免費飲料', '延長營業時間'], ['all food court restaurants are offering a free drink with any meal'], ['offering'], 'a free drink with any meal。']
  ]);

  set('L-95-97', Object.assign(T('af_nicole', [
    "Hi, everyone. Before you start your shifts, I want to go over the new schedule for next month. As you can see on the chart, we're adding a late shift on Fridays because the store will now stay open until ten.",
    "Mia, I know you asked for more weekend hours, so I've put you on Saturday mornings. Everyone else's hours stay mostly the same.",
    "If you need to swap a shift, please arrange it with a coworker first and then tell me at least three days in advance."
  ]), {
    translation: '嗨，大家好。在你們開始上班前，我想說明下個月的新班表。如圖表所示，因為店裡週五會營業到晚上十點，所以我們增加了週五晚班。Mia，我知道你想多排週末的時數，所以把你排在週六上午。其他人的時數大致不變。如果需要換班，請先和同事講好，再至少提前三天告訴我。',
    figure: { type: 'table', title: 'Next Month — New Shifts', headers: ['Day', 'Shift', 'Hours'], rows: [['Friday', 'Late', '4:00–10:00 P.M.'], ['Saturday', 'Morning', '8:00 A.M.–2:00 P.M.'], ['Saturday', 'Afternoon', '2:00–8:00 P.M.'], ['Sunday', 'Morning', '9:00 A.M.–3:00 P.M.']] },
    vocab: [['shift', 'n.', '（輪）班', 'shifts'], ['go over', 'phr.', '說明；檢視'], ['late shift', 'n.', '晚班'], ['swap', 'v.', '交換'], ['coworker', 'n.', '同事'], ['in advance', 'phr.', '事先']]
  }), [
    [95, 'Why is a new shift being added?', ['The store will stay open later.', 'A new employee has been hired.', 'Customers have complained.', 'A holiday sale is starting.'], 'A',
      '為什麼要增加新的班別？', ['店會營業到更晚。', '雇用了新員工。', '顧客抱怨了。', '節日特賣要開始了。'], ['the store will now stay open until ten'], ['Why', 'new shift'], 'stay open until ten → 加週五晚班。'],
    [96, 'Look at the graphic. When will Mia most likely start work on Saturdays?', ['At 2:00 P.M.', 'At 8:00 A.M.', 'At 9:00 A.M.', 'At 4:00 P.M.'], 'B',
      '看圖表：Mia 週六最可能幾點開始上班？', ['下午 2 點', '上午 8 點', '上午 9 點', '下午 4 點'], ["I've put you on Saturday mornings"], ['graphic', 'Mia', 'Saturdays'], '圖表題：Mia 排在週六上午班＝8:00 A.M. 開始。9:00 是週日上午班的陷阱。'],
    [97, 'What should employees do before telling the speaker about a shift change?', ['Fill out a form', 'Check the chart online', 'Ask for overtime pay', 'Arrange it with a coworker'], 'D',
      '員工告訴說話者換班之前應該先做什麼？', ['填表格', '上網看班表', '申請加班費', '先跟同事講好'], ['please arrange it with a coworker first'], ['before telling', 'shift change'], 'arrange it with a coworker first。']
  ]);

  set('L-98-100', Object.assign(T('bm_lewis', [
    "Welcome back to Home Kitchen. Today I'm going to show you how to make a simple vegetable soup that's ready in thirty minutes.",
    "You can see the ingredients listed on the screen. Now, many recipes tell you to add the salt at the beginning, but I always add it at the very end. That way you can taste the soup first and avoid adding too much.",
    "If you'd like a printable copy of today's recipe, just visit our Web site. And don't forget: next week's episode features a guest chef from Lyon, so you won't want to miss it."
  ]), {
    translation: '歡迎回到《居家廚房》。今天我要示範一道三十分鐘就能完成的簡單蔬菜湯。食材都列在螢幕上了。很多食譜會叫你一開始就加鹽，但我總是到最後才加，這樣你可以先嚐湯的味道，避免加太多。如果想要今天食譜的可列印版本，請上我們的網站。別忘了，下週節目會邀請一位來自里昂的客座主廚，千萬別錯過。',
    figure: { type: 'table', title: 'Simple Vegetable Soup', headers: ['Step', 'Instruction'], rows: [['1', 'Chop the vegetables'], ['2', 'Heat oil and cook onions'], ['3', 'Add water and simmer 20 minutes'], ['4', 'Add salt and serve']] },
    vocab: [['ingredient', 'n.', '食材', 'ingredients'], ['recipe', 'n.', '食譜', 'recipes'], ['at the very end', 'phr.', '在最後'], ['taste', 'v.', '嚐味道'], ['printable', 'adj.', '可列印的'], ['episode', 'n.', '（節目）一集'], ['feature', 'v.', '以…為特色；邀請', 'features'], ['simmer', 'v.', '小火慢燉']]
  }), [
    [98, 'Who most likely is the speaker?', ['A restaurant owner', 'A food critic', 'A television host', 'A farmer'], 'C',
      '說話者最可能是誰？', ['餐廳老闆', '美食評論家', '電視節目主持人', '農夫'], ['Welcome back to Home Kitchen.', "next week's episode features a guest chef"], ['Who', 'speaker'], 'Welcome back to＋節目名、next week\'s episode，是節目主持人。'],
    [99, 'Look at the graphic. Which step does the speaker do differently from many recipes?', ['Step 4', 'Step 1', 'Step 2', 'Step 3'], 'A',
      '看圖表：說話者哪個步驟的做法跟很多食譜不同？', ['第 4 步', '第 1 步', '第 2 步', '第 3 步'], ['many recipes tell you to add the salt at the beginning, but I always add it at the very end'], ['graphic', 'differently'], '圖表題：她最後才加鹽，對應「Add salt and serve」＝第 4 步。'],
    [100, 'What will happen next week?', ['A new Web site will launch.', 'A guest chef will appear.', 'A cookbook will be released.', 'A cooking contest will be held.'], 'B',
      '下週會發生什麼事？', ['新網站上線。', '客座主廚會登場。', '食譜書會出版。', '會舉辦烹飪比賽。'], ["next week's episode features a guest chef from Lyon"], ['next week'], 'features a guest chef。']
  ]);
})();
