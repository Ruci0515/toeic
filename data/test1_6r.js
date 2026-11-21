/* Test 1 閱讀 Part 7 多篇閱讀（Q176–200：雙篇 × 2、三篇 × 3） */
(function () {
  const set = (group, base, rows) => window.TOEIC_T1.set('R', 'Part 7', group, base, rows);
  const B = (blocks) => blocks.map((t) => (typeof t === 'string' ? { type: 'p', text: t } : t));
  const H = (text) => ({ type: 'h', text });

  set('R-176-180', {
    passage: { title: 'Job Posting & E-mail', blocks: B([
      H('Text 1 — Job Posting'),
      'Hartwell Publishing is seeking a part-time Editorial Assistant to join our team in Boston. Responsibilities include proofreading manuscripts, organizing author files, and scheduling meetings for senior editors.',
      'Applicants should have at least one year of office experience and excellent attention to detail. Familiarity with design software is a plus but not required. The position is 20 hours per week, with flexible hours. To apply, send a résumé and a short writing sample to hr@hartwellpub.com by May 15.',
      H('Text 2 — E-mail'),
      'To: hr@hartwellpub.com · From: Emily Carter · Date: May 10 · Subject: Editorial Assistant Application',
      'Dear Hiring Manager, I am writing to apply for the part-time Editorial Assistant position advertised on your Web site. For the past two years, I have worked as an office assistant at a law firm, where I prepare documents and manage the partners\' calendars. I am also completing a degree in English literature, so the flexible schedule would allow me to continue my studies.',
      'I have attached my résumé. My writing sample will follow in a separate e-mail later this week, as I am making final revisions to it. Sincerely, Emily Carter'
    ]) },
    translation: '【徵才公告】Hartwell 出版社招募兼職編輯助理，加入波士頓團隊。工作內容包括校對稿件、整理作者檔案、為資深編輯安排會議。應徵者需至少一年辦公室經驗，非常細心。熟悉設計軟體者加分，但非必要。每週 20 小時、工時彈性。請於 5 月 15 日前將履歷和簡短寫作範例寄到 hr@hartwellpub.com。\n【Email】5 月 10 日，Emily Carter，主旨：應徵編輯助理。敬啟者：我想應徵貴公司網站刊登的兼職編輯助理。過去兩年我在律師事務所擔任辦公室助理，負責準備文件和管理合夥人的行事曆。我也正在修英國文學學位，彈性工時能讓我繼續學業。附上履歷。寫作範例還在做最後修改，本週稍晚會另外寄出。Emily Carter 敬上',
    vocab: [['seek', 'v.', '尋找；招募', 'seeking'], ['editorial assistant', 'n.', '編輯助理'], ['responsibilities', 'n.', '職責'], ['proofread', 'v.', '校對', 'proofreading'], ['manuscript', 'n.', '稿件', 'manuscripts'], ['attention to detail', 'phr.', '細心'], ['a plus', 'phr.', '加分條件'], ['writing sample', 'n.', '寫作範例'], ['law firm', 'n.', '律師事務所'], ['revision', 'n.', '修改', 'revisions']]
  }, [
    [176, 'What is NOT listed as a duty of the position?', ['Proofreading manuscripts', 'Organizing author files', 'Scheduling meetings', 'Designing book covers'], 'D',
      '下列哪一項「不是」這個職位的工作？', ['校對稿件', '整理作者檔案', '安排會議', '設計書籍封面'], ['Responsibilities include proofreading manuscripts, organizing author files, and scheduling meetings for senior editors.'], ['NOT listed', 'duty'], '設計軟體只是加分條件，沒有設計封面這項工作。'],
    [177, 'What is suggested about Ms. Carter?', ['She has worked at a publishing company.', 'She meets the experience requirement.', 'She wants a full-time job.', 'She lives in Boston.'], 'B',
      '關於 Carter 女士，文中暗示什麼？', ['她在出版社工作過。', '她符合經驗要求。', '她想要全職工作。', '她住在波士頓。'], ['Applicants should have at least one year of office experience', 'For the past two years, I have worked as an office assistant at a law firm'], ['suggested', 'Ms. Carter'], '雙篇對照：要求至少一年辦公室經驗，她有兩年。'],
    [178, 'Why is Ms. Carter interested in flexible hours?', ['She has another full-time job.', 'She takes care of her family.', 'She is still studying.', 'She lives far from the office.'], 'C',
      'Carter 女士為什麼對彈性工時有興趣？', ['她有另一份全職工作。', '她要照顧家人。', '她還在念書。', '她住得離公司很遠。'], ['the flexible schedule would allow me to continue my studies'], ['Why', 'flexible hours'], 'continue my studies＝還在念書。'],
    [179, 'What will Ms. Carter send later?', ['A writing sample', 'A résumé', 'A reference letter', 'A design portfolio'], 'A',
      'Carter 女士稍後會寄什麼？', ['寫作範例', '履歷', '推薦信', '設計作品集'], ['My writing sample will follow in a separate e-mail later this week'], ['send later'], '履歷已附上；寫作範例稍後另寄。'],
    [180, 'In the e-mail, the word "manage" in paragraph 1, line 3, is closest in meaning to', ['succeed', 'handle', 'direct', 'save'], 'B',
      'email 第一段第三行的 "manage" 意思最接近：', ['成功', '處理', '指揮', '節省'], ["manage the partners' calendars"], ['manage', 'closest in meaning'], 'manage calendars＝處理行事曆 → handle。succeed 是 manage to do（設法成功）的意思，不合。']
  ]);

  set('R-181-185', {
    passage: { title: 'Online Review & Response', blocks: B([
      H('Text 1 — Review on TravelPost.com · Posted by J. Moreno · ★★★☆☆'),
      'I stayed at the Seaview Inn for three nights in August for a family reunion. The location is perfect, just a two-minute walk from the beach, and the breakfast buffet had a great variety of fresh fruit and pastries.',
      'However, our room was not ready when we arrived at the 3 P.M. check-in time, and we had to wait almost an hour in the lobby with our children. Also, the swimming pool was closed for maintenance during our entire stay, which was not mentioned on the hotel\'s Web site when we booked.',
      H('Text 2 — Response from the Seaview Inn'),
      'Dear Mr. Moreno, thank you for taking the time to share your experience. I\'m glad you enjoyed our location and breakfast. I sincerely apologize for the delay at check-in. That week, we were short-staffed due to an illness, and we have since hired two additional housekeepers.',
      'You are right that we should have informed guests about the pool. Our Web site has now been updated. As a gesture of goodwill, I would like to offer you a free night on your next visit. Please contact me directly at manager@seaviewinn.com. — Grace Holt, General Manager'
    ]) },
    translation: '【TravelPost.com 評論，J. Moreno，三顆星】我 8 月為了家族聚會在 Seaview 旅館住了三晚。地點完美，走到海灘只要兩分鐘，早餐自助吧有很多新鮮水果和糕點。不過我們在下午 3 點入住時間抵達時房間還沒準備好，只好帶著孩子在大廳等了將近一小時。另外，我們住宿期間游泳池一直在維修關閉，但我們訂房時旅館網站沒有提到。\n【Seaview 旅館回覆】親愛的 Moreno 先生，感謝您撥空分享經驗。很高興您喜歡我們的地點和早餐。對入住延誤我深感抱歉。那一週因為有員工生病人手不足，我們之後已增聘兩名房務人員。您說得對，我們應該事先告知泳池的事，網站現已更新。為表誠意，您下次入住我想招待一晚免費住宿。請直接寫信到 manager@seaviewinn.com 與我聯絡。——總經理 Grace Holt',
    vocab: [['family reunion', 'n.', '家族聚會'], ['a variety of', 'phr.', '各式各樣的'], ['pastry', 'n.', '糕點', 'pastries'], ['maintenance', 'n.', '維修'], ['short-staffed', 'adj.', '人手不足的'], ['housekeeper', 'n.', '房務人員', 'housekeepers'], ['inform', 'v.', '通知', 'informed'], ['as a gesture of goodwill', 'phr.', '為表誠意']]
  }, [
    [181, 'Why did Mr. Moreno stay at the Seaview Inn?', ['To attend a business conference', 'To take part in a family event', 'To celebrate an anniversary', 'To take a surfing lesson'], 'B',
      'Moreno 先生為什麼住 Seaview 旅館？', ['參加商務會議', '參加家族活動', '慶祝週年紀念', '上衝浪課'], ['for a family reunion'], ['Why', 'stay'], 'family reunion＝家族聚會。'],
    [182, 'What did Mr. Moreno like about the hotel?', ['The swimming pool', 'The quick check-in', 'The room service', 'Its breakfast'], 'D',
      'Moreno 先生喜歡旅館的什麼？', ['游泳池', '快速入住', '客房服務', '早餐'], ['the breakfast buffet had a great variety of fresh fruit and pastries'], ['like'], '稱讚地點和早餐；泳池關閉、入住延誤是抱怨。'],
    [183, 'According to Ms. Holt, what caused the delay at check-in?', ['A computer problem', 'A lack of staff', 'A large tour group', 'A power outage'], 'B',
      '根據 Holt 女士，入住延誤的原因是什麼？', ['電腦故障', '人手不足', '大型旅行團', '停電'], ['we were short-staffed due to an illness'], ['caused the delay'], 'short-staffed＝人手不足（a lack of staff）。'],
    [184, 'What problem mentioned in the review has the hotel fixed?', ['The pool has reopened.', 'The lobby has been enlarged.', 'The Web site now gives pool information.', 'Check-in time has been moved earlier.'], 'C',
      '評論中提到的哪個問題旅館已經改善？', ['泳池重新開放了。', '大廳擴建了。', '網站現在有泳池資訊。', '入住時間提前了。'], ["which was not mentioned on the hotel's Web site when we booked", 'Our Web site has now been updated.'], ['fixed'], '雙篇對照：評論抱怨網站沒寫泳池關閉，回覆說網站已更新。'],
    [185, 'What does Ms. Holt offer Mr. Moreno?', ['A refund for one night', 'A free stay in the future', 'A breakfast voucher', 'A room upgrade'], 'B',
      'Holt 女士提供 Moreno 先生什麼？', ['退一晚的錢', '日後免費住一晚', '早餐券', '房間升等'], ['I would like to offer you a free night on your next visit'], ['offer'], 'a free night on your next visit＝下次免費住一晚。']
  ]);

  set('R-186-190', {
    passage: { title: 'Green Business Summit 2027', blocks: B([
      H('Text 1 — Web Page: Registration Fees'),
      'Green Business Summit 2027 · Hilton Garden Center, Denver · September 12–13',
      { type: 'list', items: ['Early registration (until August 1): $250', 'Regular registration: $320', 'Student rate: $90 (valid student ID required)', 'Workshop add-on (September 13 afternoon): $60', 'Group discount: organizations registering five or more attendees receive 10% off the regular rate'] },
      H('Text 2 — Registration Confirmation'),
      'Name: Paul Novak · Organization: Clearway Solar · Registration date: August 5 · Registration type: Regular · Workshop add-on: Yes · Total paid: $380',
      H('Text 3 — E-mail'),
      'From: Paul Novak · To: events@greensummit.org · Date: August 20 · Subject: Change to my registration',
      'Hello, I recently registered for the summit. Unfortunately, I have a client visit on the afternoon of September 13, so I will not be able to attend the workshop. Could you please remove it from my registration and refund the fee? Also, three colleagues from my company would like to attend. Since we now have more than one person, are we eligible for the group discount? Thank you, Paul Novak'
    ]) },
    translation: '【網頁】2027 綠色商業高峰會，丹佛 Hilton Garden 中心，9 月 12–13 日。早鳥（8 月 1 日前）250 美元；一般 320 美元；學生 90 美元（需有效學生證）；加選工作坊（9 月 13 日下午）60 美元；團體優惠：同一機構報名 5 人以上，一般票價打九折。\n【報名確認】Paul Novak，Clearway Solar，報名日 8 月 5 日，一般票，加選工作坊：是，共付 380 美元。\n【Email】8 月 20 日，主旨：變更報名。你好，我最近報名了高峰會。可惜 9 月 13 日下午我要拜訪客戶，無法參加工作坊，可以幫我移除並退費嗎？另外，我公司有三位同事也想參加。既然我們不只一個人，可以享團體優惠嗎？謝謝，Paul Novak',
    vocab: [['summit', 'n.', '高峰會'], ['early registration', 'n.', '早鳥報名'], ['valid', 'adj.', '有效的'], ['add-on', 'n.', '加購項目'], ['attendee', 'n.', '出席者', 'attendees'], ['confirmation', 'n.', '確認單'], ['refund', 'v.', '退款'], ['be eligible for', 'phr.', '有資格獲得', 'are we eligible for']]
  }, [
    [186, 'What is the purpose of the Web page?', ['To list the summit speakers', 'To advertise a hotel', 'To explain registration costs', 'To recruit volunteers'], 'C',
      '網頁的目的是什麼？', ['列出講者', '宣傳飯店', '說明報名費用', '招募志工'], ['Text 1 — Web Page: Registration Fees'], ['purpose', 'Web page'], '網頁列出各種報名費用與優惠。'],
    [187, 'Why did Mr. Novak pay the regular rate?', ['He registered after the early deadline.', 'He is not a student.', 'He chose the workshop.', 'His company is too small.'], 'A',
      'Novak 先生為什麼付一般票價？', ['他在早鳥截止後才報名。', '他不是學生。', '他加選了工作坊。', '他的公司太小。'], ['Early registration (until August 1): $250', 'Registration date: August 5'], ['Why', 'regular rate'], '早鳥到 8 月 1 日，他 8 月 5 日才報名。'],
    [188, 'How much will Mr. Novak most likely be refunded?', ['$90', '$70', '$250', '$60'], 'D',
      'Novak 先生最可能被退多少錢？', ['90 美元', '70 美元', '250 美元', '60 美元'], ['Workshop add-on (September 13 afternoon): $60', 'Could you please remove it from my registration and refund the fee?'], ['How much', 'refunded'], '取消的是工作坊＝$60（$320 + $60 = $380 也對得上）。'],
    [189, 'What is suggested about Clearway Solar?', ['It organizes the summit.', 'It is based in Denver.', 'It will not qualify for the group discount.', 'It has sent staff to the summit before.'], 'C',
      '關於 Clearway Solar，文中暗示什麼？', ['它主辦高峰會。', '它設在丹佛。', '它無法享團體優惠。', '它以前派員工參加過。'], ['organizations registering five or more attendees receive 10% off the regular rate', 'three colleagues from my company would like to attend'], ['suggested', 'Clearway Solar'], '三篇對照：Novak＋三位同事＝4 人，未達團體優惠要求的 5 人。'],
    [190, 'What does Mr. Novak say about September 13?', ['He will give a presentation.', 'He has a client visit that afternoon.', 'He will arrive late in Denver.', 'He wants to change hotels.'], 'B',
      'Novak 先生提到 9 月 13 日怎麼了？', ['他要做簡報。', '他那天下午要拜訪客戶。', '他會晚到丹佛。', '他想換飯店。'], ['I have a client visit on the afternoon of September 13'], ['September 13'], 'client visit on the afternoon of September 13。']
  ]);

  set('R-191-195', {
    passage: { title: 'Marlow Tech — Staff Training Week', blocks: B([
      H('Text 1 — Schedule'),
      { type: 'list', items: ['Monday, 10:00 A.M. — Time Management (Room A) · Trainer: Lisa Gómez', 'Tuesday, 2:00 P.M. — Advanced Spreadsheets (Computer Lab) · Trainer: Owen Hart', 'Wednesday, 10:00 A.M. — Presentation Skills (Room B) · Trainer: Lisa Gómez', 'Thursday, 2:00 P.M. — Customer Communication (Room A) · Trainer: Priya Shah'] },
      'Each session lasts two hours. The Computer Lab has only 15 seats; all other rooms hold 30 people. Register through the HR portal by Friday, March 6.',
      H('Text 2 — E-mail'),
      'To: Owen Hart · From: Nina Brooks · Date: March 4 · Subject: Tuesday session',
      'Hi Owen, I tried to register for your spreadsheet session, but the HR portal says it is full. Our team relies heavily on spreadsheets for monthly reporting, and three of us really need the training. Would you consider offering the session a second time? We would be happy to attend at any time that week, except Wednesday morning, when we have our team meeting. Best regards, Nina',
      H('Text 3 — Memo'),
      'To: All Staff · From: Human Resources · Date: March 5',
      'Due to high demand, Owen Hart will hold an additional Advanced Spreadsheets session on Thursday at 10:00 A.M. in the Computer Lab. Registration for this session opens today on the HR portal. In addition, the Wednesday Presentation Skills session has been moved to Room A because of a scheduling conflict.'
    ]) },
    translation: '【課表】週一上午 10 點：時間管理（A 室），講師 Lisa Gómez；週二下午 2 點：進階試算表（電腦教室），講師 Owen Hart；週三上午 10 點：簡報技巧（B 室），講師 Lisa Gómez；週四下午 2 點：客戶溝通（A 室），講師 Priya Shah。每堂兩小時。電腦教室只有 15 個座位，其他教室可容納 30 人。請在 3 月 6 日（週五）前透過人資入口網站報名。\n【Email】3 月 4 日，Nina Brooks 致 Owen Hart，主旨：週二的課。嗨 Owen，我想報名你的試算表課，但人資網站顯示額滿了。我們團隊每月報表非常依賴試算表，有三個人很需要這個訓練。你會考慮再開一場嗎？那週任何時間我們都可以，除了週三上午要開團隊會議。Nina 敬上\n【備忘錄】3 月 5 日，人資部致全體員工：由於需求很高，Owen Hart 將於週四上午 10 點在電腦教室加開一場進階試算表課，今天起開放在人資網站報名。此外，週三的簡報技巧課因場地衝突改到 A 室。',
    vocab: [['session', 'n.', '（一堂）課；場次'], ['trainer', 'n.', '講師'], ['register', 'v.', '報名'], ['portal', 'n.', '入口網站'], ['rely heavily on', 'phr.', '非常依賴', 'relies heavily on'], ['monthly reporting', 'n.', '月報'], ['additional', 'adj.', '額外的'], ['scheduling conflict', 'n.', '時間（場地）衝突']]
  }, [
    [191, 'What is indicated about the Tuesday session?', ['It is taught by Ms. Gómez.', 'It lasts three hours.', 'It has a limited number of seats.', 'It takes place in Room A.'], 'C',
      '關於週二的課，文中指出什麼？', ['由 Gómez 女士授課。', '上三個小時。', '座位數有限。', '在 A 室上課。'], ['The Computer Lab has only 15 seats'], ['indicated', 'Tuesday session'], '週二在電腦教室，只有 15 個座位。'],
    [192, 'Why did Ms. Brooks write to Mr. Hart?', ['To request another session', 'To cancel her registration', 'To complain about a trainer', 'To ask for a different room'], 'A',
      'Brooks 女士為什麼寫信給 Hart 先生？', ['請他再開一場', '取消報名', '抱怨講師', '要求換教室'], ['Would you consider offering the session a second time?'], ['Why', 'write'], '請他再開一場（a second time）。'],
    [193, 'What does Ms. Brooks mention about her team?', ['It recently hired new members.', 'It uses spreadsheets for regular reports.', 'It has already taken the training.', 'It works mostly from home.'], 'B',
      'Brooks 女士提到她的團隊什麼？', ['最近招募了新成員。', '用試算表做定期報表。', '已經上過這個訓練。', '大多在家工作。'], ['Our team relies heavily on spreadsheets for monthly reporting'], ['her team'], 'monthly reporting＝定期報表。'],
    [194, 'What is suggested about the additional session?', ['It will be held in Room B.', 'It is taught by Ms. Shah.', 'It is shorter than the original.', 'It fits Ms. Brooks\'s team\'s schedule.'], 'D',
      '關於加開的課，文中暗示什麼？', ['在 B 室上課。', '由 Shah 女士授課。', '比原本的短。', '符合 Brooks 團隊的時間。'], ['except Wednesday morning, when we have our team meeting', 'additional Advanced Spreadsheets session on Thursday at 10:00 A.M.'], ['suggested', 'additional session'], '三篇對照：她們只有週三上午不行，加開在週四上午，時間可以。'],
    [195, 'In which room will the Presentation Skills session be held?', ['Room A', 'Room B', 'The Computer Lab', 'The HR office'], 'A',
      '簡報技巧課會在哪間教室上？', ['A 室', 'B 室', '電腦教室', '人資辦公室'], ['the Wednesday Presentation Skills session has been moved to Room A'], ['Presentation Skills'], '課表寫 B 室，但備忘錄說改到 A 室——要以最新資訊為準。']
  ]);

  set('R-196-200', {
    passage: { title: 'Apartment Rental', blocks: B([
      H('Text 1 — Listing on CityNest.com'),
      'Two-bedroom apartment, 14 Willow Street · $1,450 per month · Available April 1',
      'Bright, newly renovated apartment on the third floor of a quiet building. Ten-minute walk to Central Station. Includes dishwasher and in-unit washing machine. Heating and water included in rent; electricity paid by tenant. Minimum lease: 12 months. Pets: small dogs and cats allowed with a $300 deposit. Contact: Riverstone Property Management, 555-0147.',
      H('Text 2 — E-mail'),
      'To: Riverstone Property Management · From: Aaron Feld · Date: March 3 · Subject: 14 Willow Street',
      'Hello, I am interested in the apartment on Willow Street. I will be starting a new job downtown in April, so the location and move-in date are ideal. I have a small cat. Could I see the apartment this Saturday? Also, I would prefer a six-month lease at first, since I may need to transfer to another office later this year. Thank you, Aaron Feld',
      H('Text 3 — E-mail'),
      'To: Aaron Feld · From: Carla Ruiz, Riverstone Property Management · Date: March 4 · Subject: RE: 14 Willow Street',
      'Dear Mr. Feld, thank you for your interest. You are welcome to view the apartment on Saturday at 11 A.M. Unfortunately, the owner is not able to accept leases shorter than the minimum stated in the listing. However, we have a similar one-bedroom unit on Pine Avenue that allows six-month leases. It is slightly smaller but costs $1,200 per month. I could show you both units on Saturday if you like. Best regards, Carla Ruiz'
    ]) },
    translation: '【CityNest.com 刊登】Willow 街 14 號兩房公寓，每月 1,450 美元，4 月 1 日可入住。安靜大樓三樓，明亮、新裝修。走路十分鐘到中央車站。附洗碗機和室內洗衣機。租金含暖氣和水費；電費由房客支付。最短租期 12 個月。寵物：小型犬和貓可，須付 300 美元押金。聯絡：Riverstone 物業管理，555-0147。\n【Email】3 月 3 日，Aaron Feld：你好，我對 Willow 街的公寓有興趣。我 4 月要在市中心開始新工作，地點和入住日期都很理想。我有一隻小貓。這週六可以看房嗎？另外，我希望先簽六個月，因為今年稍晚可能要調到別的辦公室。謝謝，Aaron Feld\n【回信】3 月 4 日，Riverstone 物業的 Carla Ruiz：Feld 先生您好，感謝您的興趣。歡迎週六上午 11 點來看房。可惜屋主無法接受短於刊登所寫最短租期的合約。不過我們在 Pine 大道有一間類似的一房公寓，可以簽六個月，稍小一點，每月 1,200 美元。如果您願意，週六我可以帶您兩間都看。Carla Ruiz 敬上',
    vocab: [['listing', 'n.', '（房屋）刊登資訊'], ['newly renovated', 'adj.', '新裝修的'], ['in-unit', 'adj.', '室內（屋內）的'], ['tenant', 'n.', '房客'], ['lease', 'n.', '租約'], ['deposit', 'n.', '押金'], ['property management', 'n.', '物業管理'], ['move-in date', 'n.', '入住日期'], ['transfer', 'v.', '調職'], ['unit', 'n.', '（一戶）住宅']]
  }, [
    [196, 'What is NOT included in the rent at 14 Willow Street?', ['Heating', 'Water', 'Electricity', 'Use of a washing machine'], 'C',
      'Willow 街 14 號的租金「不含」什麼？', ['暖氣', '水費', '電費', '洗衣機使用'], ['Heating and water included in rent; electricity paid by tenant.'], ['NOT included'], '電費由房客自付。'],
    [197, 'Why is Mr. Feld moving?', ['He is starting a new job.', 'His current lease is ending.', 'He wants a larger apartment.', 'He is getting a pet.'], 'A',
      'Feld 先生為什麼要搬家？', ['他要開始新工作。', '目前租約到期。', '他想要大一點的公寓。', '他要養寵物。'], ['I will be starting a new job downtown in April'], ['Why', 'moving'], 'starting a new job downtown in April。'],
    [198, 'What will Mr. Feld most likely have to pay if he rents the Willow Street apartment?', ['A $1,200 monthly rent', 'A fee for the Saturday viewing', 'A pet deposit', 'A fee for an early move-in'], 'C',
      'Feld 先生如果租 Willow 街的公寓，最可能要付什麼？', ['每月 1,200 美元租金', '週六看房費', '寵物押金', '提早入住費'], ['Pets: small dogs and cats allowed with a $300 deposit.', 'I have a small cat.'], ['have to pay'], '雙篇對照：他有一隻貓，刊登寫養寵物要付 300 美元押金。$1,200 是另一間的租金。'],
    [199, 'Why does Ms. Ruiz mention the Pine Avenue unit?', ['It is closer to Central Station.', 'It is larger than the Willow Street unit.', 'It allows pets.', 'It offers a shorter lease.'], 'D',
      'Ruiz 女士為什麼提到 Pine 大道的房子？', ['離中央車站比較近。', '比 Willow 街那間大。', '可以養寵物。', '可以簽較短的租約。'], ['the owner is not able to accept leases shorter than the minimum stated in the listing', 'a similar one-bedroom unit on Pine Avenue that allows six-month leases'], ['Why', 'Pine Avenue'], '三篇對照：Feld 想簽六個月，Willow 街最短 12 個月不行，所以推薦可簽六個月的 Pine 大道。它比較小，(B) 錯。'],
    [200, 'In the second e-mail, the word "stated" in paragraph 1, line 2, is closest in meaning to', ['announced loudly', 'written', 'decided', 'changed'], 'B',
      '第二封 email 第一段第二行的 "stated" 意思最接近：', ['大聲宣布', '寫明的', '決定的', '改變的'], ['shorter than the minimum stated in the listing'], ['stated', 'closest in meaning'], 'stated in the listing＝刊登資訊中「寫明」的，最接近 written。']
  ]);
})();
