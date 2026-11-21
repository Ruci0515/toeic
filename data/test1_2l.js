/* Test 1 聽力 Part 3 簡短對話（Q32–70，13 段 × 3 題；最後三段搭配圖表） */
(function () {
  const set = (group, base, rows) => window.TOEIC_T1.set('L', 'Part 3', group, base, rows);
  const L = (speaker, text) => ({ speaker, text });

  set('L-32-34', {
    voices: { W: 'af_heart', M: 'am_michael' },
    script: [
      L('W', "Kevin, the printer in the copy room keeps jamming. I need forty copies of the sales report for the two o'clock meeting."),
      L('M', "That machine has been acting up all week. I've already asked the technician to come by, but he can't make it until tomorrow."),
      L('W', "Tomorrow's too late. Is there another printer I could use?"),
      L('M', 'The one on the fourth floor works fine. Just remember to bring your ID badge. You need it to unlock the door to that floor.')
    ],
    translation: '女：Kevin，影印室的印表機一直卡紙。我需要四十份銷售報告給兩點的會議用。\n男：那台機器整個禮拜都怪怪的。我已經請技術人員過來看，但他明天才能來。\n女：明天就太晚了。有其他印表機可以用嗎？\n男：四樓那台很正常。記得帶你的識別證，要用它才能打開那層樓的門。',
    vocab: [['jam', 'v.', '（機器）卡住', 'jamming'], ['copy room', 'n.', '影印室'], ['act up', 'phr.', '（機器）故障；不正常', 'acting up'], ['come by', 'phr.', '過來一趟'], ['make it', 'phr.', '趕得上；能到'], ['ID badge', 'n.', '識別證'], ['unlock', 'v.', '解鎖']]
  }, [
    [32, 'What problem does the woman mention?', ['A meeting has been canceled.', 'A machine is not working properly.', 'A report contains errors.', 'A room is already booked.'], 'B',
      '女子提到什麼問題？', ['會議被取消了。', '一台機器運作不正常。', '報告有錯誤。', '房間已經被預訂了。'], ['the printer in the copy room keeps jamming'], ['problem', 'woman'], '女子說印表機一直卡紙（keeps jamming），機器運作不正常。'],
    [33, 'Why is the technician unable to help today?', ['He is on vacation.', 'He needs a replacement part.', 'He is not available until tomorrow.', 'He does not have a key.'], 'C',
      '技術人員今天為什麼無法幫忙？', ['他在休假。', '他需要更換零件。', '他明天才有空。', '他沒有鑰匙。'], ["he can't make it until tomorrow"], ['Why', 'technician'], "he can't make it until tomorrow：明天才能來。"],
    [34, 'What does the man remind the woman to do?', ['Bring an ID badge', 'Print double-sided copies', 'Call the technician', 'Reserve a meeting room'], 'A',
      '男子提醒女子做什麼？', ['帶識別證', '雙面列印', '打給技術人員', '預訂會議室'], ['Just remember to bring your ID badge.'], ['remind'], 'remember to bring your ID badge：記得帶識別證。']
  ]);

  set('L-35-37', {
    voices: { M: 'bm_george', W: 'bf_emma' },
    script: [
      L('M', "Good evening, Rosewood Bistro. How can I help you?"),
      L('W', "Hi. I have a reservation for six people this Friday at seven, under the name Tanaka. I'm afraid two more colleagues will be joining us. Is it possible to change it to eight?"),
      L('M', "Let me check. Our main dining room is fully booked on Friday, but our private room upstairs is available. It seats up to ten, and there's no extra charge."),
      L('W', "That sounds even better. One of our guests is vegetarian, by the way."),
      L('M', "No problem. I'll let the chef know, and I'll send you a copy of our vegetarian menu by e-mail.")
    ],
    translation: '男：晚安，Rosewood 餐館，有什麼需要服務的？\n女：嗨，我用 Tanaka 的名字訂了這週五晚上七點六位。恐怕還會多兩位同事加入，可以改成八位嗎？\n男：我查一下。週五主用餐區已經訂滿了，不過樓上的包廂還空著，最多坐十位，而且不另外收費。\n女：那更好。對了，我們有一位客人吃素。\n男：沒問題。我會告訴主廚，並把素食菜單用 email 寄給您。',
    vocab: [['reservation', 'n.', '預約；訂位'], ["I'm afraid", 'phr.', '恐怕（委婉說壞消息）'], ['fully booked', 'phr.', '客滿'], ['private room', 'n.', '包廂'], ['seat', 'v.', '可容納…人', 'seats'], ['extra charge', 'n.', '額外費用'], ['vegetarian', 'n./adj.', '素食者；素食的']]
  }, [
    [35, 'Why is the woman calling?', ['To cancel a booking', 'To change the number of guests', 'To ask about parking', 'To complain about a meal'], 'B',
      '女子為什麼打電話？', ['取消訂位', '更改人數', '詢問停車', '抱怨餐點'], ['Is it possible to change it to eight?'], ['Why', 'calling'], '她想把六位改成八位，change it to eight。'],
    [36, 'What does the man offer?', ['A discount on drinks', 'An earlier time', 'A private room', 'A free dessert'], 'C',
      '男子提供了什麼？', ['飲料折扣', '更早的時段', '包廂', '免費甜點'], ['our private room upstairs is available'], ['man offer'], '主用餐區客滿，男子提供樓上包廂，而且不加價。'],
    [37, 'What will the man send to the woman?', ['A menu', 'A receipt', 'A map', 'A contract'], 'A',
      '男子會寄什麼給女子？', ['菜單', '收據', '地圖', '合約'], ["I'll send you a copy of our vegetarian menu by e-mail"], ['send'], '最後說會 email 素食菜單。']
  ]);

  set('L-38-40', {
    voices: { M: 'am_adam', W: 'af_sarah' },
    script: [
      L('M', "Hello, this is Daniel Ortiz from Brightline Engineering. I'm calling about the project coordinator position you applied for."),
      L('W', 'Oh, thank you for calling. I was hoping to hear from you.'),
      L('M', "We were impressed with your résumé, and we'd like to invite you for an interview. Would next Tuesday at ten work for you?"),
      L('W', "I'm afraid I have a training course all day Tuesday. Would Wednesday be possible?"),
      L('M', "Wednesday afternoon is fine. Let's say two o'clock. Please bring a portfolio of projects you've managed, if you have one.")
    ],
    translation: '男：您好，我是 Brightline 工程公司的 Daniel Ortiz，打來是關於您應徵的專案協調員職位。\n女：喔，謝謝您來電，我一直在等消息。\n男：我們對您的履歷印象深刻，想邀請您來面試。下週二上午十點可以嗎？\n女：不好意思，我週二整天要上訓練課程。週三可以嗎？\n男：週三下午可以，就兩點吧。如果有的話，請帶您管理過的專案作品集。',
    vocab: [['project coordinator', 'n.', '專案協調員'], ['apply for', 'phr.', '應徵', 'applied for'], ['impressed with', 'phr.', '對…印象深刻'], ['résumé', 'n.', '履歷'], ['portfolio', 'n.', '作品集'], ['manage', 'v.', '管理', 'managed']]
  }, [
    [38, 'Who most likely is the man?', ['A job applicant', 'A training instructor', 'A hiring manager', 'A project client'], 'C',
      '男子最可能是誰？', ['應徵者', '訓練講師', '負責招募的主管', '專案客戶'], ["we'd like to invite you for an interview"], ['Who', 'man'], '他打來談應徵職位並邀約面試，是負責招募的人。'],
    [39, 'Why does the woman ask to change the time?', ['She will be attending a training course.', 'She has another interview.', 'She will be traveling.', 'She has a doctor\'s appointment.'], 'A',
      '女子為什麼要求換時間？', ['她要參加訓練課程。', '她有另一場面試。', '她要出差。', '她要看醫生。'], ['I have a training course all day Tuesday'], ['Why', 'change the time'], '週二整天有訓練課程。'],
    [40, 'What is the woman asked to bring?', ['A reference letter', 'A copy of her diploma', 'A form of identification', 'Examples of her past work'], 'D',
      '女子被要求帶什麼？', ['推薦信', '畢業證書影本', '身分證件', '過去工作的作品'], ["Please bring a portfolio of projects you've managed"], ['asked to bring'], 'portfolio of projects＝過去的工作成果，換句話說成 Examples of her past work。']
  ]);

  set('L-41-43', {
    voices: { W: 'bf_isabella', M: 'am_eric', M2: 'bm_lewis' },
    script: [
      L('W', "Okay, everyone. As you know, our department is moving to the new building on Harper Street next month. Peter, how are the preparations going?"),
      L('M', "Pretty well. The movers are booked for the twelfth, and I've ordered packing boxes for everyone. They should arrive by Friday."),
      L('M2', "One concern, though. The new office has fewer meeting rooms than we have here. We might have trouble scheduling team meetings."),
      L('W', "Good point, Jacob. I'll ask the facilities manager whether we can use the large conference room on the ground floor on a regular basis."),
      L('M2', "That would help a lot.")
    ],
    translation: '女：好，各位。大家都知道，我們部門下個月要搬到 Harper 街的新大樓。Peter，準備得怎麼樣了？\n男：還不錯。搬家公司訂在十二號，我也幫每個人訂了打包紙箱，週五前應該會到。\n男2：不過有一個顧慮：新辦公室的會議室比這裡少，我們排團隊會議可能會有困難。\n女：說得好，Jacob。我會問設施經理，能不能固定使用一樓那間大會議室。\n男2：那會很有幫助。',
    vocab: [['department', 'n.', '部門'], ['preparation', 'n.', '準備', 'preparations'], ['mover', 'n.', '搬家公司', 'movers'], ['packing box', 'n.', '打包紙箱', 'packing boxes'], ['concern', 'n.', '擔憂'], ['facilities manager', 'n.', '設施經理'], ['on a regular basis', 'phr.', '定期地；固定地']]
  }, [
    [41, 'What are the speakers mainly discussing?', ['An office relocation', 'A product launch', 'A new hiring policy', 'A building renovation'], 'A',
      '說話者主要在討論什麼？', ['辦公室搬遷', '產品上市', '新的招募政策', '大樓整修'], ['our department is moving to the new building on Harper Street next month'], ['mainly discussing'], '部門下個月要搬到新大樓，主題是辦公室搬遷（relocation）。'],
    [42, 'What does Jacob say about the new office?', ['It is farther from the station.', 'It has fewer meeting rooms.', 'It has not been cleaned yet.', 'It needs new furniture.'], 'B',
      'Jacob 說新辦公室怎麼了？', ['離車站比較遠。', '會議室比較少。', '還沒清潔。', '需要新家具。'], ['The new office has fewer meeting rooms than we have here.'], ['Jacob', 'new office'], '被叫到名字的 Jacob（第二位男子）說新辦公室會議室比較少。'],
    [43, 'What will the woman do next?', ['Order more boxes', 'Contact a moving company', 'Speak with a facilities manager', 'Reschedule a meeting'], 'C',
      '女子接下來會做什麼？', ['多訂一些紙箱', '聯絡搬家公司', '跟設施經理談', '更改會議時間'], ["I'll ask the facilities manager"], ['woman', 'next'], "I'll ask the facilities manager：她會去問設施經理。"]
  ]);

  set('L-44-46', {
    voices: { W: 'af_nicole', M: 'am_michael' },
    script: [
      L('W', "Hi, I reserved a compact car for three days. The confirmation number is R-4419."),
      L('M', "Thank you. Let me pull that up. Ah, I'm sorry. We had a problem with the compact car that was assigned to you, so it's in the repair shop."),
      L('W', 'Oh, no. I have a client meeting in an hour.'),
      L('M', "Don't worry. We can give you a mid-size sedan for the same price. It also has a built-in navigation system."),
      L('W', "Great, that'll actually help, since I don't know the area very well.")
    ],
    translation: '女：嗨，我預約了一台小型車，租三天。確認編號是 R-4419。\n男：謝謝，我查一下。啊，很抱歉，原本分配給您的小型車出了問題，現在在維修廠。\n女：糟了，我一小時後要見客戶。\n男：別擔心。我們可以用同樣的價格給您一台中型轎車，還有內建導航系統。\n女：太好了，這反而有幫助，因為我對這一帶不熟。',
    vocab: [['compact car', 'n.', '小型車'], ['confirmation number', 'n.', '確認編號'], ['pull up', 'phr.', '（在電腦上）調出資料'], ['assign', 'v.', '分配', 'assigned'], ['repair shop', 'n.', '維修廠'], ['sedan', 'n.', '轎車'], ['built-in', 'adj.', '內建的'], ['navigation system', 'n.', '導航系統']]
  }, [
    [44, 'Where most likely are the speakers?', ['At a car rental agency', 'At a repair shop', 'At a hotel front desk', 'At a train station'], 'A',
      '說話者最可能在哪裡？', ['在租車公司', '在維修廠', '在飯店櫃台', '在火車站'], ['I reserved a compact car for three days.'], ['Where'], '預約小型車租三天，在租車公司。repair shop 只是提到車子送修。'],
    [45, 'What problem does the man mention?', ['A reservation was not found.', 'A credit card was declined.', 'A vehicle is being repaired.', 'An office is closing early.'], 'C',
      '男子提到什麼問題？', ['找不到預約。', '信用卡被拒。', '有輛車正在修理。', '辦公室要提早關門。'], ["so it's in the repair shop"], ['problem', 'man'], '原本的車在維修廠（in the repair shop）。'],
    [46, 'Why is the woman pleased with the alternative?', ['It is cheaper.', 'It uses less fuel.', 'It has more space for luggage.', 'It includes a navigation system.'], 'D',
      '女子為什麼對替代方案滿意？', ['比較便宜。', '比較省油。', '放行李的空間比較大。', '附有導航系統。'], ["It also has a built-in navigation system.", "since I don't know the area very well"], ['Why', 'pleased'], '她不熟這一帶，內建導航對她有幫助。價格是一樣的，(A) 錯。']
  ]);

  set('L-47-49', {
    voices: { M: 'bm_george', W: 'af_heart' },
    script: [
      L('M', "Hi, Sandra. This is Mark from Lakeview Hardware. We received your shipment of desk lamps this morning, but about a third of them have cracked bases."),
      L('W', "Oh, I'm really sorry about that. We changed our packaging company last month, so that could be the reason."),
      L('M', "Well, we're running a promotion on those lamps starting Saturday."),
      L('W', "I understand. I'll have replacements sent out by express delivery today, and of course you won't be charged for them. Could you e-mail me some photos of the damaged items for our records?")
    ],
    translation: '男：嗨，Sandra，我是 Lakeview 五金行的 Mark。我們今天早上收到你們那批檯燈，但大約三分之一的燈座有裂痕。\n女：喔，真的很抱歉。我們上個月換了包裝公司，可能是這個原因。\n男：嗯，我們那批檯燈週六開始要做促銷耶。\n女：我明白。我今天會用快遞寄出替換品，當然不會向您收費。可以把損壞品的照片 email 給我存檔嗎？',
    vocab: [['shipment', 'n.', '（一批）貨物'], ['cracked', 'adj.', '有裂痕的'], ['packaging', 'n.', '包裝'], ['run a promotion', 'phr.', '舉辦促銷活動', 'running a promotion'], ['replacement', 'n.', '替換品', 'replacements'], ['charge', 'v.', '收費', 'charged'], ['for our records', 'phr.', '存檔用']]
  }, [
    [47, 'What is the problem with the shipment?', ['It arrived late.', 'Some items are damaged.', 'It was sent to the wrong store.', 'Some items are the wrong color.'], 'B',
      '這批貨有什麼問題？', ['晚到了。', '有些商品損壞。', '送錯店了。', '有些商品顏色不對。'], ['about a third of them have cracked bases'], ['problem', 'shipment'], '三分之一的燈座有裂痕（cracked），商品損壞。'],
    [48, 'What does the man imply when he says, "we\'re running a promotion on those lamps starting Saturday"?', ['He wants to order more lamps.', 'He plans to cancel the order.', 'He is offering the woman a discount.', 'He needs the problem solved quickly.'], 'D',
      '男子說「我們那批檯燈週六開始要做促銷」暗示什麼？', ['他想多訂一些檯燈。', '他打算取消訂單。', '他要給女子折扣。', '他需要問題盡快解決。'], ["we're running a promotion on those lamps starting Saturday"], ['imply', 'running a promotion'], '意圖題：週六就要促銷，暗示需要趕快拿到好的商品，女子也立刻說今天用快遞寄。'],
    [49, 'What does the woman ask the man to do?', ['Return the damaged lamps', 'Call the packaging company', 'Sign a delivery form', 'Send some photographs'], 'D',
      '女子請男子做什麼？', ['退回損壞的檯燈', '打給包裝公司', '簽收貨單', '寄一些照片'], ['Could you e-mail me some photos of the damaged items for our records?'], ['ask the man'], '請他 email 損壞品的照片。']
  ]);

  set('L-50-52', {
    voices: { W: 'bf_emma', M: 'am_adam' },
    script: [
      L('W', "Welcome to Peak Fitness. Are you interested in becoming a member?"),
      L('M', "Yes. I just moved to this neighborhood, and I'd like to join a gym that's open early. I usually work out before going to the office."),
      L('W', "We open at five thirty every weekday. Our standard membership is fifty dollars a month, but if you sign up for a full year, you get two months free."),
      L('M', 'That sounds reasonable. Do you offer any fitness classes?'),
      L('W', "Yes, they're included in the membership. Here's this month's class schedule. I can also give you a tour of the facility now, if you have a few minutes.")
    ],
    translation: '女：歡迎來到 Peak 健身房。您有興趣加入會員嗎？\n男：有。我剛搬來這附近，想找一家很早開門的健身房，我通常上班前運動。\n女：我們平日每天五點半開門。一般會員每月 50 美元，如果一次報名一整年，可以送兩個月。\n男：聽起來很合理。你們有開健身課程嗎？\n女：有，課程包含在會費裡。這是本月的課表。如果您有幾分鐘，我現在可以帶您參觀環境。',
    vocab: [['neighborhood', 'n.', '社區；附近'], ['work out', 'phr.', '運動健身'], ['membership', 'n.', '會員資格'], ['sign up for', 'phr.', '報名'], ['reasonable', 'adj.', '（價格）合理的'], ['be included in', 'phr.', '包含在…裡', "they're included in"], ['give … a tour', 'phr.', '帶…參觀', 'give you a tour']]
  }, [
    [50, 'Why does the man want to join the gym?', ['It is close to his office.', 'It opens early in the morning.', 'It has a swimming pool.', 'It is having a sale.'], 'B',
      '男子為什麼想加入這家健身房？', ['離他公司很近。', '早上很早開門。', '有游泳池。', '正在特價。'], ["I'd like to join a gym that's open early"], ['Why', 'join'], '他要找很早開門的健身房，因為上班前運動。'],
    [51, 'According to the woman, how can members receive two free months?', ['By referring a friend', 'By paying in cash', 'By signing up for a year', 'By attending a class'], 'C',
      '根據女子，會員怎樣可以得到兩個月免費？', ['介紹朋友', '付現金', '報名一整年', '參加一堂課'], ['if you sign up for a full year, you get two months free'], ['two free months'], 'sign up for a full year → two months free。'],
    [52, 'What does the woman offer to do?', ['Show the man around', 'Lower the monthly fee', 'Introduce a trainer', 'Reserve a class'], 'A',
      '女子主動表示要做什麼？', ['帶男子參觀', '降低月費', '介紹教練', '幫他預約課程'], ['I can also give you a tour of the facility now'], ['offer'], 'give you a tour＝帶你參觀，換句話說成 show the man around。']
  ]);

  set('L-53-55', {
    voices: { M: 'am_eric', W: 'af_bella' },
    script: [
      L('M', "Hi, Lena. Are you going to the Digital Marketing Summit in Chicago next month?"),
      L('W', "I'd like to, but registration closed last week. I didn't realize it would fill up so quickly."),
      L('M', "Actually, our company is a sponsor this year, so we get three free passes. Two of them are still available."),
      L('W', "Really? That's great news. Who do I need to talk to?"),
      L('M', "Talk to Ms. Hughes in the marketing department. She's handling the passes. You should hurry, though. A few people have already asked about them.")
    ],
    translation: '男：嗨，Lena，下個月芝加哥的數位行銷高峰會你要去嗎？\n女：我很想去，但報名上週就截止了。我沒想到那麼快就額滿。\n男：其實我們公司今年是贊助商，有三張免費通行證，還剩兩張。\n女：真的嗎？太好了。我要找誰？\n男：找行銷部的 Hughes 女士，通行證由她負責。不過你要快一點，已經有幾個人來問了。',
    vocab: [['summit', 'n.', '高峰會'], ['registration', 'n.', '報名'], ['fill up', 'phr.', '額滿'], ['sponsor', 'n.', '贊助商'], ['pass', 'n.', '通行證', 'passes'], ['handle', 'v.', '負責處理', 'handling']]
  }, [
    [53, 'What event are the speakers discussing?', ['A product launch', 'A company anniversary', 'A training workshop', 'An industry conference'], 'D',
      '說話者在討論什麼活動？', ['產品發表會', '公司週年慶', '訓練工作坊', '業界研討會'], ['the Digital Marketing Summit in Chicago next month'], ['event'], 'Digital Marketing Summit（數位行銷高峰會）是業界研討會。'],
    [54, 'Why has the woman not registered?', ['Registration has closed.', 'The fee is too expensive.', 'She has a scheduling conflict.', 'Her manager did not approve it.'], 'A',
      '女子為什麼還沒報名？', ['報名已截止。', '費用太貴。', '她時間衝突。', '主管沒批准。'], ['registration closed last week'], ['Why', 'not registered'], 'registration closed last week。'],
    [55, 'Why does the man say, "A few people have already asked about them"?', ['To explain a delay', 'To encourage the woman to act quickly', 'To complain about a coworker', 'To suggest a different event'], 'B',
      '男子為什麼說「已經有幾個人來問了」？', ['解釋延誤原因', '鼓勵女子趕快行動', '抱怨同事', '建議別的活動'], ['You should hurry, though. A few people have already asked about them.'], ['Why', 'A few people have already asked'], '意圖題：前一句 You should hurry，通行證可能被拿走，要她趕快。']
  ]);

  set('L-56-58', {
    voices: { W: 'af_sarah', M: 'bm_lewis' },
    script: [
      L('W', "Hello, I'd like to order a cake for my coworker's retirement party on Thursday. Something that serves about thirty people."),
      L('M', "Our large sheet cake would be perfect for that. Would you like any writing on it?"),
      L('W', "Yes, please. Could you write, 'Congratulations, Martin! Enjoy your retirement'?"),
      L('M', "Certainly. Orders need two days' notice, so Thursday is fine. Would you like to pick it up, or should we deliver it?"),
      L('W', "Please deliver it to our office. It's the Garland Building, on Fifth Avenue. Could it arrive by eleven thirty?")
    ],
    translation: '女：您好，我想為同事週四的退休派對訂一個蛋糕，大約三十人份。\n男：我們的大型長方形蛋糕很適合。要在上面寫字嗎？\n女：要，可以寫「恭喜 Martin！享受退休生活」嗎？\n男：當然。訂單需要兩天前預訂，週四沒問題。您要自取還是我們外送？\n女：請送到我們公司，在第五大道的 Garland 大樓。可以在十一點半前送到嗎？',
    vocab: [['retirement party', 'n.', '退休派對'], ['serve', 'v.', '（食物）夠…人份', 'serves'], ['sheet cake', 'n.', '大型長方形蛋糕'], ["two days' notice", 'phr.', '兩天前通知'], ['pick up', 'phr.', '自取'], ['deliver', 'v.', '外送']]
  }, [
    [56, 'What is the woman preparing for?', ['A grand opening', 'A birthday celebration', 'A retirement party', 'A client lunch'], 'C',
      '女子在準備什麼？', ['開幕典禮', '生日慶祝', '退休派對', '客戶午餐'], ["my coworker's retirement party on Thursday"], ['preparing for'], "coworker's retirement party。"],
    [57, 'What does the man say about orders?', ['They can be changed online.', 'They must be paid in cash.', 'They include free delivery.', 'They require advance notice.'], 'D',
      '男子說訂單有什麼規定？', ['可以上網修改。', '必須付現。', '包含免運。', '需要事先預訂。'], ["Orders need two days' notice"], ['orders'], "two days' notice＝需要提前兩天，換句話說成 advance notice。"],
    [58, 'What does the woman request?', ['A smaller cake', 'A different flavor', 'A discount', 'Delivery by a certain time'], 'D',
      '女子要求什麼？', ['小一點的蛋糕', '不同口味', '折扣', '在某個時間前送到'], ['Could it arrive by eleven thirty?'], ['request'], '要求十一點半前送達。']
  ]);

  set('L-59-61', {
    voices: { M: 'am_michael', W: 'bf_isabella', W2: 'af_nicole' },
    script: [
      L('M', "Hi, I'm from the IT department. I'm here to set up the laptop for your new team member."),
      L('W', "Thanks for coming. This is Grace. She started this morning."),
      L('W2', "Nice to meet you. I've been trying to log in to the company system, but my password isn't working."),
      L('M', "New accounts usually take a few hours to activate. Yours should be ready after lunch. In the meantime, I'll install the design software you'll need."),
      L('W', "Great. Grace, why don't you join me for the department meeting while he finishes?")
    ],
    translation: '男：嗨，我是資訊部的，來幫你們的新同事設定筆電。\n女：謝謝你過來。這位是 Grace，她今天早上剛到職。\n女2：很高興認識你。我一直想登入公司系統，但密碼都不能用。\n男：新帳號通常要幾個小時才會啟用，你的應該午餐後就好了。這段時間我先安裝你需要的設計軟體。\n女：太好了。Grace，他在處理的時候，你要不要跟我一起去開部門會議？',
    vocab: [['IT department', 'n.', '資訊部'], ['set up', 'phr.', '設定；安裝'], ['log in to', 'phr.', '登入'], ['activate', 'v.', '啟用'], ['in the meantime', 'phr.', '同時；在這段期間'], ['install', 'v.', '安裝']]
  }, [
    [59, 'Why is the man visiting?', ['To repair a printer', 'To set up a computer', 'To deliver some furniture', 'To lead a training session'], 'B',
      '男子為什麼來？', ['修印表機', '設定電腦', '送家具', '帶訓練課程'], ["I'm here to set up the laptop for your new team member"], ['Why', 'visiting'], '來幫新同事設定筆電。'],
    [60, 'What problem does Grace mention?', ['She cannot log in.', 'Her laptop is broken.', 'She missed a meeting.', 'Her desk is not ready.'], 'A',
      'Grace 提到什麼問題？', ['她無法登入。', '她的筆電壞了。', '她錯過了會議。', '她的辦公桌還沒準備好。'], ["my password isn't working"], ['problem', 'Grace'], '密碼不能用，無法登入系統。'],
    [61, 'What will Grace probably do next?', ['Go to lunch', 'Change her password', 'Attend a meeting', 'Install some software'], 'C',
      'Grace 接下來可能會做什麼？', ['去吃午餐', '改密碼', '參加會議', '安裝軟體'], ["why don't you join me for the department meeting"], ['Grace', 'next'], '主管邀她一起去部門會議；裝軟體是 IT 人員要做的。']
  ]);

  set('L-62-64', {
    voices: { W: 'af_heart', M: 'bm_george' },
    figure: { type: 'table', title: 'Departures to Westfield', headers: ['Train', 'Departs', 'Platform', 'Status'], rows: [['Express 101', '9:15', '3', 'Delayed 30 min'], ['Local 214', '9:25', '5', 'On time'], ['Express 105', '9:40', '3', 'On time'], ['Local 218', '9:55', '6', 'On time']] },
    script: [
      L('W', "Excuse me, I'm trying to get to Westfield for a meeting at ten thirty. I was going to take the nine fifteen express, but the board says it's delayed."),
      L('M', "Yes, there's a signal problem down the line. If you want to get there on time, take the next express instead. It's on time, and it takes only forty minutes."),
      L('W', "Thank you. Do I need a different ticket for that train?"),
      L('M', "No, your ticket is valid for any train to Westfield today. If you want a coffee while you wait, there's a café right next to the stairs.")
    ],
    translation: '女：不好意思，我要去 Westfield 參加十點半的會議。我本來要搭九點十五分的快車，但看板顯示誤點了。\n男：對，前面路段號誌出了問題。如果你想準時到，就改搭下一班快車，那班準點，而且只要四十分鐘。\n女：謝謝。搭那班需要換票嗎？\n男：不用，你的票今天任何一班開往 Westfield 的車都可以搭。等車時想喝咖啡的話，樓梯旁邊就有咖啡店。',
    vocab: [['board', 'n.', '（時刻）看板'], ['delayed', 'adj.', '誤點的'], ['signal problem', 'n.', '號誌故障'], ['on time', 'phr.', '準時'], ['valid', 'adj.', '有效的'], ['platform', 'n.', '月台']]
  }, [
    [62, 'Why is the woman traveling to Westfield?', ['To attend a meeting', 'To visit a relative', 'To catch a flight', 'To start a new job'], 'A',
      '女子為什麼要去 Westfield？', ['參加會議', '探望親戚', '趕飛機', '開始新工作'], ["I'm trying to get to Westfield for a meeting at ten thirty"], ['Why', 'Westfield'], '要去參加十點半的會議。'],
    [63, 'Look at the graphic. Which platform will the woman most likely go to?', ['Platform 3', 'Platform 5', 'Platform 6', 'Platform 4'], 'A',
      '看圖表：女子最可能去哪個月台？', ['3 號月台', '5 號月台', '6 號月台', '4 號月台'], ['take the next express instead'], ['graphic', 'platform'], '圖表題：男子建議搭「下一班快車」＝Express 105（9:40），在 3 號月台。Local 214 雖然更早，但不是快車。'],
    [64, 'What does the man say about the ticket?', ['It must be exchanged.', 'It was purchased for the wrong date.', 'It includes a free coffee.', 'It can be used on any train today.'], 'D',
      '男子說車票怎麼樣？', ['必須換票。', '買錯日期了。', '附一杯免費咖啡。', '今天任何一班車都能用。'], ['your ticket is valid for any train to Westfield today'], ['ticket'], 'valid for any train today。咖啡店只是順便提到，沒有說免費。']
  ]);

  set('L-65-67', {
    voices: { M: 'am_adam', W: 'bf_emma' },
    figure: { type: 'table', title: 'Carlton Tower — Directory', headers: ['Floor', 'Office'], rows: [['1', 'Lobby / Security Desk'], ['2', 'Harlow Accounting'], ['3', 'Mendez Law Group'], ['4', 'Bluepeak Design Studio']] },
    script: [
      L('M', "Hi, I'm here for a two o'clock appointment with Ms. Choi. She said her office is on the third floor."),
      L('W', "Let me check. Actually, Ms. Choi's company moved up one floor last week, so the directory downstairs is out of date. You'll find them right next to the design studio now."),
      L('M', "Thanks. Is there an elevator I can use? I'm carrying some heavy samples."),
      L('W', "Yes, it's just around the corner. Before you go up, though, please sign in here and take a visitor pass.")
    ],
    translation: '男：嗨，我兩點跟 Choi 女士有約。她說她的辦公室在三樓。\n女：我查一下。其實 Choi 女士的公司上週往上搬了一層樓，所以樓下的樓層指引已經過時了。他們現在就在設計工作室隔壁。\n男：謝謝。有電梯可以搭嗎？我帶著一些很重的樣品。\n女：有，就在轉角。不過上樓前，請先在這裡登記並拿一張訪客證。',
    vocab: [['appointment', 'n.', '約會；預約'], ['directory', 'n.', '樓層指引'], ['out of date', 'phr.', '過時的'], ['sample', 'n.', '樣品', 'samples'], ['sign in', 'phr.', '登記'], ['visitor pass', 'n.', '訪客證']]
  }, [
    [65, 'Why is the man visiting the building?', ['To deliver a package', 'To attend an appointment', 'To apply for a job', 'To inspect an elevator'], 'B',
      '男子為什麼來這棟大樓？', ['送包裹', '赴約', '應徵工作', '檢查電梯'], ["I'm here for a two o'clock appointment with Ms. Choi"], ['Why', 'visiting'], '跟 Choi 女士兩點有約。'],
    [66, 'Look at the graphic. On which floor is Ms. Choi\'s office now located?', ['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4'], 'D',
      '看圖表：Choi 女士的辦公室現在在幾樓？', ['1 樓', '2 樓', '3 樓', '4 樓'], ["Ms. Choi's company moved up one floor last week", 'right next to the design studio now'], ['graphic', 'floor'], '圖表題：原本在三樓，往上搬一層（moved up one floor）＝四樓，跟設計工作室同一層。'],
    [67, 'What is the man asked to do?', ['Sign in at the desk', 'Use the stairs', 'Wait in the lobby', 'Show some identification'], 'A',
      '男子被要求做什麼？', ['在櫃台登記', '走樓梯', '在大廳等候', '出示證件'], ['please sign in here and take a visitor pass'], ['asked to do'], 'sign in here and take a visitor pass。']
  ]);

  set('L-68-70', {
    voices: { W: 'af_bella', M: 'am_eric' },
    figure: { type: 'table', title: 'Brightway Printing — Business Cards', headers: ['Quantity', 'Price'], rows: [['250 cards', '$30'], ['500 cards', '$45'], ['1,000 cards', '$70'], ['2,000 cards', '$120']] },
    script: [
      L('W', "Hi, I'd like to order business cards for our new sales staff. We need five hundred cards for each of two people."),
      L('M', "Sure. If you order them together as one batch of a thousand, it's cheaper than two separate orders. You'd just need to send both designs at once."),
      L('W', "Oh, that's good to know. Let's do that. When would they be ready?"),
      L('M', "Usually in three business days. I'll e-mail you a proof of the design this afternoon. Once you approve it, we'll start printing.")
    ],
    translation: '女：嗨，我想幫新業務人員訂名片，兩個人各要五百張。\n男：好的。如果合在一起當成一千張一次下單，會比分兩筆便宜，只要把兩個設計一起寄給我們就好。\n女：喔，好在你提醒，那就這樣做吧。什麼時候可以好？\n男：通常三個工作天。我今天下午會把設計打樣 email 給您，您確認後我們就開始印。',
    vocab: [['business card', 'n.', '名片', 'business cards'], ['batch', 'n.', '一批'], ['separate', 'adj.', '分開的'], ['at once', 'phr.', '同時；一次'], ['business day', 'n.', '工作天', 'business days'], ['proof', 'n.', '打樣；校樣'], ['approve', 'v.', '核准；確認']]
  }, [
    [68, 'Who most likely is the woman ordering business cards for?', ['Some clients', 'A conference speaker', 'Some new employees', 'A department manager'], 'C',
      '女子最可能幫誰訂名片？', ['一些客戶', '研討會講者', '一些新員工', '部門經理'], ['business cards for our new sales staff'], ['Who', 'ordering'], 'new sales staff＝新員工。'],
    [69, 'Look at the graphic. How much will the woman most likely pay?', ['$45', '$70', '$90', '$120'], 'B',
      '看圖表：女子最可能付多少錢？', ['45 美元', '70 美元', '90 美元', '120 美元'], ['as one batch of a thousand', "Let's do that."], ['graphic', 'How much'], '圖表題：兩人各 500 張合成一筆 1,000 張＝$70。若分兩筆是 $45 × 2 = $90，是陷阱。'],
    [70, 'What will the man send this afternoon?', ['An invoice', 'A sample of the design', 'A price list', 'A delivery schedule'], 'B',
      '男子今天下午會寄什麼？', ['請款單', '設計打樣', '價目表', '送貨時間表'], ["I'll e-mail you a proof of the design this afternoon"], ['send', 'this afternoon'], 'proof of the design＝設計打樣，換句話說成 a sample of the design。']
  ]);
})();
