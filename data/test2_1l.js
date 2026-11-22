/* Test 2 聽力 Part 1 照片描述（Q1–6）＋ Part 2 應答問題（Q7–31）
   Part 1 照片：StockSnap CC0（公眾領域，可自由使用），出處見 images/p1/CREDITS.md */
(function () {
  const S = window.TOEIC_T2.spoken;
  const pic = (n, alt) => ({ type: 'image', src: 'images/p1/t2_' + n + '.jpg', alt });

  /* ---------------- Part 1 ---------------- */
  S('Part 1', 1, { R: 'bf_emma' }, '', ["She's erasing a chalkboard.", "She's hanging a picture on a wall.", "She's facing an audience.", "She's writing on a whiteboard."], 'D',
    '(D) 她正在白板上寫字。', ['她正在擦黑板。', '她正在牆上掛畫。', '她正面對著觀眾。', '她正在白板上寫字。'],
    '照片中女子背對鏡頭，舉手在白板上寫字。(A) erase 是擦掉，動作不對；(C) 她面向白板，不是面向觀眾。', [['whiteboard', 'n.', '白板'], ['erase', 'v.', '擦掉', 'erasing'], ['face', 'v.', '面向', 'facing'], ['audience', 'n.', '觀眾']], pic(1, '女子背對鏡頭在白板上寫字'));
  S('Part 1', 2, { R: 'am_adam' }, '', ["He's holding on to a railing.", "He's purchasing a ticket at a counter.", "He's loading a suitcase onto a train.", "He's taking off his glasses."], 'A',
    '(A) 他正抓著扶手。', ['他正抓著扶手。', '他正在櫃台買票。', '他正把行李箱搬上火車。', '他正在摘下眼鏡。'],
    '男子站在火車車門口，一手抓著門邊的扶手。照片裡沒有行李箱，他戴著眼鏡但沒有在摘，(C)(D) 錯。', [['hold on to', 'phr.', '抓住', 'holding on to'], ['railing', 'n.', '扶手；欄杆'], ['purchase', 'v.', '購買', 'purchasing'], ['load', 'v.', '裝載', 'loading']], pic(2, '戴眼鏡的男子站在火車車門口抓著扶手'));
  S('Part 1', 3, { R: 'af_nicole' }, '', ['Some people are waiting at a bus stop.', 'A road is being repaired.', 'Some people are crossing a street.', 'Cars are parked along a sidewalk.'], 'C',
    '(C) 有些人正在過馬路。', ['有些人在公車站等車。', '一條路正在整修。', '有些人正在過馬路。', '車子沿著人行道停放。'],
    '兩位女子正走在斑馬線上過馬路。(B) be being repaired 需要有人正在施工，照片中沒有。', [['cross', 'v.', '穿越', 'crossing'], ['sidewalk', 'n.', '人行道'], ['repair', 'v.', '修理', 'repaired']], pic(3, '兩位女子從斑馬線上走過馬路'));
  S('Part 1', 4, { R: 'bm_lewis' }, '', ['A customer is paying for some books.', 'Books have been placed on shelves.', 'A librarian is stacking some magazines.', 'Some shelves are being assembled.'], 'B',
    '(B) 書已經被擺在書架上。', ['一位顧客正在付書錢。', '書已經被擺在書架上。', '一位圖書館員正在堆雜誌。', '有些書架正在被組裝。'],
    '照片中沒有人，只有擺滿書的書架。有人物動作的 (A)(C) 一定錯；(D) be being assembled 表示有人正在組裝，也不對。', [['place', 'v.', '放置', 'placed'], ['shelf', 'n.', '架子（複數 shelves）', 'shelves'], ['stack', 'v.', '堆疊', 'stacking'], ['assemble', 'v.', '組裝', 'assembled']], pic(4, '書架上擺滿了書，沒有人'));
  S('Part 1', 5, { R: 'am_eric' }, '', ['Some tools have been left on a work surface.', "A man is hammering a nail into a wall.", "A man is putting on safety gloves.", 'A toolbox is being carried outside.'], 'A',
    '(A) 有些工具被放在工作台上。', ['有些工具被放在工作台上。', '一名男子正在把釘子敲進牆裡。', '一名男子正在戴安全手套。', '一個工具箱正被搬到外面。'],
    '桌上散放著槌子、剪刀等工具。男子雙手在處理小零件，沒有在敲釘子，也沒戴手套。描述「物品狀態」的 have been left 是答案。', [['work surface', 'n.', '工作台面'], ['hammer', 'v.', '用槌子敲', 'hammering'], ['nail', 'n.', '釘子'], ['put on', 'phr.', '穿戴（動作）', 'putting on']], pic(5, '男子站在工作桌前，桌上放著槌子、剪刀等工具'));
  S('Part 1', 6, { R: 'af_bella' }, '', ['Some cups are being washed in a sink.', 'A worker is wiping a counter.', 'Some coffee beans are being weighed.', 'A worker is pouring water from a kettle.'], 'D',
    '(D) 一位店員正從水壺倒水。', ['有些杯子正在水槽被清洗。', '一位店員正在擦櫃台。', '有些咖啡豆正在被秤重。', '一位店員正從水壺倒水。'],
    '咖啡店員拿著細嘴壺把熱水倒進濾杯。(A)(B)(C) 都是咖啡店常見動作，但照片裡沒有發生。', [['pour', 'v.', '倒', 'pouring'], ['kettle', 'n.', '水壺'], ['wipe', 'v.', '擦拭', 'wiping'], ['weigh', 'v.', '秤重', 'weighed']], pic(6, '咖啡店員用不鏽鋼細嘴壺把熱水倒入濾杯'));

  /* ---------------- Part 2 ---------------- */
  const p2 = (id, q, r, prompt, opts, ans, zh, oz, expl, vocab) => S('Part 2', id, { Q: q, R: r }, prompt, opts, ans, zh, oz, expl, vocab);
  p2(7, 'am_michael', 'af_heart', 'Where should I put these delivery boxes?', ['Just leave them by the back door.', 'They arrived this morning.', 'Yes, I ordered them.'], 'A',
    '這些送來的箱子要放哪裡？——放在後門旁邊就好。', ['放在後門旁邊就好。', '它們今天早上到的。', '是的，是我訂的。'], 'Where 問地點，(A) 回答地點。(B) 答時間，(C) Wh- 問句不能用 Yes 回答。', [['delivery', 'n.', '送貨'], ['back door', 'n.', '後門']]);
  p2(8, 'bf_isabella', 'am_eric', 'When will the new parking rules take effect?', ['In the underground garage.', 'Starting the first of next month.', 'About twenty dollars a day.'], 'B',
    '新的停車規定什麼時候生效？——從下個月一號開始。', ['在地下停車場。', '從下個月一號開始。', '一天大約二十美元。'], 'When 問時間，(B) 回答時間。(A) 答地點是 parking 的聯想陷阱。', [['take effect', 'phr.', '生效'], ['underground garage', 'n.', '地下停車場']]);
  p2(9, 'am_adam', 'bf_emma', "Who's giving the presentation at the client meeting?", ['It was very persuasive.', 'At two thirty tomorrow.', "Mr. Okafor from the sales team."], 'C',
    '誰要在客戶會議上做簡報？——業務部的 Okafor 先生。', ['內容很有說服力。', '明天兩點半。', '業務部的 Okafor 先生。'], 'Who 問人，(C) 回答人名＋部門。', [['presentation', 'n.', '簡報'], ['persuasive', 'adj.', '有說服力的']]);
  p2(10, 'af_sarah', 'bm_george', 'Why is the elevator out of service?', ['On the fifth floor.', "It's getting its annual inspection.", 'Please take the stairs next time.'], 'B',
    '電梯為什麼停用？——正在做年度檢查。', ['在五樓。', '正在做年度檢查。', '下次請走樓梯。'], 'Why 問原因，(B) 說明原因。(C) 是 elevator 的聯想陷阱，沒有回答原因。', [['out of service', 'phr.', '停止使用'], ['annual inspection', 'n.', '年度檢查']]);
  p2(11, 'bm_lewis', 'af_nicole', 'How did the product launch go?', ['Better than we expected.', 'At the convention center.', "I'll launch it tomorrow."], 'A',
    '產品發表會進行得如何？——比我們預期的好。', ['比我們預期的好。', '在會議中心。', '我明天會發表它。'], 'How did … go? 問結果，(A) 回答。(C) 重複 launch 是字面陷阱。', [['product launch', 'n.', '產品發表'], ['convention center', 'n.', '會議中心']]);
  p2(12, 'af_heart', 'am_michael', "Why don't we order lunch for the training participants?", ['About thirty people.', 'The training room is upstairs.', "Good idea. I'll find a caterer."], 'C',
    '我們何不幫受訓學員訂午餐？——好主意，我來找外燴。', ['大約三十人。', '訓練教室在樓上。', '好主意，我來找外燴。'], "Why don't we…? 是提議，不是問原因；(C) 接受提議。", [['participant', 'n.', '參加者', 'participants'], ['caterer', 'n.', '外燴業者']]);
  p2(13, 'am_eric', 'bf_isabella', 'Would you like a window seat or an aisle seat?', ['Yes, I would.', 'An aisle seat, please.', 'The flight leaves at noon.'], 'B',
    '您要靠窗還是靠走道的座位？——請給我靠走道。', ['是的，我要。', '請給我靠走道。', '班機中午起飛。'], '選擇疑問句不能用 Yes/No 回答；(B) 直接選走道。', [['aisle seat', 'n.', '靠走道座位'], ['window seat', 'n.', '靠窗座位']]);
  p2(14, 'bf_emma', 'am_adam', "Didn't Laura already approve the budget?", ["She's still reviewing a few items.", 'About five thousand dollars.', 'Approval forms are on my desk.'], 'A',
    'Laura 不是已經核准預算了嗎？——她還在審幾個項目。', ['她還在審幾個項目。', '大約五千美元。', '核准表格在我桌上。'], '否定疑問句確認進度，(A) 表示還沒核准。(C) approve/Approval 字形陷阱。', [['approve', 'v.', '核准'], ['review', 'v.', '審查', 'reviewing']]);
  p2(15, 'am_michael', 'af_sarah', "The new printer is easy to use, isn't it?", ['Print two copies, please.', 'It was delivered yesterday.', "Yes, much easier than the old one."], 'C',
    '新的印表機很好用，對吧？——對，比舊的好用多了。', ['請印兩份。', '昨天送來的。', '對，比舊的好用多了。'], '附加問句徵求同意，(C) 同意並補充比較。', [['easy to use', 'phr.', '好用的']]);
  p2(16, 'af_nicole', 'bm_lewis', "I can't find the key to the supply cabinet.", ['A few boxes of pens.', 'Mr. Reyes has a spare one.', "It's a key point."], 'B',
    '我找不到備品櫃的鑰匙。——Reyes 先生有一把備用的。', ['幾盒筆。', 'Reyes 先生有一把備用的。', '這是重點。'], '直述句說出問題，(B) 提供解決辦法。(C) key 一字多義陷阱。', [['supply cabinet', 'n.', '備品櫃'], ['spare', 'adj.', '備用的']]);
  p2(17, 'bm_george', 'af_bella', 'Would you mind proofreading this brochure before lunch?', ["Not at all. Leave it with me.", 'Lunch was delicious.', "It's a colorful brochure."], 'A',
    '你介意午餐前幫我校對這份手冊嗎？——一點也不，交給我吧。', ['一點也不，交給我吧。', '午餐很好吃。', '這本手冊很繽紛。'], 'Would you mind…? 回答 Not at all 表示「不介意」＝答應。', [['proofread', 'v.', '校對', 'proofreading'], ['brochure', 'n.', '小冊子']]);
  p2(18, 'af_bella', 'am_eric', 'What time does the shuttle bus leave for the airport?', ['From the hotel entrance.', 'It takes about forty minutes.', 'Every hour on the hour.'], 'C',
    '機場接駁車幾點出發？——每小時整點一班。', ['從飯店門口。', '大約要四十分鐘。', '每小時整點一班。'], 'What time 問時刻，(C) 回答整點發車。(B) 答所需時間，是 How long 的答案。', [['shuttle bus', 'n.', '接駁車'], ['on the hour', 'phr.', '在整點']]);
  p2(19, 'am_eric', 'bf_emma', 'How long will the renovation take?', ['The lobby and the cafeteria.', 'At least three weeks.', "It's quite expensive."], 'B',
    '整修要多久？——至少三週。', ['大廳和員工餐廳。', '至少三週。', '相當昂貴。'], 'How long 問時間長度，(B) 回答期間。', [['renovation', 'n.', '整修'], ['at least', 'phr.', '至少']]);
  p2(20, 'af_heart', 'bm_george', 'Which supplier offered the lowest price?', ['Harbor Industries did.', 'Supplies are running low.', 'The price includes delivery.'], 'A',
    '哪一家供應商報價最低？——Harbor 工業。', ['Harbor 工業。', '備品快用完了。', '價格包含運費。'], 'Which 問哪一個，(A) 回答公司名。(B) supplier/Supplies 字形陷阱。', [['supplier', 'n.', '供應商'], ['run low', 'phr.', '快用完', 'running low']]);
  p2(21, 'bf_isabella', 'am_michael', 'Do you know where the marketing department moved to?', ['Yes, it moved quickly.', 'The marketing budget was approved.', "They're on the third floor now."], 'C',
    '你知道行銷部搬到哪裡去了嗎？——他們現在在三樓。', ['對，搬得很快。', '行銷預算核准了。', '他們現在在三樓。'], '間接問句的重點在 where，(C) 直接回答地點。', [['marketing department', 'n.', '行銷部']]);
  p2(22, 'am_adam', 'af_heart', 'How often do you back up the customer files?', ['Our customers are very loyal.', 'At the end of every day.', 'Yes, in the back office.'], 'B',
    '你多久備份一次客戶檔案？——每天下班前。', ['我們的客戶很忠實。', '每天下班前。', '對，在後面的辦公室。'], 'How often 問頻率，(B) 回答「每天」。(C) back 是字面陷阱。', [['back up', 'phr.', '備份'], ['loyal', 'adj.', '忠實的']]);
  p2(23, 'bm_lewis', 'af_sarah', 'The projector in Room B keeps shutting off.', ['Room B is larger.', 'Please shut the door.', "Let's use Room C instead."], 'C',
    'B 會議室的投影機一直自己關機。——那我們改用 C 會議室吧。', ['B 會議室比較大。', '請把門關上。', '那我們改用 C 會議室吧。'], '直述句說問題，(C) 提出替代方案。(B) shut 是字面陷阱。', [['projector', 'n.', '投影機'], ['shut off', 'phr.', '關機', 'shutting off']]);
  p2(24, 'af_sarah', 'am_adam', 'Whose turn is it to lead the weekly meeting?', ["I think it's Hannah's.", 'Every Monday morning.', 'Turn left at the corner.'], 'A',
    '這週輪到誰主持週會？——我想是 Hannah。', ['我想是 Hannah。', '每週一早上。', '在轉角左轉。'], 'Whose 問誰的，(A) 回答人名所有格。(C) turn 一字多義陷阱。', [["whose turn", 'phr.', '輪到誰', 'Whose turn'], ['lead', 'v.', '主持；帶領']]);
  p2(25, 'am_michael', 'bf_isabella', 'Can I pay for this with a credit card?', ['Twelve dollars and fifty cents.', 'Sure, we accept all major cards.', 'I paid it last week.'], 'B',
    '我可以用信用卡付款嗎？——當然，我們接受各大信用卡。', ['十二美元五十分。', '當然，我們接受各大信用卡。', '我上週付過了。'], 'Can I…? 問可否，(B) 答應並補充。', [['accept', 'v.', '接受'], ['major', 'adj.', '主要的']]);
  p2(26, 'af_nicole', 'am_eric', 'How much will it cost to ship this package overnight?', ['To our branch in Denver.', "It's quite heavy.", 'Let me weigh it first.'], 'C',
    '這個包裹寄隔日到要多少錢？——我先秤一下重量。', ['寄到我們丹佛分公司。', '它相當重。', '我先秤一下重量。'], 'How much 問價錢；(C) 沒有直接報價，但「先秤重才知道」是自然的回應。多益常考這種間接回答。', [['ship', 'v.', '寄送'], ['overnight', 'adv.', '隔夜送達']]);
  p2(27, 'bf_emma', 'bm_lewis', 'Where can I find the employee handbook?', ["It's posted on the company intranet.", 'Every new employee.', "I'll hand it in tomorrow."], 'A',
    '員工手冊在哪裡可以找到？——公司內部網路上有。', ['公司內部網路上有。', '每位新進員工。', '我明天會交出去。'], 'Where 問地點，(A) 回答「在內部網路」。(C) hand 是 handbook 的字面陷阱。', [['employee handbook', 'n.', '員工手冊'], ['intranet', 'n.', '內部網路'], ['hand in', 'phr.', '繳交']]);
  p2(28, 'am_eric', 'af_bella', 'Have you had a chance to look at my proposal?', ['A chance of rain.', "I'm reading it right now.", 'Yes, he proposed it.'], 'B',
    '你有機會看我的提案了嗎？——我正在看。', ['下雨的機率。', '我正在看。', '對，是他提的。'], '問有沒有看，(B) 表示正在看。(A) chance 一字多義，(C) 主詞 he 不對。', [['proposal', 'n.', '提案'], ['have a chance to', 'phr.', '有機會（空）做…']]);
  p2(29, 'bm_george', 'af_nicole', "Why didn't Mr. Diaz come to the reception?", ['The reception desk is downstairs.', 'Yes, it was a great event.', 'His flight was delayed.'], 'C',
    'Diaz 先生為什麼沒來參加招待會？——他的班機延誤了。', ['接待櫃台在樓下。', '對，活動很棒。', '他的班機延誤了。'], 'Why 問原因，(C) 說明原因。(A) reception 一字多義陷阱（招待會／接待處）。', [['reception', 'n.', '招待會；接待處'], ['delayed', 'adj.', '延誤的']]);
  p2(30, 'af_bella', 'am_michael', 'Should I book the conference room for Thursday?', ['It was already reserved yesterday.', 'A book about conferences.', 'For about ten people.'], 'A',
    '我要訂週四的會議室嗎？——昨天就已經訂好了。', ['昨天就已經訂好了。', '一本關於會議的書。', '大約十個人。'], '(A) 表示不用再訂。(B) book 一字多義陷阱（預訂／書）。', [['book', 'v.', '預訂'], ['reserve', 'v.', '預訂', 'reserved']]);
  p2(31, 'am_adam', 'bf_emma', "Let's ask Jenna to help with the inventory count.", ["It's in the storage room.", 'About two hundred items.', "She's on vacation this week."], 'C',
    '我們請 Jenna 幫忙盤點吧。——她這週在休假。', ['在倉庫裡。', '大約兩百件。', '她這週在休假。'], "Let's… 提議，(C) 間接表示行不通（她不在）。", [['inventory count', 'n.', '盤點'], ['on vacation', 'phr.', '休假中']]);
})();
