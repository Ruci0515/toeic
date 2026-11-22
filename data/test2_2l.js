/* Test 2 聽力 Part 3 簡短對話（Q32–70，13 段 × 3 題；兩段三人對話；最後三段搭配圖表） */
(function () {
  const set = (group, base, rows) => window.TOEIC_T2.set('L', 'Part 3', group, base, rows);
  const L = (speaker, text) => ({ speaker, text });

  set('L-32-34', {
    voices: { M: 'am_eric', W: 'af_sarah' },
    script: [
      L('M', "Hi, Natalie. Have you registered for the digital marketing conference in Chicago yet? The early-bird discount ends on Friday."),
      L('W', "Not yet. I wasn't sure our department would cover the registration fee this year."),
      L('M', "It will. I checked with our manager this morning, and she said there's enough left in the training budget for two people."),
      L('W', "Great. Then I'll sign up this afternoon. Could you send me the link to the registration page?")
    ],
    translation: '男：嗨 Natalie，你報名芝加哥的數位行銷研討會了嗎？早鳥優惠週五截止。\n女：還沒。我不確定部門今年會不會負擔報名費。\n男：會的。我今天早上問過經理，她說訓練預算還夠兩個人用。\n女：太好了，那我今天下午就報名。可以把報名網頁的連結寄給我嗎？',
    vocab: [['register for', 'phr.', '報名', 'registered for'], ['early-bird discount', 'n.', '早鳥優惠'], ['cover', 'v.', '負擔（費用）'], ['registration fee', 'n.', '報名費'], ['training budget', 'n.', '訓練預算'], ['sign up', 'phr.', '報名']]
  }, [
    [32, 'What event are the speakers discussing?', ['A product launch', 'A marketing conference', 'A job fair', 'A training workshop'], 'B',
      '說話者在討論什麼活動？', ['產品發表會', '行銷研討會', '就業博覽會', '訓練工作坊'], ['the digital marketing conference in Chicago'], ['event'], '男子一開口就問 digital marketing conference。training 是後面提到的預算名稱，不是活動。'],
    [33, 'What was the woman unsure about?', ['Whether a fee would be paid by her department', 'Whether a hotel room was available', 'When a deadline would be', 'Who would give a speech'], 'A',
      '女子原本不確定什麼？', ['部門會不會付費', '有沒有飯店房間', '截止日是哪天', '誰會演講'], ["I wasn't sure our department would cover the registration fee this year."], ['unsure'], 'cover the registration fee＝付報名費，換句話說成 a fee would be paid。'],
    [34, 'What does the woman ask the man to do?', ['Speak to a manager', 'Book a flight', 'Send her a link', 'Print a schedule'], 'C',
      '女子請男子做什麼？', ['跟經理談', '訂機票', '寄連結給她', '印行程表'], ['Could you send me the link to the registration page?'], ['ask the man'], '最後一句 Could you send me the link…。']
  ]);

  set('L-35-37', {
    voices: { W: 'bf_emma', M: 'bm_george' },
    script: [
      L('W', "Good morning. I'm calling about a dining table I ordered from your Web site. The order number is 4471. It was supposed to arrive yesterday, but nobody came."),
      L('M', "I'm sorry about that. Let me look it up. Ah, I see the problem. Our delivery truck had a mechanical problem yesterday, so several deliveries were postponed."),
      L('W', "I see. When can I expect it, then? I'm having guests over this weekend."),
      L('M', "We can bring it tomorrow between ten and twelve. And to apologize, we'll refund your delivery charge.")
    ],
    translation: '女：早安，我打來是關於我在你們網站訂的一張餐桌，訂單編號 4471。應該昨天送到，可是沒人來。\n男：很抱歉，我查一下。啊，我知道問題了。我們的貨車昨天出了機械故障，所以有好幾筆配送延後了。\n女：了解。那我什麼時候可以收到？我這個週末要請客。\n男：我們明天十點到十二點之間可以送到。另外為了表示歉意，我們會退還您的運費。',
    vocab: [['look up', 'phr.', '查詢', 'look it up'], ['mechanical problem', 'n.', '機械故障'], ['postpone', 'v.', '延後', 'postponed'], ['have guests over', 'phr.', '請客人來家裡', 'having guests over'], ['refund', 'v.', '退款'], ['delivery charge', 'n.', '運費']]
  }, [
    [35, 'Why is the woman calling?', ['To change a delivery address', 'To order some chairs', 'To ask about a discount', 'To report a missed delivery'], 'D',
      '女子為什麼打電話？', ['更改送貨地址', '訂購椅子', '詢問折扣', '反映沒送到貨'], ['It was supposed to arrive yesterday, but nobody came.'], ['Why', 'calling'], '應該昨天送到但沒人來＝錯過的配送。'],
    [36, 'What caused the problem?', ['A vehicle broke down.', 'An item was out of stock.', 'An address was incorrect.', 'A driver was sick.'], 'A',
      '問題是什麼造成的？', ['車子故障。', '商品缺貨。', '地址錯誤。', '司機生病。'], ['Our delivery truck had a mechanical problem yesterday'], ['caused'], 'delivery truck had a mechanical problem＝車子故障（vehicle broke down）。'],
    [37, 'What does the man offer to do?', ['Give a store credit', 'Upgrade the table', 'Return a delivery fee', 'Send an extra item'], 'C',
      '男子提議做什麼？', ['給購物金', '升級桌子', '退還運費', '多送一件商品'], ["we'll refund your delivery charge"], ['offer'], 'refund your delivery charge＝退還運費。']
  ]);

  set('L-38-40', {
    voices: { M: 'am_adam', W: 'af_heart' },
    script: [
      L('M', "Priya, I just looked at the floor plan for our new office. The design team will be sitting right next to the sales department."),
      L('W', "Really? The sales team is on the phone with clients all day."),
      L('M', "Exactly. I'm worried it'll be hard for the designers to concentrate. Do you think we could ask the architect to add a glass wall between the two areas?"),
      L('W', "It's worth asking. I'm meeting her on Thursday to go over the lighting, so I'll bring it up then.")
    ],
    translation: '男：Priya，我剛看了新辦公室的平面圖。設計組會坐在業務部的正隔壁。\n女：真的嗎？業務組整天都在跟客戶講電話耶。\n男：就是說啊。我擔心設計師會很難專心。你覺得我們可以請建築師在兩區之間加一道玻璃牆嗎？\n女：值得問問看。我週四要跟她討論照明，到時候會提出來。',
    vocab: [['floor plan', 'n.', '平面圖'], ['concentrate', 'v.', '專心'], ['architect', 'n.', '建築師'], ["it's worth asking", 'phr.', '值得問問看', "It's worth asking"], ['go over', 'phr.', '檢視；討論'], ['bring up', 'phr.', '提出（話題）', 'bring it up']]
  }, [
    [38, 'What are the speakers mainly discussing?', ['A hiring decision', 'A sales report', 'An office layout', 'A client complaint'], 'C',
      '說話者主要在討論什麼？', ['招聘決定', '業務報告', '辦公室配置', '客戶抱怨'], ['I just looked at the floor plan for our new office.'], ['mainly discussing'], 'floor plan for our new office＝辦公室配置。'],
    [39, 'Why does the woman say, "The sales team is on the phone with clients all day"?', ['To explain why sales have increased', 'To suggest that an area will be noisy', 'To ask for more telephones', 'To praise her colleagues'], 'B',
      '女子為什麼說「業務組整天都在跟客戶講電話」？', ['解釋業績為什麼成長', '暗示那一區會很吵', '要求更多電話', '稱讚同事'], ["I'm worried it'll be hard for the designers to concentrate."], ['Why', 'sales team'], '意圖題：接下來男子說設計師會很難專心，可知她是在暗示業務區很吵。'],
    [40, 'What will the woman do on Thursday?', ['Meet with an architect', 'Install some lights', 'Visit a client', 'Move to a new desk'], 'A',
      '女子週四會做什麼？', ['跟建築師開會', '安裝燈具', '拜訪客戶', '搬到新座位'], ["I'm meeting her on Thursday to go over the lighting"], ['Thursday'], 'her 指 the architect；她週四要跟建築師開會。lighting 是討論內容，不是她要安裝。']
  ]);

  set('L-41-43', {
    voices: { W: 'af_nicole', M: 'am_michael', M2: 'bm_lewis' },
    script: [
      L('W', "Thanks for meeting with me, Daniel and Ahmed. As you know, our current supplier of packaging materials is raising its prices by fifteen percent next quarter."),
      L('M', "That's a big increase. Ahmed, didn't you get a quote from another company last week?"),
      L('M2', "Yes, from GreenWrap. Their prices are about the same as what we pay now, and all of their boxes are made from recycled paper."),
      L('W', "That would help us meet our environmental goals, too. But can they handle orders as large as ours?"),
      L('M2', "I'm not sure. I'll call their sales manager this afternoon and ask about their production capacity.")
    ],
    translation: '女：謝謝 Daniel 和 Ahmed 來開會。如你們所知，我們現在的包材供應商下一季要漲價百分之十五。\n男：漲很多耶。Ahmed，你上週不是拿到另一家公司的報價嗎？\n男2：對，是 GreenWrap。他們的價格跟我們現在付的差不多，而且所有箱子都是再生紙做的。\n女：那也能幫我們達成環保目標。可是他們接得了像我們這麼大的訂單嗎？\n男2：我不確定。我今天下午會打給他們的業務經理，問問他們的產能。',
    vocab: [['packaging materials', 'n.', '包裝材料'], ['quarter', 'n.', '季'], ['quote', 'n.', '報價'], ['recycled paper', 'n.', '再生紙'], ['environmental goal', 'n.', '環保目標', 'environmental goals'], ['production capacity', 'n.', '產能']]
  }, [
    [41, 'What problem does the woman mention?', ['A shipment was damaged.', 'A supplier will charge more.', 'A product has been discontinued.', 'A contract has expired.'], 'B',
      '女子提到什麼問題？', ['一批貨受損。', '供應商要漲價。', '某產品停產了。', '合約到期了。'], ['our current supplier of packaging materials is raising its prices by fifteen percent next quarter'], ['problem', 'woman'], 'raising its prices＝charge more。'],
    [42, 'What does Ahmed say about GreenWrap?', ['It uses recycled materials.', 'It is located nearby.', 'It offers free delivery.', 'It has a new sales manager.'], 'A',
      'Ahmed 說了 GreenWrap 什麼？', ['使用再生材料。', '位置在附近。', '提供免運。', '有新的業務經理。'], ['all of their boxes are made from recycled paper'], ['Ahmed', 'GreenWrap'], 'made from recycled paper＝uses recycled materials。'],
    [43, 'What will Ahmed most likely ask about?', ['Delivery schedules', 'Payment terms', 'Box sizes', 'Production capacity'], 'D',
      'Ahmed 最可能會詢問什麼？', ['配送時程', '付款條件', '箱子尺寸', '產能'], ['ask about their production capacity'], ['Ahmed', 'ask about'], '最後一句 ask about their production capacity。']
  ]);

  set('L-44-46', {
    voices: { W: 'bf_isabella', M: 'am_eric' },
    script: [
      L('W', "Hello, Mr. Park. This is Rachel Owens from Lindale Engineering. We received your application for the project coordinator position, and we'd like to invite you for an interview."),
      L('M', "Thank you. I'd be glad to come in. When would be convenient?"),
      L('W', "We're holding interviews next Tuesday and Wednesday. Do you have a preference?"),
      L('M', "Wednesday would be better. I have a training course all day on Tuesday."),
      L('W', "All right. How about Wednesday at ten? Please bring a list of three professional references with you.")
    ],
    translation: '女：您好，Park 先生，我是 Lindale 工程公司的 Rachel Owens。我們收到您應徵專案協調員的申請，想邀請您來面試。\n男：謝謝，我很樂意。什麼時間方便呢？\n女：我們下週二、週三有安排面試，您有偏好嗎？\n男：週三比較好，週二我整天都有訓練課程。\n女：好的，那週三十點如何？請帶一份三位工作推薦人的名單。',
    vocab: [['application', 'n.', '申請'], ['project coordinator', 'n.', '專案協調員'], ['convenient', 'adj.', '方便的'], ['preference', 'n.', '偏好'], ['reference', 'n.', '推薦人', 'references']]
  }, [
    [44, 'Why is the woman calling?', ['To confirm a delivery', 'To schedule a job interview', 'To offer a promotion', 'To cancel a meeting'], 'B',
      '女子為什麼打電話？', ['確認送貨', '安排面試', '提供升遷', '取消會議'], ["we'd like to invite you for an interview"], ['Why', 'calling'], '邀請對方來面試。'],
    [45, 'Why is the man unavailable on Tuesday?', ['He will be attending a course.', 'He will be on a business trip.', 'He has a doctor\'s appointment.', 'He is moving to a new home.'], 'A',
      '男子週二為什麼沒空？', ['他要上課。', '他要出差。', '他要看醫生。', '他要搬家。'], ['I have a training course all day on Tuesday.'], ['Why', 'Tuesday'], 'training course all day＝要上課。'],
    [46, 'What is the man asked to bring?', ['A portfolio of his work', 'A copy of his degree', 'A photo ID', 'A list of references'], 'D',
      '男子被要求帶什麼？', ['作品集', '學位證書影本', '附照片的證件', '推薦人名單'], ['Please bring a list of three professional references with you.'], ['asked to bring'], 'a list of three professional references＝推薦人名單。']
  ]);

  set('L-47-49', {
    voices: { M: 'bm_george', W: 'af_bella' },
    script: [
      L('M', "Hi, I'm organizing a retirement party for a colleague next month, and I'm interested in your catering service. We're expecting about sixty guests."),
      L('W', "Congratulations to your colleague. We can certainly handle a group that size. Would you like a buffet or a served meal?"),
      L('M', "A buffet, I think. People will want to move around and chat. Do you also provide tables and chairs?"),
      L('W', "We don't, but we work with a rental company that does. I'll e-mail you our buffet menu along with their contact information.")
    ],
    translation: '男：嗨，我下個月要幫一位同事辦退休派對，對你們的外燴服務有興趣。我們預計大約六十位客人。\n女：恭喜您的同事。這個人數我們絕對沒問題。您想要自助餐還是桌邊上菜？\n男：我想是自助餐，大家會想走動聊天。你們也提供桌椅嗎？\n女：我們沒有，但我們有合作的租賃公司。我會把自助餐菜單和他們的聯絡方式一起 email 給您。',
    vocab: [['retirement party', 'n.', '退休派對'], ['catering service', 'n.', '外燴服務'], ['buffet', 'n.', '自助餐'], ['served meal', 'n.', '桌邊上菜的餐點'], ['rental company', 'n.', '租賃公司'], ['contact information', 'n.', '聯絡資訊']]
  }, [
    [47, 'What type of event is the man planning?', ['A product launch', 'A retirement party', 'A wedding reception', 'A company picnic'], 'B',
      '男子在籌辦什麼活動？', ['產品發表會', '退休派對', '婚宴', '公司野餐'], ["I'm organizing a retirement party for a colleague next month"], ['event'], 'retirement party for a colleague。'],
    [48, 'Why does the man prefer a buffet?', ['It is less expensive.', 'It offers more choices.', 'Guests can move around freely.', 'It requires fewer staff.'], 'C',
      '男子為什麼偏好自助餐？', ['比較便宜。', '選擇比較多。', '客人可以自由走動。', '需要的人手比較少。'], ['People will want to move around and chat.'], ['Why', 'buffet'], '大家會想走動聊天＝客人可以自由走動。'],
    [49, 'What will the woman send to the man?', ['A price estimate', 'A contract', 'A floor plan', 'A menu and contact details'], 'D',
      '女子會寄什麼給男子？', ['估價單', '合約', '平面圖', '菜單和聯絡資訊'], ["I'll e-mail you our buffet menu along with their contact information."], ['send'], 'buffet menu＋contact information。']
  ]);

  set('L-50-52', {
    voices: { W: 'af_heart', M: 'am_michael' },
    script: [
      L('W', "Tom, the quarterly sales figures are due to the regional director by five o'clock today, and I still don't have the numbers from the Westside store."),
      L('M', "Their manager, Lisa, is at a training session in Atlanta all week. You might try her assistant."),
      L('W', "I've left him two messages already."),
      L('M', "Hmm. In that case, I can access the store's sales system from here. Give me twenty minutes and I'll pull the figures for you.")
    ],
    translation: '女：Tom，季銷售數字今天五點前要交給區域總監，可是我還沒拿到 Westside 分店的數字。\n男：他們的店長 Lisa 整週都在亞特蘭大受訓。你可以試試找她的助理。\n女：我已經留了兩通訊息給他了。\n男：嗯，那這樣的話，我可以從這裡登入那家店的銷售系統。給我二十分鐘，我幫你把數字調出來。',
    vocab: [['quarterly', 'adj.', '每季的'], ['sales figures', 'n.', '銷售數字'], ['be due', 'phr.', '到期；應交', 'are due'], ['regional director', 'n.', '區域總監'], ['access', 'v.', '登入；存取'], ['pull the figures', 'phr.', '調出數據']]
  }, [
    [50, 'What does the woman need?', ['A meeting room', 'Some sales data', 'A training schedule', 'Directions to a store'], 'B',
      '女子需要什麼？', ['會議室', '銷售數據', '訓練時程', '到分店的路線'], ["I still don't have the numbers from the Westside store"], ['need'], '她缺 Westside 分店的銷售數字。'],
    [51, 'What does the woman imply when she says, "I\'ve left him two messages already"?', ['The assistant has not responded.', 'She will call again later.', 'She has already finished the task.', 'Her phone is not working.'], 'A',
      '女子說「我已經留了兩通訊息給他了」暗示什麼？', ['助理沒有回覆。', '她晚點會再打。', '她已經完成工作了。', '她的電話壞了。'], ["I've left him two messages already."], ['imply'], '意圖題：留了兩次言還要提＝對方一直沒回，所以男子才接著說 In that case 提出別的辦法。'],
    [52, 'What does the man offer to do?', ['Contact the regional director', 'Travel to Atlanta', 'Retrieve information himself', 'Extend a deadline'], 'C',
      '男子提議做什麼？', ['聯絡區域總監', '去亞特蘭大', '自己去調資料', '延後截止期限'], ["I'll pull the figures for you"], ['offer'], '他要自己登入系統把數字調出來（retrieve information himself）。']
  ]);

  set('L-53-55', {
    voices: { M: 'bm_lewis', W: 'bf_emma' },
    script: [
      L('M', "Welcome to Speedway Car Rental. How can I help you?"),
      L('W', "Hi, I reserved a compact car for three days. My name's Helen Ford."),
      L('M', "Yes, Ms. Ford, I have your reservation here. Unfortunately, all of our compact cars are out at the moment. But I can give you a midsize car for the same price."),
      L('W', "That's fine. Actually, I'll be driving in the mountains, so a bigger car might be better anyway."),
      L('M', "Good. Just remember to return it with a full tank. Otherwise, there's a refueling charge of thirty dollars.")
    ],
    translation: '男：歡迎光臨 Speedway 租車，有什麼需要服務的？\n女：嗨，我預約了一輛小型車，租三天。我叫 Helen Ford。\n男：是的，Ford 女士，我這裡有您的預約。很遺憾，我們的小型車目前都租出去了，但我可以用同樣的價錢給您一輛中型車。\n女：可以。其實我要開山路，大一點的車可能反而更好。\n男：好的。只是記得還車時要加滿油，否則會收三十美元的加油費。',
    vocab: [['compact car', 'n.', '小型車'], ['reservation', 'n.', '預約'], ['midsize', 'adj.', '中型的'], ['full tank', 'n.', '滿油箱'], ['refueling charge', 'n.', '加油費']]
  }, [
    [53, 'Where most likely are the speakers?', ['At a gas station', 'At a car rental agency', 'At an auto repair shop', 'At a hotel'], 'B',
      '說話者最可能在哪裡？', ['加油站', '租車公司', '汽車修理廠', '飯店'], ['Welcome to Speedway Car Rental.'], ['Where'], '第一句就說 Speedway Car Rental。'],
    [54, 'What problem does the man mention?', ['A reservation cannot be found.', 'A payment was declined.', 'The requested vehicle type is unavailable.', 'A car needs to be repaired.'], 'C',
      '男子提到什麼問題？', ['找不到預約。', '付款被拒。', '預約的車型沒有了。', '一輛車需要修理。'], ['all of our compact cars are out at the moment'], ['problem'], 'compact cars are out＝預約的車型沒有車。(A) 錯，他說 I have your reservation here。'],
    [55, 'What does the man remind the woman to do?', ['Drive carefully in the mountains', 'Show her driver\'s license', 'Buy extra insurance', 'Fill the gas tank before returning the car'], 'D',
      '男子提醒女子做什麼？', ['山路小心開', '出示駕照', '加買保險', '還車前加滿油'], ['remember to return it with a full tank'], ['remind'], 'return it with a full tank＝還車前加滿油。']
  ]);

  set('L-56-58', {
    voices: { W: 'af_sarah', M: 'am_adam', W2: 'bf_isabella' },
    script: [
      L('W', "Michael, Grace, the author Ellen Brooks has agreed to hold a book-signing event at our store on May 12."),
      L('M', "That's great news! Her last novel was our best-selling book of the year."),
      L('W2', "We should expect a big crowd, then. Michael, could you order an extra two hundred copies of her new book so we don't run out?"),
      L('M', "Sure. I'll place the order today. Grace, what about space? The reading area only seats about forty."),
      L('W2', "Good point. Let's move some of the bookshelves near the entrance to make more room.")
    ],
    translation: '女：Michael、Grace，作家 Ellen Brooks 答應 5 月 12 日來我們店裡辦簽書會。\n男：好消息！她上一本小說是我們今年最暢銷的書。\n女2：那我們要準備迎接大批人潮了。Michael，你可以多訂兩百本她的新書嗎？免得賣光。\n男：好，我今天就下單。Grace，那場地呢？閱讀區只坐得下大約四十人。\n女2：說得好。我們把入口附近的書架移開一些，空出更多位置吧。',
    vocab: [['book-signing event', 'n.', '簽書會'], ['best-selling', 'adj.', '最暢銷的'], ['crowd', 'n.', '人群'], ['run out', 'phr.', '用完；賣光'], ['place an order', 'phr.', '下訂單', 'place the order'], ['make room', 'phr.', '騰出空間', 'make more room']]
  }, [
    [56, 'What will happen on May 12?', ['A store will open.', 'A book will be published.', 'An author will sign books.', 'A writing contest will be held.'], 'C',
      '5 月 12 日會發生什麼事？', ['一家店要開幕。', '一本書要出版。', '一位作家要簽書。', '要舉辦寫作比賽。'], ['has agreed to hold a book-signing event at our store on May 12'], ['May 12'], 'book-signing event＝作家簽書。'],
    [57, 'What is Michael asked to do?', ['Order more books', 'Contact the author', 'Design a poster', 'Set up chairs'], 'A',
      'Michael 被要求做什麼？', ['多訂書', '聯絡作家', '設計海報', '擺椅子'], ['could you order an extra two hundred copies of her new book'], ['Michael'], 'Grace 請 Michael 多訂兩百本。'],
    [58, 'What does Grace suggest?', ['Selling tickets in advance', 'Holding the event outdoors', 'Limiting the number of guests', 'Rearranging some furniture'], 'D',
      'Grace 建議什麼？', ['預先賣票', '在戶外辦活動', '限制人數', '重新擺放一些家具'], ["Let's move some of the bookshelves near the entrance to make more room."], ['Grace', 'suggest'], '移動書架＝rearranging some furniture（換句話說）。']
  ]);

  set('L-59-61', {
    voices: { M: 'am_michael', W: 'af_nicole' },
    script: [
      L('M', "Hi, I'm thinking about joining this gym. Could you tell me about your membership options?"),
      L('W', "Sure. We have a monthly plan for fifty dollars, or an annual plan for four hundred and eighty. The annual plan also includes two free sessions with a personal trainer."),
      L('M', "The annual plan sounds like a better deal. Is the swimming pool open in the early morning? I'd like to swim before work."),
      L('W', "It opens at six. If you'd like, I can show you around the facility before you decide.")
    ],
    translation: '男：嗨，我在考慮加入這家健身房。可以介紹一下你們的會員方案嗎？\n女：當然。月繳方案五十美元，年繳方案四百八十美元。年繳方案還包含兩堂免費的私人教練課。\n男：年繳方案聽起來比較划算。游泳池一大早有開嗎？我想上班前游泳。\n女：六點開。如果您想的話，決定之前我可以帶您參觀一下設施。',
    vocab: [['membership', 'n.', '會員資格'], ['annual plan', 'n.', '年繳方案'], ['personal trainer', 'n.', '私人教練'], ['a better deal', 'phr.', '比較划算'], ['show around', 'phr.', '帶…參觀', 'show you around'], ['facility', 'n.', '設施']]
  }, [
    [59, 'Where does the conversation most likely take place?', ['At a fitness center', 'At a hotel', 'At a swimming school', 'At a sporting goods store'], 'A',
      '這段對話最可能在哪裡發生？', ['健身中心', '飯店', '游泳學校', '體育用品店'], ["I'm thinking about joining this gym."], ['Where'], 'gym＝fitness center。'],
    [60, 'What is included in the annual plan?', ['A free parking space', 'Training sessions', 'A locker', 'Swimming lessons'], 'B',
      '年繳方案包含什麼？', ['免費車位', '教練課程', '置物櫃', '游泳課'], ['The annual plan also includes two free sessions with a personal trainer.'], ['included', 'annual plan'], 'two free sessions with a personal trainer＝教練課程。'],
    [61, 'What does the woman offer to do?', ['Lower a price', 'Sign the man up', 'Give a tour', 'Call a trainer'], 'C',
      '女子提議做什麼？', ['降價', '幫男子報名', '帶他參觀', '打給教練'], ['I can show you around the facility'], ['offer'], 'show you around＝帶參觀（give a tour）。']
  ]);

  set('L-62-64', {
    voices: { W: 'bf_emma', M: 'am_eric' },
    figure: { type: 'table', title: 'Health Care Innovation Forum — Afternoon Sessions', headers: ['Time', 'Session', 'Room'], rows: [['1:00', 'Digital Patient Records', 'Room A'], ['2:00', 'Hospital Supply Chains', 'Room B'], ['3:00', 'Telemedicine Today', 'Room C'], ['4:00', 'Nursing Staff Training', 'Room D']] },
    script: [
      L('W', "Hi, Kenji. Are you going to any of the afternoon sessions? I was planning to attend the one on telemedicine."),
      L('M', "I wanted to see that one too, but the program has changed. The speaker's flight was delayed, so that session was switched with the four o'clock one."),
      L('W', "Oh, that's a problem. I have to leave at three thirty to catch my train."),
      L('M', "Well, they're recording all the sessions. You can watch it online next week. The link will be sent to everyone who registered.")
    ],
    translation: '女：嗨 Kenji，你下午要去聽哪一場嗎？我本來打算去聽遠距醫療那場。\n男：我也想聽那場，但議程改了。講者的班機延誤，所以那場跟四點那場對調了。\n女：喔，那就麻煩了。我三點半就得離開去趕火車。\n男：嗯，所有場次都有錄影，你下週可以上網看。連結會寄給每位報名的人。',
    vocab: [['session', 'n.', '（會議的）場次'], ['telemedicine', 'n.', '遠距醫療'], ['switch', 'v.', '對調', 'switched'], ['catch a train', 'phr.', '趕火車', 'catch my train'], ['record', 'v.', '錄影', 'recording']]
  }, [
    [62, 'Why was the schedule changed?', ['A room was being repaired.', 'A speaker was delayed.', 'A session was canceled.', 'Too many people registered.'], 'B',
      '議程為什麼改變？', ['一間會議室在維修。', '一位講者延誤。', '一場被取消了。', '報名人數太多。'], ["The speaker's flight was delayed"], ['Why', 'schedule'], '講者班機延誤。'],
    [63, 'Look at the graphic. In which room will the telemedicine session now be held?', ['Room A', 'Room B', 'Room C', 'Room D'], 'D',
      '看圖表：遠距醫療那場現在會在哪間會議室？', ['A 室', 'B 室', 'C 室', 'D 室'], ["that session was switched with the four o'clock one"], ['graphic', 'telemedicine'], '圖表題：遠距醫療原本 3:00 在 C 室，現在和四點那場對調，等於搬到表上 4:00 那一列的 D 室。只看原本的表會誤選 (C)。'],
    [64, 'According to the man, how can the woman see the session?', ['By attending the next day', 'By asking the speaker for notes', 'By watching a recording online', 'By changing her train ticket'], 'C',
      '根據男子的說法，女子要怎麼看到那場？', ['隔天再來', '跟講者要筆記', '上網看錄影', '改火車票'], ['You can watch it online next week.'], ['According to the man', 'session'], "they're recording all the sessions. You can watch it online。"]
  ]);

  set('L-65-67', {
    voices: { M: 'bm_george', W: 'af_heart' },
    figure: { type: 'table', title: 'Fresh Market — Weekly Coupons', headers: ['Item', 'Discount'], rows: [['Coffee beans', '20% off'], ['Orange juice', 'Buy one, get one free'], ['Whole-wheat bread', '$1 off'], ['Greek yogurt', '30% off']] },
    script: [
      L('M', "Excuse me. I printed this coupon from your Web site, but the cashier says it doesn't work for the coffee I picked."),
      L('W', "Let me see. Ah, this coupon is only valid for our store brand, Fresh Market Coffee. The one you have is a different brand."),
      L('M', "I didn't realize that. Where can I find your store brand?"),
      L('W', "It's in aisle seven, on the bottom shelf. If you'd like, I can ask a staff member to bring a bag here so you don't have to go back.")
    ],
    translation: '男：不好意思，我從你們網站印了這張折價券，可是收銀員說我挑的咖啡不能用。\n女：我看一下。啊，這張折價券只適用我們的自有品牌 Fresh Market 咖啡，您拿的是別的牌子。\n男：我沒注意到。你們的自有品牌在哪裡？\n女：在第七走道，最下層的架子。如果您願意，我可以請店員拿一包過來，您就不用再走回去。',
    vocab: [['coupon', 'n.', '折價券'], ['cashier', 'n.', '收銀員'], ['valid', 'adj.', '有效的'], ['store brand', 'n.', '（商店）自有品牌'], ['aisle', 'n.', '走道'], ['staff member', 'n.', '店員']]
  }, [
    [65, 'Look at the graphic. What discount does the man want to use?', ['20% off', 'Buy one, get one free', '$1 off', '30% off'], 'A',
      '看圖表：男子想用哪種折扣？', ['八折', '買一送一', '折一美元', '七折'], ["it doesn't work for the coffee I picked"], ['graphic', 'discount'], '圖表題：他買的是咖啡，表上咖啡豆是 20% off。'],
    [66, 'What is the problem with the coupon?', ['It has expired.', 'It is for a different store.', 'It only applies to a certain brand.', 'It was printed incorrectly.'], 'C',
      '折價券有什麼問題？', ['已經過期。', '是別家店的。', '只適用特定品牌。', '印錯了。'], ['this coupon is only valid for our store brand'], ['problem', 'coupon'], 'only valid for our store brand＝只適用特定品牌。'],
    [67, 'What does the woman offer to do?', ['Give the man a refund', 'Have an item brought to the man', 'Print a new coupon', 'Call the manager'], 'B',
      '女子提議做什麼？', ['退錢給男子', '請人把商品拿來給男子', '印一張新的折價券', '叫經理來'], ['I can ask a staff member to bring a bag here'], ['offer'], '請店員拿一包過來＝have an item brought（使役＋p.p.）。']
  ]);

  set('L-68-70', {
    voices: { W: 'af_bella', M: 'am_adam' },
    figure: { type: 'table', title: 'Riverside Office Park — Parking', headers: ['Lot', 'Location', 'Monthly Fee'], rows: [['Lot 1', 'Next to Building A', '$90'], ['Lot 2', 'Behind Building B', '$75'], ['Lot 3', 'Across Elm Street', '$50'], ['Lot 4', 'Underground, Building C', '$120']] },
    script: [
      L('W', "Hi, I just started working in Building B, and I'd like to rent a monthly parking space."),
      L('M', "Welcome. Unfortunately, the lot behind your building is full right now. There's a waiting list, but it usually takes a few months."),
      L('W', "I see. I'd rather not pay for the underground lot. What's the next cheapest option?"),
      L('M', "The lot across Elm Street. It's only a five-minute walk. Just fill out this form, and I'll need a copy of your vehicle registration as well.")
    ],
    translation: '女：嗨，我剛開始在 B 棟上班，想租一個月租車位。\n男：歡迎。很遺憾，你們大樓後面的停車場目前滿了。可以排候補，但通常要等好幾個月。\n女：了解。我不太想付地下停車場的錢。下一個最便宜的選擇是哪裡？\n男：Elm 街對面的停車場，走路只要五分鐘。請填這張表，另外我也需要一份您的行車執照影本。',
    vocab: [['monthly', 'adj.', '每月的'], ['parking space', 'n.', '停車位'], ['waiting list', 'n.', '候補名單'], ["I'd rather not", 'phr.', '我寧可不…'], ['fill out', 'phr.', '填寫'], ['vehicle registration', 'n.', '行車執照']]
  }, [
    [68, 'What does the woman want to do?', ['Change her office', 'Rent a parking space', 'Report a damaged car', 'Get a building pass'], 'B',
      '女子想做什麼？', ['換辦公室', '租停車位', '報告車子受損', '辦大樓通行證'], ["I'd like to rent a monthly parking space"], ['want'], '她要租月租車位。'],
    [69, 'Look at the graphic. How much will the woman most likely pay each month?', ['$90', '$75', '$120', '$50'], 'D',
      '看圖表：女子每月最可能付多少錢？', ['90 美元', '75 美元', '120 美元', '50 美元'], ['The lot across Elm Street.'], ['graphic', 'pay'], '圖表題：男子推薦 Elm 街對面的停車場＝Lot 3，月費 50 美元。Lot 2 雖然最近但已經滿了。'],
    [70, 'What does the man ask the woman to provide?', ['A copy of a document', 'A security deposit', 'An employee ID card', 'A phone number'], 'A',
      '男子要求女子提供什麼？', ['一份文件影本', '押金', '員工證', '電話號碼'], ["I'll need a copy of your vehicle registration as well"], ['provide'], 'a copy of your vehicle registration＝一份文件影本。']
  ]);
})();
