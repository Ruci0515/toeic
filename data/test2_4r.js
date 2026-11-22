/* Test 2 閱讀 Part 5 句子填空（Q101–130，分三組）＋ Part 6 段落填空（Q131–146） */
(function () {
  const T = window.TOEIC_T2;

  /* ---------------- Part 5 ---------------- */
  // [題號, 句子, [選項], 答案, 中文, [選項中文], [句中線索字], 詳解]
  const P5 = [
    [101, 'Hillcrest Bank ------- a new mobile banking app next month.', ['will launch', 'launched', 'has launched', 'launching'], 'A', 'Hillcrest 銀行下個月將＿＿新的行動銀行 app。', ['將推出', '推出了', '已經推出', '推出（-ing）'], ['next month'], 'next month 是未來時間，用 will＋原形。'],
    [102, 'All expense reports must be submitted ------- Friday at the latest.', ['since', 'among', 'by', 'along'], 'C', '所有報帳單最晚必須在週五＿＿繳交。', ['自從', '在…之中', '在…之前', '沿著'], ['at the latest'], 'by＋截止時間＝在…之前；at the latest（最晚）是線索。'],
    [103, 'Ms. Romero is ------- qualified for the position of finance director.', ['high', 'highly', 'higher', 'height'], 'B', 'Romero 女士＿＿勝任財務長一職。', ['高的', '非常地', '更高的', '高度'], ['is', 'qualified'], '修飾形容詞 qualified 要用副詞；highly qualified＝非常勝任。'],
    [104, 'The training manual was revised to make ------- easier for new employees to understand.', ['them', 'its', 'they', 'it'], 'D', '訓練手冊改寫過，讓新員工更容易理解＿＿。', ['他們（受格）', '它的', '他們（主格）', '它（虛受詞）'], ['make', 'easier for'], 'make it easier for 人 to V：it 是虛受詞，代替後面的不定詞。'],
    [105, '------- the heavy rain, the outdoor concert went ahead as planned.', ['Although', 'Despite', 'Because', 'Unless'], 'B', '＿＿大雨，戶外音樂會仍照計畫進行。', ['雖然（連接詞）', '儘管（介系詞）', '因為', '除非'], ['the heavy rain'], '空格後是名詞片語（沒有動詞），要用介系詞 Despite。Although 後面要接子句。'],
    [106, 'Customers who wish to return an item must present the original -------.', ['receipt', 'receive', 'receiving', 'receptive'], 'A', '想退貨的顧客必須出示原始＿＿。', ['收據', '收到', '收到（-ing）', '樂於接受的'], ['the original'], 'the original 後面要接名詞：receipt。'],
    [107, "The new assembly line has greatly improved the factory's overall -------.", ['productive', 'productively', 'produce', 'productivity'], 'D', '新的組裝線大幅提升了工廠整體的＿＿。', ['有生產力的', '有成效地', '生產；農產品', '生產力'], ["factory's overall"], '所有格＋形容詞 overall 後面接名詞 productivity。produce 當名詞是「農產品」，語意不合。'],
    [108, 'Ms. Tanaka will be out of the office ------- the end of the week.', ['by', 'since', 'until', 'during'], 'C', 'Tanaka 女士＿＿週末都不在辦公室。', ['在…之前', '自從', '直到', '在…期間'], ['will be out of the office'], '狀態持續到某時間點用 until。by 用於「在期限前完成」的動作。'],
    [109, 'Each department head is required to ------- a monthly progress report.', ['submission', 'submit', 'submitted', 'submitting'], 'B', '每位部門主管都必須＿＿每月進度報告。', ['繳交（名詞）', '繳交', '繳交（p.p.）', '繳交（-ing）'], ['is required to'], 'be required to＋原形動詞。'],
    [110, 'Visitors are reminded that photography is strictly ------- inside the gallery.', ['prohibit', 'prohibiting', 'prohibits', 'prohibited'], 'D', '提醒參觀者，展廳內嚴格＿＿攝影。', ['禁止（原形）', '禁止（-ing）', '禁止（第三人稱）', '被禁止'], ['is strictly'], '攝影「被」禁止：be＋p.p. 被動。'],
    [111, 'The conference room on the fifth floor can accommodate ------- fifty people.', ['up to', 'as of', 'so that', 'in case'], 'A', '五樓的會議室可容納＿＿五十人。', ['最多', '截至', '以便', '以防'], ['accommodate', 'fifty people'], 'up to＋數字＝最多。'],
    [112, "Neither the manager ------- her assistant was available to answer the client's questions.", ['or', 'and', 'nor', 'but'], 'C', '經理＿＿她的助理都沒空回答客戶的問題。', ['或', '和', '也不', '但是'], ['Neither'], 'neither A nor B＝A 和 B 都不。'],
    [113, "The museum's new wing, ------- was designed by a local architect, will open in June.", ['who', 'what', 'where', 'which'], 'D', '博物館的新館＿＿由本地建築師設計，將於六月開幕。', ['（指人）', '（不當關代）', '（指地點，後接完整句）', '（指物）'], ['new wing', 'was designed'], '先行詞 new wing 是物，逗號後的非限定子句用 which。空格後缺主詞，所以不能用 where。'],
    [114, 'Our customer service representatives are available to assist you ------- the clock.', ['across', 'around', 'among', 'above'], 'B', '我們的客服人員＿＿為您服務。', ['橫越', '（around the clock）全天候', '在…之中', '在…上方'], ['the clock'], 'around the clock＝全天候、24 小時。'],
    [115, 'Mr. Huang asked that all staff members ------- the safety guidelines carefully.', ['review', 'reviews', 'reviewed', 'reviewing'], 'A', '黃先生要求全體員工仔細＿＿安全守則。', ['閱讀（原形）', '閱讀（第三人稱）', '閱讀（過去式）', '閱讀（-ing）'], ['asked that'], 'ask / request / suggest that＋主詞＋（should）原形動詞。'],
    [116, 'Sales of electric bicycles have risen ------- over the past three years.', ['steady', 'steadier', 'steadily', 'steadiness'], 'C', '電動自行車的銷量過去三年＿＿上升。', ['穩定的', '更穩定的', '穩定地', '穩定性'], ['have risen'], '修飾動詞 risen 用副詞 steadily。'],
    [117, 'Because the original supplier could not meet the deadline, the company had to find an ------- source.', ['optional', 'eventual', 'actual', 'alternative'], 'D', '因為原本的供應商趕不上期限，公司必須找＿＿來源。', ['選擇性的', '最終的', '實際的', '替代的'], ['could not meet the deadline', 'source'], '原供應商不行，要找「替代的」來源：alternative。冠詞 an 也提示母音開頭。'],
    [118, 'The board of directors will meet next week to ------- the proposed merger.', ['speak', 'discuss', 'talk', 'tell'], 'B', '董事會下週將開會＿＿合併提案。', ['說', '討論', '談', '告訴'], ['the proposed merger'], 'discuss 是及物動詞，直接接受詞；speak / talk 要加 about。'],
    [119, 'Ms. Sato has worked at the firm ------- she graduated from university.', ['since', 'during', 'while', 'until'], 'A', '佐藤小姐＿＿大學畢業就在這家公司工作。', ['自從', '在…期間', '當…時', '直到'], ['has worked'], '現在完成式＋since＋過去時間點。'],
    [120, 'Only employees with a valid security badge are ------- to enter the server room.', ['allowing', 'allowance', 'allowed', 'allow'], 'C', '只有持有效識別證的員工＿＿進入機房。', ['允許（-ing）', '津貼', '被允許', '允許'], ['are', 'to enter'], 'be allowed to＋V＝被允許做…。'],
    [121, 'The renovation project was completed two weeks ahead of -------.', ['time', 'date', 'plan', 'schedule'], 'D', '整修工程比＿＿提早兩週完成。', ['時間', '日期', '計畫', '預定進度'], ['two weeks ahead of'], 'ahead of schedule＝比預定進度提前，固定搭配。'],
    [122, 'If the shipment ------- by Thursday, we will contact the supplier.', ['will not arrive', 'does not arrive', 'did not arrive', 'has not been arriving'], 'B', '如果貨在週四前＿＿，我們會聯絡供應商。', ['將不會到', '沒有到（現在式）', '沒有到（過去式）', '一直沒在到'], ['If', 'we will contact'], '條件句 If 子句用現在式表示未來，主句用 will。'],
    [123, "The company's annual report is ------- on its Web site.", ['available', 'availability', 'avail', 'availably'], 'A', '公司的年報＿＿在官網上。', ['可取得的', '可用性', '有益於', '（不存在的字）'], ['is', 'on its Web site'], 'be 動詞後接形容詞 available（可取得的）。'],
    [124, 'Applicants should describe ------- previous work experience in the cover letter.', ['they', 'them', 'their', 'theirs'], 'C', '應徵者應在求職信中描述＿＿過去的工作經驗。', ['他們（主格）', '他們（受格）', '他們的', '他們的（所有代名詞）'], ['describe', 'work experience'], '名詞片語 previous work experience 前面用所有格 their。'],
    [125, 'Of all the candidates interviewed, Mr. Ito was by far the ------- prepared.', ['more', 'much', 'very', 'most'], 'D', '在所有面試的人選中，伊藤先生準備得＿＿充分。', ['比較', '很多', '非常', '最'], ['Of all', 'by far the'], 'Of all…（在所有…之中）＋the → 最高級 most。by far 用來加強最高級。'],
    [126, "Ms. Kim's presentation was so ------- that several clients asked for a copy of her slides.", ['informed', 'informative', 'information', 'inform'], 'B', 'Kim 女士的簡報＿＿，好幾位客戶都跟她要投影片。', ['消息靈通的', '內容豐富的', '資訊', '通知'], ['so', 'that several clients'], 'so＋形容詞＋that。簡報「內容豐富」用 informative；informed 是形容人。'],
    [127, 'Please do not hesitate to contact me ------- you have any questions about the contract.', ['if', 'unless', 'whereas', 'so'], 'A', '＿＿您對合約有任何疑問，請隨時與我聯絡。', ['如果', '除非', '然而', '所以'], ['do not hesitate', 'have any questions'], '語意是「如果有問題」：if。'],
    [128, 'The software update will be installed automatically ------- the computer is restarted.', ['as soon', 'in order', 'due to', 'once'], 'D', '電腦＿＿重新啟動，軟體更新就會自動安裝。', ['（缺 as）', '為了', '由於（介系詞）', '一旦'], ['will be installed', 'the computer is restarted'], '空格後是子句，要用連接詞 once（一旦）。as soon 少了 as；due to 是介系詞。'],
    [129, 'Hardly ------- the meeting begun when the fire alarm went off.', ['did', 'was', 'had', 'has'], 'C', '會議＿＿剛開始，火警警報就響了。', ['（助動詞 did）', '（be 動詞）', '（過去完成 had）', '（現在完成 has）'], ['Hardly', 'begun', 'when'], 'Hardly had＋主詞＋p.p.…when＋過去式＝一…就…（倒裝）。begun 是 p.p.，要搭 had。'],
    [130, 'To ensure ------- delivery, please write the full address, including the apartment number.', ['correctly', 'correct', 'correction', 'correctness'], 'B', '為確保＿＿送達，請寫完整地址，包括門牌號碼。', ['正確地', '正確的', '修正', '正確性'], ['To ensure', 'delivery'], '名詞 delivery 前用形容詞 correct。']
  ];
  [[101, 110], [111, 120], [121, 130]].forEach(([a, b]) => {
    const rows = P5.filter((r) => r[0] >= a && r[0] <= b).map((r) => [r[0], r[1], r[2], r[3], r[4], r[5], [], r[6], r[7]]);
    T.set('R', 'Part 5', 'R-' + a + '-' + b, {
      translation: rows.map((r) => r[0] + '. ' + r[4]).join('\n'),
      vocab: {
        101: [['launch', 'v.', '推出'], ['expense report', 'n.', '報帳單', 'expense reports'], ['at the latest', 'phr.', '最晚'], ['highly qualified', 'phr.', '非常勝任的'], ['revise', 'v.', '修訂', 'revised'], ['go ahead', 'phr.', '照常進行', 'went ahead'], ['receipt', 'n.', '收據'], ['productivity', 'n.', '生產力'], ['progress report', 'n.', '進度報告'], ['prohibited', 'adj.', '被禁止的']],
        111: [['accommodate', 'v.', '容納'], ['up to', 'phr.', '最多'], ['neither … nor', 'phr.', '既不…也不'], ['wing', 'n.', '（建築的）側翼；新館'], ['around the clock', 'phr.', '全天候'], ['safety guidelines', 'n.', '安全守則'], ['steadily', 'adv.', '穩定地'], ['alternative', 'adj.', '替代的'], ['merger', 'n.', '合併'], ['security badge', 'n.', '識別證']],
        121: [['ahead of schedule', 'phr.', '提前'], ['shipment', 'n.', '貨物'], ['annual report', 'n.', '年報'], ['cover letter', 'n.', '求職信'], ['by far', 'phr.', '（加強最高級）遠遠'], ['informative', 'adj.', '內容豐富的'], ['do not hesitate to', 'phr.', '請隨時…'], ['once', 'conj.', '一旦'], ['Hardly had … when', 'phr.', '一…就…'], ['ensure', 'v.', '確保']]
      }[a]
    }, rows);
  });

  /* ---------------- Part 6 ---------------- */
  T.set('R', 'Part 6', 'R-131-134', {
    passage: {
      title: 'E-mail', subtitle: 'To: All Staff · From: Linda Cho, Human Resources · Date: February 20 · Subject: Welcome, Mr. Abbott',
      blocks: [
        { type: 'p', text: 'I am pleased to announce that Gregory Abbott {{131}} our company as head of the Research and Development department on March 1.' },
        { type: 'p', text: 'Mr. Abbott brings more than fifteen years of experience in product {{132}}, most recently at Calder Electronics, where he led the team that created the award-winning SmartHome thermostat. {{133}}' },
        { type: 'p', text: 'Mr. Abbott will meet with each department during his first week. {{134}}, please feel free to stop by his office on the third floor to introduce yourself.' }
      ]
    },
    translation: 'Email｜收件：全體員工｜寄件：人資部 Linda Cho｜2 月 20 日｜主旨：歡迎 Abbott 先生\n我很高興宣布，Gregory Abbott 將於 3 月 1 日加入本公司，擔任研發部主管。Abbott 先生在產品開發方面有超過十五年的經驗，最近任職於 Calder 電子，帶領團隊研發出得獎的 SmartHome 溫控器。他擁有 Lincoln 大學的電機工程碩士學位。Abbott 先生第一週會跟每個部門開會。此外，也歡迎大家到三樓他的辦公室自我介紹。',
    vocab: [['announce', 'v.', '宣布'], ['Research and Development', 'n.', '研發（R&D）'], ['award-winning', 'adj.', '得獎的'], ['thermostat', 'n.', '溫控器'], ['feel free to', 'phr.', '隨時可以…'], ['stop by', 'phr.', '順道拜訪']]
  }, [
    [131, 'Choose the best answer for blank 131.', ['joined', 'will join', 'has joined', 'joining'], 'B', '第 131 格最適合填入？', ['加入了', '將加入', '已經加入', '加入（-ing）'], ['as head of the Research and Development department on March 1.'], ['131'], 'Email 寫於 2 月 20 日，3 月 1 日是未來，用 will join。'],
    [132, 'Choose the best answer for blank 132.', ['management', 'sales', 'marketing', 'development'], 'D', '第 132 格最適合填入？', ['管理', '銷售', '行銷', '開發'], ['where he led the team that created the award-winning SmartHome thermostat'], ['132'], '他帶團隊「研發」出產品，又是研發部主管：product development。'],
    [133, 'Choose the best sentence for blank 133.', ["He holds a master's degree in electrical engineering from Lincoln University.", 'The thermostat will go on sale next month.', 'Please submit your vacation requests by Friday.', 'Our cafeteria will be closed for renovations.'], 'A', '第 133 格最適合填入哪一句？', ['他擁有 Lincoln 大學的電機工程碩士學位。', '溫控器下個月開賣。', '請在週五前提出休假申請。', '員工餐廳將關閉整修。'], ['Mr. Abbott brings more than fifteen years of experience'], ['133'], '這段在介紹 Abbott 先生的資歷，接著補充學歷最自然。其他選項跟主題無關。'],
    [134, 'Choose the best answer for blank 134.', ['Otherwise', 'Nevertheless', 'In addition', 'Instead'], 'C', '第 134 格最適合填入？', ['否則', '儘管如此', '此外', '反而'], ['Mr. Abbott will meet with each department during his first week.'], ['134'], '前句說他會去各部門開會，後句再補充「也可以去他辦公室打招呼」：In addition。']
  ]);

  T.set('R', 'Part 6', 'R-135-138', {
    passage: {
      title: 'Advertisement', subtitle: 'SparkClean Office Cleaning',
      blocks: [
        { type: 'p', text: 'Is your office looking less than its best? SparkClean has been providing {{135}} cleaning services to businesses in the Dayton area for over a decade. Our trained staff can clean your workspace in the evening or on weekends, so your employees can work without {{136}}.' },
        { type: 'p', text: '{{137}} All of our cleaning products are environmentally friendly and safe for people and pets.' },
        { type: 'p', text: 'Call us today at 555-0148 to {{138}} a free estimate. New customers who sign a one-year contract will receive their first month of service at no charge.' }
      ]
    },
    translation: '廣告｜SparkClean 辦公室清潔\n您的辦公室看起來不夠整潔嗎？SparkClean 十多年來一直為 Dayton 地區的企業提供可靠的清潔服務。我們訓練有素的員工可以在晚上或週末打掃您的工作空間，讓您的員工工作不受打擾。我們也致力於保護地球，所有清潔用品都環保，對人和寵物都安全。今天就撥打 555-0148 索取免費估價。簽一年合約的新客戶，第一個月服務免費。',
    vocab: [['less than its best', 'phr.', '狀態不夠好'], ['reliable', 'adj.', '可靠的'], ['decade', 'n.', '十年'], ['workspace', 'n.', '工作空間'], ['interruption', 'n.', '打擾；中斷'], ['environmentally friendly', 'adj.', '環保的'], ['estimate', 'n.', '估價'], ['at no charge', 'phr.', '免費']]
  }, [
    [135, 'Choose the best answer for blank 135.', ['reliability', 'rely', 'reliable', 'reliably'], 'C', '第 135 格最適合填入？', ['可靠性', '依賴', '可靠的', '可靠地'], ['cleaning services'], ['135'], '名詞 cleaning services 前用形容詞 reliable。'],
    [136, 'Choose the best answer for blank 136.', ['interruption', 'interrupts', 'interrupted', 'interruptive'], 'A', '第 136 格最適合填入？', ['打擾（名詞）', '打擾（第三人稱）', '被打擾的', '打擾性的'], ['so your employees can work without'], ['136'], '介系詞 without 後接名詞：without interruption（不受打擾）。'],
    [137, 'Choose the best sentence for blank 137.', ['Our office is located downtown.', 'We are currently hiring cleaning staff.', 'Thank you for your recent payment.', 'We are also committed to protecting the planet.'], 'D', '第 137 格最適合填入哪一句？', ['我們的辦公室在市中心。', '我們目前正在招募清潔人員。', '謝謝您最近的付款。', '我們也致力於保護地球。'], ['All of our cleaning products are environmentally friendly'], ['137'], '後一句講清潔用品很環保，前面接「我們也致力於保護地球」最順。'],
    [138, 'Choose the best answer for blank 138.', ['make', 'request', 'apply', 'tell'], 'B', '第 138 格最適合填入？', ['做', '索取', '申請（不及物，要加 for）', '告訴'], ['Call us today at 555-0148 to'], ['138'], '打電話「索取」免費估價：request a free estimate。apply 要說 apply for。']
  ]);

  T.set('R', 'Part 6', 'R-139-142', {
    passage: {
      title: 'Local Bakery to Open Second Location', subtitle: 'Denville Daily News · Business',
      blocks: [
        { type: 'p', text: "DENVILLE — Rosa's Bakery, a favorite of Denville residents for over twenty years, will open a second location on Harbor Street next month. Owner Rosa Delgado says the decision {{139}} by growing demand." },
        { type: 'p', text: '"Our customers have been asking us to open a store closer to the business district {{140}} years," Delgado said.' },
        { type: 'p', text: 'The new shop will be larger than the original, with seating for forty customers. {{141}} It will also offer a lunch menu of soups and sandwiches, which the original location does not.' },
        { type: 'p', text: 'Delgado plans to hire ten new employees, {{142}} several bakers and a manager.' }
      ]
    },
    translation: '本地麵包店將開第二家分店｜Denville 日報・商業版\nDENVILLE——深受 Denville 居民喜愛二十多年的 Rosa 麵包店，下個月將在 Harbor 街開第二家分店。老闆 Rosa Delgado 表示，這個決定是需求增加所促成的。Delgado 說：「多年來，我們的顧客一直要求我們在商業區附近開店。」新店比原本的店大，有四十個座位，顧客可以在店內享用咖啡和糕點。新店還會提供湯品和三明治的午餐菜單，這是原本的店沒有的。Delgado 計畫招募十名新員工，包括幾位烘焙師和一位店長。',
    vocab: [['location', 'n.', '（店的）據點'], ['resident', 'n.', '居民', 'residents'], ['growing demand', 'n.', '日益增加的需求'], ['business district', 'n.', '商業區'], ['seating', 'n.', '座位'], ['on site', 'phr.', '在現場'], ['pastry', 'n.', '糕點', 'pastries']]
  }, [
    [139, 'Choose the best answer for blank 139.', ['drove', 'driving', 'drives', 'was driven'], 'D', '第 139 格最適合填入？', ['推動了', '推動（-ing）', '推動（第三人稱）', '被推動'], ['by growing demand'], ['139'], '決定「被」需求推動：was driven by（被動）。後面的 by 是線索。'],
    [140, 'Choose the best answer for blank 140.', ['since', 'for', 'during', 'ago'], 'B', '第 140 格最適合填入？', ['自從', '（一段時間）', '在…期間', '…以前'], ['have been asking us'], ['140'], '完成進行式＋for＋一段時間（years）。since 後要接時間點。'],
    [141, 'Choose the best sentence for blank 141.', ['Ms. Delgado started baking as a child.', 'Harbor Street is currently closed to traffic.', 'Customers will be able to enjoy their coffee and pastries on site.', 'The original bakery will close permanently.'], 'C', '第 141 格最適合填入哪一句？', ['Delgado 女士從小就開始烘焙。', 'Harbor 街目前禁止通行。', '顧客可以在店內享用咖啡和糕點。', '原本的店將永久關閉。'], ['with seating for forty customers'], ['141'], '前句講新店有座位，接著說可以在店內用餐最自然。(D) 跟後文「原本的店沒有午餐」矛盾。'],
    [142, 'Choose the best answer for blank 142.', ['including', 'included', 'include', 'includes'], 'A', '第 142 格最適合填入？', ['包括', '被包括的', '包括（原形）', '包括（第三人稱）'], ['Delgado plans to hire ten new employees,'], ['142'], '逗號後補充說明，用介系詞 including＋名詞。前面已有主要動詞 plans，不能再放動詞。']
  ]);

  T.set('R', 'Part 6', 'R-143-146', {
    passage: {
      title: 'Letter', subtitle: 'Business Today Magazine · June 1',
      blocks: [
        { type: 'p', text: 'Dear Mr. Novak,' },
        { type: 'p', text: 'Thank you for being a loyal reader of Business Today. Your current subscription {{143}} on June 30. To make sure you do not miss a single issue, please renew {{144}} that date.' },
        { type: 'p', text: '{{145}} If you renew for two years, you will save 25 percent off the regular price and receive our special annual report at no extra cost.' },
        { type: 'p', text: 'Renewing is easy. Simply visit our Web site or return the enclosed form in the {{146}} envelope.' },
        { type: 'p', text: 'Sincerely, Customer Service Department' }
      ]
    },
    translation: '信件｜《今日商業》雜誌｜6 月 1 日\n親愛的 Novak 先生：感謝您一直是《今日商業》的忠實讀者。您目前的訂閱將於 6 月 30 日到期。為確保不漏掉任何一期，請在那天之前續訂。今年我們為長期訂戶提供特別折扣：續訂兩年可省下定價的 25%，並免費獲得我們的年度特別報告。續訂很簡單，只要上我們的網站，或把隨信附上的表格放進免付郵資的信封寄回即可。客服部 敬上',
    vocab: [['loyal', 'adj.', '忠實的'], ['subscription', 'n.', '訂閱'], ['expire', 'v.', '到期', 'expires'], ['issue', 'n.', '（雜誌）期'], ['renew', 'v.', '續訂'], ['enclosed', 'adj.', '隨信附上的'], ['postage-paid', 'adj.', '郵資已付的']]
  }, [
    [143, 'Choose the best answer for blank 143.', ['expires', 'expired', 'expiring', 'to expire'], 'A', '第 143 格最適合填入？', ['到期（現在式）', '到期了（過去式）', '到期（-ing）', '要到期（不定詞）'], ['Your current subscription'], ['143'], '句子缺主要動詞；信寫於 6 月 1 日，6 月 30 日還沒到，不能用過去式。現在式可表示既定的未來事件。'],
    [144, 'Choose the best answer for blank 144.', ['since', 'until', 'before', 'within'], 'C', '第 144 格最適合填入？', ['自從', '直到', '在…之前', '在…之內'], ['To make sure you do not miss a single issue'], ['144'], '要在到期日「之前」續訂才不會漏期：before that date。'],
    [145, 'Choose the best sentence for blank 145.', ['Our offices will be closed on June 30.', 'This year, we are offering a special discount to longtime subscribers.', 'We have received your payment.', 'The magazine is published every week.'], 'B', '第 145 格最適合填入哪一句？', ['我們的辦公室 6 月 30 日休息。', '今年我們為長期訂戶提供特別折扣。', '我們已收到您的付款。', '本雜誌每週出刊。'], ['you will save 25 percent off the regular price'], ['145'], '後句講續訂兩年省 25%，前面先引出「特別折扣」最順。(C) 他還沒續訂，不會已經付款。'],
    [146, 'Choose the best answer for blank 146.', ['previous', 'temporary', 'occupied', 'postage-paid'], 'D', '第 146 格最適合填入？', ['先前的', '暫時的', '被占用的', '郵資已付的'], ['return the enclosed form in the'], ['146'], '寄回表格用的信封：postage-paid envelope（免付郵資信封）。']
  ]);
})();
