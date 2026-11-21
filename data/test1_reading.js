/* ==========================================================================
   TOEIC 模擬測驗 Test 1 — 閱讀（原創題目，30 題半量版，建議 25 分鐘）
   Part 5 句子填空 Q101–110（一組）
   Part 6 段落填空 Q111–114
   Part 7 單篇 Q115–120、雙篇 Q121–125、三篇 Q126–130
   欄位說明見 test1_listening.js。
   ========================================================================== */
window.BESTEP_DATA = window.BESTEP_DATA || {};

(function () {
  const P5 = 'Part 5';
  const P6 = 'Part 6';
  const P7 = 'Part 7';

  function p5(id, stem, opts, answer, qz, oz, expl, kw) {
    return { id, part: P5, group: 'R-101-110', type: 'single', question: stem, options: opts, answer, script: [],
      translation: '', explanation: expl, recommendedSeconds: 25, qz, oz, ev: [], kw };
  }

  const PASS111 = {
    title: 'Memo: Parking Lot Repairs',
    subtitle: 'To: All Staff · From: Facilities Management · Date: May 27',
    blocks: [
      { type: 'p', text: 'Please be aware that the east parking lot will be closed from Monday, June 3, to Friday, June 7, while the surface is being {{111}}. During this period, employees may park in the west lot or at the public garage on Maple Street.' },
      { type: 'p', text: 'The company will {{112}} the cost of parking at the garage. Simply keep your receipts and submit them to the accounting office. {{113}}' },
      { type: 'p', text: 'We apologize for any inconvenience and appreciate your {{114}} while the work is completed.' }
    ]
  };
  const Z111 = '備忘錄：停車場整修。致全體員工，設施管理部，5 月 27 日。\n請注意，東側停車場將於 6 月 3 日（週一）至 6 月 7 日（週五）封閉，期間將重新鋪設路面。這段期間員工可以停在西側停車場，或 Maple 街的公有停車場。公司會負擔公有停車場的費用，只要保留收據並交給會計室即可。西側停車場預計很快就會停滿，請提早到。造成不便敬請見諒，也感謝各位在施工期間的耐心配合。';

  const PASS115 = {
    title: 'Riverside Community Center — Spring Course Schedule',
    blocks: [
      { type: 'p', text: 'Registration is now open for our spring courses, which begin on April 8. Classes include Beginner Photography (Tuesdays, 7–9 P.M.), Introduction to Spanish (Wednesdays, 6–8 P.M.), and Healthy Cooking (Saturdays, 10 A.M.–12 P.M.).' },
      { type: 'p', text: 'Each course runs for eight weeks and costs $120. Community center members receive a 15 percent discount. To register, visit our Web site or stop by the front office.' },
      { type: 'p', text: 'Please note that Healthy Cooking is limited to twelve participants, and all ingredients are provided.' }
    ]
  };
  const Z115 = 'Riverside 社區中心——春季課程表。\n春季課程現在開放報名，4 月 8 日開課。課程包括初級攝影（週二晚上 7–9 點）、西班牙語入門（週三晚上 6–8 點）、健康料理（週六上午 10–12 點）。每門課為期八週，費用 120 美元。社區中心會員享 85 折。報名請上我們的網站或到櫃台辦理。請注意，健康料理課限額 12 人，所有食材由我們提供。';

  const PASS118 = {
    title: 'Text-message chain',
    blocks: [
      { type: 'p', text: 'Maria Santos (9:12 A.M.): Hi Jake, are you still at the Lexington office? The slides for the client presentation didn\'t upload to the shared drive.' },
      { type: 'p', text: 'Jake Wu (9:14 A.M.): Yes, I\'m here until noon. Do you want me to send them by e-mail instead?' },
      { type: 'p', text: 'Maria Santos (9:15 A.M.): That would be great. The meeting starts at 10:30, and I still need to add this quarter\'s sales numbers.' },
      { type: 'p', text: 'Jake Wu (9:16 A.M.): No problem. I\'ll also attach last year\'s figures in case you want to compare.' },
      { type: 'p', text: 'Maria Santos (9:17 A.M.): You read my mind. Thanks!' }
    ]
  };
  const Z118 = 'Maria Santos（上午 9:12）：嗨 Jake，你還在 Lexington 辦公室嗎？客戶簡報的投影片沒有上傳到共用雲端硬碟。\nJake Wu（9:14）：對，我待到中午。要我改用 email 寄給你嗎？\nMaria（9:15）：那太好了。會議 10:30 開始，我還得加上這一季的銷售數字。\nJake（9:16）：沒問題。我也會附上去年的數字，以防你想比較。\nMaria（9:17）：你真懂我（我正想說這個）。謝啦！';

  const PASS121 = {
    title: 'Job Posting & E-mail',
    blocks: [
      { type: 'h', text: 'Text 1 — Job Posting' },
      { type: 'p', text: 'Hartwell Publishing is seeking a part-time Editorial Assistant to join our team in Boston. Responsibilities include proofreading manuscripts, organizing author files, and scheduling meetings for senior editors.' },
      { type: 'p', text: 'Applicants should have at least one year of office experience and excellent attention to detail. Familiarity with design software is a plus but not required. The position is 20 hours per week, with flexible hours. To apply, send a résumé and a short writing sample to hr@hartwellpub.com by May 15.' },
      { type: 'h', text: 'Text 2 — E-mail' },
      { type: 'p', text: 'To: hr@hartwellpub.com · From: Emily Carter · Date: May 10 · Subject: Editorial Assistant Application' },
      { type: 'p', text: 'Dear Hiring Manager, I am writing to apply for the part-time Editorial Assistant position advertised on your Web site. For the past two years, I have worked as an office assistant at a law firm, where I prepare documents and manage the partners\' calendars. I am also completing a degree in English literature, so the flexible schedule would allow me to continue my studies.' },
      { type: 'p', text: 'I have attached my résumé. My writing sample will follow in a separate e-mail later this week, as I am making final revisions to it. Sincerely, Emily Carter' }
    ]
  };
  const Z121 = '【徵才公告】Hartwell 出版社正在招募一名兼職編輯助理，加入我們在波士頓的團隊。工作內容包括校對稿件、整理作者檔案，以及為資深編輯安排會議。應徵者需具備至少一年辦公室工作經驗，並且非常細心。熟悉設計軟體者加分，但非必要。此職位每週 20 小時，工時彈性。應徵請於 5 月 15 日前將履歷和一份簡短的寫作範例寄到 hr@hartwellpub.com。\n【Email】致人資，寄件者 Emily Carter，5 月 10 日，主旨：應徵編輯助理。敬啟者：我想應徵貴公司網站上刊登的兼職編輯助理。過去兩年，我在一家律師事務所擔任辦公室助理，負責準備文件並管理合夥人的行事曆。我也正在修英國文學學位，彈性的工時能讓我繼續學業。附上我的履歷。寫作範例因為還在做最後修改，會在本週稍晚另外寄出。Emily Carter 敬上';

  const PASS126 = {
    title: 'Green Business Summit 2027',
    blocks: [
      { type: 'h', text: 'Text 1 — Web Page: Registration Fees' },
      { type: 'p', text: 'Green Business Summit 2027 · Hilton Garden Center, Denver · September 12–13' },
      { type: 'list', items: ['Early registration (until August 1): $250', 'Regular registration: $320', 'Student rate: $90 (valid student ID required)', 'Workshop add-on (September 13 afternoon): $60', 'Group discount: organizations registering five or more attendees receive 10% off the regular rate'] },
      { type: 'h', text: 'Text 2 — Registration Confirmation' },
      { type: 'p', text: 'Name: Paul Novak · Organization: Clearway Solar · Registration date: August 5 · Registration type: Regular · Workshop add-on: Yes · Total paid: $380' },
      { type: 'h', text: 'Text 3 — E-mail' },
      { type: 'p', text: 'From: Paul Novak · To: events@greensummit.org · Date: August 20 · Subject: Change to my registration' },
      { type: 'p', text: 'Hello, I recently registered for the summit. Unfortunately, I have a client visit on the afternoon of September 13, so I will not be able to attend the workshop. Could you please remove it from my registration and refund the fee? Also, three colleagues from my company would like to attend. Since we now have more than one person, are we eligible for the group discount? Thank you, Paul Novak' }
    ]
  };
  const Z126 = '【網頁】2027 綠色商業高峰會，丹佛 Hilton Garden 中心，9 月 12–13 日。早鳥報名（8 月 1 日前）250 美元；一般報名 320 美元；學生 90 美元（需有效學生證）；加選工作坊（9 月 13 日下午）60 美元；團體優惠：同一機構報名 5 人以上，一般票價打 9 折。\n【報名確認】姓名 Paul Novak；機構 Clearway Solar；報名日期 8 月 5 日；類別：一般；加選工作坊：是；共付 380 美元。\n【Email】8 月 20 日，主旨：變更報名。你好，我最近報名了高峰會。可惜 9 月 13 日下午我有客戶要拜訪，所以無法參加工作坊。可以幫我從報名中移除並退費嗎？另外，我公司有三位同事也想參加。既然我們現在不只一個人，可以享有團體優惠嗎？謝謝，Paul Novak';

  const Q = [
    p5(101, 'Ms. Chen asked her assistant to ------- the meeting minutes to all participants.',
      ['distribute', 'distributing', 'distribution', 'distributed'], 'A',
      'Chen 女士請助理把會議紀錄＿＿給所有與會者。', ['分發（原形）', '分發（-ing）', '分發（名詞）', '分發（過去式）'],
      'ask + 人 + to + 原形動詞，選 (A) distribute。', ['asked her assistant to']),
    p5(102, 'The new software is designed to help employees manage their time more -------.',
      ['efficient', 'efficiency', 'efficiently', 'efficiencies'], 'C',
      '新軟體是設計來幫員工更＿＿管理時間。', ['有效率的（形容詞）', '效率（名詞）', '有效率地（副詞）', '效率（複數名詞）'],
      '修飾動詞 manage 要用副詞，more efficiently。', ['manage their time more']),
    p5(103, 'All visitors must sign in at the reception desk ------- entering the building.',
      ['during', 'before', 'between', 'until'], 'B',
      '所有訪客＿＿進入大樓，都必須在櫃台登記。', ['在…期間', '在…之前', '在…之間', '直到'],
      '先登記才進大樓，before entering。during 後面接名詞（during the visit），不接動名詞動作。', ['sign in', 'entering the building']),
    p5(104, 'Applications for the marketing position will be accepted ------- March 31.',
      ['until', 'since', 'along', 'within'], 'A',
      '行銷職缺的申請受理到 3 月 31 日＿＿。', ['直到', '自從', '沿著', '在…之內'],
      '持續動作 will be accepted 到某個截止日，用 until。since 要搭配完成式。', ['will be accepted', 'March 31']),
    p5(105, 'Because of the heavy snow, the morning flight to Chicago has been -------.',
      ['postpone', 'postpones', 'postponing', 'postponed'], 'D',
      '因為大雪，往芝加哥的早班機已經被＿＿。', ['延期（原形）', '延期（第三人稱）', '延期（-ing）', '被延期（過去分詞）'],
      '航班是「被」延期，has been + p.p. 現在完成被動式，選 postponed。', ['has been']),
    p5(106, 'Mr. Lopez is ------- for reviewing all expense reports before they are submitted.',
      ['responsibly', 'responsive', 'responsible', 'responsibility'], 'C',
      'Lopez 先生＿＿在報帳單送出前審核。', ['負責地（副詞）', '反應快的', '負責的', '責任（名詞）'],
      'be responsible for 負責，選 (C)。responsive 是「反應靈敏的」，字形相近的陷阱。', ['is', 'for reviewing']),
    p5(107, 'The company\'s profits increased ------- after it expanded into overseas markets.',
      ['significant', 'significantly', 'significance', 'signify'], 'B',
      '公司拓展海外市場後，獲利＿＿成長。', ['顯著的', '顯著地', '重要性', '表示'],
      '修飾動詞 increased 用副詞 significantly。', ['profits increased']),
    p5(108, '------- the budget was limited, the team managed to complete the project on time.',
      ['Despite', 'Although', 'Because', 'However'], 'B',
      '＿＿預算有限，團隊還是準時完成了專案。', ['儘管（介系詞）', '雖然（連接詞）', '因為', '然而（副詞）'],
      '後面是完整子句 the budget was limited，要用連接詞；語意是讓步，選 Although。Despite 後面只能接名詞。', ['the budget was limited', 'managed to']),
    p5(109, 'Please contact our customer service team if you have ------- questions about your order.',
      ['much', 'every', 'each', 'any'], 'D',
      '如果您對訂單有＿＿問題，請聯絡客服團隊。', ['很多（不可數）', '每一個', '每一個', '任何'],
      'questions 是複數可數名詞，if 子句中用 any。much 接不可數；every/each 接單數。', ['questions']),
    p5(110, 'The quarterly report must be submitted no later than Friday, ------- it will not be included in the review.',
      ['and', 'or', 'so', 'but'], 'B',
      '季報最晚必須在週五前繳交，＿＿就不會被納入審查。', ['而且', '否則', '所以', '但是'],
      '「必須…，否則…」用 or（= otherwise）。', ['must be submitted', 'will not be included']),

    { id: 111, part: P6, group: 'R-111-114', type: 'single', passage: PASS111, translation: Z111, recommendedSeconds: 30,
      question: 'Choose the best answer for blank 111.', options: ['repave', 'repaved', 'repaving', 'repaves'], answer: 'B',
      explanation: 'the surface is being + p.p.（進行式被動），路面「正在被」重鋪，選 repaved。',
      qz: '第 111 格最適合填入哪一個？', oz: ['重鋪（原形）', '被重鋪（過去分詞）', '重鋪（-ing）', '重鋪（第三人稱）'],
      ev: ['while the surface is being'], kw: ['blank 111'],
      vocab: [['be aware that', 'phr.', '請注意…'], ['surface', 'n.', '路面'], ['repave', 'v.', '重新鋪路面'], ['public garage', 'n.', '公有停車場'], ['cover the cost', 'phr.', '負擔費用'], ['accounting office', 'n.', '會計室'], ['inconvenience', 'n.', '不便'], ['patience', 'n.', '耐心']] },
    { id: 112, part: P6, group: 'R-111-114', type: 'single', passage: PASS111, translation: Z111, recommendedSeconds: 30,
      question: 'Choose the best answer for blank 112.', options: ['cover', 'charge', 'increase', 'avoid'], answer: 'A',
      explanation: '後句說保留收據交給會計室（報帳），表示公司「負擔」費用，cover the cost。',
      qz: '第 112 格最適合填入哪一個？', oz: ['負擔', '收費', '增加', '避免'],
      ev: ['Simply keep your receipts and submit them to the accounting office.'], kw: ['blank 112'] },
    { id: 113, part: P6, group: 'R-111-114', type: 'single', passage: PASS111, translation: Z111, recommendedSeconds: 40,
      question: 'Choose the best sentence for blank 113.',
      options: ['The new cafeteria menu will be announced next week.', 'Our parking fees have recently been reduced.', 'The west lot is expected to fill up quickly, so please arrive early.', 'Thank you for attending the safety workshop.'], answer: 'C',
      explanation: '段落在講封閉期間改停西側停車場與公有停車場，接「西側很快會停滿，請早點到」最連貫。',
      qz: '第 113 格最適合填入哪一句？', oz: ['新的員工餐廳菜單下週公布。', '我們的停車費最近調降了。', '西側停車場預計很快會停滿，請提早到。', '感謝參加安全講習。'],
      ev: ['employees may park in the west lot'], kw: ['blank 113'] },
    { id: 114, part: P6, group: 'R-111-114', type: 'single', passage: PASS111, translation: Z111, recommendedSeconds: 30,
      question: 'Choose the best answer for blank 114.', options: ['patient', 'patience', 'patiently', 'patients'], answer: 'B',
      explanation: 'your（所有格）後面接名詞，appreciate your patience 是固定說法。patients 是「病人」。',
      qz: '第 114 格最適合填入哪一個？', oz: ['有耐心的', '耐心（名詞）', '耐心地', '病人們'],
      ev: ['appreciate your'], kw: ['blank 114'] },

    { id: 115, part: P7, group: 'R-115-117', type: 'single', passage: PASS115, translation: Z115, recommendedSeconds: 50,
      question: 'What is the purpose of the notice?', options: ['To announce new courses', 'To recruit instructors', 'To advertise a membership sale', 'To explain a schedule change'], answer: 'A',
      explanation: '開頭 Registration is now open for our spring courses，目的是公告新課程。',
      qz: '這則公告的目的是什麼？', oz: ['公告新課程', '招募講師', '宣傳會員優惠', '說明時間變更'],
      ev: ['Registration is now open for our spring courses'], kw: ['purpose'],
      vocab: [['registration', 'n.', '報名'], ['run', 'v.', '（課程）持續進行', 'runs'], ['discount', 'n.', '折扣'], ['stop by', 'phr.', '順道過去'], ['be limited to', 'phr.', '限於', 'is limited to'], ['ingredient', 'n.', '食材', 'ingredients']] },
    { id: 116, part: P7, group: 'R-115-117', type: 'single', passage: PASS115, translation: Z115, recommendedSeconds: 50,
      question: 'How can people receive a discount?', options: ['By registering early', 'By being a community center member', 'By taking two courses', 'By paying in cash'], answer: 'B',
      explanation: 'Community center members receive a 15 percent discount，會員才有折扣。',
      qz: '怎樣可以拿到折扣？', oz: ['提早報名', '成為社區中心會員', '修兩門課', '付現金'],
      ev: ['Community center members receive a 15 percent discount.'], kw: ['discount'] },
    { id: 117, part: P7, group: 'R-115-117', type: 'single', passage: PASS115, translation: Z115, recommendedSeconds: 55,
      question: 'What is indicated about the cooking class?', options: ['It meets on weekday evenings.', 'It is free for members.', 'It has a limited number of spaces.', 'Participants must bring their own ingredients.'], answer: 'C',
      explanation: 'Healthy Cooking is limited to twelve participants，名額有限。上課是週六上午、食材有提供，(A)(D) 錯。',
      qz: '關於料理課，文中指出什麼？', oz: ['在平日晚上上課。', '會員免費。', '名額有限。', '學員必須自備食材。'],
      ev: ['Healthy Cooking is limited to twelve participants'], kw: ['indicated', 'cooking class'] },

    { id: 118, part: P7, group: 'R-118-120', type: 'single', passage: PASS118, translation: Z118, recommendedSeconds: 50,
      question: 'Why does Ms. Santos contact Mr. Wu?', options: ['To reschedule a meeting', 'To ask about sales results', 'Some presentation slides are missing from a shared drive.', 'To invite him to a presentation'], answer: 'C',
      explanation: 'The slides for the client presentation didn\'t upload to the shared drive，投影片沒上傳到雲端。',
      qz: 'Santos 女士為什麼聯絡 Wu 先生？', oz: ['改會議時間', '詢問銷售結果', '共用雲端少了簡報投影片。', '邀請他參加簡報'],
      ev: ["The slides for the client presentation didn't upload to the shared drive."], kw: ['Why', 'contact'],
      vocab: [['slide', 'n.', '投影片', 'slides'], ['upload', 'v.', '上傳'], ['shared drive', 'n.', '共用雲端硬碟'], ['quarter', 'n.', '季'], ['attach', 'v.', '附加（檔案）'], ['figures', 'n.', '數字；數據'], ['in case', 'phr.', '以防'], ['You read my mind.', 'phr.', '你真懂我（正合我意）']] },
    { id: 119, part: P7, group: 'R-118-120', type: 'single', passage: PASS118, translation: Z118, recommendedSeconds: 50,
      question: 'What will Ms. Santos most likely do before 10:30?', options: ['Visit the Lexington office', 'Call the client', 'Upload files to the drive', 'Add sales numbers to the presentation'], answer: 'D',
      explanation: 'The meeting starts at 10:30, and I still need to add this quarter\'s sales numbers。',
      qz: 'Santos 女士在 10:30 前最可能做什麼？', oz: ['去 Lexington 辦公室', '打電話給客戶', '把檔案上傳到雲端', '把銷售數字加進簡報'],
      ev: ["I still need to add this quarter's sales numbers"], kw: ['before 10:30'] },
    { id: 120, part: P7, group: 'R-118-120', type: 'single', passage: PASS118, translation: Z118, recommendedSeconds: 55,
      question: 'At 9:17 A.M., what does Ms. Santos most likely mean when she writes, "You read my mind"?', options: ['She is surprised Mr. Wu knows the client.', 'She was going to ask for last year\'s figures.', 'She wants Mr. Wu to attend the meeting.', 'She forgot to send an e-mail.'], answer: 'B',
      explanation: '意圖題：看上一則 Jake 說會附上去年的數字，Maria 回「你真懂我」＝她本來就想要去年的數字。',
      qz: '9:17 時 Santos 女士寫「You read my mind」，最可能是什麼意思？', oz: ['她很驚訝 Wu 先生認識客戶。', '她本來就想要去年的數字。', '她希望 Wu 先生出席會議。', '她忘了寄 email。'],
      ev: ["I'll also attach last year's figures in case you want to compare."], kw: ['9:17', 'mean', 'You read my mind'] },

    { id: 121, part: P7, group: 'R-121-125', type: 'single', passage: PASS121, translation: Z121, recommendedSeconds: 55,
      question: 'What is NOT mentioned as a duty of the position?', options: ['Proofreading manuscripts', 'Designing book covers', 'Organizing author files', 'Scheduling meetings'], answer: 'B',
      explanation: '工作內容列了校對、整理檔案、安排會議；設計軟體只是加分條件，沒有設計封面這項工作。',
      qz: '下列哪一項「不是」文中提到的職務內容？', oz: ['校對稿件', '設計書籍封面', '整理作者檔案', '安排會議'],
      ev: ['Responsibilities include proofreading manuscripts, organizing author files, and scheduling meetings for senior editors.'], kw: ['NOT mentioned', 'duty'],
      vocab: [['seek', 'v.', '尋找；招募', 'seeking'], ['editorial assistant', 'n.', '編輯助理'], ['responsibilities', 'n.', '職責'], ['proofread', 'v.', '校對', 'proofreading'], ['manuscript', 'n.', '稿件', 'manuscripts'], ['attention to detail', 'phr.', '細心'], ['familiarity with', 'n.', '熟悉…'], ['a plus', 'phr.', '加分條件'], ['writing sample', 'n.', '寫作範例'], ['law firm', 'n.', '律師事務所'], ['revision', 'n.', '修改', 'revisions']] },
    { id: 122, part: P7, group: 'R-121-125', type: 'single', passage: PASS121, translation: Z121, recommendedSeconds: 60,
      question: 'What is suggested about Ms. Carter?', options: ['She meets the experience requirement.', 'She has worked at a publishing company.', 'She wants a full-time job.', 'She lives in Boston.'], answer: 'A',
      explanation: '雙篇對照：職缺要求至少一年辦公室經驗（Text 1），她有兩年辦公室助理經驗（Text 2），符合條件。',
      qz: '關於 Carter 女士，文中暗示了什麼？', oz: ['她符合經驗要求。', '她在出版社工作過。', '她想要全職工作。', '她住在波士頓。'],
      ev: ['Applicants should have at least one year of office experience', 'For the past two years, I have worked as an office assistant at a law firm'], kw: ['suggested', 'Ms. Carter'] },
    { id: 123, part: P7, group: 'R-121-125', type: 'single', passage: PASS121, translation: Z121, recommendedSeconds: 50,
      question: 'Why is Ms. Carter interested in the flexible hours?', options: ['She has another job.', 'She is still studying.', 'She takes care of her family.', 'She lives far from the office.'], answer: 'B',
      explanation: 'I am also completing a degree… the flexible schedule would allow me to continue my studies。',
      qz: 'Carter 女士為什麼對彈性工時有興趣？', oz: ['她有另一份工作。', '她還在念書。', '她要照顧家人。', '她住得離公司很遠。'],
      ev: ['the flexible schedule would allow me to continue my studies'], kw: ['Why', 'flexible hours'] },
    { id: 124, part: P7, group: 'R-121-125', type: 'single', passage: PASS121, translation: Z121, recommendedSeconds: 50,
      question: 'What does Ms. Carter say she will send later?', options: ['A reference letter', 'A résumé', 'A writing sample', 'A portfolio of designs'], answer: 'C',
      explanation: 'My writing sample will follow in a separate e-mail later this week。履歷已經附上了。',
      qz: 'Carter 女士說她稍後會寄什麼？', oz: ['推薦信', '履歷', '寫作範例', '設計作品集'],
      ev: ['My writing sample will follow in a separate e-mail later this week'], kw: ['send later'] },
    { id: 125, part: P7, group: 'R-121-125', type: 'single', passage: PASS121, translation: Z121, recommendedSeconds: 45,
      question: 'In the e-mail, the word "manage" in paragraph 1, line 3, is closest in meaning to', options: ['handle', 'succeed', 'direct', 'save'], answer: 'A',
      explanation: 'manage the partners\' calendars＝處理、管理行事曆，最接近 handle。succeed 是 manage to do 的「設法成功」，不是這裡的意思。',
      qz: 'email 第一段第三行的 "manage" 意思最接近：', oz: ['處理', '成功', '指揮', '節省'],
      ev: ["manage the partners' calendars"], kw: ['manage', 'closest in meaning'] },

    { id: 126, part: P7, group: 'R-126-130', type: 'single', passage: PASS126, translation: Z126, recommendedSeconds: 50,
      question: 'What is the purpose of the Web page?', options: ['To give information about summit fees', 'To announce a list of speakers', 'To advertise a hotel', 'To recruit volunteers'], answer: 'A',
      explanation: '網頁列出各種報名費用與優惠，目的是說明高峰會費用。',
      qz: '網頁的目的是什麼？', oz: ['說明高峰會的費用', '公布講者名單', '宣傳飯店', '招募志工'],
      ev: ['Text 1 — Web Page: Registration Fees'], kw: ['purpose', 'Web page'],
      vocab: [['summit', 'n.', '高峰會'], ['early registration', 'n.', '早鳥報名'], ['valid', 'adj.', '有效的'], ['add-on', 'n.', '加購項目'], ['attendee', 'n.', '出席者', 'attendees'], ['confirmation', 'n.', '確認（單）'], ['refund', 'v.', '退款'], ['colleague', 'n.', '同事', 'colleagues'], ['be eligible for', 'phr.', '有資格獲得', 'are we eligible for']] },
    { id: 127, part: P7, group: 'R-126-130', type: 'single', passage: PASS126, translation: Z126, recommendedSeconds: 60,
      question: 'Why did Mr. Novak pay the regular rate?', options: ['He is not a student.', 'He registered after the early deadline.', 'He chose to add the workshop.', 'His company is too small.'], answer: 'B',
      explanation: '雙篇對照：早鳥截止 August 1（Text 1），他 August 5 才報名（Text 2），所以只能付一般價。',
      qz: 'Novak 先生為什麼付一般票價？', oz: ['他不是學生。', '他在早鳥截止後才報名。', '他加選了工作坊。', '他的公司太小。'],
      ev: ['Early registration (until August 1): $250', 'Registration date: August 5'], kw: ['Why', 'regular rate'] },
    { id: 128, part: P7, group: 'R-126-130', type: 'single', passage: PASS126, translation: Z126, recommendedSeconds: 60,
      question: 'How much will Mr. Novak most likely be refunded?', options: ['$60', '$70', '$90', '$250'], answer: 'A',
      explanation: '他要取消的是工作坊，工作坊加購費是 $60（Text 1），所以退 $60。（$320 + $60 = $380 也對得上 Text 2。）',
      qz: 'Novak 先生最可能被退多少錢？', oz: ['60 美元', '70 美元', '90 美元', '250 美元'],
      ev: ['Workshop add-on (September 13 afternoon): $60', 'Could you please remove it from my registration and refund the fee?'], kw: ['How much', 'refunded'] },
    { id: 129, part: P7, group: 'R-126-130', type: 'single', passage: PASS126, translation: Z126, recommendedSeconds: 60,
      question: 'What is suggested about Clearway Solar?', options: ['It is organizing the summit.', 'It will not qualify for the group discount.', 'It is located in Denver.', 'It has sent employees to the summit before.'], answer: 'B',
      explanation: '三篇對照：團體優惠要 five or more attendees，Novak 加三位同事只有 4 人，不符合資格。',
      qz: '關於 Clearway Solar，文中暗示了什麼？', oz: ['它是高峰會主辦單位。', '它無法享有團體優惠。', '它位於丹佛。', '它以前派過員工參加。'],
      ev: ['organizations registering five or more attendees receive 10% off the regular rate', 'three colleagues from my company would like to attend'], kw: ['suggested', 'Clearway Solar'] },
    { id: 130, part: P7, group: 'R-126-130', type: 'single', passage: PASS126, translation: Z126, recommendedSeconds: 50,
      question: 'What does Mr. Novak say about September 13?', options: ['He will give a presentation.', 'He will arrive late in Denver.', 'He wants to change hotels.', 'He has a client visit that afternoon.'], answer: 'D',
      explanation: 'I have a client visit on the afternoon of September 13。',
      qz: 'Novak 先生提到 9 月 13 日怎麼了？', oz: ['他要做簡報。', '他會晚到丹佛。', '他想換飯店。', '他那天下午要拜訪客戶。'],
      ev: ['I have a client visit on the afternoon of September 13'], kw: ['September 13'] }
  ];

  // Part 5 題組的中文翻譯與單字（放在第一題）
  Q[0].translation = Q.slice(0, 10).map((q) => q.id + '. ' + q.qz).join('\n');
  Q[0].vocab = [
    ['meeting minutes', 'n.', '會議紀錄'], ['participant', 'n.', '與會者', 'participants'], ['efficiently', 'adv.', '有效率地'],
    ['sign in', 'phr.', '登記；簽到'], ['reception desk', 'n.', '接待櫃台'], ['application', 'n.', '申請', 'Applications'],
    ['postpone', 'v.', '延期'], ['be responsible for', 'phr.', '負責'], ['expense report', 'n.', '報帳單', 'expense reports'],
    ['significantly', 'adv.', '顯著地'], ['expand into', 'phr.', '拓展到', 'expanded into'], ['overseas', 'adj.', '海外的'],
    ['manage to', 'phr.', '設法做到', 'managed to'], ['on time', 'phr.', '準時'], ['quarterly', 'adj.', '每季的'],
    ['no later than', 'phr.', '最晚在…之前'], ['submit', 'v.', '繳交', 'submitted']
  ];

  window.BESTEP_DATA.test1Reading = {
    testId: 1,
    section: 'reading',
    title: 'TOEIC Test 1 · Reading',
    description: 'TOEIC 模擬測驗 Test 1 閱讀（Part 5–7，原創題目 30 題，建議 25 分鐘）。',
    durationSec: 25 * 60,
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
  window.BESTEP_NOTES['1R'] = notes;
  window.BESTEP_VOCAB['1R'] = vocab;
})();
