/* Test 2 閱讀 Part 7 多篇閱讀（Q176–200：雙篇 × 2、三篇 × 3） */
(function () {
  const set = (group, base, rows) => window.TOEIC_T2.set('R', 'Part 7', group, base, rows);
  const B = (blocks) => blocks.map((t) => (typeof t === 'string' ? { type: 'p', text: t } : t));
  const H = (text) => ({ type: 'h', text });

  set('R-176-180', {
    passage: { title: 'Web Page & E-mail', blocks: B([
      H('Text 1 — Web Page'),
      'Northwest Logistics Summit · September 18–19 · Harborview Convention Center, Seattle',
      'Join more than 800 professionals in shipping, warehousing, and supply chain management for two days of talks, panel discussions, and networking. Day 1 features keynote speeches; Day 2 offers hands-on workshops in small groups.',
      { type: 'list', items: ['Early registration (by August 15): $250', 'Standard registration (after August 15): $320', 'Students (with valid ID): $120', 'Groups of five or more from the same company receive an additional 10% off.'] },
      'Attendees can receive a discounted rate at the Harborview Hotel by mentioning the code NWLS when booking. Rooms at this rate are limited.',
      H('Text 2 — E-mail'),
      'To: registration@nwlsummit.org · From: Daniel Kowalski · Date: August 22 · Subject: Registration charge',
      'Hello, I registered for the Northwest Logistics Summit on August 10. I am attending on my own, not as part of a group. However, when I checked my credit card statement this morning, I noticed that I was charged $320.',
      'I would appreciate it if you could look into this and refund the difference. I have attached a copy of my registration confirmation, which shows the date I signed up. I hope we can settle this quickly. Best regards, Daniel Kowalski'
    ]) },
    translation: '【網頁】西北物流高峰會｜9 月 18–19 日｜西雅圖 Harborview 會議中心\n與 800 多位航運、倉儲、供應鏈管理專業人士一起參加兩天的演講、座談和交流。第一天是專題演講；第二天是小組實作工作坊。\n・早鳥報名（8 月 15 日前）：250 美元\n・一般報名（8 月 15 日後）：320 美元\n・學生（持有效證件）：120 美元\n・同公司五人以上團體報名再打九折。\n與會者訂 Harborview 飯店時提到代碼 NWLS 可享優惠價，此價格房間有限。\n【Email】8 月 22 日，Daniel Kowalski，主旨：報名費用。您好，我在 8 月 10 日報名了西北物流高峰會，我是個人參加，不是團體。但今天早上看信用卡帳單時，發現被收了 320 美元。希望您能查一下並退還差額。附件是我的報名確認信，上面有報名日期。希望能盡快解決這件事。Daniel Kowalski 敬上',
    vocab: [['logistics', 'n.', '物流'], ['warehousing', 'n.', '倉儲'], ['supply chain', 'n.', '供應鏈'], ['networking', 'n.', '人脈交流'], ['keynote speech', 'n.', '專題演講', 'keynote speeches'], ['hands-on', 'adj.', '實作的'], ['statement', 'n.', '（信用卡）帳單'], ['look into', 'phr.', '調查'], ['settle', 'v.', '解決']]
  }, [
    [176, 'What is the purpose of the Web page?', ['To recruit speakers for a conference', 'To provide information about an event', 'To advertise a hotel', 'To announce a new shipping service'], 'B',
      '這個網頁的目的是什麼？', ['招募研討會講者', '提供活動資訊', '宣傳飯店', '宣布新的運輸服務'], ['Join more than 800 professionals in shipping, warehousing, and supply chain management'], ['purpose', 'Web page'], '網頁介紹高峰會的日期、地點、內容和報名費。'],
    [177, 'According to the Web page, how can attendees get a lower hotel rate?', ['By registering before August 15', 'By attending as a group', 'By showing a student ID', 'By using a special code'], 'D',
      '根據網頁，與會者要怎麼拿到比較便宜的房價？', ['在 8 月 15 日前報名', '團體參加', '出示學生證', '使用特別代碼'], ['by mentioning the code NWLS when booking'], ['hotel rate'], '訂房時提到代碼 NWLS。其他選項是報名費的折扣，不是飯店的。'],
    [178, 'Why did Mr. Kowalski write the e-mail?', ['To report a billing error', 'To cancel his registration', 'To ask about workshops', 'To book a hotel room'], 'A',
      'Kowalski 先生為什麼寫這封 email？', ['反映收費錯誤', '取消報名', '詢問工作坊', '訂飯店房間'], ['I noticed that I was charged $320'], ['Why', 'Mr. Kowalski'], '他被收了 320 美元，要求退差額＝收費錯誤。'],
    [179, 'How much should Mr. Kowalski have been charged?', ['$120', '$225', '$250', '$288'], 'C',
      'Kowalski 先生應該被收多少錢？', ['120 美元', '225 美元', '250 美元', '288 美元'], ['I registered for the Northwest Logistics Summit on August 10.', 'Early registration (by August 15): $250'], ['How much'], '跨篇題：他 8 月 10 日報名，在 8 月 15 日之前，適用早鳥價 250 美元。他是個人參加，沒有團體九折，所以不是 225。'],
    [180, 'In the e-mail, the word "settle" in paragraph 2 is closest in meaning to', ['resolve', 'pay', 'move into', 'calm'], 'A',
      'email 第二段的 settle 意思最接近？', ['解決', '付清', '搬進', '使平靜'], ['I hope we can settle this quickly.'], ['settle'], '同義字題：settle this（這件事）＝解決。settle 雖然也有「付清（帳款）」的意思，但這裡是要對方處理問題，不是他自己要付錢。']
  ]);

  set('R-181-185', {
    passage: { title: 'Product Review & E-mail', blocks: B([
      H('Text 1 — Online Review'),
      'Brightline LED Desk Lamp · Rating: ★★★☆☆ · Posted by Sophie Laurent on March 4',
      'I bought this lamp for my home office, and I really like how easy it is to adjust the brightness. There are five levels, so I can choose softer light in the evening. The design is also modern and takes up very little space on my desk.',
      'However, I had two problems. First, I ordered the blue model, but I received a black one. Second, the USB charging port on the base stopped working after only a week. For the price, I expected better quality.',
      H('Text 2 — E-mail'),
      'To: Sophie Laurent · From: Brightline Customer Care · Date: March 6 · Subject: Your recent review',
      'Dear Ms. Laurent, Thank you for taking the time to review our desk lamp. We are very sorry that you received the wrong color and that the charging port failed. A small number of lamps produced in January had a faulty USB part, and this problem has since been corrected.',
      'We would like to send you a new lamp in the color you originally ordered at no cost. It will ship within three days. Once it arrives, please return the original lamp using the prepaid shipping label included in the package. Sincerely, Brightline Customer Care'
    ]) },
    translation: '【網路評論】Brightline LED 檯燈｜三顆星｜Sophie Laurent，3 月 4 日\n我買這盞檯燈放在家裡的辦公室，很喜歡它可以輕鬆調整亮度。有五段亮度，晚上可以選柔和一點的光。設計也很現代，在桌上很不占空間。不過我遇到兩個問題。第一，我訂的是藍色，收到的卻是黑色。第二，底座的 USB 充電孔用了一週就壞了。以這個價格，我期待更好的品質。\n【Email】3 月 6 日，Brightline 客服，主旨：您最近的評論。親愛的 Laurent 女士：感謝您撥空評論我們的檯燈。很抱歉您收到錯的顏色，充電孔也壞了。一月生產的少數檯燈 USB 零件有瑕疵，這個問題之後已經修正了。我們想免費寄給您一盞您原本訂購顏色的新檯燈，會在三天內寄出。收到後，請用包裹內附的預付運單把原本的檯燈寄回。Brightline 客服 敬上',
    vocab: [['adjust', 'v.', '調整'], ['brightness', 'n.', '亮度'], ['take up space', 'phr.', '占空間', 'takes up very little space'], ['charging port', 'n.', '充電孔'], ['faulty', 'adj.', '有瑕疵的'], ['at no cost', 'phr.', '免費'], ['prepaid shipping label', 'n.', '預付運單']]
  }, [
    [181, 'What does Ms. Laurent like about the lamp?', ['Its low price', 'Its long cord', 'Its adjustable light', 'Its large base'], 'C',
      'Laurent 女士喜歡這盞檯燈的哪一點？', ['價格低', '電線長', '亮度可調', '底座大'], ['I really like how easy it is to adjust the brightness'], ['Ms. Laurent', 'like'], '她喜歡可以調亮度。她反而覺得以價格來說品質不夠好，所以不是 (A)。'],
    [182, 'What is indicated about Ms. Laurent\'s order?', ['She received a different color from the one she chose.', 'It arrived later than expected.', 'It was missing a part.', 'She paid extra for fast shipping.'], 'A',
      '關於 Laurent 女士的訂單，文中提到什麼？', ['收到的顏色跟她選的不同。', '比預期晚到。', '少了一個零件。', '她多付了快速運費。'], ['I ordered the blue model, but I received a black one.'], ["Ms. Laurent's order"], '訂藍色收到黑色。'],
    [183, 'What does the e-mail suggest about Ms. Laurent\'s lamp?', ['It was damaged during shipping.', 'It is no longer sold.', 'It was a display model.', 'It was most likely made in January.'], 'D',
      'email 暗示 Laurent 女士的檯燈怎麼了？', ['運送途中受損。', '已經停售。', '是展示品。', '很可能是一月生產的。'], ['A small number of lamps produced in January had a faulty USB part'], ['e-mail', "Ms. Laurent's lamp"], '跨篇推論：她的 USB 孔壞了，而客服說一月生產的少數檯燈 USB 零件有瑕疵，可推論她的是一月產的。'],
    [184, 'What is Ms. Laurent asked to do?', ['Post a new review', 'Send back the first lamp', 'Pay a shipping fee', 'Visit a store'], 'B',
      'Laurent 女士被要求做什麼？', ['發一篇新評論', '把第一盞檯燈寄回', '付運費', '去門市'], ['please return the original lamp using the prepaid shipping label'], ['asked'], 'return the original lamp＝把第一盞寄回。運單是預付的，不用付運費。'],
    [185, 'What color will the new lamp most likely be?', ['Black', 'White', 'Blue', 'Silver'], 'C',
      '新的檯燈最可能是什麼顏色？', ['黑色', '白色', '藍色', '銀色'], ['a new lamp in the color you originally ordered', 'I ordered the blue model'], ['color'], '跨篇題：客服說會寄「她原本訂購的顏色」，第一篇說她訂的是藍色。']
  ]);

  set('R-186-190', {
    passage: { title: 'Advertisement, Review & E-mail', blocks: B([
      H('Text 1 — Advertisement'),
      'Saffron Table — Mediterranean Kitchen · Now Open at 210 River Street!',
      'Celebrate our grand opening week, May 3–9! Show this advertisement to your server and receive 15 percent off your dinner bill.',
      { type: 'list', items: ['Lunch: Weekdays, 11:30 A.M. – 2:30 P.M.', 'Dinner: Every day, 5:00 – 10:00 P.M.', 'Private dining room available for groups of up to 20 (reservations required)'] },
      H('Text 2 — Online Review'),
      'Posted by Helen Cho on May 12 · ★★★★☆',
      'My family and I had dinner at Saffron Table during its opening week, and I remembered to bring the newspaper advertisement. The grilled lamb was excellent, and the bread is baked fresh every day. My only complaint is that there are few choices for vegetarians. My daughter does not eat meat, and there was only one main dish she could order. Service was friendly, though a little slow because every table was full.',
      H('Text 3 — E-mail'),
      'To: Leila Haddad · From: Marco Rossi · Date: May 14 · Subject: Menu and upcoming booking',
      'Hi Leila, Congratulations on a great first two weeks. Several reviews, including one posted on May 12, mention our vegetarian selection. Could you develop two new vegetarian main dishes and have them ready to add to the menu by June 1?',
      'Also, Fairmont Consulting has booked the private dining room for a team dinner on May 28. There will be 18 guests, and they have asked for a set menu. Please send me a few ideas by Friday. Thanks, Marco'
    ]) },
    translation: '【廣告】Saffron Table 地中海料理｜River 街 210 號開幕！\n歡慶開幕週 5 月 3–9 日！向服務生出示本廣告，晚餐帳單打 85 折。\n・午餐：平日 11:30–14:30\n・晚餐：每天 17:00–22:00\n・包廂可容納最多 20 人（須預約）\n【網路評論】Helen Cho，5 月 12 日，四顆星\n我和家人在開幕週去 Saffron Table 吃晚餐，我有記得帶報紙廣告。烤羊肉非常好吃，麵包每天現烤。唯一的不滿是素食選擇很少，我女兒不吃肉，只有一道主菜能點。服務很親切，但因為客滿所以有點慢。\n【Email】5 月 14 日，Marco Rossi 寄給 Leila Haddad，主旨：菜單與即將到來的訂位。嗨 Leila，恭喜開幕頭兩週很成功。好幾篇評論，包括 5 月 12 日那篇，都提到我們的素食選擇。你可以開發兩道新的素食主菜，在 6 月 1 日前準備好加入菜單嗎？另外，Fairmont 顧問公司訂了 5 月 28 日的包廂辦團隊晚餐，共 18 位，要求套餐。請在週五前給我幾個構想。謝謝，Marco',
    vocab: [['grand opening', 'n.', '盛大開幕'], ['server', 'n.', '服務生'], ['private dining room', 'n.', '包廂'], ['main dish', 'n.', '主菜'], ['vegetarian', 'n./adj.', '素食者；素食的'], ['selection', 'n.', '（可選的）種類'], ['set menu', 'n.', '套餐']]
  }, [
    [186, 'What is indicated about Saffron Table in the advertisement?', ['It is closed on weekends.', 'It serves breakfast.', 'It offers cooking classes.', 'It has a space for private events.'], 'D',
      '廣告中提到 Saffron Table 什麼？', ['週末休息。', '供應早餐。', '提供烹飪課。', '有辦私人活動的空間。'], ['Private dining room available for groups of up to 20 (reservations required)'], ['advertisement'], '有包廂可容納 20 人。晚餐每天都有，所以週末沒有休息。'],
    [187, 'What is suggested about Ms. Cho?', ['She ate lunch at the restaurant.', 'She received a discount on her meal.', 'She is a vegetarian.', 'She works for Fairmont Consulting.'], 'B',
      '關於 Cho 女士，文中暗示什麼？', ['她在那裡吃午餐。', '她的餐點有打折。', '她吃素。', '她在 Fairmont 顧問公司工作。'], ['during its opening week, and I remembered to bring the newspaper advertisement', 'Show this advertisement to your server and receive 15 percent off your dinner bill.'], ['Ms. Cho'], '跨篇題：她開幕週吃晚餐又帶了廣告，依廣告可打 85 折。吃素的是她女兒，不是她。'],
    [188, 'What does Ms. Cho criticize?', ['The limited vegetarian options', 'The quality of the bread', 'The high prices', 'The noisy dining room'], 'A',
      'Cho 女士批評什麼？', ['素食選擇有限', '麵包的品質', '價格太高', '用餐區太吵'], ['there are few choices for vegetarians'], ['criticize'], 'few choices for vegetarians＝素食選擇有限。麵包她是稱讚的。'],
    [189, 'What does Mr. Rossi ask Ms. Haddad to do by June 1?', ['Hire more servers', 'Respond to reviews', 'Create new dishes', 'Reserve a room'], 'C',
      'Rossi 先生要 Haddad 女士在 6 月 1 日前做什麼？', ['多請服務生', '回覆評論', '研發新菜', '預訂包廂'], ['Could you develop two new vegetarian main dishes'], ['Mr. Rossi', 'June 1'], 'develop two new vegetarian main dishes＝研發新菜。'],
    [190, 'What is suggested about the Fairmont Consulting dinner?', ['It will take place at lunchtime.', 'It has been canceled.', 'It will receive a 15 percent discount.', 'The group size is within the room\'s limit.'], 'D',
      '關於 Fairmont 顧問公司的晚餐，文中暗示什麼？', ['會在午餐時間舉行。', '已經取消了。', '會打 85 折。', '人數在包廂的上限內。'], ['There will be 18 guests', 'groups of up to 20'], ['Fairmont Consulting'], '跨篇題：18 位客人，包廂最多 20 人，在上限內。5 月 28 日不在開幕週，所以沒有 85 折。']
  ]);

  set('R-191-195', {
    passage: { title: 'Schedule & E-mails', blocks: B([
      H('Text 1 — Schedule'),
      'Lakeview Community College · Small Business Skills Series (6:30–8:30 P.M.)',
      { type: 'list', items: ['Mon., June 3 — Bookkeeping Basics — Room 101 — Ana Ruiz', 'Wed., June 5 — Social Media Marketing — Room 204 — Kevin Lowe', 'Mon., June 10 — Writing a Business Plan — Room 101 — Ana Ruiz', 'Wed., June 12 — Hiring Your First Employee — Room 204 — Priya Shah'] },
      'Each workshop costs $40. Register for all four and pay only $140. Sign up at www.lakeviewcc.edu/business.',
      H('Text 2 — E-mail'),
      'To: Tom Becker · From: Lakeview Community College · Date: May 20 · Subject: Registration confirmation',
      'Dear Mr. Becker, Thank you for registering. You are enrolled in the following workshops: Social Media Marketing and Writing a Business Plan. Total paid: $80. Please arrive ten minutes early on the first evening to receive your name tag.',
      H('Text 3 — E-mail'),
      'To: Workshop participants · From: Ana Ruiz · Date: June 4 · Subject: Change of date',
      'Dear participants, Because of a scheduling conflict, my workshop originally planned for June 10 will now take place on Thursday, June 13, at the same time. It will be held in Room 105. If you are unable to attend on the new date, you may receive a full refund or transfer to the same workshop in the fall. I apologize for any inconvenience. Ana Ruiz'
    ]) },
    translation: '【課表】Lakeview 社區學院｜小型企業技能系列（晚上 6:30–8:30）\n・6 月 3 日（一）記帳基礎——101 教室——Ana Ruiz\n・6 月 5 日（三）社群媒體行銷——204 教室——Kevin Lowe\n・6 月 10 日（一）撰寫營運計畫書——101 教室——Ana Ruiz\n・6 月 12 日（三）聘請你的第一位員工——204 教室——Priya Shah\n每場 40 美元，報名全部四場只要 140 美元。報名網址 www.lakeviewcc.edu/business。\n【Email 1】5 月 20 日，學院寄給 Tom Becker，主旨：報名確認。親愛的 Becker 先生：感謝您報名。您報名的課程是：社群媒體行銷、撰寫營運計畫書。已付總額 80 美元。第一晚請提早十分鐘到場領取名牌。\n【Email 2】6 月 4 日，Ana Ruiz 寄給學員，主旨：日期變更。各位學員：由於時間衝突，我原定 6 月 10 日的工作坊改到 6 月 13 日（四）同一時間，地點在 105 教室。如果新日期無法出席，可以全額退費，或轉到秋季的同一堂課。造成不便，敬請見諒。Ana Ruiz',
    vocab: [['bookkeeping', 'n.', '記帳'], ['business plan', 'n.', '營運計畫書'], ['enroll', 'v.', '註冊；報名', 'enrolled'], ['name tag', 'n.', '名牌'], ['scheduling conflict', 'n.', '時間衝突'], ['full refund', 'n.', '全額退費'], ['transfer', 'v.', '轉（班）']]
  }, [
    [191, 'What is indicated about the workshop series?', ['There is a lower price for taking every workshop.', 'All workshops are held in the same room.', 'Workshops take place in the morning.', 'Each workshop has a different instructor.'], 'A',
      '關於這個系列課程，文中提到什麼？', ['四場全報有比較便宜的價格。', '所有課都在同一間教室。', '課程在早上。', '每場講師都不同。'], ['Register for all four and pay only $140.'], ['workshop series'], '四場原價 160，全報只要 140。Ana Ruiz 教兩場，所以 (D) 錯。'],
    [192, 'Who will teach the first workshop that Mr. Becker attends?', ['Ana Ruiz', 'Priya Shah', 'Kevin Lowe', 'Tom Becker'], 'C',
      'Becker 先生參加的第一堂課由誰授課？', ['Ana Ruiz', 'Priya Shah', 'Kevin Lowe', 'Tom Becker'], ['Social Media Marketing and Writing a Business Plan', 'Wed., June 5 — Social Media Marketing — Room 204 — Kevin Lowe'], ['Who', 'Mr. Becker'], '跨篇題：他報名的兩堂中，最早的是 6 月 5 日的社群媒體行銷，講師是 Kevin Lowe。'],
    [193, 'Why did Ms. Ruiz send the e-mail?', ['To request feedback', 'To announce a schedule change', 'To introduce a new instructor', 'To confirm a payment'], 'B',
      'Ruiz 女士為什麼寄這封 email？', ['徵求意見', '宣布日期變更', '介紹新講師', '確認付款'], ['my workshop originally planned for June 10 will now take place on Thursday, June 13'], ['Why', 'Ms. Ruiz'], '主旨 Change of date，課程改期。'],
    [194, 'Which of Mr. Becker\'s workshops has been changed?', ['Bookkeeping Basics', 'Social Media Marketing', 'Hiring Your First Employee', 'Writing a Business Plan'], 'D',
      'Becker 先生的哪一堂課被更動了？', ['記帳基礎', '社群媒體行銷', '聘請第一位員工', '撰寫營運計畫書'], ['Mon., June 10 — Writing a Business Plan — Room 101 — Ana Ruiz', 'my workshop originally planned for June 10'], ["Mr. Becker's workshops"], '跨篇題：Ruiz 改期的是 6 月 10 日那堂＝撰寫營運計畫書，剛好是 Becker 報名的。記帳基礎也是 Ruiz 教，但在 6 月 3 日，而且他沒報。'],
    [195, 'What is offered to participants who cannot attend on the new date?', ['A refund', 'A free textbook', 'An online recording', 'A private lesson'], 'A',
      '新日期無法出席的學員可以得到什麼？', ['退費', '免費課本', '線上錄影', '私人課程'], ['you may receive a full refund or transfer to the same workshop in the fall'], ['cannot attend'], '可以全額退費或轉到秋季班。']
  ]);

  set('R-196-200', {
    passage: { title: 'Memo, Floor Directory & E-mail', blocks: B([
      H('Text 1 — Memo'),
      'To: All Ashford Insurance Staff · From: Operations Department · Date: October 1 · Re: Office relocation',
      'As announced last month, our office will move to Kingsley Tower on Monday, October 28. Packing boxes will be delivered to each desk on October 21. Please pack your personal items and label each box with your name and department by 3:00 P.M. on Friday, October 25. Professional movers will handle all computers and furniture.',
      'New building passes will be handed out at the welcome desk in the Kingsley Tower lobby on October 28. Because Kingsley Tower is next to Central Station and parking is limited, we encourage all employees to use public transportation.',
      H('Text 2 — Floor Directory'),
      'Kingsley Tower — Ashford Insurance',
      { type: 'list', items: ['Floor 8: Customer Service', 'Floor 9: Claims', 'Floor 10: Accounting / Human Resources', 'Floor 11: Executive Offices / Legal'] },
      H('Text 3 — E-mail'),
      'To: Operations Department · From: Rina Das, Claims Department · Date: October 22 · Subject: Packing',
      'Hello, I will be away on a business trip to Denver from October 23 to October 29, so I will not be able to pack my desk by the deadline. Would it be possible for someone to pack my things for me? There is not much, just some files and a few personal items.',
      'Also, my team leader asked me to confirm one thing. Our team works closely with the Legal department, and we were hoping to be on the same floor. Could you let me know whether that is the case? Thank you, Rina Das'
    ]) },
    translation: '【備忘錄】收件：Ashford 保險全體員工｜寄件：營運部｜10 月 1 日｜主旨：辦公室搬遷\n如上個月所宣布，我們將於 10 月 28 日（週一）搬到 Kingsley 大樓。打包箱 10 月 21 日會送到每張桌子。請在 10 月 25 日（週五）下午 3 點前打包個人物品，並在每個箱子標上姓名和部門。專業搬家公司會處理所有電腦和家具。新的大樓通行證 10 月 28 日在 Kingsley 大樓大廳的服務台發放。因為 Kingsley 大樓就在中央車站旁邊，而且停車位有限，鼓勵所有員工搭乘大眾運輸。\n【樓層指引】8 樓：客服部｜9 樓：理賠部｜10 樓：會計部／人資部｜11 樓：主管辦公室／法務部\n【Email】10 月 22 日，理賠部 Rina Das 寄給營運部，主旨：打包。您好，我 10 月 23 日到 29 日要去丹佛出差，沒辦法在期限前打包桌子。可以請人幫我打包嗎？東西不多，只有一些檔案和幾樣私人物品。另外，我的組長請我確認一件事。我們組跟法務部合作密切，希望在同一層樓。可以告訴我是不是這樣嗎？謝謝，Rina Das',
    vocab: [['relocation', 'n.', '搬遷'], ['label', 'v.', '貼標籤；標示'], ['mover', 'n.', '搬家工人', 'movers'], ['hand out', 'phr.', '發放', 'handed out'], ['public transportation', 'n.', '大眾運輸'], ['claim', 'n.', '理賠', 'Claims'], ['deadline', 'n.', '期限']]
  }, [
    [196, 'What is the main purpose of the memo?', ['To announce a new department', 'To give instructions about an office move', 'To introduce new parking rules', 'To invite staff to an event'], 'B',
      '備忘錄的主要目的是什麼？', ['宣布新部門', '說明辦公室搬遷的注意事項', '介紹新的停車規定', '邀請員工參加活動'], ['our office will move to Kingsley Tower on Monday, October 28'], ['purpose', 'memo'], '整篇在說搬遷日期、打包期限、通行證等＝搬遷指示。'],
    [197, 'What does the memo encourage employees to do?', ['Arrive early on October 28', 'Pack their computers', 'Apply for a parking space', 'Take public transportation'], 'D',
      '備忘錄鼓勵員工做什麼？', ['10 月 28 日早點到', '自己打包電腦', '申請車位', '搭大眾運輸'], ['we encourage all employees to use public transportation'], ['encourage'], '鼓勵搭大眾運輸。電腦由搬家公司處理。'],
    [198, 'On which floor will Ms. Das most likely work?', ['Floor 8', 'Floor 10', 'Floor 9', 'Floor 11'], 'C',
      'Das 女士最可能在哪一層樓工作？', ['8 樓', '10 樓', '9 樓', '11 樓'], ['From: Rina Das, Claims Department', 'Floor 9: Claims'], ['floor', 'Ms. Das'], '跨篇題：她是理賠部（Claims），樓層表上理賠部在 9 樓。'],
    [199, 'Why is Ms. Das unable to meet the packing deadline?', ['She will be traveling for work.', 'She has too many files.', 'She is moving to a new department.', 'She did not receive any boxes.'], 'A',
      'Das 女士為什麼趕不上打包期限？', ['她要出差。', '她的檔案太多。', '她要調到新部門。', '她沒收到箱子。'], ['I will be away on a business trip to Denver from October 23 to October 29'], ['Why', 'Ms. Das'], '出差到丹佛＝traveling for work。她說東西不多，(B) 錯。'],
    [200, 'What is indicated about the Legal department?', ['It will move after the other departments.', 'It will not be on the same floor as Ms. Das\'s team.', 'It is located next to Central Station.', 'It is part of the Claims department.'], 'B',
      '關於法務部，文中提到什麼？', ['會比其他部門晚搬。', '不會跟 Das 女士的團隊在同一層。', '位在中央車站旁。', '屬於理賠部。'], ['Floor 11: Executive Offices / Legal', 'Floor 9: Claims'], ['Legal department'], '跨篇題：法務部在 11 樓，理賠部在 9 樓，所以她們不會在同一層。']
  ]);
})();
