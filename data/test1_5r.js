/* Test 1 閱讀 Part 7 單篇閱讀（Q147–175，10 篇） */
(function () {
  const set = (group, base, rows) => window.TOEIC_T1.set('R', 'Part 7', group, base, rows);
  const P = (title, subtitle, paras) => ({ title, subtitle, blocks: paras.map((t) => (typeof t === 'string' ? { type: 'p', text: t } : t)) });
  const INS = 'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?';

  set('R-147-148', {
    passage: P('Text-message chain', '', [
      'Ken Morita (8:42 A.M.): Hi, Lucy. Are you already at the trade show? I\'m stuck in traffic on Route 9.',
      'Lucy Grant (8:44 A.M.): Yes, I\'m setting up our booth now. The doors open to the public at 9:30.',
      'Ken Morita (8:45 A.M.): I have the product brochures in my car. I might not get there in time.',
      'Lucy Grant (8:46 A.M.): Don\'t worry. I brought a box of the old ones. They\'ll do for the first hour.',
      'Ken Morita (8:47 A.M.): Great. I\'ll text you when I park.'
    ]),
    translation: 'Ken Morita（上午 8:42）：嗨 Lucy，你已經在商展了嗎？我在 9 號公路塞車。\nLucy Grant（8:44）：對，我正在布置我們的攤位。9:30 開放民眾入場。\nKen（8:45）：產品手冊在我車上，我可能趕不上。\nLucy（8:46）：別擔心，我帶了一箱舊版的，第一個小時夠用了。\nKen（8:47）：太好了。我停好車再傳訊息給你。',
    vocab: [['trade show', 'n.', '商展'], ['be stuck in traffic', 'phr.', '塞在車陣中', "I'm stuck in traffic"], ['set up', 'phr.', '布置；架設', 'setting up'], ['booth', 'n.', '攤位'], ['brochure', 'n.', '手冊', 'brochures'], ['will do', 'phr.', '夠用；可以應付', "They'll do"]]
  }, [
    [147, 'Why is Mr. Morita late?', ['His car broke down.', 'He is in heavy traffic.', 'He went to the wrong building.', 'He forgot the brochures at the office.'], 'B',
      'Morita 先生為什麼遲到？', ['他的車拋錨了。', '他遇到塞車。', '他走錯大樓。', '他把手冊忘在辦公室。'], ["I'm stuck in traffic on Route 9."], ['Why', 'late'], 'stuck in traffic＝塞車。手冊是在他車上，不是忘在辦公室。'],
    [148, 'At 8:46 A.M., what does Ms. Grant mean when she writes, "They\'ll do for the first hour"?', ['The old brochures are good enough for now.', 'Visitors will arrive in an hour.', 'The booth will be ready soon.', 'Mr. Morita should leave early.'], 'A',
      '8:46 時 Grant 女士寫「They\'ll do for the first hour」是什麼意思？', ['舊版手冊暫時夠用。', '訪客一小時後才會到。', '攤位很快就會布置好。', 'Morita 先生應該早點離開。'], ["I brought a box of the old ones. They'll do for the first hour."], ['8:46', "They'll do"], '意圖題：will do＝夠用、可以應付；指她帶的舊手冊可以先撐第一個小時。']
  ]);

  set('R-149-150', {
    passage: P('NOTICE — Westbrook Public Library', '', [
      'The second-floor reading room will be closed from July 8 to July 19 while new lighting and air-conditioning are installed. During this time, the study tables on the first floor will remain available on a first-come, first-served basis.',
      'Group study rooms can still be reserved online, but reservations will be limited to two hours per day. We thank you for your understanding as we work to make the library more comfortable.'
    ]),
    translation: 'Westbrook 公共圖書館公告：二樓閱覽室將於 7 月 8 日至 7 月 19 日關閉，以安裝新的照明與空調設備。這段期間，一樓的自習桌仍開放使用，先到先得。團體討論室仍可上網預約，但每天限制兩小時。我們正努力讓圖書館更舒適，感謝您的體諒。',
    vocab: [['reading room', 'n.', '閱覽室'], ['install', 'v.', '安裝', 'installed'], ['remain available', 'phr.', '仍可使用'], ['first-come, first-served', 'phr.', '先到先得'], ['reserve', 'v.', '預約', 'reserved'], ['be limited to', 'phr.', '限制為', 'will be limited to']]
  }, [
    [149, 'Why will the reading room be closed?', ['It is being used for an event.', 'The furniture is being replaced.', 'The library is reducing its hours.', 'New equipment is being installed.'], 'D',
      '閱覽室為什麼要關閉？', ['要辦活動。', '要更換家具。', '圖書館縮短開放時間。', '要安裝新設備。'], ['while new lighting and air-conditioning are installed'], ['Why', 'closed'], '安裝新的照明與空調＝新設備。'],
    [150, 'What is indicated about the group study rooms?', ['They are closed until July 19.', 'They must be booked in person.', 'Their use will be limited.', 'They are on the second floor.'], 'C',
      '關於團體討論室，文中指出什麼？', ['關閉到 7 月 19 日。', '必須親自去預約。', '使用時間會受限制。', '在二樓。'], ['reservations will be limited to two hours per day'], ['indicated', 'group study rooms'], '每天限兩小時，使用受限。仍可上網預約，(A)(B) 錯。']
  ]);

  set('R-151-152', {
    passage: P('Advertisement', '', [
      'Tired of long lines at the copy shop? Let PrintPro come to you! Our mobile printing van visits office parks across the city every weekday. Simply upload your files to our Web site by 9 A.M., and we\'ll deliver professionally printed documents to your building by noon.',
      'New customers receive 15% off their first order. Business accounts with more than 1,000 pages per month also qualify for free delivery. Visit www.printpro.com to see this week\'s route.'
    ]),
    translation: '受夠影印店大排長龍了嗎？讓 PrintPro 到府服務！我們的行動印刷車平日每天巡迴全市的辦公園區。只要在上午 9 點前把檔案上傳到我們的網站，中午前就會把專業印製的文件送到您的大樓。新客戶首次訂購享 85 折。每月超過 1,000 頁的企業帳戶還可享免運費。請上 www.printpro.com 查看本週路線。',
    vocab: [['office park', 'n.', '辦公園區', 'office parks'], ['upload', 'v.', '上傳'], ['professionally', 'adv.', '專業地'], ['qualify for', 'phr.', '符合…資格'], ['route', 'n.', '路線']]
  }, [
    [151, 'What is being advertised?', ['A delivery printing service', 'A new copy shop', 'An office rental space', 'A Web design company'], 'A',
      '這則廣告在宣傳什麼？', ['外送印刷服務', '新的影印店', '辦公室出租', '網頁設計公司'], ["we'll deliver professionally printed documents to your building by noon"], ['advertised'], '行動印刷車＋送到大樓，是外送印刷服務。'],
    [152, 'How can a business receive free delivery?', ['By uploading files before 9 A.M.', 'By being a new customer', 'By printing over 1,000 pages a month', 'By visiting the Web site weekly'], 'C',
      '企業怎樣可以免運費？', ['上午 9 點前上傳檔案', '成為新客戶', '每月印超過 1,000 頁', '每週上網站'], ['Business accounts with more than 1,000 pages per month also qualify for free delivery.'], ['free delivery'], '每月超過 1,000 頁享免運；新客戶是 85 折，(B) 錯。']
  ]);

  set('R-153-155', {
    passage: P('E-mail', 'To: All Sales Staff · From: Olivia Reyes · Date: March 2 · Subject: New expense system', [
      'Starting April 1, all travel expenses must be submitted through our new online system, ExpenseNow, instead of on paper forms. The new system will allow your claims to be approved faster, usually within five business days.',
      'To help you get started, Tom Becker from the finance department will hold two short training sessions on March 15 in Room 204: one at 10 A.M. and one at 3 P.M. You only need to attend one. Please sign up for a session by replying to this e-mail by March 10.',
      'Paper forms submitted after March 31 will be returned without being processed. If you have any questions in the meantime, please contact Tom directly at extension 418.'
    ]),
    translation: '致全體業務人員，寄件者 Olivia Reyes，3 月 2 日，主旨：新的報帳系統。\n自 4 月 1 日起，所有差旅費都必須透過新的線上系統 ExpenseNow 申報，不再使用紙本表格。新系統能讓申請更快核准，通常五個工作天內。為了幫助大家上手，財務部的 Tom Becker 會在 3 月 15 日於 204 室舉辦兩場簡短的訓練：上午 10 點和下午 3 點各一場，只要參加其中一場即可。請在 3 月 10 日前回覆這封 email 報名。3 月 31 日之後交的紙本表格將退回不處理。在此之前若有任何問題，請直接打分機 418 聯絡 Tom。',
    vocab: [['submit', 'v.', '提交', 'submitted'], ['claim', 'n.', '申請（報帳）', 'claims'], ['approve', 'v.', '核准', 'approved'], ['business day', 'n.', '工作天', 'business days'], ['finance department', 'n.', '財務部'], ['process', 'v.', '處理', 'processed'], ['in the meantime', 'phr.', '在此期間'], ['extension', 'n.', '（電話）分機']]
  }, [
    [153, 'What is the purpose of the e-mail?', ['To announce a change in procedure', 'To introduce a new employee', 'To request travel receipts', 'To explain a budget cut'], 'A',
      '這封 email 的目的是什麼？', ['宣布流程變更', '介紹新員工', '索取差旅收據', '說明預算刪減'], ['all travel expenses must be submitted through our new online system'], ['purpose'], '報帳從紙本改成線上系統，是流程（procedure）變更。'],
    [154, 'What are employees asked to do by March 10?', ['Submit their paper forms', 'Contact Mr. Becker', 'Register for a training session', 'Install a new program'], 'C',
      '員工被要求在 3 月 10 日前做什麼？', ['交紙本表格', '聯絡 Becker 先生', '報名一場訓練', '安裝新程式'], ['Please sign up for a session by replying to this e-mail by March 10.'], ['by March 10'], 'sign up for a session＝報名訓練。'],
    [155, 'What will happen to paper forms submitted after March 31?', ['They will be processed more slowly.', 'They will need a manager\'s signature.', 'They will be stored online.', 'They will be sent back.'], 'D',
      '3 月 31 日後交的紙本表格會怎樣？', ['處理得比較慢。', '需要主管簽名。', '會被存到線上。', '會被退回。'], ['Paper forms submitted after March 31 will be returned without being processed.'], ['after March 31'], 'returned＝退回（sent back）。']
  ]);

  set('R-156-158', {
    passage: P('Greenleaf Garden Supply — INVOICE', 'Invoice #20481 · Date: May 14 · Customer: Riverside Café, 18 Elm Street', [
      { type: 'list', items: ['Ceramic flower pots (large) × 6 — $108.00', 'Potting soil, 20 kg bags × 4 — $56.00', 'Herb seedlings (basil, mint) × 12 — $42.00', 'Delivery — $0.00', 'TOTAL — $206.00'] },
      'Payment due within 30 days. Orders over $150 qualify for free delivery. Please note that live plants cannot be returned; other items may be returned within 14 days with this invoice.'
    ]),
    translation: 'Greenleaf 園藝用品——請款單 #20481，5 月 14 日，客戶：Riverside 咖啡館（Elm 街 18 號）。大型陶瓷花盆 × 6：108 美元；培養土 20 公斤 × 4 袋：56 美元；香草苗（羅勒、薄荷）× 12：42 美元；運費：0 元；總計 206 美元。請於 30 天內付款。訂單超過 150 美元免運費。請注意，活體植物不接受退貨；其他商品憑本請款單可於 14 天內退貨。',
    vocab: [['invoice', 'n.', '請款單；發票'], ['ceramic', 'adj.', '陶瓷的'], ['potting soil', 'n.', '培養土'], ['seedling', 'n.', '幼苗', 'seedlings'], ['payment due', 'phr.', '付款期限'], ['live plant', 'n.', '活體植物', 'live plants']]
  }, [
    [156, 'What most likely is Riverside Café planning to do?', ['Open a second location', 'Grow plants at its business', 'Sell gardening tools', 'Hold a cooking class'], 'B',
      'Riverside 咖啡館最可能打算做什麼？', ['開第二家店', '在店裡種植物', '販售園藝工具', '開烹飪課'], ['Ceramic flower pots (large) × 6', 'Herb seedlings (basil, mint) × 12'], ['planning'], '買花盆、培養土和香草苗，推論要在店裡種植物。'],
    [157, 'Why was there no delivery charge?', ['The café picked up the items.', 'The delivery was late.', 'A coupon was used.', 'The order exceeded a certain amount.'], 'D',
      '為什麼不收運費？', ['咖啡館自己取貨。', '送貨延遲了。', '用了折價券。', '訂單超過某個金額。'], ['Orders over $150 qualify for free delivery.'], ['Why', 'no delivery charge'], '總計 $206 超過 $150，所以免運。'],
    [158, 'Which items CANNOT be returned?', ['The flower pots', 'The potting soil', 'The herb seedlings', 'All of the items'], 'C',
      '哪些商品「不能」退貨？', ['花盆', '培養土', '香草苗', '全部商品'], ['live plants cannot be returned'], ['CANNOT be returned'], '活體植物不能退，對應香草苗。']
  ]);

  set('R-159-161', {
    passage: P('Online chat discussion', '', [
      'Hannah Lee [10:02 A.M.]: Hi, team. The client just moved the product demo up to Thursday instead of next Monday.',
      'Raj Patel [10:03 A.M.]: Thursday? The new features won\'t be fully tested by then.',
      'Hannah Lee [10:04 A.M.]: I know. Could we show only the features that are ready?',
      'Sofia Marin [10:06 A.M.]: That works. The search and reporting tools are stable. I can prepare slides for those today.',
      'Raj Patel [10:07 A.M.]: OK. I\'ll ask two people from QA to help me finish testing the dashboard. If it passes, we can add it.',
      'Hannah Lee [10:08 A.M.]: Perfect. Let\'s meet at 4 P.M. to review everything.'
    ]),
    translation: 'Hannah Lee（10:02）：嗨，各位。客戶剛把產品展示提前到週四，原本是下週一。\nRaj Patel（10:03）：週四？到時新功能還沒測完。\nHannah（10:04）：我知道。能不能只展示已經完成的功能？\nSofia Marin（10:06）：可以。搜尋和報表工具很穩定，我今天可以準備這兩個的投影片。\nRaj（10:07）：好。我會請品管部兩個人幫我把儀表板測完，如果通過就可以加進去。\nHannah（10:08）：太好了。我們下午四點開會檢查全部內容。',
    vocab: [['move … up', 'phr.', '提前', 'moved the product demo up'], ['demo', 'n.', '展示'], ['feature', 'n.', '功能', 'features'], ['stable', 'adj.', '穩定的'], ['QA (quality assurance)', 'n.', '品質保證；品管', 'QA'], ['dashboard', 'n.', '儀表板（介面）']]
  }, [
    [159, 'What problem does Ms. Lee mention?', ['A client canceled a meeting.', 'A deadline has become earlier.', 'Some slides are missing.', 'A team member is sick.'], 'B',
      'Lee 女士提到什麼問題？', ['客戶取消會議。', '期限提前了。', '有些投影片不見了。', '有位組員生病。'], ['The client just moved the product demo up to Thursday instead of next Monday.'], ['problem', 'Ms. Lee'], 'move up＝提前，展示期限變早了。'],
    [160, 'At 10:06 A.M., what does Ms. Marin mean when she writes, "That works"?', ['She agrees with a suggestion.', 'A program is running correctly.', 'She has finished her task.', 'A room is available.'], 'A',
      '10:06 時 Marin 女士寫「That works」是什麼意思？', ['她同意一個建議。', '有個程式正常運作。', '她完成工作了。', '有個房間可以用。'], ['Could we show only the features that are ready?', 'That works.'], ['10:06', 'That works'], '意圖題：回應 Hannah「只展示完成的功能」的提議，That works＝可以、沒問題。'],
    [161, 'What will Mr. Patel do next?', ['Prepare presentation slides', 'Contact the client', 'Get help with testing', 'Reschedule the 4 P.M. meeting'], 'C',
      'Patel 先生接下來會做什麼？', ['準備簡報投影片', '聯絡客戶', '找人幫忙測試', '更改四點的會議'], ["I'll ask two people from QA to help me finish testing the dashboard."], ['Mr. Patel', 'next'], '他要請品管兩個人幫忙完成測試。投影片是 Sofia 要做的。']
  ]);

  set('R-162-164', {
    passage: P('Coastline Ferries Adds Evening Service', 'PORT HAVEN (June 5) —', [
      'Coastline Ferries announced on Monday that it will add an evening route between Port Haven and Gull Island beginning July 1. — [1] — The new ferry will depart Port Haven at 7:30 P.M. and return from Gull Island at 9:00 P.M. daily through September.',
      'The company says the change is a response to requests from island restaurants and hotels, whose guests often had to leave early to catch the last ferry at 5 P.M. — [2] — "Visitors can now enjoy dinner and the sunset on the island," said spokesperson Ellen Ward.',
      'Tickets for the evening route will cost the same as daytime fares. — [3] — Passengers are encouraged to book online, as space on the smaller evening ferry is limited to 120 people. — [4] —'
    ]),
    translation: '海岸渡輪新增晚間班次。Port Haven 訊（6 月 5 日）——Coastline 渡輪週一宣布，7 月 1 日起將新增 Port Haven 與 Gull 島之間的晚間航線。新渡輪每天晚上 7:30 從 Port Haven 出發，9:00 從 Gull 島返航，營運到 9 月。公司表示，這項調整是回應島上餐廳和飯店的要求，因為他們的客人常常得提早離開去趕下午 5 點的末班船。「遊客現在可以在島上享用晚餐、欣賞夕陽了。」發言人 Ellen Ward 說。晚間航線的票價與日間相同。本地居民另享九折優惠。由於晚班的小型渡輪限載 120 人，建議旅客上網預訂。',
    vocab: [['ferry', 'n.', '渡輪'], ['route', 'n.', '航線'], ['depart', 'v.', '出發'], ['in response to', 'phr.', '回應'], ['catch', 'v.', '趕上（交通工具）'], ['spokesperson', 'n.', '發言人'], ['fare', 'n.', '票價', 'fares'], ['be encouraged to', 'phr.', '被鼓勵；建議', 'are encouraged to']]
  }, [
    [162, 'What is the article mainly about?', ['A new ferry schedule', 'A hotel opening on an island', 'A rise in ticket prices', 'A change in company leadership'], 'A',
      '這篇文章主要在講什麼？', ['新的渡輪班表', '島上新飯店開幕', '票價上漲', '公司領導階層異動'], ['it will add an evening route between Port Haven and Gull Island'], ['mainly about'], '新增晚間航線＝新班表。票價與日間相同，(C) 錯。'],
    [163, 'Why did Coastline Ferries make the change?', ['To reduce fuel costs', 'To compete with an airline', 'To replace an older ferry', 'To respond to local businesses'], 'D',
      'Coastline 渡輪為什麼做這項調整？', ['降低燃料成本', '與航空公司競爭', '汰換舊渡輪', '回應當地業者'], ['the change is a response to requests from island restaurants and hotels'], ['Why', 'change'], '島上餐廳和飯店（local businesses）提出要求。'],
    [164, INS + ' "Local residents will also receive a 10 percent discount."', ['[1]', '[2]', '[3]', '[4]'], 'C',
      '下面這句最適合放在 [1]～[4] 哪個位置？「本地居民另享九折優惠。」', ['[1]', '[2]', '[3]', '[4]'], ['Tickets for the evening route will cost the same as daytime fares.'], ['positions marked'], '句子插入題：also 提示前面也在講票價，[3] 前一句正是票價，所以放 [3]。']
  ]);

  set('R-165-167', {
    passage: P('Letter', 'Dr. Samuel Okafor · 45 Linden Road, Fairfield', [
      'Dear Dr. Okafor,',
      'On behalf of the Fairfield Science Museum, I would like to thank you for agreeing to give the opening lecture at our "Oceans of Tomorrow" exhibition on September 9. Your research on coral reefs is exactly the kind of work we want our visitors to learn about.',
      'As we discussed by phone, the lecture will begin at 6:30 P.M. in the main auditorium and should last about forty-five minutes, followed by a short question-and-answer session. A projector and a wireless microphone will be provided. If you plan to show any videos, please send them to our technical team by September 2 so they can be tested in advance.',
      'We will also arrange a hotel room for you for the night of September 9. Please let me know if you require any other accommodations.',
      'Sincerely, Joanna Pierce, Events Coordinator'
    ]),
    translation: '親愛的 Okafor 博士：我謹代表 Fairfield 科學博物館，感謝您答應在 9 月 9 日「明日海洋」特展的開幕演講。您對珊瑚礁的研究，正是我們希望參觀者認識的研究。如同電話中討論的，演講將於晚上 6:30 在主禮堂開始，約四十五分鐘，之後有簡短的問答時間。我們會提供投影機和無線麥克風。如果您打算播放影片，請在 9 月 2 日前寄給我們的技術團隊，以便事先測試。我們也會為您安排 9 月 9 日當晚的飯店房間。若您還需要其他安排，請告訴我。活動協調員 Joanna Pierce 敬上',
    vocab: [['on behalf of', 'phr.', '代表'], ['lecture', 'n.', '演講'], ['coral reef', 'n.', '珊瑚礁', 'coral reefs'], ['auditorium', 'n.', '禮堂'], ['question-and-answer session', 'n.', '問答時間'], ['in advance', 'phr.', '事先'], ['accommodations', 'n.', '（住宿等）安排'], ['coordinator', 'n.', '協調員']]
  }, [
    [165, 'Why did Ms. Pierce write to Dr. Okafor?', ['To invite him to visit an exhibition', 'To confirm details of a talk', 'To ask him to review a research paper', 'To change the date of an event'], 'B',
      'Pierce 女士為什麼寫信給 Okafor 博士？', ['邀請他參觀展覽', '確認演講細節', '請他審閱研究論文', '更改活動日期'], ['As we discussed by phone, the lecture will begin at 6:30 P.M.'], ['Why', 'write'], '他已經答應演講，信中確認時間、地點、設備等細節。'],
    [166, 'What is Dr. Okafor asked to do by September 2?', ['Send any video files', 'Book a hotel room', 'Submit his research', 'Test the microphone'], 'A',
      'Okafor 博士被要求在 9 月 2 日前做什麼？', ['寄送影片檔', '訂飯店', '交研究報告', '測試麥克風'], ['please send them to our technical team by September 2'], ['by September 2'], '要播放影片就在 9 月 2 日前寄給技術團隊。飯店由博物館安排。'],
    [167, 'What is suggested about Dr. Okafor?', ['He works at the museum.', 'He will speak for two hours.', 'He has spoken with Ms. Pierce before.', 'He lives near the museum.'], 'C',
      '關於 Okafor 博士，文中暗示了什麼？', ['他在博物館工作。', '他會演講兩小時。', '他之前跟 Pierce 女士談過。', '他住在博物館附近。'], ['As we discussed by phone'], ['suggested'], 'As we discussed by phone 表示兩人之前通過電話。博物館還幫他訂飯店，暗示他不住附近，(D) 錯。']
  ]);

  set('R-168-171', {
    passage: P('Local Business Spotlight: Hillside Bakery', '', [
      'When Maria Costa opened Hillside Bakery in 2015, she had only one oven and a small counter. — [1] — Today, the bakery employs fourteen people and supplies bread to more than twenty restaurants in the city.',
      'Costa credits much of her success to a decision she made early on: using flour from local farms. "It costs a little more, but customers can taste the difference," she said. — [2] — The bakery\'s sourdough loaf, made with a recipe from Costa\'s grandmother, has won the city\'s Best Bread award three years in a row.',
      'This spring, Hillside will move to a larger building on Market Street, where it plans to add a café with seating for forty customers. — [3] — Costa also hopes to offer weekend baking classes for beginners.',
      '"We started small, and we want to stay connected to the neighborhood," Costa said. — [4] — The new location is scheduled to open on April 12.'
    ]),
    translation: '在地商家專訪：Hillside 麵包坊。Maria Costa 在 2015 年開設 Hillside 麵包坊時，只有一台烤箱和一個小櫃台。如今麵包坊雇用了十四人，供應麵包給市內二十多家餐廳。Costa 認為成功很大部分要歸功於她早期做的一個決定：使用本地農場的麵粉。「成本高一點，但顧客吃得出差別。」她說。麵包坊的酸種麵包用的是 Costa 祖母的食譜，已連續三年獲得全市最佳麵包獎。今年春天，Hillside 將搬到 Market 街一棟較大的建築，並計畫增設可容納四十人的咖啡座。Costa 也希望開設給初學者的週末烘焙課程。「我們從小規模起步，也想和社區保持連結。」Costa 說。（她甚至計畫把舊店面捐給當地一個青年藝術社團。）新店預定 4 月 12 日開幕。',
    vocab: [['employ', 'v.', '雇用', 'employs'], ['supply', 'v.', '供應', 'supplies'], ['credit A to B', 'phr.', '把 A 歸功於 B', 'credits much of her success to'], ['flour', 'n.', '麵粉'], ['sourdough', 'n.', '酸種麵包'], ['in a row', 'phr.', '連續'], ['seating', 'n.', '座位'], ['be scheduled to', 'phr.', '預定', 'is scheduled to']]
  }, [
    [168, 'What is the article mainly about?', ['A baking competition', 'The history and plans of a business', 'A new recipe for sourdough bread', 'A shortage of local flour'], 'B',
      '這篇文章主要在講什麼？', ['烘焙比賽', '一家店的歷史與計畫', '新的酸種麵包食譜', '本地麵粉短缺'], ['When Maria Costa opened Hillside Bakery in 2015', 'This spring, Hillside will move to a larger building'], ['mainly about'], '從創業講到現在，再講搬遷計畫。'],
    [169, 'According to Ms. Costa, why has the bakery been successful?', ['It uses local ingredients.', 'It has low prices.', 'It is open twenty-four hours.', 'It advertises on television.'], 'A',
      '根據 Costa 女士，麵包坊為什麼成功？', ['使用本地食材。', '價格低。', '24 小時營業。', '在電視上打廣告。'], ['using flour from local farms'], ['successful'], '成功歸功於使用本地農場麵粉。她說成本較高，(B) 錯。'],
    [170, 'What is NOT mentioned as a plan for the new location?', ['A seating area', 'Baking classes', 'A delivery service', 'A larger building'], 'C',
      '下列哪一項「不是」新店的計畫？', ['用餐座位區', '烘焙課程', '外送服務', '更大的建築'], ['where it plans to add a café with seating for forty customers', 'Costa also hopes to offer weekend baking classes for beginners.'], ['NOT mentioned'], 'NOT 題：座位、課程、搬到更大建築都有提到，只有外送沒提到。'],
    [171, INS + ' "She even plans to donate the old storefront to a local youth art club."', ['[1]', '[2]', '[3]', '[4]'], 'D',
      '下面這句最適合放在 [1]～[4] 哪個位置？「她甚至計畫把舊店面捐給當地青年藝術社團。」', ['[1]', '[2]', '[3]', '[4]'], ['"We started small, and we want to stay connected to the neighborhood," Costa said.'], ['positions marked'], '句子插入題：even 補強「與社區保持連結」，捐舊店面給社區社團正好呼應，放 [4]。']
  ]);

  set('R-172-175', {
    passage: P('Online chat discussion', '', [
      'Diego Alvarez [2:10 P.M.]: Hi, all. I just got the quote from Summit Travel for our sales conference in Denver. Flights and hotel for 18 people come to $14,200.',
      'Karen Liu [2:12 P.M.]: That\'s higher than we budgeted. We planned for $12,000.',
      'Diego Alvarez [2:13 P.M.]: The hotel near the convention center is the expensive part. There\'s another one about ten minutes away by shuttle that would save around $1,800.',
      'Mark Jensen [2:15 P.M.]: A shuttle is fine by me, as long as it runs early. Our sessions start at 8 A.M.',
      'Diego Alvarez [2:16 P.M.]: The first shuttle leaves at 6:45, and they run every twenty minutes.',
      'Karen Liu [2:18 P.M.]: Then let\'s go with the second hotel. Diego, can you ask Summit Travel for a revised quote? I\'ll need it by Thursday to get final approval from the director.',
      'Diego Alvarez [2:19 P.M.]: Will do.'
    ]),
    translation: 'Diego Alvarez（2:10）：嗨，各位。我剛拿到 Summit 旅行社的報價，是我們丹佛業務大會的。18 個人的機票加飯店共 14,200 美元。\nKaren Liu（2:12）：比我們的預算高。我們預計 12,000 美元。\nDiego（2:13）：會議中心旁邊的飯店是貴的部分。另一家搭接駁車大約十分鐘，可以省 1,800 美元左右。\nMark Jensen（2:15）：搭接駁車我可以，只要夠早開。我們的議程早上 8 點開始。\nDiego（2:16）：第一班接駁車 6:45 出發，每二十分鐘一班。\nKaren（2:18）：那就選第二家飯店。Diego，可以請 Summit 旅行社給一份修改後的報價嗎？我週四前需要，好讓主任做最後核准。\nDiego（2:19）：沒問題。',
    vocab: [['quote', 'n.', '報價'], ['come to', 'phr.', '總計'], ['budget', 'v.', '編列預算', 'budgeted'], ['convention center', 'n.', '會議中心'], ['shuttle', 'n.', '接駁車'], ['as long as', 'phr.', '只要'], ['revised', 'adj.', '修改過的'], ['approval', 'n.', '核准'], ['Will do.', 'phr.', '會辦好（沒問題）']]
  }, [
    [172, 'Why is Mr. Alvarez contacting his coworkers?', ['To share a travel estimate', 'To announce a new client', 'To cancel a conference', 'To request vacation time'], 'A',
      'Alvarez 先生為什麼聯絡同事？', ['分享差旅報價', '宣布新客戶', '取消會議', '請假'], ['I just got the quote from Summit Travel for our sales conference in Denver.'], ['Why', 'contacting'], 'quote＝報價（estimate）。'],
    [173, 'What is suggested about the hotel near the convention center?', ['It is fully booked.', 'It costs more than the other hotel.', 'It does not offer a shuttle.', 'It is ten minutes away.'], 'B',
      '關於會議中心旁的飯店，文中暗示什麼？', ['客滿了。', '比另一家貴。', '沒有接駁車。', '在十分鐘車程外。'], ['The hotel near the convention center is the expensive part.'], ['hotel near the convention center'], 'the expensive part＝比較貴；換另一家可省 1,800。十分鐘的是另一家飯店。'],
    [174, 'At 2:15 P.M., what does Mr. Jensen mean when he writes, "A shuttle is fine by me"?', ['He would rather drive his own car.', 'He prefers the hotel near the center.', 'He does not mind using a shuttle.', 'He will arrange the shuttle himself.'], 'C',
      '2:15 時 Jensen 先生寫「A shuttle is fine by me」是什麼意思？', ['他寧願自己開車。', '他比較想住會議中心旁的飯店。', '他不介意搭接駁車。', '他會自己安排接駁車。'], ['A shuttle is fine by me, as long as it runs early.'], ['2:15', 'fine by me'], '意圖題：fine by me＝我可以接受。'],
    [175, 'What does Ms. Liu need by Thursday?', ['A list of attendees', 'A shuttle timetable', 'A conference agenda', 'An updated price quote'], 'D',
      'Liu 女士週四前需要什麼？', ['出席者名單', '接駁車時刻表', '會議議程', '更新後的報價'], ["can you ask Summit Travel for a revised quote? I'll need it by Thursday"], ['by Thursday'], 'revised quote＝更新後的報價。']
  ]);
})();
