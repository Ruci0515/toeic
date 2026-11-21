/* ==========================================================================
   TOEIC 模擬測驗 Test 1 — 聽力（原創題目，30 題半量版）
   Part 2 應答問題 Q1–9（選項只在音檔中出現）
   Part 3 簡短對話 Q10–21（4 段 × 3 題）
   Part 4 簡短獨白 Q22–30（3 段 × 3 題）
   每題欄位：id, part, group, question, options, answer, script, translation,
             explanation, recommendedSeconds；檢討用：qz（題目中文）、oz（選項中文）、
             ev（答案依據原文）、kw（題目關鍵字）、vocab（單字快學，放在題組第一題）
   voices：音檔產生器（tools/build_audio.py）使用的 macOS 語音。
   ========================================================================== */
window.BESTEP_DATA = window.BESTEP_DATA || {};

(function () {
  const P2 = 'Part 2';
  const P3 = 'Part 3';
  const P4 = 'Part 4';

  function p2(id, voices, ask, opts, answer, zh, oz, expl, vocab) {
    return {
      id, part: P2, type: 'single', audioOnly: true, voices,
      question: 'Mark your answer on your answer sheet.',
      options: opts, answer,
      script: [{ speaker: 'Q', text: ask }].concat(opts.map((o, i) => ({ speaker: 'R', text: '(' + 'ABC'[i] + ') ' + o }))),
      translation: zh, explanation: expl, recommendedSeconds: 10,
      qz: '請選出最適當的回應。', oz, ev: [ask], kw: [], vocab
    };
  }

  /* ---------- Part 3 對話 ---------- */
  const C10 = [
    { speaker: 'W', text: 'Hi, Daniel. The clients from Kendall Logistics are coming in tomorrow at ten. Have you reserved a meeting room for us?' },
    { speaker: 'M', text: "I tried to book Conference Room B, but it's already taken for the whole morning. The only room free at ten is the small one on the third floor." },
    { speaker: 'W', text: 'Hmm, that room only seats six people, and there will be eight of us. Could we push the meeting back to the afternoon instead?' },
    { speaker: 'M', text: "I'll check with their assistant. If they agree, I'll reserve Room B for two o'clock and send everyone an updated invitation." }
  ];
  const Z10 = '女：嗨，Daniel。Kendall 物流的客戶明天十點會來。你幫我們訂會議室了嗎？\n男：我想訂 B 會議室，但整個上午都被訂走了。十點唯一空著的是三樓那間小會議室。\n女：嗯，那間只能坐六個人，我們會有八個人。能不能把會議改到下午？\n男：我跟他們的助理確認一下。如果他們同意，我就訂下午兩點的 B 會議室，再寄更新後的邀請給大家。';

  const C13 = [
    { speaker: 'W', text: "Good afternoon. I bought this coffee maker here last week, but it stopped working after two days. I'd like a refund, please." },
    { speaker: 'M', text: "I'm sorry to hear that. Do you have your receipt with you?" },
    { speaker: 'W', text: 'Unfortunately, I threw it away. But I paid with my credit card, if that helps.' },
    { speaker: 'M', text: "Yes, that's fine. I can look up the purchase with your card. However, without a receipt, we can only offer store credit or an exchange, not a cash refund." },
    { speaker: 'W', text: "In that case, I'll exchange it for the same model." }
  ];
  const Z13 = '女：午安。我上週在這裡買了這台咖啡機，但兩天後就壞了。我想要退款。\n男：很抱歉聽到這件事。您有帶收據嗎？\n女：可惜我丟掉了。不過我是刷信用卡付款的，不知道有沒有幫助。\n男：可以的，我能用您的卡查到這筆消費。不過沒有收據的話，我們只能提供購物金或換貨，不能退現金。\n女：那我換一台同型號的好了。';

  const C16 = [
    { speaker: 'M', text: "Lisa, Tom, thanks for joining. I've just heard from the developers that the new booking app won't be ready by the end of the month." },
    { speaker: 'W', text: "That's a problem. Our marketing campaign is supposed to start on the first. We've already paid for the online ads." },
    { speaker: 'M2', text: "Could we launch a simpler version first? The basic booking feature is finished. It's the payment system that still has bugs." },
    { speaker: 'M', text: "That's a good idea. Customers could reserve now and pay at the counter for the time being." },
    { speaker: 'W', text: "All right. I'll contact the ad agency and ask them to change the wording so we don't promise online payment yet." }
  ];
  const Z16 = '男：Lisa、Tom，謝謝你們來。我剛從開發人員那裡得知，新的訂位 App 月底前做不完。\n女：這就麻煩了。我們的行銷活動預定一號開始，線上廣告的錢都已經付了。\n男2：我們能不能先推出簡化版？基本的訂位功能已經完成了，還有錯誤的是付款系統。\n男：好主意。顧客可以先訂位，暫時到櫃台付款。\n女：好。我會聯絡廣告代理商，請他們修改文案，先別承諾可以線上付款。';

  const C19 = [
    { speaker: 'W', text: 'Thank you for calling Harbor View Hotel. How may I help you?' },
    { speaker: 'M', text: "Hi, I have a reservation for three nights starting this Thursday, under the name Kevin Lin. I'd like to know if I can check in early. My flight lands at nine in the morning." },
    { speaker: 'W', text: "Standard check-in is at three p.m. We can't guarantee a room that early, but you're welcome to leave your luggage at the front desk and use our business lounge while you wait." },
    { speaker: 'M', text: 'That would be helpful. I need to prepare for a presentation that afternoon.' },
    { speaker: 'W', text: "Then I'll add a note to your booking. The lounge also has printers, which guests can use free of charge." }
  ];
  const Z19 = '女：感謝您來電港景飯店，有什麼可以為您服務的嗎？\n男：你好，我用 Kevin Lin 的名字訂了這週四起三晚的房間。我想知道能不能提早入住，我的班機早上九點降落。\n女：一般入住時間是下午三點。我們無法保證那麼早就有房間，不過歡迎您把行李寄放在櫃台，等候時可以使用我們的商務貴賓室。\n男：那很有幫助。我那天下午要準備一場簡報。\n女：那我在您的訂房紀錄加個備註。貴賓室也有印表機，房客可以免費使用。';

  /* ---------- Part 4 獨白 ---------- */
  const T22 = [
    { speaker: 'W', text: 'Hello, this message is for Ms. Rivera. This is Brian from Greenfield Dental Clinic. I\'m calling about your appointment with Dr. Hart on Wednesday at four thirty.' },
    { speaker: 'W', text: 'Unfortunately, Dr. Hart will be attending a conference that afternoon, so we need to reschedule. We have openings on Thursday morning or on Friday at five.' },
    { speaker: 'W', text: 'Please call us back at 555-0192 before Tuesday to confirm a new time. Also, please remember to bring your updated insurance card when you come in. Thank you.' }
  ];
  const Z22 = '您好，這是給 Rivera 女士的留言。我是 Greenfield 牙醫診所的 Brian，打來是關於您週三四點半跟 Hart 醫師的預約。很遺憾，Hart 醫師那天下午要參加研討會，所以需要改期。我們週四上午或週五五點有空檔。請在週二前回電 555-0192 確認新的時間。另外，來診時請記得帶您更新後的保險卡。謝謝。';

  const T25 = [
    { speaker: 'M', text: "Welcome to the Brightwater Chocolate Factory. My name is Oliver, and I'll be your guide this morning. Our tour lasts about an hour." },
    { speaker: 'M', text: "We'll begin in the room where the cocoa beans are roasted, and then we'll watch our machines shape the chocolate bars. Please note that, for safety reasons, photography is not permitted inside the production area." },
    { speaker: 'M', text: "At the end of the tour, you'll receive a free sample bag, and you can also visit our gift shop, where all products are twenty percent off for tour participants today. Now, if everyone could put on the hairnets I'm handing out, we'll get started." }
  ];
  const Z25 = '歡迎來到 Brightwater 巧克力工廠。我是 Oliver，今天上午由我擔任導覽。行程大約一小時。我們會先到烘焙可可豆的房間，接著看機器把巧克力塑形成條狀。請注意，基於安全理由，生產區內禁止拍照。行程結束時，每位都會拿到一袋免費試吃品，也可以逛逛禮品店，今天參加導覽的來賓所有商品打八折。現在請大家戴上我發的髮網，我們就開始吧。';

  const T28 = [
    { speaker: 'W', text: "Before we finish today's meeting, I'd like to share some results from our customer survey. Overall, customers are happy with the quality of our products, but many said our delivery times are too long." },
    { speaker: 'W', text: "On average, orders take six days to arrive, while our main competitor delivers in three. To address this, we're opening a new distribution center in Riverside next month. That should cut delivery times in half for most of the region." },
    { speaker: 'W', text: "I know this means extra work for the logistics team, so we'll be hiring ten temporary staff to help during the transition. Please let me know by Friday if your department needs additional support." }
  ];
  const Z28 = '今天會議結束前，我想分享一些顧客問卷的結果。整體來說，顧客對我們的產品品質很滿意，但很多人說我們的出貨時間太長。訂單平均要六天才送達，而我們的主要競爭對手只要三天。為了解決這個問題，我們下個月會在 Riverside 開一座新的物流中心，應該能讓這個地區大部分的送貨時間縮短一半。我知道這代表物流團隊會多出不少工作，所以我們會雇用十名臨時人員，協助過渡期。如果你們部門需要額外支援，請在週五前告訴我。';

  const Q = [
    p2(1, { Q: 'Samantha', R: 'Daniel' }, 'When is the new manager starting?',
      ['In the conference room.', 'Next Monday, I believe.', "Yes, she's very experienced."], 'B',
      '新經理什麼時候開始上班？——我想是下週一。', ['在會議室。', '我想是下週一。', '是的，她很有經驗。'],
      '問 When（何時），(B) 回答時間。(A) 回答地點；(C) 用 Yes 回答 Wh- 問句，一定錯。',
      [['manager', 'n.', '經理'], ['experienced', 'adj.', '有經驗的']]),
    p2(2, { Q: 'Daniel', R: 'Karen' }, 'Could you send me the updated sales figures?',
      ["Sure, I'll email them this afternoon.", 'The sales were very good.', "It's on the second floor."], 'A',
      '可以把更新後的銷售數字寄給我嗎？——好，我今天下午用 email 寄。', ['好，我今天下午寄 email 給你。', '銷售成績很好。', '在二樓。'],
      'Could you…? 是請求，(A) 答應並說明何時寄。(B) 重複 sales 一字的陷阱。',
      [['updated', 'adj.', '更新的'], ['sales figures', 'n.', '銷售數字']]),
    p2(3, { Q: 'Karen', R: 'Reed' }, 'Why was the shipment delayed?',
      ['By express delivery.', 'There was a problem at the warehouse.', 'Around three hundred boxes.'], 'B',
      '貨為什麼延誤了？——倉庫出了問題。', ['用快遞。', '倉庫出了問題。', '大約三百箱。'],
      '問 Why（原因），(B) 說明原因。(A) 回答方式、(C) 回答數量。',
      [['shipment', 'n.', '貨物；出貨'], ['delay', 'v.', '延誤', 'delayed'], ['warehouse', 'n.', '倉庫'], ['express delivery', 'n.', '快遞']]),
    p2(4, { Q: 'Reed', R: 'Samantha' }, 'Should we hold the training session in the morning or the afternoon?',
      ['Most staff prefer mornings.', 'It was very informative.', 'Yes, we should.'], 'A',
      '訓練課程要辦在上午還是下午？——大部分員工比較喜歡上午。', ['大部分員工比較喜歡上午。', '內容很有收穫。', '是的，我們應該。'],
      '選擇疑問句（A or B）不能用 Yes/No 回答，(C) 錯；(A) 間接選了上午。',
      [['hold', 'v.', '舉辦'], ['training session', 'n.', '訓練課程'], ['informative', 'adj.', '提供有用資訊的']]),
    p2(5, { Q: 'Moira', R: 'Daniel' }, "Haven't you finished the budget report yet?",
      ['The budget is too tight.', "I'm just checking the last few numbers.", 'A monthly report.'], 'B',
      '你預算報告還沒做完嗎？——我正在核對最後幾個數字。', ['預算太緊了。', '我正在核對最後幾個數字。', '一份月報。'],
      '否定疑問句問「做完沒」，(B) 表示快完成了。(A)(C) 重複 budget、report 的陷阱。',
      [['budget report', 'n.', '預算報告'], ['tight', 'adj.', '（預算）很緊的']]),
    p2(6, { Q: 'Daniel', R: 'Samantha' }, "Who's responsible for ordering office supplies?",
      ['Some pens and paper.', 'Every Friday.', 'Mr. Patel in the admin department.'], 'C',
      '誰負責訂辦公用品？——行政部的 Patel 先生。', ['一些筆和紙。', '每週五。', '行政部的 Patel 先生。'],
      '問 Who（誰），(C) 回答人。(A) 回答東西、(B) 回答時間。',
      [['be responsible for', 'phr.', '負責', "responsible for"], ['office supplies', 'n.', '辦公用品'], ['admin department', 'n.', '行政部']]),
    p2(7, { Q: 'Samantha', R: 'Reed' }, 'The printer on this floor is out of order again.',
      ["I'll call the technician.", 'In alphabetical order.', 'Print two copies, please.'], 'A',
      '這層樓的印表機又故障了。——我來打給技術人員。', ['我來打給技術人員。', '按照字母順序。', '請印兩份。'],
      '直述句陳述問題，(A) 提出解決辦法。(B) 用 order 一字、(C) 用 print 一字是同音／同字陷阱。',
      [['out of order', 'phr.', '故障'], ['technician', 'n.', '技術人員'], ['alphabetical order', 'n.', '字母順序']]),
    p2(8, { Q: 'Karen', R: 'Daniel' }, "Where can I find the client's contract?",
      ['He signed it yesterday.', 'A two-year contract.', 'Check the shared folder.'], 'C',
      '客戶的合約在哪裡可以找到？——去共用資料夾找找看。', ['他昨天簽了。', '一份兩年的合約。', '看看共用資料夾。'],
      '問 Where（哪裡），(C) 給出位置。(A)(B) 都只是和 contract 有關的內容。',
      [['client', 'n.', '客戶'], ['contract', 'n.', '合約'], ['shared folder', 'n.', '共用資料夾']]),
    p2(9, { Q: 'Reed', R: 'Moira' }, 'Would you like me to book a table for the team lunch?',
      ['The tables are new.', 'Yes, for about ten people.', 'I booked a flight.'], 'B',
      '要我幫團隊午餐訂位嗎？——好，大約十個人。', ['那些桌子是新的。', '好，大約十個人。', '我訂了機票。'],
      'Would you like me to…? 是提議，(B) 接受並補充人數。(A)(C) 是 table、book 的字面陷阱。',
      [['book a table', 'phr.', '訂位（餐廳）'], ['team lunch', 'n.', '團隊聚餐']]),

    /* Part 3 */
    { id: 10, part: P3, group: 'L-10-12', voices: { W: 'Samantha', M: 'Daniel' }, question: 'What are the speakers mainly discussing?',
      options: ['Hiring new staff', 'Arranging a meeting space', 'Repairing some equipment', 'Planning a business trip'], answer: 'B',
      script: C10, translation: Z10, recommendedSeconds: 25,
      explanation: '一開頭女子就問有沒有訂會議室，接著兩人討論房間大小與時間，主題是安排會議場地。',
      qz: '說話者主要在討論什麼？', oz: ['招募新員工', '安排會議場地', '修理設備', '規劃出差'],
      ev: ['Have you reserved a meeting room for us?'], kw: ['mainly discussing'],
      vocab: [['reserve', 'v.', '預訂', 'reserved'], ['conference room', 'n.', '會議室'], ['be taken', 'phr.', '（場地）已被預訂', "it's already taken"], ['seat', 'v.', '可容納（座位數）', 'seats'], ['push … back', 'phr.', '延後', 'push the meeting back'], ['invitation', 'n.', '邀請（函）']] },
    { id: 11, part: P3, group: 'L-10-12', question: 'What problem does the woman mention?',
      options: ['A room is too small.', 'A client has canceled.', 'A projector is broken.', 'A schedule was lost.'], answer: 'A',
      script: C10, translation: Z10, recommendedSeconds: 25,
      explanation: '女子說 that room only seats six people, and there will be eight of us，房間太小。',
      qz: '女子提到了什麼問題？', oz: ['房間太小。', '客戶取消了。', '投影機壞了。', '行程表弄丟了。'],
      ev: ['that room only seats six people, and there will be eight of us'], kw: ['problem', 'woman'] },
    { id: 12, part: P3, group: 'L-10-12', question: 'What will the man probably do next?',
      options: ['Order lunch for the clients', 'Move to the third floor', 'Print some documents', "Contact a client's assistant"], answer: 'D',
      script: C10, translation: Z10, recommendedSeconds: 25,
      explanation: '男子說 I\'ll check with their assistant，接下來會聯絡客戶的助理。',
      qz: '男子接下來可能會做什麼？', oz: ['幫客戶訂午餐', '搬到三樓', '印一些文件', '聯絡客戶的助理'],
      ev: ["I'll check with their assistant."], kw: ['man', 'do next'] },

    { id: 13, part: P3, group: 'L-13-15', voices: { W: 'Karen', M: 'Reed' }, question: 'Where most likely are the speakers?',
      options: ['At a bank', 'At a café', 'At an appliance store', 'At a post office'], answer: 'C',
      script: C13, translation: Z13, recommendedSeconds: 25,
      explanation: '女子在這裡買了咖啡機要退貨，最可能在家電用品店。',
      qz: '說話者最可能在哪裡？', oz: ['在銀行', '在咖啡廳', '在家電用品店', '在郵局'],
      ev: ['I bought this coffee maker here last week'], kw: ['Where', 'most likely'],
      vocab: [['refund', 'n.', '退款'], ['receipt', 'n.', '收據'], ['look up', 'phr.', '查詢'], ['purchase', 'n.', '購買（的東西）'], ['store credit', 'n.', '購物金'], ['exchange', 'n./v.', '換貨'], ['model', 'n.', '型號'], ['appliance', 'n.', '家電']] },
    { id: 14, part: P3, group: 'L-13-15', question: 'What does the man ask the woman for?',
      options: ['A receipt', 'A phone number', 'An ID card', 'A delivery address'], answer: 'A',
      script: C13, translation: Z13, recommendedSeconds: 25,
      explanation: '男子問 Do you have your receipt with you?，要收據。',
      qz: '男子向女子要什麼？', oz: ['收據', '電話號碼', '身分證', '送貨地址'],
      ev: ['Do you have your receipt with you?'], kw: ['man ask', 'for'] },
    { id: 15, part: P3, group: 'L-13-15', question: 'What does the woman decide to do?',
      options: ['Get a cash refund', 'Buy a more expensive model', 'Come back later', 'Exchange the product'], answer: 'D',
      script: C13, translation: Z13, recommendedSeconds: 25,
      explanation: '沒有收據不能退現金，女子說 I\'ll exchange it for the same model，決定換貨。',
      qz: '女子決定怎麼做？', oz: ['拿現金退款', '買更貴的型號', '晚點再來', '換貨'],
      ev: ["I'll exchange it for the same model."], kw: ['woman decide'] },

    { id: 16, part: P3, group: 'L-16-18', voices: { M: 'Reed', W: 'Moira', M2: 'Daniel' }, question: 'What is the main problem?',
      options: ['A product launch is behind schedule.', 'An advertising budget was cut.', 'A customer has complained.', 'A developer has quit.'], answer: 'A',
      script: C16, translation: Z16, recommendedSeconds: 25,
      explanation: '開頭說新的訂位 App won\'t be ready by the end of the month，產品進度落後。',
      qz: '主要的問題是什麼？', oz: ['產品上市進度落後。', '廣告預算被刪減。', '有顧客抱怨。', '一位開發人員離職了。'],
      ev: ["the new booking app won't be ready by the end of the month"], kw: ['main problem'],
      vocab: [['developer', 'n.', '（軟體）開發人員', 'developers'], ['marketing campaign', 'n.', '行銷活動'], ['launch', 'v.', '推出'], ['bug', 'n.', '程式錯誤', 'bugs'], ['for the time being', 'phr.', '暫時'], ['ad agency', 'n.', '廣告代理商'], ['wording', 'n.', '措辭；文案'], ['behind schedule', 'phr.', '進度落後']] },
    { id: 17, part: P3, group: 'L-16-18', question: 'What does Tom suggest?',
      options: ['Hiring more developers', 'Canceling the campaign', 'Releasing a basic version first', 'Lowering the prices'], answer: 'C',
      script: C16, translation: Z16, recommendedSeconds: 25,
      explanation: '被點名的 Tom（第二位男子）說 Could we launch a simpler version first?，建議先推簡化版。',
      qz: 'Tom 建議什麼？', oz: ['多雇開發人員', '取消行銷活動', '先推出基本版', '降價'],
      ev: ['Could we launch a simpler version first?'], kw: ['Tom', 'suggest'] },
    { id: 18, part: P3, group: 'L-16-18', question: 'What will Lisa do next?',
      options: ['Contact an advertising agency', 'Fix some bugs', 'Call some customers', 'Train counter staff'], answer: 'A',
      script: C16, translation: Z16, recommendedSeconds: 25,
      explanation: 'Lisa（女子）最後說 I\'ll contact the ad agency，接下來聯絡廣告代理商。',
      qz: 'Lisa 接下來會做什麼？', oz: ['聯絡廣告代理商', '修正程式錯誤', '打電話給顧客', '訓練櫃台人員'],
      ev: ["I'll contact the ad agency"], kw: ['Lisa', 'next'] },

    { id: 19, part: P3, group: 'L-19-21', voices: { W: 'Karen', M: 'Reed' }, question: 'Why is the man calling?',
      options: ['To ask about checking in early', 'To cancel a booking', 'To complain about a room', 'To change his flight'], answer: 'A',
      script: C19, translation: Z19, recommendedSeconds: 25,
      explanation: '男子說 I\'d like to know if I can check in early，打電話是問能否提早入住。',
      qz: '男子為什麼打電話？', oz: ['詢問能否提早入住', '取消訂房', '抱怨房間', '更改班機'],
      ev: ["I'd like to know if I can check in early"], kw: ['Why', 'calling'],
      vocab: [['reservation', 'n.', '預約；訂房'], ['under the name', 'phr.', '以…的名字（訂）'], ['check in', 'phr.', '辦理入住'], ['guarantee', 'v.', '保證'], ['luggage', 'n.', '行李'], ['front desk', 'n.', '櫃台'], ['business lounge', 'n.', '商務貴賓室'], ['free of charge', 'phr.', '免費']] },
    { id: 20, part: P3, group: 'L-19-21', question: 'What does the woman offer?',
      options: ['A free room upgrade', 'A shuttle bus service', 'A late checkout', 'A place to store his luggage'], answer: 'D',
      script: C19, translation: Z19, recommendedSeconds: 25,
      explanation: '女子說可以 leave your luggage at the front desk，提供寄放行李。',
      qz: '女子提供了什麼？', oz: ['免費升等房間', '接駁車服務', '延後退房', '寄放行李的地方'],
      ev: ["you're welcome to leave your luggage at the front desk"], kw: ['woman offer'] },
    { id: 21, part: P3, group: 'L-19-21', question: 'What does the woman say about the lounge?',
      options: ['It opens at three p.m.', 'It requires a reservation.', 'It offers free printing.', 'It is being renovated.'], answer: 'C',
      script: C19, translation: Z19, recommendedSeconds: 25,
      explanation: '女子說 The lounge also has printers, which guests can use free of charge，可免費列印。',
      qz: '女子說了貴賓室的什麼？', oz: ['下午三點開放。', '需要預約。', '提供免費列印。', '正在整修。'],
      ev: ['The lounge also has printers, which guests can use free of charge.'], kw: ['lounge'] },

    /* Part 4 */
    { id: 22, part: P4, group: 'L-22-24', voices: { W: 'Samantha' }, question: 'Who most likely is the speaker?',
      options: ['A staff member at a clinic', 'A dentist', 'An insurance agent', 'A conference organizer'], answer: 'A',
      script: T22, translation: Z22, recommendedSeconds: 25,
      explanation: '說話者是 Brian from Greenfield Dental Clinic，打電話處理預約，是診所職員（不是醫師本人，醫師是 Dr. Hart）。',
      qz: '說話者最可能是誰？', oz: ['診所的職員', '牙醫師', '保險業務員', '研討會主辦人'],
      ev: ['This is Brian from Greenfield Dental Clinic.'], kw: ['Who', 'speaker'],
      vocab: [['appointment', 'n.', '預約'], ['attend a conference', 'phr.', '參加研討會', 'attending a conference'], ['reschedule', 'v.', '改期'], ['opening', 'n.', '（時段）空檔', 'openings'], ['confirm', 'v.', '確認'], ['insurance card', 'n.', '保險卡']] },
    { id: 23, part: P4, group: 'L-22-24', question: 'Why does the appointment need to be changed?',
      options: ['The clinic will be closed for repairs.', 'The listener requested a new time.', 'The doctor will be away at a conference.', 'A machine is not working.'], answer: 'C',
      script: T22, translation: Z22, recommendedSeconds: 25,
      explanation: 'Dr. Hart will be attending a conference that afternoon，醫師要去研討會。',
      qz: '預約為什麼需要更改？', oz: ['診所要關閉整修。', '聽者要求換時間。', '醫師要去參加研討會。', '有台機器壞了。'],
      ev: ['Dr. Hart will be attending a conference that afternoon, so we need to reschedule'], kw: ['Why', 'changed'] },
    { id: 24, part: P4, group: 'L-22-24', question: 'What is the listener asked to bring?',
      options: ['A payment receipt', 'Medical records', 'An updated insurance card', 'A referral letter'], answer: 'C',
      script: T22, translation: Z22, recommendedSeconds: 25,
      explanation: '最後說 please remember to bring your updated insurance card。',
      qz: '聽者被要求帶什麼？', oz: ['付款收據', '病歷', '更新後的保險卡', '轉診信'],
      ev: ['please remember to bring your updated insurance card'], kw: ['asked to bring'] },

    { id: 25, part: P4, group: 'L-25-27', voices: { M: 'Daniel' }, question: 'Where is the talk taking place?',
      options: ['At a restaurant', 'At a farm', 'At a supermarket', 'At a factory'], answer: 'D',
      script: T25, translation: Z25, recommendedSeconds: 25,
      explanation: 'Welcome to the Brightwater Chocolate Factory，在工廠。',
      qz: '這段話在哪裡發表？', oz: ['在餐廳', '在農場', '在超市', '在工廠'],
      ev: ['Welcome to the Brightwater Chocolate Factory.'], kw: ['Where'],
      vocab: [['guide', 'n.', '導覽員'], ['roast', 'v.', '烘焙', 'roasted'], ['for safety reasons', 'phr.', '基於安全理由'], ['permitted', 'adj.', '被允許的'], ['production area', 'n.', '生產區'], ['participant', 'n.', '參加者', 'participants'], ['hand out', 'phr.', '分發', 'handing out']] },
    { id: 26, part: P4, group: 'L-25-27', question: 'What does the speaker say is not allowed?',
      options: ['Eating in the gift shop', 'Taking photos in the production area', 'Touching the machines', 'Leaving the group'], answer: 'B',
      script: T25, translation: Z25, recommendedSeconds: 25,
      explanation: 'photography is not permitted inside the production area，生產區禁止拍照。',
      qz: '說話者說什麼是不被允許的？', oz: ['在禮品店吃東西', '在生產區拍照', '摸機器', '脫離隊伍'],
      ev: ['photography is not permitted inside the production area'], kw: ['not allowed'] },
    { id: 27, part: P4, group: 'L-25-27', question: 'What will the listeners probably do next?',
      options: ['Put on hairnets', 'Buy some chocolate', 'Watch a video', 'Fill out a form'], answer: 'A',
      script: T25, translation: Z25, recommendedSeconds: 25,
      explanation: '最後說 if everyone could put on the hairnets I\'m handing out, we\'ll get started，接下來戴髮網。',
      qz: '聽者接下來可能會做什麼？', oz: ['戴上髮網', '買巧克力', '看影片', '填表格'],
      ev: ["if everyone could put on the hairnets I'm handing out"], kw: ['listeners', 'next'] },

    { id: 28, part: P4, group: 'L-28-30', voices: { W: 'Karen' }, question: 'What did many customers complain about?',
      options: ['Product quality', 'Slow delivery', 'High prices', 'Poor customer service'], answer: 'B',
      script: T28, translation: Z28, recommendedSeconds: 25,
      explanation: 'many said our delivery times are too long，抱怨出貨太慢。品質反而是滿意的。',
      qz: '許多顧客抱怨什麼？', oz: ['產品品質', '送貨太慢', '價格太高', '客服很差'],
      ev: ['many said our delivery times are too long'], kw: ['complain'],
      vocab: [['customer survey', 'n.', '顧客問卷'], ['overall', 'adv.', '整體來說'], ['on average', 'phr.', '平均'], ['competitor', 'n.', '競爭對手'], ['address', 'v.', '處理（問題）'], ['distribution center', 'n.', '物流中心'], ['cut … in half', 'phr.', '減半', 'cut delivery times in half'], ['logistics', 'n.', '物流'], ['temporary staff', 'n.', '臨時人員'], ['transition', 'n.', '過渡期'], ['additional', 'adj.', '額外的']] },
    { id: 29, part: P4, group: 'L-28-30', question: 'According to the speaker, what will the company do next month?',
      options: ['Merge with a competitor', 'Lower its prices', 'Open a distribution center', 'Launch a new product'], answer: 'C',
      script: T28, translation: Z28, recommendedSeconds: 25,
      explanation: "we're opening a new distribution center in Riverside next month。",
      qz: '根據說話者，公司下個月會做什麼？', oz: ['和競爭對手合併', '降價', '開設物流中心', '推出新產品'],
      ev: ["we're opening a new distribution center in Riverside next month"], kw: ['next month'] },
    { id: 30, part: P4, group: 'L-28-30', question: 'What does the speaker ask the listeners to do by Friday?',
      options: ['Submit a sales report', 'Interview job candidates', 'Visit the Riverside site', 'Tell her if they need more help'], answer: 'D',
      script: T28, translation: Z28, recommendedSeconds: 25,
      explanation: 'Please let me know by Friday if your department needs additional support，需要支援就告訴她。',
      qz: '說話者要聽者在週五前做什麼？', oz: ['交銷售報告', '面試應徵者', '去 Riverside 現場', '需要更多人手就告訴她'],
      ev: ['Please let me know by Friday if your department needs additional support.'], kw: ['ask', 'by Friday'] }
  ];

  window.BESTEP_DATA.test1Listening = {
    testId: 1,
    section: 'listening',
    title: 'TOEIC Test 1 · Listening',
    description: 'TOEIC 模擬測驗 Test 1 聽力（Part 2–4，原創題目 30 題，約 20 分鐘）。',
    durationSec: 0,
    questions: Q
  };

  window.BESTEP_NOTES = window.BESTEP_NOTES || {};
  window.BESTEP_VOCAB = window.BESTEP_VOCAB || {};
  const notes = {};
  const vocab = {};
  Q.forEach((q) => {
    notes[q.id] = { qz: q.qz, oz: q.oz, ev: q.ev, kw: q.kw };
    if (q.vocab) vocab[q.id] = q.vocab;
  });
  window.BESTEP_NOTES['1L'] = notes;
  window.BESTEP_VOCAB['1L'] = vocab;
})();
