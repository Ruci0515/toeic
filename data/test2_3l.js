/* Test 2 聽力 Part 4 簡短獨白（Q71–100，10 段 × 3 題；最後兩段搭配圖表） */
(function () {
  const set = (group, base, rows) => window.TOEIC_T2.set('L', 'Part 4', group, base, rows);
  const T = (voice, paras) => ({ voices: { S: voice }, script: paras.map((text) => ({ speaker: 'S', text })) });

  set('L-71-73', Object.assign(T('bm_george', [
    "Hi, Ms. Lin. This is Gary from Oakwood Property Management. I'm calling about the request you submitted for your kitchen sink.",
    "Our plumber will be in your building on Thursday morning, and he can stop by your apartment between nine and eleven. If that time doesn't work for you, just let me know.",
    "Also, please make sure the area under the sink is cleared out before he arrives. That way he can get to the pipes quickly. Thanks, and have a good day."
  ]), {
    translation: '嗨，林小姐，我是 Oakwood 物業管理的 Gary，打來是關於您提出的廚房水槽報修。我們的水電工週四上午會在您那棟大樓，九點到十一點之間可以到您家。如果那個時間不方便，請告訴我。另外，請在他到之前把水槽下方的空間清空，這樣他才能很快碰到水管。謝謝，祝您有美好的一天。',
    vocab: [['property management', 'n.', '物業管理'], ['submit a request', 'phr.', '提出申請', 'request you submitted'], ['plumber', 'n.', '水電工'], ['stop by', 'phr.', '順道過去'], ['clear out', 'phr.', '清空', 'cleared out'], ['pipe', 'n.', '水管', 'pipes']]
  }), [
    [71, 'Why is the speaker calling?', ['To collect a rent payment', 'To respond to a repair request', 'To announce a building inspection', 'To advertise an apartment'], 'B',
      '說話者為什麼打電話？', ['收房租', '回應報修', '宣布大樓檢查', '刊登出租廣告'], ["I'm calling about the request you submitted for your kitchen sink."], ['Why', 'calling'], '回應她提出的水槽報修。'],
    [72, 'When will the plumber visit?', ['Monday afternoon', 'Wednesday evening', 'Friday morning', 'Thursday morning'], 'D',
      '水電工什麼時候會來？', ['週一下午', '週三晚上', '週五上午', '週四上午'], ['Our plumber will be in your building on Thursday morning'], ['When', 'plumber'], 'Thursday morning, between nine and eleven。'],
    [73, 'What is the listener asked to do?', ['Clear a space', 'Pay a fee', 'Sign a form', 'Turn off the water'], 'A',
      '聽者被要求做什麼？', ['清出空間', '付費', '簽表格', '關水'], ['please make sure the area under the sink is cleared out'], ['asked'], '把水槽下方清空＝clear a space。']
  ]);

  set('L-74-76', Object.assign(T('af_heart', [
    "Attention, shoppers. Thank you for visiting Maxwell Home Center. This weekend only, all outdoor furniture is thirty percent off, including patio tables, chairs, and umbrellas.",
    "And if you sign up for our free rewards card today, you'll receive an additional ten percent off your entire purchase. Just ask any cashier for an application.",
    "Please note that our garden center will close at six this evening instead of nine, because we're setting up a new display for next week's spring festival."
  ]), {
    translation: '各位顧客請注意，感謝您光臨 Maxwell 居家中心。僅限本週末，所有戶外家具七折，包括庭院桌、椅子和陽傘。如果您今天申辦免費的會員回饋卡，整筆消費還可以再打九折，請向任何一位收銀員索取申請表。請注意，我們的園藝中心今晚會在六點關門，而不是九點，因為我們要為下週的春季活動布置新的展示。',
    vocab: [['outdoor furniture', 'n.', '戶外家具'], ['patio', 'n.', '庭院；露台'], ['rewards card', 'n.', '會員回饋卡'], ['additional', 'adj.', '額外的'], ['entire purchase', 'n.', '整筆消費'], ['display', 'n.', '展示'], ['instead of', 'phr.', '而不是']]
  }), [
    [74, 'What is being discounted this weekend?', ['Kitchen appliances', 'Garden tools', 'Lighting fixtures', 'Outdoor furniture'], 'D',
      '這個週末什麼在打折？', ['廚房家電', '園藝工具', '燈具', '戶外家具'], ['all outdoor furniture is thirty percent off'], ['discounted', 'weekend'], 'outdoor furniture 七折。'],
    [75, 'How can shoppers receive an extra discount?', ['By spending over a certain amount', 'By shopping in the morning', 'By applying for a store card', 'By bringing a coupon'], 'C',
      '顧客要怎樣才能再多打折？', ['消費滿一定金額', '上午來買', '申辦店家會員卡', '帶折價券'], ["if you sign up for our free rewards card today, you'll receive an additional ten percent off"], ['extra discount'], 'sign up for our free rewards card＝申辦店家會員卡。'],
    [76, 'Why will the garden center close early?', ['Some staff are in training.', 'There is a power outage.', 'It is a national holiday.', 'A display is being prepared.'], 'D',
      '園藝中心為什麼會提早關門？', ['有些員工在受訓。', '停電了。', '是國定假日。', '要準備展示。'], ["we're setting up a new display for next week's spring festival"], ['Why', 'close early'], 'setting up a new display＝準備展示。']
  ]);

  set('L-77-79', Object.assign(T('bf_isabella', [
    "Good afternoon, everyone, and welcome to the Harbor City Maritime Museum. I'm Sophie, and I'll be guiding you through our collection today.",
    "We'll start on the ground floor with our model ships, some of which are over two hundred years old. Then we'll go up to the second floor to see our newest exhibit, which tells the story of the city's fishing industry.",
    "Before we begin, I'd like to remind you that photography is allowed, but please don't use a flash. The bright light can damage the older paintings."
  ]), {
    translation: '各位午安，歡迎來到 Harbor City 海事博物館。我是 Sophie，今天由我帶大家參觀館藏。我們會從一樓的船隻模型開始，其中有些已經超過兩百年。接著上二樓看我們最新的展覽，介紹本市漁業的故事。開始之前要提醒大家，可以拍照，但請不要使用閃光燈，強光會損壞較舊的畫作。',
    vocab: [['maritime', 'adj.', '海事的'], ['collection', 'n.', '館藏'], ['model ship', 'n.', '船隻模型', 'model ships'], ['exhibit', 'n.', '展覽'], ['fishing industry', 'n.', '漁業'], ['photography', 'n.', '攝影'], ['flash', 'n.', '閃光燈']]
  }), [
    [77, 'Who most likely is the speaker?', ['A tour guide', 'A ship captain', 'A history teacher', 'A museum security guard'], 'A',
      '說話者最可能是誰？', ['導覽員', '船長', '歷史老師', '博物館警衛'], ["I'll be guiding you through our collection today"], ['Who', 'speaker'], '她要帶大家參觀館藏＝導覽員。'],
    [78, 'What is featured in the newest exhibit?', ['Famous painters', 'Ancient coins', 'Modern ship designs', 'A local industry'], 'D',
      '最新展覽的主題是什麼？', ['著名畫家', '古代錢幣', '現代船隻設計', '一項本地產業'], ["which tells the story of the city's fishing industry"], ['newest exhibit'], "the city's fishing industry＝本地產業。"],
    [79, 'What are the listeners asked not to do?', ['Touch the models', 'Use a camera flash', 'Eat in the galleries', 'Leave the group'], 'B',
      '聽眾被要求不要做什麼？', ['摸模型', '用相機閃光燈', '在展廳吃東西', '脫隊'], ["please don't use a flash"], ['asked not to'], '可以拍照但不能用閃光燈。']
  ]);

  set('L-80-82', Object.assign(T('am_eric', [
    "This is Mark Chen with your WRZT traffic update. If you're heading downtown this morning, expect delays on Highway 12. A truck has broken down in the left lane near the Pine Street exit, and traffic is backed up for about three kilometers.",
    "Crews are on their way, but it could take an hour to clear. Drivers might want to consider taking Lakeshore Drive instead.",
    "Of course, there's also the train. Also, a reminder that the city marathon is this Sunday, so many roads in the city center will be closed from six A.M. to two P.M."
  ]), {
    translation: '我是 WRZT 路況報導的 Mark Chen。如果您今天早上要進市區，12 號公路會塞車。一輛卡車在 Pine 街出口附近的左車道拋錨，車流回堵大約三公里。工作人員正在路上，但可能要一個小時才能排除。駕駛人或許可以考慮改走 Lakeshore 大道。當然，也可以搭火車。另外提醒您，本週日舉行城市馬拉松，市中心許多道路從早上六點到下午兩點封閉。',
    vocab: [['traffic update', 'n.', '路況報導'], ['head', 'v.', '前往', 'heading'], ['break down', 'phr.', '拋錨', 'broken down'], ['lane', 'n.', '車道'], ['be backed up', 'phr.', '（車流）回堵', 'backed up'], ['crew', 'n.', '工作人員', 'Crews'], ['clear', 'v.', '排除']]
  }), [
    [80, 'What is causing a delay on Highway 12?', ['Road construction', 'Bad weather', 'A disabled vehicle', 'A sports event'], 'C',
      '什麼造成 12 號公路塞車？', ['道路施工', '天氣不好', '一輛故障的車', '運動賽事'], ['A truck has broken down in the left lane'], ['delay', 'Highway 12'], 'a truck has broken down＝一輛故障的車（disabled vehicle）。馬拉松是週日的事。'],
    [81, 'What does the speaker imply when he says, "Of course, there\'s also the train"?', ['Train tickets have become cheaper.', 'The train station is near Pine Street.', 'Trains are also running late.', 'Listeners could avoid driving.'], 'D',
      '說話者說「當然，也可以搭火車」暗示什麼？', ['火車票變便宜了。', '火車站在 Pine 街附近。', '火車也誤點。', '聽眾可以不開車。'], ["Of course, there's also the train."], ['imply'], '意圖題：前面在建議改道，這句再提供另一個選擇：不開車、改搭火車。'],
    [82, 'What will happen on Sunday?', ['Some roads will be closed.', 'A highway will reopen.', 'A new train line will start.', 'A parade will be held downtown.'], 'A',
      '週日會發生什麼事？', ['有些道路會封閉。', '一條公路會重新開放。', '一條新的鐵路線會開始營運。', '市中心會舉行遊行。'], ['many roads in the city center will be closed from six A.M. to two P.M.'], ['Sunday'], '馬拉松當天市中心道路封閉。']
  ]);

  set('L-83-85', Object.assign(T('af_nicole', [
    "Before we finish today's staff meeting, I have an announcement about travel expenses. Starting next month, all travel bookings must be made through our new online system, TripDesk.",
    "This will make it easier for the accounting team to track costs, and you'll no longer need to submit paper receipts for flights and hotels.",
    "I know learning a new system takes time, so the IT department will hold a thirty-minute demonstration next Tuesday at noon. Lunch will be provided, so please let me know by Friday if you plan to attend."
  ]), {
    translation: '今天的員工會議結束前，我要宣布一件關於差旅費的事。從下個月開始，所有差旅預訂都必須透過新的線上系統 TripDesk 辦理。這會讓會計組更容易追蹤費用，而且機票和住宿不用再交紙本收據。我知道學新系統需要時間，所以資訊部下週二中午會舉辦三十分鐘的示範說明。會提供午餐，所以如果要參加，請在週五前告訴我。',
    vocab: [['travel expenses', 'n.', '差旅費'], ['booking', 'n.', '預訂', 'bookings'], ['track', 'v.', '追蹤'], ['submit', 'v.', '繳交'], ['receipt', 'n.', '收據', 'receipts'], ['demonstration', 'n.', '示範說明'], ['provide', 'v.', '提供', 'provided']]
  }), [
    [83, 'What is the speaker mainly announcing?', ['A change in office hours', 'A new travel destination', 'A budget reduction', 'A new booking procedure'], 'D',
      '說話者主要在宣布什麼？', ['上班時間改變', '新的出差地點', '預算刪減', '新的預訂流程'], ['all travel bookings must be made through our new online system, TripDesk'], ['mainly announcing'], '差旅預訂要改用新系統＝新的預訂流程。'],
    [84, 'According to the speaker, what will employees no longer have to do?', ['Get a manager\'s approval', 'Hand in paper receipts', 'Pay for hotels in advance', 'Attend weekly meetings'], 'B',
      '根據說話者，員工以後不必再做什麼？', ['取得主管核准', '繳交紙本收據', '預付住宿費', '參加週會'], ["you'll no longer need to submit paper receipts for flights and hotels"], ['no longer'], 'no longer need to submit paper receipts。submit＝hand in。'],
    [85, 'Why should listeners contact the speaker by Friday?', ['To request a laptop', 'To book a business trip', 'To sign up for a demonstration', 'To report their expenses'], 'C',
      '聽眾為什麼要在週五前聯絡說話者？', ['申請筆電', '預訂出差', '報名示範說明會', '回報費用'], ['please let me know by Friday if you plan to attend'], ['Why', 'Friday'], '要參加示範說明的人週五前告知＝報名。']
  ]);

  set('L-86-88', Object.assign(T('am_michael', [
    "Good evening, passengers. This is an announcement for Northstar Airlines Flight 208 to Vancouver. Due to a mechanical issue with our aircraft, this flight has been delayed.",
    "We now expect to begin boarding at nine fifteen. We apologize for the inconvenience. All passengers on this flight will receive a meal voucher, which can be used at any restaurant in Terminal B.",
    "Please show your boarding pass at the service desk next to Gate 14 to collect your voucher. We will make another announcement when the aircraft is ready."
  ]), {
    translation: '各位旅客晚安，這是北星航空 208 號班機飛往溫哥華的廣播。由於飛機有機械問題，本班機延誤。我們目前預計九點十五分開始登機，造成不便，敬請見諒。本班機所有旅客都會拿到一張餐券，可以在 B 航廈任何一家餐廳使用。請到 14 號登機門旁的服務台出示登機證領取餐券。飛機準備好時我們會再廣播。',
    vocab: [['mechanical issue', 'n.', '機械問題'], ['aircraft', 'n.', '飛機'], ['boarding', 'n.', '登機'], ['inconvenience', 'n.', '不便'], ['meal voucher', 'n.', '餐券'], ['boarding pass', 'n.', '登機證'], ['collect', 'v.', '領取']]
  }), [
    [86, 'Where is the announcement being made?', ['On a train', 'At a bus terminal', 'On an airplane', 'At an airport'], 'D',
      '這則廣播在哪裡播放？', ['火車上', '公車總站', '飛機上', '機場'], ['This is an announcement for Northstar Airlines Flight 208 to Vancouver.'], ['Where'], '對還沒登機的旅客廣播，提到登機門、航廈＝機場。還沒登機，所以不是飛機上。'],
    [87, 'What are the passengers offered?', ['A meal voucher', 'A hotel room', 'A seat upgrade', 'A partial refund'], 'A',
      '旅客獲得什麼補償？', ['餐券', '飯店房間', '座位升等', '部分退款'], ['All passengers on this flight will receive a meal voucher'], ['offered'], 'receive a meal voucher。'],
    [88, 'What should passengers do at the service desk?', ['Check their luggage', 'Change their seats', 'Pay a fee', 'Present a boarding pass'], 'D',
      '旅客應該在服務台做什麼？', ['托運行李', '換座位', '付費', '出示登機證'], ['Please show your boarding pass at the service desk next to Gate 14'], ['service desk'], 'show your boarding pass＝present a boarding pass。']
  ]);

  set('L-89-91', Object.assign(T('af_bella', [
    "Are you tired of spending your evenings cooking? Let FreshBox do the work for you. Every week, we deliver fresh ingredients and easy-to-follow recipes right to your door.",
    "Each meal takes less than thirty minutes to prepare, and you can choose from over forty dishes, including vegetarian and low-calorie options.",
    "Our customers say FreshBox has saved them hours every week. Visit freshbox.com today and enter the code SPRING to get your first box for half price."
  ]), {
    translation: '您厭倦每天晚上花時間煮飯嗎？讓 FreshBox 替您代勞。我們每週把新鮮食材和簡單易懂的食譜直接送到您家門口。每道菜準備時間不到三十分鐘，有超過四十道菜色可以選，包括素食和低卡選項。我們的顧客說 FreshBox 每週幫他們省下好幾個小時。今天就上 freshbox.com，輸入代碼 SPRING，第一箱半價。',
    vocab: [['be tired of', 'phr.', '厭倦', 'tired of'], ['ingredient', 'n.', '食材', 'ingredients'], ['easy-to-follow', 'adj.', '容易照著做的'], ['recipe', 'n.', '食譜', 'recipes'], ['low-calorie', 'adj.', '低卡的'], ['half price', 'n.', '半價']]
  }), [
    [89, 'What is being advertised?', ['A cooking school', 'A meal-kit delivery service', 'A restaurant', 'A kitchen appliance'], 'B',
      '這則廣告在宣傳什麼？', ['烹飪學校', '料理包外送服務', '餐廳', '廚房家電'], ['we deliver fresh ingredients and easy-to-follow recipes right to your door'], ['advertised'], '送食材加食譜到府＝料理包外送服務。'],
    [90, 'What does the speaker say about the meals?', ['They are cooked by professional chefs.', 'They are all vegetarian.', 'They can be prepared quickly.', 'They can be frozen.'], 'C',
      '說話者說這些餐點怎麼樣？', ['由專業廚師烹調。', '全部是素食。', '可以很快做好。', '可以冷凍。'], ['Each meal takes less than thirty minutes to prepare'], ['meals'], '不到三十分鐘＝很快。(B) 只說「包括」素食，不是全部。'],
    [91, 'How can listeners receive a discount?', ['By ordering before Friday', 'By referring a friend', 'By ordering two boxes', 'By using a promotional code'], 'D',
      '聽眾要怎麼拿到折扣？', ['週五前訂購', '推薦朋友', '訂兩箱', '使用優惠代碼'], ['enter the code SPRING to get your first box for half price'], ['discount'], '輸入代碼 SPRING＝使用優惠代碼。']
  ]);

  set('L-92-94', Object.assign(T('bm_lewis', [
    "Thank you all for coming to tonight's awards dinner. Our final award, Employee of the Year, goes to Maria Gonzalez from our customer service department.",
    "This year, Maria created a new training program for customer service representatives. Since then, customer complaints have dropped by forty percent. I've worked here for twenty years. I've never seen anything like that.",
    "Maria, please come up to the stage to receive your award. And after that, everyone is invited to enjoy dessert in the garden."
  ]), {
    translation: '謝謝大家來參加今晚的頒獎晚宴。最後一個獎項，年度最佳員工，頒給客服部的 Maria Gonzalez。今年 Maria 為客服人員建立了一套新的訓練課程，從那之後，客訴減少了百分之四十。我在這裡工作了二十年，從沒看過這樣的成果。Maria，請上台領獎。之後請大家到花園享用甜點。',
    vocab: [['awards dinner', 'n.', '頒獎晚宴'], ['Employee of the Year', 'n.', '年度最佳員工'], ['customer service representative', 'n.', '客服人員', 'customer service representatives'], ['complaint', 'n.', '抱怨；客訴', 'complaints'], ['drop', 'v.', '下降', 'dropped']]
  }), [
    [92, 'What is the purpose of the speech?', ['To present an award', 'To introduce a new manager', 'To announce a retirement', 'To explain a policy'], 'A',
      '這段致詞的目的是什麼？', ['頒獎', '介紹新經理', '宣布退休', '說明政策'], ['Our final award, Employee of the Year, goes to Maria Gonzalez'], ['purpose'], '頒年度最佳員工獎。'],
    [93, 'Why does the speaker say, "I\'ve worked here for twenty years"?', ['To announce his retirement', 'To explain why he is giving the speech', 'To show that he knows Ms. Gonzalez well', 'To emphasize how impressive a result is'], 'D',
      '說話者為什麼說「我在這裡工作了二十年」？', ['宣布他要退休', '解釋為什麼由他致詞', '表示他很了解 Gonzalez 女士', '強調成果有多驚人'], ["I've never seen anything like that."], ['Why', 'twenty years'], '意圖題：後一句「從沒看過這樣的成果」，表示他用自己的資歷強調客訴降四成有多難得。'],
    [94, 'What will the listeners do next?', ['Watch a video', 'Eat dinner', 'Watch an award being given', 'Take photographs'], 'C',
      '聽眾接下來會做什麼？', ['看影片', '吃晚餐', '看頒獎', '拍照'], ['please come up to the stage to receive your award'], ['next'], 'Maria 上台領獎；甜點是 after that 之後的事。']
  ]);

  set('L-95-97', Object.assign(T('af_sarah', [
    "Hi, team. It's Karen. I'm calling about our company picnic. As you know, we planned to hold it on Saturday, but I just checked the weather forecast, and heavy rain is expected that day.",
    "So, I'd like to move the picnic to the first day of next week that's sunny. Since it's on a weekday, everyone will get the afternoon off to attend.",
    "Pierre, you're in charge of food. Could you call the bakery and change the date of our cake order? Thanks."
  ]), {
    translation: '嗨，大家好，我是 Karen，打來是關於公司野餐。如大家所知，我們原本計畫週六舉辦，但我剛看了氣象預報，那天預計會下大雨。所以我想把野餐改到下週第一個晴天。因為是平日，大家下午都可以放假來參加。Pierre，你負責食物，可以打給麵包店把蛋糕訂單的日期改掉嗎？謝謝。',
    vocab: [['company picnic', 'n.', '公司野餐'], ['weather forecast', 'n.', '氣象預報'], ['heavy rain', 'n.', '大雨'], ['weekday', 'n.', '平日'], ['get the afternoon off', 'phr.', '下午放假'], ['be in charge of', 'phr.', '負責', 'in charge of']],
    figure: { type: 'table', title: 'Five-Day Forecast (next week)', headers: ['Day', 'Weather'], rows: [['Monday', 'Rain'], ['Tuesday', 'Cloudy'], ['Wednesday', 'Sunny'], ['Thursday', 'Sunny'], ['Friday', 'Rain']] }
  }), [
    [95, 'Why is the event being rescheduled?', ['A venue is unavailable.', 'Bad weather is expected.', 'Some staff will be traveling.', 'The budget has been reduced.'], 'B',
      '活動為什麼要改期？', ['場地無法使用。', '預計天氣不好。', '有些員工要出差。', '預算被刪減。'], ['heavy rain is expected that day'], ['Why', 'rescheduled'], '週六預計下大雨。'],
    [96, 'Look at the graphic. On which day will the picnic most likely be held?', ['Monday', 'Tuesday', 'Thursday', 'Wednesday'], 'D',
      '看圖表：野餐最可能在哪天舉行？', ['週一', '週二', '週四', '週三'], ["I'd like to move the picnic to the first day of next week that's sunny"], ['graphic', 'picnic'], '圖表題：下週第一個晴天是週三（週二只是多雲）。'],
    [97, 'What does the speaker ask Pierre to do?', ['Change an order', 'Reserve a park', 'Send an invitation', 'Buy some drinks'], 'A',
      '說話者請 Pierre 做什麼？', ['更改訂單', '預訂公園場地', '寄邀請函', '買飲料'], ['change the date of our cake order'], ['Pierre'], '打給麵包店改蛋糕訂單日期＝change an order。']
  ]);

  set('L-98-100', Object.assign(T('am_adam', [
    "Welcome to the second day of our sales training workshop. Before we start, I need to make a change to the agenda you received this morning.",
    "Our guest speaker, Dr. Patel, has to leave early to catch a flight, so her talk on negotiation skills will switch places with the session just before lunch.",
    "One more thing. At the end of the day, please fill out the feedback survey that's on your table. We use your comments to improve future workshops, and everyone who completes it will receive a certificate of attendance."
  ]), {
    translation: '歡迎來到業務訓練工作坊的第二天。開始之前，我要更改大家今天早上拿到的議程。我們的客座講者 Patel 博士要提早離開去趕飛機，所以她的談判技巧演講要和午餐前那一場對調。還有一件事，今天結束時請填寫桌上的意見回饋問卷。我們會用大家的意見改進以後的工作坊，填完的人都會拿到出席證明。',
    vocab: [['agenda', 'n.', '議程'], ['guest speaker', 'n.', '客座講者'], ['negotiation skills', 'n.', '談判技巧'], ['switch places with', 'phr.', '和…對調'], ['feedback survey', 'n.', '意見回饋問卷'], ['certificate of attendance', 'n.', '出席證明']],
    figure: { type: 'table', title: 'Sales Training Workshop — Day 2 Agenda', headers: ['Time', 'Session'], rows: [['9:00', 'Understanding Customer Needs'], ['10:30', 'Effective Sales Presentations'], ['1:00', 'Lunch'], ['2:00', 'Negotiation Skills (Dr. Patel)'], ['3:30', 'Building Long-Term Relationships']] }
  }), [
    [98, 'Who most likely are the listeners?', ['Airline employees', 'Medical doctors', 'Sales staff', 'Event planners'], 'C',
      '聽眾最可能是誰？', ['航空公司員工', '醫師', '業務人員', '活動企劃'], ['Welcome to the second day of our sales training workshop.'], ['Who', 'listeners'], 'sales training workshop＝業務人員受訓。'],
    [99, 'Look at the graphic. What time will Dr. Patel now give her talk?', ['9:00', '10:30', '2:00', '3:30'], 'B',
      '看圖表：Patel 博士現在幾點演講？', ['9:00', '10:30', '2:00', '3:30'], ['her talk on negotiation skills will switch places with the session just before lunch'], ['graphic', 'Dr. Patel'], '圖表題：午餐（1:00）前一場是 10:30，她的演講改到 10:30。'],
    [100, 'What will listeners receive for completing a survey?', ['A discount', 'A free lunch', 'A book', 'A certificate'], 'D',
      '填完問卷的聽眾會拿到什麼？', ['折扣', '免費午餐', '一本書', '證書'], ['everyone who completes it will receive a certificate of attendance'], ['receive', 'survey'], 'certificate of attendance＝出席證明。']
  ]);
})();
