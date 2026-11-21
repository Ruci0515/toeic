/* Test 1 聽力 Part 1 照片描述（Q1–6）＋ Part 2 應答問題（Q7–31）
   Part 1 照片：StockSnap CC0（公眾領域，可自由使用），出處見 images/p1/CREDITS.md */
(function () {
  const S = window.TOEIC_T1.spoken;
  const pic = (n, alt) => ({ type: 'image', src: 'images/p1/p1_' + n + '.jpg', alt });

  /* ---------------- Part 1 ---------------- */
  S('Part 1', 1, { R: 'af_heart' }, '', ["She's repairing a brick wall.", "She's using a laptop computer.", "She's standing next to a window.", "She's opening a notebook."], 'B',
    '(B) 她正在使用筆記型電腦。', ['她正在修磚牆。', '她正在使用筆電。', '她站在窗邊。', '她正在打開筆記本。'],
    '照片中女子坐在長椅上用筆電打字。(C) 她是坐著不是站著；(A)(D) 動作不符。', [['laptop computer', 'n.', '筆記型電腦'], ['brick wall', 'n.', '磚牆']], pic(1, '女子坐在磚牆旁的長椅上使用筆電'));
  S('Part 1', 2, { R: 'bm_george' }, '', ['Some chairs are being stacked in a corner.', 'A window is being washed.', 'Some people are sitting at a conference table.', 'Some people are shaking hands.'], 'C',
    '(C) 有些人坐在會議桌旁。', ['有些椅子正被堆在角落。', '有扇窗戶正在被清洗。', '有些人坐在會議桌旁。', '有些人正在握手。'],
    '兩位女子坐在會議桌前。be being + p.p.（正在被…）的選項要有人正在做動作，照片中沒有，(A)(B) 錯。', [['conference table', 'n.', '會議桌'], ['stack', 'v.', '堆疊', 'stacked'], ['shake hands', 'phr.', '握手', 'shaking hands']], pic(2, '透過窗戶看到兩位女子坐在會議桌前'));
  S('Part 1', 3, { R: 'am_michael' }, '', ['A man is washing dishes in a sink.', 'A man is mopping the floor.', 'A man is taking off his apron.', 'Some lamps are hanging above a counter.'], 'D',
    '(D) 有幾盞燈懸掛在流理台上方。', ['一名男子正在水槽洗碗。', '一名男子正在拖地。', '一名男子正在脫圍裙。', '有幾盞燈懸掛在流理台上方。'],
    '廚房上方吊著好幾盞燈。男子穿著圍裙站在流理台前，沒有洗碗、拖地或脫圍裙。描述「物品狀態」的選項常是答案。', [['hang', 'v.', '懸掛', 'hanging'], ['counter', 'n.', '流理台；櫃台'], ['apron', 'n.', '圍裙'], ['mop', 'v.', '拖地', 'mopping']], pic(3, '餐廳廚房，男子背對鏡頭站在流理台前，上方吊著燈'));
  S('Part 1', 4, { R: 'bf_emma' }, '', ['Fruit has been arranged for sale.', 'A vendor is weighing some fruit.', 'Some boxes are being loaded onto a truck.', 'Customers are waiting in line.'], 'A',
    '(A) 水果已經擺好準備販售。', ['水果已經擺好要賣。', '攤販正在秤水果。', '有些箱子正被搬上卡車。', '顧客正在排隊。'],
    '照片沒有人，只有擺放整齊的水果。has been + p.p.（已經被…）描述完成的狀態，正確。有人物動作的 (B)(D) 一定錯。', [['arrange', 'v.', '擺放；排列', 'arranged'], ['for sale', 'phr.', '供販售'], ['vendor', 'n.', '攤販'], ['weigh', 'v.', '秤重', 'weighing'], ['load', 'v.', '裝載', 'loaded']], pic(4, '水果攤上擺滿了一盒盒的水果和黑板價目牌'));
  S('Part 1', 5, { R: 'am_adam' }, '', ['Some bicycles are being repaired.', 'Some bicycles are parked in a row.', 'A cyclist is riding along a path.', 'Leaves are being swept from the ground.'], 'B',
    '(B) 一些腳踏車停成一排。', ['有些腳踏車正在修理。', '有些腳踏車停成一排。', '一個騎士正沿著小路騎車。', '地上的落葉正在被掃。'],
    '腳踏車整齊地停成一排。照片中沒有人，be being + p.p. 的動作選項 (A)(D) 與有人的 (C) 都錯。', [['in a row', 'phr.', '成一排'], ['cyclist', 'n.', '騎腳踏車的人'], ['sweep', 'v.', '掃', 'swept']], pic(5, '一排停放在石板路上的腳踏車'));
  S('Part 1', 6, { R: 'af_bella' }, '', ["They're boarding an airplane.", "They're sitting in a waiting area.", "They're walking through a passageway.", "They're unpacking a suitcase."], 'C',
    '(C) 他們正走過一條通道。', ['他們正在登機。', '他們坐在候車區。', '他們正走過一條通道。', '他們正在打開行李箱拿東西。'],
    '兩名背背包的旅客在有頂棚的通道中行走。(A) 沒有飛機；(B) 不是坐著；(D) 行李箱是拉著走。', [['board', 'v.', '登上（交通工具）', 'boarding'], ['passageway', 'n.', '通道；走廊'], ['unpack', 'v.', '打開（行李）取出東西', 'unpacking'], ['waiting area', 'n.', '候車／候機區']], pic(6, '兩名背背包的旅客走在有頂棚的通道上'));

  /* ---------------- Part 2 ---------------- */
  const p2 = (id, q, r, prompt, opts, ans, zh, oz, expl, vocab) => S('Part 2', id, { Q: q, R: r }, prompt, opts, ans, zh, oz, expl, vocab);
  p2(7, 'af_heart', 'bm_george', 'When is the new manager starting?', ['In the conference room.', 'Next Monday, I believe.', "Yes, she's very experienced."], 'B',
    '新經理什麼時候開始上班？——我想是下週一。', ['在會議室。', '我想是下週一。', '是的，她很有經驗。'], 'When 問時間，(B) 回答時間。Wh- 問句不能用 Yes/No 回答，(C) 錯。', [['experienced', 'adj.', '有經驗的']]);
  p2(8, 'bm_george', 'af_sarah', 'Could you send me the updated sales figures?', ["Sure, I'll e-mail them this afternoon.", 'The sales were very good.', "It's on the second floor."], 'A',
    '可以把更新後的銷售數字寄給我嗎？——好，我今天下午 email 給你。', ['好，我今天下午 email 給你。', '銷售成績很好。', '在二樓。'], 'Could you…? 請求，(A) 答應。(B) 重複 sales 是字面陷阱。', [['sales figures', 'n.', '銷售數字'], ['updated', 'adj.', '更新的']]);
  p2(9, 'af_sarah', 'am_michael', 'Why was the shipment delayed?', ['By express delivery.', 'There was a problem at the warehouse.', 'Around three hundred boxes.'], 'B',
    '貨為什麼延誤？——倉庫出了問題。', ['用快遞。', '倉庫出了問題。', '大約三百箱。'], 'Why 問原因，(B) 說明原因。', [['shipment', 'n.', '貨物'], ['warehouse', 'n.', '倉庫']]);
  p2(10, 'am_michael', 'bf_emma', 'Should we hold the training session in the morning or the afternoon?', ['Most staff prefer mornings.', 'It was very informative.', 'Yes, we should.'], 'A',
    '訓練課程要辦在上午還是下午？——大部分員工比較喜歡上午。', ['大部分員工比較喜歡上午。', '內容很有收穫。', '是的，我們應該。'], '選擇疑問句不能用 Yes/No 回答；(A) 間接選了上午。', [['training session', 'n.', '訓練課程'], ['informative', 'adj.', '有收穫的']]);
  p2(11, 'bf_emma', 'am_adam', "Haven't you finished the budget report yet?", ['The budget is too tight.', "I'm just checking the last few numbers.", 'A monthly report.'], 'B',
    '你預算報告還沒做完嗎？——我正在核對最後幾個數字。', ['預算太緊了。', '我正在核對最後幾個數字。', '一份月報。'], '否定疑問句問進度，(B) 表示快完成。(A)(C) 重複 budget、report。', [['budget report', 'n.', '預算報告']]);
  p2(12, 'am_adam', 'af_heart', "Who's responsible for ordering office supplies?", ['Some pens and paper.', 'Every Friday.', 'Ms. Patel in the admin department.'], 'C',
    '誰負責訂辦公用品？——行政部的 Patel 女士。', ['一些筆和紙。', '每週五。', '行政部的 Patel 女士。'], 'Who 問人，(C) 回答人。', [['office supplies', 'n.', '辦公用品'], ['admin department', 'n.', '行政部']]);
  p2(13, 'af_heart', 'bm_lewis', 'The printer on this floor is out of order again.', ["I'll call the technician.", 'In alphabetical order.', 'Print two copies, please.'], 'A',
    '這層樓的印表機又故障了。——我來打給技術人員。', ['我來打給技術人員。', '依字母順序。', '請印兩份。'], '陳述問題，(A) 提出解決辦法。(B) order、(C) print 是同字陷阱。', [['out of order', 'phr.', '故障'], ['technician', 'n.', '技術人員']]);
  p2(14, 'bm_lewis', 'af_bella', "Where can I find the client's contract?", ['He signed it yesterday.', 'A two-year contract.', 'Check the shared folder.'], 'C',
    '客戶的合約在哪裡？——看看共用資料夾。', ['他昨天簽了。', '一份兩年的合約。', '看看共用資料夾。'], 'Where 問地點，(C) 給出位置。', [['contract', 'n.', '合約'], ['shared folder', 'n.', '共用資料夾']]);
  p2(15, 'af_bella', 'am_eric', 'Would you like me to book a table for the team lunch?', ['The tables are new.', 'Yes, for about ten people.', 'I booked a flight.'], 'B',
    '要我幫團隊午餐訂位嗎？——好，大約十個人。', ['那些桌子是新的。', '好，大約十個人。', '我訂了機票。'], 'Would you like me to…? 是提議，(B) 接受並補充人數。', [['book a table', 'phr.', '（餐廳）訂位']]);
  p2(16, 'am_eric', 'bf_isabella', 'How long will the renovation take?', ['It looks much better.', 'On the fifth floor.', 'About three weeks.'], 'C',
    '整修要多久？——大約三週。', ['看起來好多了。', '在五樓。', '大約三週。'], 'How long 問期間，(C) 回答時間長度。', [['renovation', 'n.', '整修']]);
  p2(17, 'bf_isabella', 'am_michael', "Didn't Mr. Kim already approve the travel request?", ["No, he's still reviewing it.", 'A round-trip ticket.', "I've never been there."], 'A',
    'Kim 先生不是已經批准出差申請了嗎？——還沒，他還在審。', ['還沒，他還在審。', '一張來回票。', '我從沒去過那裡。'], '否定疑問句確認是否批准，(A) 回答尚未。', [['approve', 'v.', '批准'], ['travel request', 'n.', '出差申請'], ['review', 'v.', '審核', 'reviewing']]);
  p2(18, 'am_michael', 'af_nicole', 'Which supplier offers the lowest price?', ['Before the deadline.', 'Westco, according to the chart.', "I'd like a receipt, please."], 'B',
    '哪一家供應商報價最低？——根據圖表是 Westco。', ['在截止日之前。', '根據圖表是 Westco。', '請給我收據。'], 'Which 問哪一個，(B) 給出公司名。', [['supplier', 'n.', '供應商'], ['according to', 'phr.', '根據']]);
  p2(19, 'af_nicole', 'bm_george', "Let's take a short break before the next session.", ['A two-hour session.', 'Good idea. I need some coffee.', "It's broken again."], 'B',
    '下一場開始前我們休息一下吧。——好主意，我需要喝咖啡。', ['一場兩小時的課。', '好主意，我需要喝咖啡。', '它又壞了。'], "Let's… 是提議，(B) 同意。(C) broken 和 break 發音相近是陷阱。", [['take a break', 'phr.', '休息一下'], ['session', 'n.', '（一場）會議／課程']]);
  p2(20, 'bm_george', 'af_sarah', 'Has the marketing plan been finalized?', ['In the market downtown.', 'A plan for the weekend.', "We're still waiting for the director's comments."], 'C',
    '行銷計畫定案了嗎？——我們還在等主任的意見。', ['在市中心的市場。', '一個週末計畫。', '我們還在等主任的意見。'], '問是否定案，(C) 間接表示還沒。(A) market 是近音陷阱。', [['finalize', 'v.', '定案', 'finalized'], ['director', 'n.', '主任；總監']]);
  p2(21, 'af_sarah', 'am_adam', "You've worked with this client before, haven't you?", ['Twice a week.', 'Yes, on two projects last year.', "No, it's not working."], 'B',
    '你之前跟這位客戶合作過，對吧？——對，去年合作過兩個專案。', ['一週兩次。', '對，去年合作過兩個專案。', '不，它不能運作。'], '附加問句確認經驗，(B) 肯定並補充。(C) working 是字面陷阱。', [['work with', 'phr.', '與…合作']]);
  p2(22, 'am_adam', 'bf_emma', 'How do I sign up for the leadership workshop?', ['It was a great speech.', 'Yes, I signed it.', 'The online form is on the intranet.'], 'C',
    '領導力工作坊要怎麼報名？——內部網路上有線上表單。', ['那場演講很棒。', '是的，我簽了。', '內部網路上有線上表單。'], 'How 問方式，(C) 說明報名方式。(B) signed 和 sign up 是字面陷阱。', [['sign up for', 'phr.', '報名'], ['leadership', 'n.', '領導力'], ['intranet', 'n.', '（公司）內部網路']]);
  p2(23, 'bf_emma', 'am_eric', 'Why don\'t we move the meeting to Thursday?', ["I'm out of the office that day.", 'We moved last year.', 'It was a long meeting.'], 'A',
    '我們把會議改到週四好嗎？——我那天不在辦公室。', ['我那天不在辦公室。', '我們去年搬家了。', '那場會議很長。'], "Why don't we…? 是提議，(A) 間接拒絕。", [['out of the office', 'phr.', '不在辦公室']]);
  p2(24, 'am_eric', 'af_heart', 'Is the parking garage open on weekends?', ['I parked on the street.', 'Yes, it was a great weekend.', 'Only until six p.m.'], 'C',
    '停車場週末有開嗎？——只開到晚上六點。', ['我停在路邊。', '是的，那是個很棒的週末。', '只開到晚上六點。'], 'Yes/No 問句也可以不直接說 Yes，(C) 暗示有開但有時間限制。(B) 雖然有 Yes，但答非所問。', [['parking garage', 'n.', '室內停車場']]);
  p2(25, 'af_heart', 'bm_lewis', 'Whose turn is it to lead the weekly meeting?', ["I think it's Carla's.", 'Turn left at the corner.', 'Every Wednesday morning.'], 'A',
    '這週例會輪到誰主持？——我想是 Carla。', ['我想是 Carla。', '在轉角左轉。', '每週三上午。'], 'Whose 問誰的，(A) 回答人。(B) turn 是同字陷阱。', [['turn', 'n.', '輪到的機會'], ['weekly meeting', 'n.', '每週例會']]);
  p2(26, 'bm_lewis', 'af_bella', 'The client wants the design changes by Friday.', ['A new design team.', "That doesn't give us much time.", 'It changed color.'], 'B',
    '客戶要我們週五前改好設計。——那我們時間不多了。', ['一個新的設計團隊。', '那我們時間不多了。', '它變色了。'], '直述句說明要求，(B) 表達反應。', [['design changes', 'n.', '設計修改']]);
  p2(27, 'af_bella', 'am_michael', 'Do you want to share a taxi to the airport?', ['Terminal two.', "It's a fair price.", "Thanks, but my colleague is driving me."], 'C',
    '要一起搭計程車去機場嗎？——謝了，不過我同事會載我。', ['第二航廈。', '價格很公道。', '謝了，不過我同事會載我。'], '邀約，(C) 婉拒並說明原因。(A)(B) 只是和機場、計程車有關的字。', [['share a taxi', 'phr.', '共乘計程車'], ['colleague', 'n.', '同事']]);
  p2(28, 'am_michael', 'bf_isabella', 'What did you think of the new software?', ['I bought it online.', "It's much faster than the old one.", 'Sometime next month.'], 'B',
    '你覺得新軟體怎麼樣？——比舊的快多了。', ['我在網路上買的。', '比舊的快多了。', '下個月某個時候。'], 'What did you think of…? 問意見，(B) 給出評價。', [['software', 'n.', '軟體']]);
  p2(29, 'bf_isabella', 'am_adam', 'Where should I put these boxes of brochures?', ['About fifty pages.', 'They were printed yesterday.', 'Next to the reception desk is fine.'], 'C',
    '這幾箱手冊要放哪裡？——放接待櫃台旁邊就可以了。', ['大約五十頁。', '昨天印好的。', '放接待櫃台旁邊就可以了。'], 'Where 問地點，(C) 回答位置。', [['brochure', 'n.', '小冊子；手冊', 'brochures'], ['reception desk', 'n.', '接待櫃台']]);
  p2(30, 'am_adam', 'af_nicole', 'Has anyone called the caterer about tomorrow\'s event?', ['The event was a success.', 'Rachel said she would.', 'Call me back later.'], 'B',
    '有人打給外燴業者確認明天的活動了嗎？——Rachel 說她會打。', ['活動很成功。', 'Rachel 說她會打。', '晚點回電給我。'], '問有沒有人處理，(B) 回答由誰處理。(A) 用過去式，時間不對（活動是明天）。', [['caterer', 'n.', '外燴業者']]);
  p2(31, 'af_nicole', 'bm_george', 'Shouldn\'t we hire more staff for the holiday season?', ['Happy holidays!', 'A seasonal menu.', "The manager is already posting job ads."], 'C',
    '我們不是應該為假期旺季多請一些人嗎？——經理已經在刊登徵才廣告了。', ['佳節愉快！', '季節限定菜單。', '經理已經在刊登徵才廣告了。'], '否定疑問句提出建議，(C) 表示已在處理。', [['hire', 'v.', '雇用'], ['holiday season', 'n.', '假期旺季'], ['job ad', 'n.', '徵才廣告', 'job ads']]);
})();
