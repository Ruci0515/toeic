/* Test 2 閱讀 Part 7 單篇閱讀（Q147–175，10 篇） */
(function () {
  const set = (group, base, rows) => window.TOEIC_T2.set('R', 'Part 7', group, base, rows);
  const P = (title, subtitle, paras) => ({ title, subtitle, blocks: paras.map((t) => (typeof t === 'string' ? { type: 'p', text: t } : t)) });
  const INS = 'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?';

  set('R-147-148', {
    passage: P('Crestview Dry Cleaners', '', [
      'Spring Cleaning Special!',
      'Bring in any three items for dry cleaning and get a fourth item cleaned free. Coats, suits, dresses, and curtains are all included. Leather and fur items are not eligible.',
      'Offer valid April 1 through April 30. Present this coupon when dropping off your items. Limit one coupon per customer.',
      'Open Monday to Saturday, 7 A.M. to 7 P.M. · 82 Lake Avenue'
    ]),
    translation: 'Crestview 乾洗店｜春季大掃除特惠！\n送洗任三件衣物，第四件免費。外套、西裝、洋裝、窗簾都適用。皮革和毛皮製品不適用。\n優惠期間 4 月 1 日至 4 月 30 日。送件時請出示本優惠券。每位顧客限用一張。\n營業時間週一至週六，上午 7 點至晚上 7 點・Lake 大道 82 號',
    vocab: [['dry cleaning', 'n.', '乾洗'], ['curtain', 'n.', '窗簾', 'curtains'], ['eligible', 'adj.', '符合資格的'], ['valid', 'adj.', '有效的'], ['drop off', 'phr.', '送交；放下', 'dropping off'], ['limit', 'n.', '限制']]
  }, [
    [147, 'What is being offered?', ['A discount on leather items', 'Free home delivery', 'One item cleaned at no cost', 'A membership card'], 'C',
      '這張優惠券提供什麼？', ['皮革製品折扣', '免費送到府', '免費清洗一件', '會員卡'], ['get a fourth item cleaned free'], ['offered'], '送洗三件，第四件免費。皮革不適用，(A) 錯。'],
    [148, 'What must customers do to use the offer?', ['Show a coupon', 'Pay in advance', 'Visit on a weekday', 'Bring in four coats'], 'A',
      '顧客要怎麼使用這個優惠？', ['出示優惠券', '預先付款', '平日來', '帶四件外套'], ['Present this coupon when dropping off your items.'], ['offer'], 'Present this coupon＝出示優惠券。四件可以是任何衣物，不一定是外套。']
  ]);

  set('R-149-150', {
    passage: P('Text-message chain', '', [
      'Olivia Reed (1:12 P.M.): Hi, Sam. The client from Hanover Foods just called. They want to move tomorrow\'s meeting from 3:00 to 10:00 A.M.',
      'Sam Patel (1:15 P.M.): Hmm. I\'m driving back from the Brookfield factory tomorrow morning. I won\'t be in the office until noon.',
      'Olivia Reed (1:16 P.M.): Could you join by video call from the car?',
      'Sam Patel (1:18 P.M.): Not while I\'m driving. But I could stop at a café on the way.',
      'Olivia Reed (1:19 P.M.): That works. I\'ll send you the link tonight.'
    ]),
    translation: 'Olivia Reed（下午 1:12）：嗨 Sam，Hanover 食品的客戶剛打來，他們想把明天的會議從三點改到上午十點。\nSam Patel（1:15）：嗯，我明天早上要從 Brookfield 工廠開車回來，中午才會進辦公室。\nOlivia（1:16）：你可以在車上用視訊參加嗎？\nSam（1:18）：開車時不行。不過我可以在路上找間咖啡店停下來。\nOlivia（1:19）：可以。我今晚把連結寄給你。',
    vocab: [['client', 'n.', '客戶'], ['factory', 'n.', '工廠'], ['video call', 'n.', '視訊通話'], ['on the way', 'phr.', '在途中'], ['That works.', 'phr.', '那樣可以。']]
  }, [
    [149, 'Why did Ms. Reed contact Mr. Patel?', ['To ask for a ride', 'To cancel a factory visit', 'To recommend a café', 'To report a schedule change'], 'D',
      'Reed 女士為什麼聯絡 Patel 先生？', ['請他載她', '取消參訪工廠', '推薦咖啡店', '告知行程變動'], ["They want to move tomorrow's meeting from 3:00 to 10:00 A.M."], ['Why', 'Ms. Reed'], '客戶要把會議改時間，她來告知。'],
    [150, 'At 1:19 P.M., what does Ms. Reed most likely mean when she writes, "That works"?', ['A video link is not working.', 'She agrees with Mr. Patel\'s suggestion.', 'She will work late tonight.', 'The client approved a contract.'], 'B',
      '1:19 時 Reed 女士寫「That works」最可能是什麼意思？', ['視訊連結無法使用。', '她同意 Patel 先生的提議。', '她今晚會加班。', '客戶核准了合約。'], ['But I could stop at a café on the way.'], ['1:19', 'That works'], '意圖題：That works＝那樣可以，回應他「在路上找咖啡店停下來開會」的提議。work 不是「工作」。']
  ]);

  set('R-151-152', {
    passage: P('INVOICE — Bright Path Office Supplies', 'Invoice #20915 · Date: October 3 · Customer: Kendall Architects', [
      { type: 'list', items: ['Printer paper, 10 boxes — $250.00', 'Black ink cartridges, 6 — $180.00', 'Desk organizers, 4 — $60.00', 'Delivery — $0.00 (orders over $200)', 'Total — $490.00'] },
      'Payment is due within 30 days of the invoice date. A 2 percent late fee will be added to unpaid balances after that time. Questions about this invoice? Contact our billing department at billing@brightpath.com.'
    ]),
    translation: '發票｜Bright Path 辦公用品｜發票號碼 20915｜10 月 3 日｜客戶：Kendall 建築師事務所\n・影印紙 10 箱——250 美元\n・黑色墨水匣 6 個——180 美元\n・桌上收納盒 4 個——60 美元\n・運費——0 美元（訂單滿 200 美元）\n・總計——490 美元\n請於發票日起 30 天內付款，逾期未付餘額將加收 2% 滯納金。對本發票有疑問，請聯絡帳務部 billing@brightpath.com。',
    vocab: [['invoice', 'n.', '發票；請款單'], ['ink cartridge', 'n.', '墨水匣', 'ink cartridges'], ['organizer', 'n.', '收納盒', 'organizers'], ['due', 'adj.', '到期的'], ['late fee', 'n.', '滯納金'], ['unpaid balance', 'n.', '未付餘額', 'unpaid balances'], ['billing department', 'n.', '帳務部']]
  }, [
    [151, 'Why was Kendall Architects not charged for delivery?', ['The order was over a certain amount.', 'It is a new customer.', 'It picked up the items itself.', 'It used a coupon.'], 'A',
      'Kendall 建築師事務所為什麼不用付運費？', ['訂單超過一定金額。', '它是新客戶。', '它自己來取貨。', '它用了優惠券。'], ['Delivery — $0.00 (orders over $200)'], ['Why', 'delivery'], '運費 0 元，因為訂單滿 200 美元。'],
    [152, 'What will happen if the invoice is not paid within 30 days?', ['The order will be canceled.', 'The billing department will call.', 'An additional charge will be applied.', 'Future deliveries will be stopped.'], 'C',
      '如果 30 天內沒付款會怎樣？', ['訂單會被取消。', '帳務部會打電話來。', '會加收費用。', '之後的送貨會停止。'], ['A 2 percent late fee will be added to unpaid balances after that time.'], ['30 days'], 'late fee will be added＝會加收費用。']
  ]);

  set('R-153-154', {
    passage: P('Now Hiring: Part-Time Library Assistant', 'Millbrook Public Library', [
      'Millbrook Public Library is looking for a friendly, organized person to work at our front desk. Duties include checking books in and out, helping visitors use our computers, and returning books to the shelves.',
      'The position is 15 hours per week, including some Saturday mornings. No library experience is necessary, but applicants must be comfortable working with the public. Training will be provided.',
      'To apply, complete the application form available at the front desk or on our Web site by March 15.'
    ]),
    translation: '徵才：兼職圖書館助理｜Millbrook 公共圖書館\nMillbrook 公共圖書館正在找一位友善、有條理的人在櫃台工作。工作內容包括辦理借還書、協助訪客使用電腦，以及把書歸回書架。這個職位每週 15 小時，包括部分週六上午。不需要圖書館經驗，但應徵者必須能自在地與民眾互動。我們會提供訓練。應徵方式：請在 3 月 15 日前填寫櫃台或網站上的申請表。',
    vocab: [['organized', 'adj.', '有條理的'], ['duty', 'n.', '職責', 'Duties'], ['check in/out', 'phr.', '辦理歸還／借出', 'checking books in and out'], ['be comfortable with', 'phr.', '能自在面對', 'comfortable working with'], ['the public', 'n.', '大眾'], ['application form', 'n.', '申請表']]
  }, [
    [153, 'What is NOT mentioned as a duty of the position?', ['Helping visitors with computers', 'Ordering new books', 'Putting books back on shelves', 'Checking books out'], 'B',
      '下列何者「不是」這個職位的工作內容？', ['協助訪客用電腦', '訂購新書', '把書放回書架', '辦理借書'], ['Duties include checking books in and out, helping visitors use our computers, and returning books to the shelves.'], ['NOT', 'duty'], 'NOT 題：逐一對照，只有「訂購新書」沒有提到。'],
    [154, 'What is a requirement for the position?', ['A degree in library science', 'Previous library experience', 'Availability on Sunday afternoons', 'The ability to work with the public'], 'D',
      '這個職位的條件是什麼？', ['圖書資訊學學位', '圖書館工作經驗', '週日下午能上班', '能與民眾互動'], ['applicants must be comfortable working with the public'], ['requirement'], 'must be comfortable working with the public。不需要經驗；上班日是週六上午。']
  ]);

  set('R-155-157', {
    passage: P('E-mail', 'To: Project Team · From: Andrea Russo · Date: Monday, May 6 · Subject: Thursday client visit', [
      'Hi everyone,',
      'As you know, representatives from Orion Hotels will visit our office this Thursday to review the designs for their new lobby. They were originally scheduled to arrive at 2:00 P.M., but their flight has been changed, so they will now arrive at 11:00 A.M.',
      'Because of the earlier start, we will have lunch with them in the main conference room. I have already ordered sandwiches and salads. Peter, please bring the printed floor plans and the material samples to the conference room by 10:30 so that we can set up.',
      'Finally, I would like to practice the presentation with all of you on Wednesday afternoon. Please let me know what time works for you.',
      'Thanks, Andrea'
    ]),
    translation: 'Email｜收件：專案組｜寄件：Andrea Russo｜5 月 6 日（週一）｜主旨：週四客戶來訪\n大家好：如大家所知，Orion 飯店的代表本週四會來我們辦公室審閱他們新大廳的設計。他們原定下午兩點到，但班機改了，所以現在會在上午十一點到。因為提早開始，我們會在大會議室跟他們一起吃午餐，我已經訂好三明治和沙拉。Peter，請在 10:30 前把印好的平面圖和材料樣品拿到會議室，讓我們布置。最後，我想在週三下午跟大家演練簡報，請告訴我什麼時間方便。謝謝，Andrea',
    vocab: [['representative', 'n.', '代表', 'representatives'], ['review', 'v.', '審閱'], ['originally', 'adv.', '原本'], ['material sample', 'n.', '材料樣品', 'material samples'], ['set up', 'phr.', '布置'], ['practice', 'v.', '演練']]
  }, [
    [155, 'What is the purpose of the e-mail?', ['To introduce a new client', 'To request design changes', 'To update the team on a visit', 'To announce a lunch order'], 'C',
      '這封 email 的目的是什麼？', ['介紹新客戶', '要求修改設計', '告知團隊來訪行程的更新', '宣布午餐訂單'], ['they will now arrive at 11:00 A.M.'], ['purpose'], '主旨就是週四客戶來訪，主要內容是時間改了以及相關安排。'],
    [156, 'What kind of business most likely is Ms. Russo\'s company?', ['A design firm', 'A hotel chain', 'A catering company', 'A travel agency'], 'A',
      'Russo 女士的公司最可能是什麼行業？', ['設計公司', '連鎖飯店', '外燴公司', '旅行社'], ['to review the designs for their new lobby'], ['business', "Ms. Russo's company"], '客戶來審閱大廳設計，還要準備平面圖和材料樣品，可推論是設計公司。Orion Hotels 是客戶。'],
    [157, 'What is Peter asked to do?', ['Order lunch', 'Pick up the clients', 'Change a flight', 'Bring some materials to a room'], 'D',
      'Peter 被要求做什麼？', ['訂午餐', '去接客戶', '改班機', '把一些資料拿到會議室'], ['please bring the printed floor plans and the material samples to the conference room by 10:30'], ['Peter'], '把平面圖和樣品拿到會議室。午餐 Andrea 已經訂了。']
  ]);

  set('R-158-160', {
    passage: P('Lakeside Inn — Guest Services', 'www.lakesideinn.com/services', [
      'Breakfast: A full breakfast buffet is served in the Garden Room from 6:30 to 10:00 A.M. daily. It is included in all room rates.',
      'Fitness Center: Located on the lower level, our fitness center is open 24 hours a day. Use your room key to enter.',
      'Airport Shuttle: Our free shuttle leaves for Bayview Airport every hour from 5:00 A.M. to 9:00 P.M. Reservations are required at least 12 hours in advance and can be made at the front desk.',
      'Business Center: Computers and printers are available in the lobby. Printing is free for up to 20 pages per day; additional pages are 10 cents each.'
    ]),
    translation: 'Lakeside 旅館——住客服務\n早餐：每天早上 6:30 至 10:00 在花園廳供應全套自助早餐，所有房價皆已包含。\n健身中心：位於地下樓層，24 小時開放，用房卡進入。\n機場接駁：免費接駁車每小時一班開往 Bayview 機場，從上午 5 點到晚上 9 點。須至少 12 小時前預約，可在櫃台辦理。\n商務中心：大廳有電腦和印表機。每天列印 20 頁以內免費，超過的每頁 10 美分。',
    vocab: [['room rate', 'n.', '房價', 'room rates'], ['lower level', 'n.', '地下樓層'], ['shuttle', 'n.', '接駁車'], ['reservation', 'n.', '預約', 'Reservations'], ['in advance', 'phr.', '事先'], ['additional', 'adj.', '額外的']]
  }, [
    [158, 'What is indicated about breakfast?', ['It is served in guests\' rooms.', 'It is included in the price of a room.', 'It is available until noon.', 'It must be reserved in advance.'], 'B',
      '關於早餐，文中提到什麼？', ['送到客房。', '包含在房價中。', '供應到中午。', '必須事先預約。'], ['It is included in all room rates.'], ['breakfast'], 'included in all room rates＝包含在房價中。'],
    [159, 'What must guests do to use the airport shuttle?', ['Pay a small fee', 'Show a flight ticket', 'Make a reservation in advance', 'Wait in the lobby at 5:00 A.M.'], 'C',
      '住客要怎樣才能搭機場接駁車？', ['付一點費用', '出示機票', '事先預約', '早上五點在大廳等'], ['Reservations are required at least 12 hours in advance'], ['airport shuttle'], '至少 12 小時前預約＝事先預約。接駁車是免費的，(A) 錯。'],
    [160, 'How much would a guest pay to print 25 pages in one day?', ['50 cents', '$2.50', 'Nothing', '$2.00'], 'A',
      '住客一天印 25 頁要付多少錢？', ['50 美分', '2.5 美元', '免費', '2 美元'], ['Printing is free for up to 20 pages per day; additional pages are 10 cents each.'], ['print 25 pages'], '計算題：前 20 頁免費，多出 5 頁 × 10 美分＝50 美分。']
  ]);

  set('R-161-163', {
    passage: P('MEMO', 'To: All Employees · From: Facilities Department · Date: August 12 · Re: Kitchen Upgrades', [
      'The second-floor kitchen will be closed from August 19 to August 23 for upgrades. — [1] — We will be replacing the old refrigerator and installing a new coffee machine that can make espresso and cappuccino.',
      'During this time, please use the kitchen on the fourth floor. — [2] — Because that kitchen will be busier than usual, we ask that you not leave food in the refrigerator overnight.',
      'In addition, we will be adding a water filtration system so that employees no longer need to buy bottled water. — [3] — We hope these improvements make your workday more pleasant.',
      'If you have any questions, please contact Martin Lee at extension 214. — [4] —'
    ]),
    translation: '備忘錄｜收件：全體員工｜寄件：設施部｜8 月 12 日｜主旨：茶水間升級\n二樓茶水間 8 月 19 日到 23 日關閉進行升級。我們會更換舊冰箱，並安裝可以煮義式濃縮和卡布奇諾的新咖啡機。這段期間請使用四樓茶水間。因為那裡會比平常忙碌，請不要把食物放在冰箱過夜。此外，我們會加裝濾水系統，員工就不用再買瓶裝水。這也能減少辦公室的塑膠垃圾。希望這些改善能讓大家工作得更愉快。有任何問題請聯絡分機 214 的 Martin Lee。',
    vocab: [['upgrade', 'n.', '升級', 'upgrades'], ['replace', 'v.', '更換', 'replacing'], ['install', 'v.', '安裝', 'installing'], ['overnight', 'adv.', '過夜'], ['water filtration system', 'n.', '濾水系統'], ['bottled water', 'n.', '瓶裝水'], ['extension', 'n.', '（電話）分機']]
  }, [
    [161, 'What is the purpose of the memo?', ['To ask for volunteers', 'To introduce a new employee', 'To announce a change in work hours', 'To explain upcoming kitchen improvements'], 'D',
      '這份備忘錄的目的是什麼？', ['徵求志工', '介紹新員工', '宣布工作時間改變', '說明即將進行的茶水間改善'], ['The second-floor kitchen will be closed from August 19 to August 23 for upgrades.'], ['purpose'], '整篇都在說茶水間升級的內容與安排。'],
    [162, 'What are employees asked to do?', ['Bring their own cups', 'Remove food from the refrigerator each day', 'Buy bottled water', 'Use the kitchen on a different floor permanently'], 'B',
      '員工被要求做什麼？', ['帶自己的杯子', '每天把食物從冰箱拿走', '買瓶裝水', '永久改用別層的茶水間'], ['we ask that you not leave food in the refrigerator overnight'], ['asked'], '不要把食物留在冰箱過夜＝每天拿走。只有施工期間改用四樓，不是永久。'],
    [163, INS + ' "This will also reduce the amount of plastic waste in our office."', ['[1]', '[2]', '[3]', '[4]'], 'C',
      '下面這句最適合放在 [1]～[4] 哪個位置？「這也能減少辦公室的塑膠垃圾。」', ['[1]', '[2]', '[3]', '[4]'], ['so that employees no longer need to buy bottled water'], ['positions marked'], '句子插入題：「This 也能減少塑膠垃圾」的 This 指濾水系統（不用再買瓶裝水），所以放在 [3]。']
  ]);

  set('R-164-167', {
    passage: P('Greenfield Gazette — Community News', 'Old Train Station Becomes Arts Center', [
      'GREENFIELD — After three years of construction, the former Greenfield train station reopened last Saturday as the Greenfield Arts Center. More than two thousand people attended the opening celebration, which included live music and free art classes for children.',
      'The station, built in 1912, had been empty since 1985, when passenger service to the town ended. In 2019, the city purchased the building and announced plans to turn it into a space for local artists.',
      'The renovated building now contains three galleries, a 150-seat theater, and eight studios that artists can rent by the month. The original waiting room, with its high ceilings and large windows, has become the main gallery.',
      '"We wanted to keep as much of the station\'s history as possible," said project architect Dana Whitfield. The center\'s first exhibition, featuring paintings by Greenfield residents, runs through November 30. Admission to the galleries is free, but tickets are required for theater performances.'
    ]),
    translation: '《Greenfield 公報》社區新聞｜舊火車站變身藝術中心\nGREENFIELD——經過三年施工，前 Greenfield 火車站上週六以 Greenfield 藝術中心之姿重新開幕。兩千多人參加了開幕慶祝活動，包括現場音樂表演和免費兒童美術課。這座車站建於 1912 年，自 1985 年客運服務停駛後就一直空著。2019 年，市政府買下這棟建築，宣布要把它改造成在地藝術家的空間。整修後的建築現在有三間展廳、一座 150 席的劇場，以及八間藝術家可按月租用的工作室。原本挑高、有大窗戶的候車室成了主展廳。專案建築師 Dana Whitfield 說：「我們想盡量保留車站的歷史。」中心的首檔展覽展出 Greenfield 居民的畫作，展期到 11 月 30 日。展廳免費參觀，但劇場表演需要購票。',
    vocab: [['former', 'adj.', '從前的'], ['opening celebration', 'n.', '開幕慶祝活動'], ['passenger service', 'n.', '客運服務'], ['renovated', 'adj.', '整修過的'], ['studio', 'n.', '工作室', 'studios'], ['by the month', 'phr.', '按月'], ['exhibition', 'n.', '展覽'], ['admission', 'n.', '入場']]
  }, [
    [164, 'What is the article mainly about?', ['A building that has been given a new purpose', 'A new train line', 'A local artist\'s career', 'A city budget plan'], 'A',
      '這篇文章主要在講什麼？', ['一棟被賦予新用途的建築', '一條新鐵路線', '一位在地藝術家的生涯', '市政府預算計畫'], ['the former Greenfield train station reopened last Saturday as the Greenfield Arts Center'], ['mainly about'], '舊火車站改成藝術中心＝被賦予新用途。'],
    [165, 'When did the building stop being used as a train station?', ['In 1912', 'In 2019', 'Three years ago', 'In 1985'], 'D',
      '這棟建築什麼時候停止當火車站使用？', ['1912 年', '2019 年', '三年前', '1985 年'], ['had been empty since 1985, when passenger service to the town ended'], ['When', 'train station'], '1985 年客運停駛後就空著。1912 是建造年份，2019 是市府買下的年份。'],
    [166, 'What is mentioned about the studios?', ['They are located in the old waiting room.', 'Artists can rent them monthly.', 'They are used for children\'s classes.', 'They are all currently occupied.'], 'B',
      '關於工作室，文中提到什麼？', ['在舊候車室裡。', '藝術家可以按月租用。', '用來上兒童課程。', '目前全部租出。'], ['eight studios that artists can rent by the month'], ['studios'], 'rent by the month＝按月租用。舊候車室變成的是主展廳。'],
    [167, 'What is true about visiting the arts center?', ['It is closed on Saturdays.', 'Tickets are required for the galleries.', 'Theater performances require a ticket.', 'Only Greenfield residents may enter.'], 'C',
      '關於參觀藝術中心，何者正確？', ['週六休館。', '展廳要買票。', '劇場表演需要門票。', '只有 Greenfield 居民可以進入。'], ['tickets are required for theater performances'], ['visiting'], '展廳免費，劇場表演要票。只有展出的作品是居民的畫，不是只限居民入場。']
  ]);

  set('R-168-171', {
    passage: P('Online chat discussion', '', [
      'Jun Takahashi [9:02 A.M.]: Good morning. Has anyone heard back from Lumina Print about the brochures for the trade fair?',
      'Carla Mendes [9:04 A.M.]: Yes. They said the brochures will be ready on Thursday, but they can\'t deliver them until Monday.',
      'Jun Takahashi [9:05 A.M.]: The trade fair starts on Saturday.',
      'Carla Mendes [9:06 A.M.]: I know. I asked whether we could pick them up ourselves, and they said that would be fine.',
      'Ben Ortiz [9:08 A.M.]: I can do that. Their shop is on my way home. What time do they close on Thursday?',
      'Carla Mendes [9:09 A.M.]: Six o\'clock. I\'ll tell them you\'re coming.',
      'Jun Takahashi [9:10 A.M.]: Thanks, Ben. Please check a few copies before you leave the shop. Last year, some of the pages were printed in the wrong order.',
      'Ben Ortiz [9:11 A.M.]: Will do.'
    ]),
    translation: 'Jun Takahashi（上午 9:02）：早安。有人收到 Lumina 印刷關於商展手冊的回覆嗎？\nCarla Mendes（9:04）：有。他們說手冊週四會印好，但要到週一才能送。\nJun（9:05）：商展週六就開始了。\nCarla（9:06）：我知道。我問他們能不能自己去拿，他們說可以。\nBen Ortiz（9:08）：我可以去，他們的店在我回家的路上。週四他們幾點關門？\nCarla（9:09）：六點。我會告訴他們你要過去。\nJun（9:10）：謝了 Ben。離開店之前請檢查幾本。去年有些頁面印錯順序。\nBen（9:11）：沒問題。',
    vocab: [['hear back from', 'phr.', '收到…的回覆', 'heard back from'], ['brochure', 'n.', '手冊', 'brochures'], ['trade fair', 'n.', '商展'], ['pick up', 'phr.', '領取'], ['on my way home', 'phr.', '在我回家的路上'], ['Will do.', 'phr.', '會照辦。']]
  }, [
    [168, 'What are the writers mainly discussing?', ['Designing a brochure', 'Getting printed materials on time', 'Registering for a trade fair', 'Choosing a new printing company'], 'B',
      '這些人主要在討論什麼？', ['設計手冊', '及時拿到印刷品', '報名商展', '選新的印刷廠'], ["they can't deliver them until Monday"], ['mainly discussing'], '手冊要週一才能送，但商展週六開始，大家在想辦法及時拿到。'],
    [169, 'At 9:05 A.M., why does Mr. Takahashi write, "The trade fair starts on Saturday"?', ['To point out that Monday is too late', 'To correct a date Ms. Mendes gave', 'To suggest canceling the fair', 'To ask who will attend the fair'], 'A',
      '9:05 時 Takahashi 先生為什麼寫「商展週六就開始了」？', ['指出週一太晚了', '更正 Mendes 女士給的日期', '建議取消商展', '問誰會參加商展'], ["they can't deliver them until Monday"], ['9:05', 'Saturday'], '意圖題：週一才送到，但商展週六就開始，表示這樣來不及。'],
    [170, 'What will Mr. Ortiz most likely do on Thursday?', ['Call Lumina Print', 'Work at the trade fair', 'Deliver brochures to a client', 'Stop by a print shop'], 'D',
      'Ortiz 先生週四最可能會做什麼？', ['打給 Lumina 印刷', '在商展工作', '把手冊送給客戶', '順道去印刷店'], ['Their shop is on my way home.'], ['Mr. Ortiz', 'Thursday'], '他自願去拿，店就在回家路上＝順道去印刷店。打電話的是 Carla。'],
    [171, 'What problem occurred last year?', ['Brochures arrived late.', 'A printer closed early.', 'Some pages were in the wrong order.', 'Too few copies were printed.'], 'C',
      '去年發生了什麼問題？', ['手冊晚到。', '印刷廠提早關門。', '有些頁面順序錯了。', '印的份數太少。'], ['some of the pages were printed in the wrong order'], ['problem', 'last year'], 'printed in the wrong order＝頁面順序錯。']
  ]);

  set('R-172-175', {
    passage: P('Letter', 'Dalton Home Appliances · 400 Commerce Road, Ridgeway', [
      'Dear Ms. Alvarez,',
      'Thank you for contacting us about the DH-300 washing machine you purchased in March. We were sorry to hear that it has been leaking water. — [1] —',
      'Our records show that your machine is still covered by our two-year warranty. Therefore, there will be no charge for the repair. A technician from our service team will contact you within two business days to arrange a visit. — [2] —',
      'Before the technician arrives, please check that the water hoses on the back of the machine are tightly connected. In many cases, this simple step solves the problem. — [3] —',
      'We appreciate your patience. As a thank-you, we have enclosed a coupon for 20 percent off your next purchase from our online store. — [4] —',
      'Sincerely, Thomas Grant, Customer Care Manager'
    ]),
    translation: '信件｜Dalton 家電｜Ridgeway 市 Commerce 路 400 號\n親愛的 Alvarez 女士：感謝您就三月購買的 DH-300 洗衣機與我們聯絡。很遺憾得知它一直漏水。我們的紀錄顯示您的機器仍在兩年保固內，因此維修不收費。我們服務團隊的技術人員會在兩個工作天內與您聯絡安排到府時間。如果您不方便，可以要求晚上或週末的時段。技術人員到之前，請確認機器背面的水管有鎖緊。很多情況下，這個簡單的步驟就能解決問題。感謝您的耐心。為表謝意，隨信附上一張網路商店下次購物八折的優惠券。客戶服務經理 Thomas Grant 敬上',
    vocab: [['leak', 'v.', '漏（水）', 'leaking'], ['warranty', 'n.', '保固'], ['business day', 'n.', '工作天', 'business days'], ['arrange', 'v.', '安排'], ['hose', 'n.', '水管', 'hoses'], ['tightly', 'adv.', '緊緊地'], ['enclose', 'v.', '隨信附上', 'enclosed']]
  }, [
    [172, 'Why did Ms. Alvarez contact Dalton Home Appliances?', ['To report a problem with a product', 'To order a washing machine', 'To ask about a store location', 'To request a refund for a coupon'], 'A',
      'Alvarez 女士為什麼聯絡 Dalton 家電？', ['反映產品的問題', '訂購洗衣機', '詢問門市地點', '要求退還優惠券'], ['We were sorry to hear that it has been leaking water.'], ['Why', 'Ms. Alvarez'], '洗衣機漏水，她來反映問題。'],
    [173, 'Why will Ms. Alvarez not have to pay for the repair?', ['She bought an extended service plan.', 'The technician made a mistake.', 'The machine is under warranty.', 'She has a discount coupon.'], 'C',
      'Alvarez 女士為什麼不用付維修費？', ['她買了延長服務方案。', '技術人員犯了錯。', '機器還在保固內。', '她有折價券。'], ['your machine is still covered by our two-year warranty'], ['Why', 'pay'], 'still covered by our two-year warranty＝還在保固內。'],
    [174, INS + ' "If those times are inconvenient, you may request an evening or weekend appointment."', ['[1]', '[2]', '[3]', '[4]'], 'B',
      '下面這句最適合放在 [1]～[4] 哪個位置？「如果那些時間不方便，您可以要求晚上或週末的時段。」', ['[1]', '[2]', '[3]', '[4]'], ['A technician from our service team will contact you within two business days to arrange a visit.'], ['positions marked'], '句子插入題：those times 指技術人員安排的到府時間，所以放在「安排到府」那句之後的 [2]。'],
    [175, 'What has been sent with the letter?', ['A repair manual', 'A new water hose', 'A warranty card', 'A discount coupon'], 'D',
      '這封信附上了什麼？', ['維修手冊', '新的水管', '保固卡', '折價券'], ['we have enclosed a coupon for 20 percent off your next purchase'], ['sent'], 'enclosed a coupon for 20 percent off＝附上折價券。']
  ]);
})();
