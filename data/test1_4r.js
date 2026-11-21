/* Test 1 閱讀 Part 5 句子填空（Q101–130，分三組）＋ Part 6 段落填空（Q131–146） */
(function () {
  const T = window.TOEIC_T1;

  /* ---------------- Part 5 ---------------- */
  // [題號, 句子, [選項], 答案, 中文, [選項中文], [句中線索字], 詳解]
  const P5 = [
    [101, 'Ms. Chen asked her assistant to ------- the meeting minutes to all participants.', ['distribute', 'distributing', 'distribution', 'distributed'], 'A', 'Chen 女士請助理把會議紀錄＿＿給所有與會者。', ['分發（原形）', '分發（-ing）', '分發（名詞）', '分發（過去式）'], ['asked her assistant to'], 'ask＋人＋to＋原形動詞。'],
    [102, 'The new software helps employees manage their time more -------.', ['efficient', 'efficiency', 'efficiencies', 'efficiently'], 'D', '新軟體幫助員工更＿＿管理時間。', ['有效率的', '效率', '效率（複數）', '有效率地'], ['manage their time more'], '修飾動詞 manage 要用副詞。'],
    [103, 'All visitors must sign in at the front desk ------- entering the building.', ['during', 'before', 'between', 'until'], 'B', '所有訪客＿＿進入大樓，都必須在櫃台登記。', ['在…期間', '在…之前', '在…之間', '直到'], ['sign in', 'entering the building'], '先登記再進入，before entering。'],
    [104, 'Applications for the marketing position will be accepted ------- March 31.', ['since', 'along', 'until', 'within'], 'C', '行銷職缺的申請受理＿＿3 月 31 日。', ['自從', '沿著', '直到', '在…之內'], ['will be accepted', 'March 31'], '持續到某個截止日用 until；since 要搭配完成式。'],
    [105, 'Because of heavy snow, the morning flight to Chicago has been -------.', ['postpone', 'postpones', 'postponing', 'postponed'], 'D', '因為大雪，往芝加哥的早班機已經被＿＿。', ['延期（原形）', '延期（第三人稱）', '延期（-ing）', '被延期（p.p.）'], ['has been'], '航班「被」延期：has been＋過去分詞。'],
    [106, 'Mr. Lopez is ------- for reviewing all expense reports before they are submitted.', ['responsible', 'responsibly', 'responsive', 'responsibility'], 'A', 'Lopez 先生＿＿在報帳單送出前審核。', ['負責的', '負責地', '反應快的', '責任'], ['is', 'for reviewing'], 'be responsible for＝負責。responsive 是字形相近的陷阱。'],
    [107, "The company's profits increased ------- after it expanded into overseas markets.", ['significant', 'significantly', 'significance', 'signify'], 'B', '公司拓展海外市場後，獲利＿＿成長。', ['顯著的', '顯著地', '重要性', '表示'], ['profits increased'], '修飾動詞 increased 用副詞。'],
    [108, '------- the budget was limited, the team completed the project on time.', ['Despite', 'However', 'Although', 'Because'], 'C', '＿＿預算有限，團隊仍準時完成專案。', ['儘管（介系詞）', '然而（副詞）', '雖然（連接詞）', '因為'], ['the budget was limited'], '後面是完整子句，要用連接詞；語意是讓步，選 Although。Despite 後面只能接名詞。'],
    [109, 'Please contact our customer service team if you have ------- questions about your order.', ['much', 'every', 'each', 'any'], 'D', '如果您對訂單有＿＿問題，請聯絡客服。', ['很多（不可數）', '每一個', '每一個', '任何'], ['questions'], '複數名詞＋if 子句，用 any。'],
    [110, 'The quarterly report must be submitted by Friday, ------- it will not be included in the review.', ['or', 'and', 'so', 'but'], 'A', '季報必須在週五前繳交，＿＿就不會被納入審查。', ['否則', '而且', '所以', '但是'], ['must be submitted', 'will not be included'], '「必須…，否則…」用 or。'],
    [111, 'Ms. Ramos has worked at the law firm ------- more than ten years.', ['since', 'for', 'during', 'at'], 'B', 'Ramos 女士已經在這家律師事務所工作＿＿十多年。', ['自從', '（持續）…之久', '在…期間', '在'], ['has worked', 'more than ten years'], '完成式＋一段時間，用 for；since 後面接時間點。'],
    [112, "The museum's new exhibition has attracted a ------- number of visitors.", ['record', 'recorded', 'recording', 'records'], 'A', '博物館的新展覽吸引了＿＿的參觀人數。', ['破紀錄的', '被錄下的', '錄音', '紀錄（複數）'], ['number of visitors'], 'a record number of＝破紀錄的數量，record 當形容詞用。'],
    [113, 'Employees ------- to attend the safety training must register by Thursday.', ['wish', 'wishes', 'wishing', 'wished'], 'C', '＿＿參加安全訓練的員工必須在週四前報名。', ['希望（原形）', '希望（第三人稱）', '希望（-ing，修飾名詞）', '希望（過去式）'], ['must register'], '句子已有動詞 must register，空格是修飾 Employees 的分詞：Employees wishing to…＝想要…的員工。'],
    [114, 'The contract will be signed ------- both parties agree on the final terms.', ['once', 'unless', 'although', 'whether'], 'A', '＿＿雙方同意最終條款，就會簽約。', ['一旦', '除非', '雖然', '是否'], ['will be signed', 'agree'], 'once＝一旦…就…，語意通順。'],
    [115, 'Our sales representatives are trained to respond ------- to customer inquiries.', ['prompt', 'promptness', 'prompted', 'promptly'], 'D', '我們的業務代表受過訓練，會＿＿回覆顧客詢問。', ['迅速的', '迅速（名詞）', '被促使', '迅速地'], ['respond'], '修飾動詞 respond 用副詞 promptly。'],
    [116, "The board of directors ------- the proposal at next week's meeting.", ['reviewed', 'will review', 'has reviewed', 'reviewing'], 'B', '董事會＿＿在下週的會議審查這項提案。', ['審查了', '將會審查', '已經審查', '審查（-ing）'], ["next week's meeting"], 'next week 是未來時間，用 will review。'],
    [117, 'Neither the manager ------- her assistant was available to answer the question.', ['or', 'and', 'nor', 'but'], 'C', '經理＿＿她的助理都沒空回答這個問題。', ['或', '和', '也不', '但是'], ['Neither'], 'neither A nor B＝A 和 B 都不。'],
    [118, 'Please keep all receipts ------- you can be reimbursed for travel expenses.', ['so that', 'even if', 'as though', 'in case of'], 'A', '請保留所有收據，＿＿你能申請差旅費報銷。', ['以便', '即使', '好像', '萬一（接名詞）'], ['keep all receipts', 'be reimbursed'], 'so that＝以便，表示目的。in case of 後面要接名詞。'],
    [119, 'The hotel is ------- located near the airport and the convention center.', ['convenient', 'convenience', 'conveniences', 'conveniently'], 'D', '這家飯店＿＿位於機場和會議中心附近。', ['方便的', '方便', '便利設施', '方便地'], ['located'], '修飾過去分詞 located 用副詞：conveniently located＝地點便利。'],
    [120, "Ms. Park was promoted because of her ------- to the company's growth.", ['contribute', 'contribution', 'contributed', 'contributor'], 'B', 'Park 女士因為她對公司成長的＿＿而升職。', ['貢獻（動詞）', '貢獻（名詞）', '貢獻了', '貢獻者'], ['her', "to the company's growth"], '所有格 her 後接名詞；contribution to＝對…的貢獻。contributor 是人，語意不合。'],
    [121, 'The new policy applies to all employees, ------- of their position.', ['regardless', 'despite', 'instead', 'although'], 'A', '新政策適用所有員工，＿＿職位。', ['不論', '儘管', '反而', '雖然'], ['of their position'], 'regardless of＝不論，固定搭配。'],
    [122, 'The updated training manual is available ------- the company intranet.', ['at', 'on', 'in', 'to'], 'B', '更新後的訓練手冊可以在公司內部網路＿＿取得。', ['在（地點）', '在（網路上）', '在…裡面', '到'], ['intranet'], '在網路、網站上用 on（on the Internet / on the Web site）。'],
    [123, 'Customers who ------- their orders before noon will receive them the same day.', ['place', 'placing', 'placement', 'to place'], 'A', '中午前＿＿的顧客當天就會收到。', ['下（訂單）', '下（-ing）', '安置', '去下'], ['Customers who', 'their orders'], '關係子句 who 後面要接動詞：place an order＝下訂單。'],
    [124, 'The renovation of the lobby is expected to be completed ------- the end of the month.', ['since', 'until', 'by', 'along'], 'C', '大廳整修預計在月底＿＿完成。', ['自從', '直到', '在…之前', '沿著'], ['be completed', 'the end of the month'], '在期限前完成用 by；until 用於持續的動作。'],
    [125, 'Due to high demand, the concert tickets sold out ------- within a few hours.', ['complete', 'completion', 'completely', 'completing'], 'C', '因為需求很高，演唱會門票在幾小時內就＿＿賣光了。', ['完整的', '完成', '完全地', '完成（-ing）'], ['sold out'], '修飾動詞 sold out 用副詞。'],
    [126, "The marketing team will ------- the survey results at Monday's meeting.", ['presence', 'presently', 'presentation', 'present'], 'D', '行銷團隊會在週一的會議上＿＿問卷結果。', ['出席', '目前', '簡報（名詞）', '發表（動詞）'], ['will', 'the survey results'], 'will 後面接原形動詞 present（發表、報告）。'],
    [127, 'Only staff members with proper ------- may enter the laboratory.', ['authorize', 'authorized', 'authorization', 'authorizes'], 'C', '只有具備適當＿＿的員工才能進入實驗室。', ['授權（動詞）', '被授權的', '授權（名詞）', '授權（第三人稱）'], ['with proper'], '介系詞 with＋形容詞 proper 後面接名詞。'],
    [128, "The CEO's speech was so ------- that the audience gave her a standing ovation.", ['inspired', 'inspiring', 'inspiration', 'inspire'], 'B', '執行長的演講非常＿＿，觀眾起立鼓掌。', ['受鼓舞的', '激勵人心的', '靈感', '激勵'], ['speech was so'], '演講「令人」振奮用 -ing；人「感到」振奮才用 -ed。'],
    [129, 'Mr. Tanaka will be out of the office ------- Monday through Wednesday.', ['between', 'during', 'among', 'from'], 'D', 'Tanaka 先生＿＿週一到週三不在辦公室。', ['在…之間', '在…期間', '在…之中', '從'], ['through Wednesday'], 'from A through B＝從 A 到 B。between 要搭配 and。'],
    [130, '------- you need further assistance, please do not hesitate to contact me.', ['Should', 'Would', 'Had', 'Were'], 'A', '＿＿您需要進一步協助，請不要客氣與我聯絡。', ['萬一（倒裝）', '會', '曾經（倒裝）', '是（倒裝）'], ['you need', 'please do not hesitate'], 'Should you need…＝If you should need…（萬一需要），商業書信常用的倒裝。']
  ];
  [[101, 110], [111, 120], [121, 130]].forEach(([a, b]) => {
    const rows = P5.filter((r) => r[0] >= a && r[0] <= b).map((r) => [r[0], r[1], r[2], r[3], r[4], r[5], [], r[6], r[7]]);
    T.set('R', 'Part 5', 'R-' + a + '-' + b, {
      translation: rows.map((r) => r[0] + '. ' + r[4]).join('\n'),
      vocab: {
        101: [['meeting minutes', 'n.', '會議紀錄'], ['efficiently', 'adv.', '有效率地'], ['sign in', 'phr.', '登記'], ['application', 'n.', '申請', 'Applications'], ['postpone', 'v.', '延期', 'postponed'], ['be responsible for', 'phr.', '負責', 'responsible for'], ['expense report', 'n.', '報帳單', 'expense reports'], ['expand into', 'phr.', '拓展到', 'expanded into'], ['quarterly', 'adj.', '每季的']],
        111: [['law firm', 'n.', '律師事務所'], ['a record number of', 'phr.', '破紀錄數量的'], ['register', 'v.', '報名'], ['terms', 'n.', '（合約）條款'], ['sales representative', 'n.', '業務代表', 'sales representatives'], ['inquiry', 'n.', '詢問', 'inquiries'], ['board of directors', 'n.', '董事會'], ['be reimbursed', 'phr.', '獲得報銷'], ['conveniently located', 'phr.', '地點便利'], ['contribution', 'n.', '貢獻']],
        121: [['regardless of', 'phr.', '不論'], ['intranet', 'n.', '內部網路'], ['place an order', 'phr.', '下訂單', 'place'], ['renovation', 'n.', '整修'], ['sell out', 'phr.', '賣光', 'sold out'], ['authorization', 'n.', '授權'], ['standing ovation', 'n.', '起立鼓掌'], ['Should you need …', 'phr.', '萬一您需要…（倒裝）', 'need further assistance'], ['do not hesitate to', 'phr.', '別猶豫（請隨時）…']]
      }[a]
    }, rows);
  });

  /* ---------------- Part 6 ---------------- */
  T.set('R', 'Part 6', 'R-131-134', {
    passage: {
      title: 'MEMO', subtitle: 'To: All Staff · From: Facilities Management · Date: May 27 · Re: Parking Lot Repairs',
      blocks: [
        { type: 'p', text: 'Please be aware that the east parking lot will be closed from Monday, June 3, to Friday, June 7, while the surface is being {{131}}. During this period, employees may park in the west lot or at the public garage on Maple Street.' },
        { type: 'p', text: 'The company will {{132}} the cost of parking at the garage. Simply keep your receipts and submit them to the accounting office. {{133}}' },
        { type: 'p', text: 'We apologize for any inconvenience and appreciate your {{134}} while the work is completed.' }
      ]
    },
    translation: '備忘錄：致全體員工，設施管理部，5 月 27 日，主旨：停車場整修。\n請注意，東側停車場將於 6 月 3 日（週一）至 6 月 7 日（週五）封閉，期間重新鋪設路面。這段期間員工可以停在西側停車場，或 Maple 街的公有停車場。公司會負擔公有停車場的費用，只要保留收據交給會計室即可。西側停車場預計很快會停滿，請提早到。造成不便敬請見諒，也感謝各位在施工期間的耐心配合。',
    vocab: [['be aware that', 'phr.', '請注意…'], ['surface', 'n.', '路面'], ['repave', 'v.', '重鋪路面'], ['public garage', 'n.', '公有停車場'], ['cover the cost', 'phr.', '負擔費用'], ['accounting office', 'n.', '會計室'], ['inconvenience', 'n.', '不便'], ['patience', 'n.', '耐心']]
  }, [
    [131, 'Choose the best answer for blank 131.', ['repave', 'repaved', 'repaving', 'repaves'], 'B', '第 131 格最適合填入？', ['重鋪（原形）', '被重鋪（p.p.）', '重鋪（-ing）', '重鋪（第三人稱）'], ['while the surface is being'], ['131'], 'is being＋p.p. 是進行式被動：路面「正在被」重鋪。'],
    [132, 'Choose the best answer for blank 132.', ['cover', 'charge', 'increase', 'avoid'], 'A', '第 132 格最適合填入？', ['負擔', '收費', '增加', '避免'], ['Simply keep your receipts and submit them to the accounting office.'], ['132'], '後句說收據交給會計室（報帳），表示公司負擔費用：cover the cost。'],
    [133, 'Choose the best sentence for blank 133.', ['The new cafeteria menu will be announced next week.', 'Our parking fees have recently been reduced.', 'The west lot is expected to fill up quickly, so please arrive early.', 'Thank you for attending the safety workshop.'], 'C', '第 133 格最適合填入哪一句？', ['新的員工餐廳菜單下週公布。', '停車費最近調降了。', '西側停車場預計很快停滿，請提早到。', '感謝參加安全講習。'], ['employees may park in the west lot'], ['133'], '句子插入題：前文提到改停西側停車場，接「西側會很快停滿」最連貫。'],
    [134, 'Choose the best answer for blank 134.', ['patient', 'patience', 'patiently', 'patients'], 'B', '第 134 格最適合填入？', ['有耐心的', '耐心（名詞）', '耐心地', '病人們'], ['appreciate your'], ['134'], '所有格 your 後接名詞；appreciate your patience 是固定說法。']
  ]);

  T.set('R', 'Part 6', 'R-135-138', {
    passage: {
      title: 'E-mail', subtitle: 'To: Maria Alvarez · From: Daniel Brooks, Northline Office Furniture · Subject: Your order #58213',
      blocks: [
        { type: 'p', text: 'Dear Ms. Alvarez,' },
        { type: 'p', text: 'Thank you for your recent order from Northline Office Furniture. Unfortunately, the ergonomic chair you selected is temporarily {{135}} due to high demand. We expect to receive new stock on May 20, and your chair will be shipped {{136}} after it arrives. {{137}}' },
        { type: 'p', text: 'If you would prefer not to wait, you may cancel your order at any time for a full refund. Alternatively, we would be happy to {{138}} a similar model that is currently in stock.' },
        { type: 'p', text: 'Sincerely, Daniel Brooks, Customer Service' }
      ]
    },
    translation: '親愛的 Alvarez 女士：感謝您最近向 Northline 辦公家具訂購。很遺憾，您選的人體工學椅因需求量大，暫時缺貨。我們預計 5 月 20 日進新貨，到貨後會立即寄出您的椅子。若此延誤造成不便，敬請見諒。如果您不想等，隨時可以取消訂單並全額退款。或者，我們也很樂意推薦目前有庫存的類似款式。客服部 Daniel Brooks 敬上',
    vocab: [['ergonomic', 'adj.', '人體工學的'], ['temporarily', 'adv.', '暫時地'], ['unavailable', 'adj.', '無法取得的；缺貨的'], ['high demand', 'n.', '需求量大'], ['stock', 'n.', '庫存'], ['full refund', 'n.', '全額退款'], ['alternatively', 'adv.', '或者'], ['in stock', 'phr.', '有庫存']]
  }, [
    [135, 'Choose the best answer for blank 135.', ['unavailable', 'unaware', 'unable', 'unlikely'], 'A', '第 135 格最適合填入？', ['無法取得的', '不知道的', '不能夠的', '不太可能的'], ['due to high demand. We expect to receive new stock'], ['135'], '後面說要進新貨，表示商品暫時缺貨：temporarily unavailable。unable 後面要接 to V。'],
    [136, 'Choose the best answer for blank 136.', ['immediate', 'immediately', 'immediacy', 'more immediate'], 'B', '第 136 格最適合填入？', ['立即的', '立即地', '即時性', '更立即的'], ['will be shipped'], ['136'], '修飾 after it arrives（時間副詞子句）用副詞：immediately after＝一…就立刻。'],
    [137, 'Choose the best sentence for blank 137.', ['Your chair was delivered yesterday.', 'Our store will be closed on May 20.', 'Please return the chair in its original box.', 'We apologize for any inconvenience this delay may cause.'], 'D', '第 137 格最適合填入哪一句？', ['您的椅子昨天已送達。', '我們的店 5 月 20 日休息。', '請用原箱退回椅子。', '若此延誤造成不便，敬請見諒。'], ['your chair will be shipped'], ['137'], '前文說明延誤，接道歉最合理。(A) 與「還沒到貨」矛盾。'],
    [138, 'Choose the best answer for blank 138.', ['recommendation', 'recommending', 'recommend', 'recommended'], 'C', '第 138 格最適合填入？', ['推薦（名詞）', '推薦（-ing）', '推薦（原形）', '推薦了'], ['we would be happy to'], ['138'], 'be happy to＋原形動詞。']
  ]);

  T.set('R', 'Part 6', 'R-139-142', {
    passage: {
      title: 'Harbor Bank Opens New Branch',
      blocks: [
        { type: 'p', text: 'Harbor Bank is pleased to announce the opening of its newest branch at 220 Grant Avenue on June 3. The branch will {{139}} the full range of services available at our other locations, including personal loans and financial planning.' },
        { type: 'p', text: '{{140}}, it will feature extended hours, staying open until 7 P.M. on weekdays. To celebrate the opening, customers who open a new savings account at the Grant Avenue branch during June will {{141}} a $50 bonus. {{142}}' }
      ]
    },
    translation: 'Harbor 銀行很高興宣布，最新分行將於 6 月 3 日在 Grant 大道 220 號開幕。該分行將提供其他據點的完整服務，包括個人貸款和理財規劃。此外，該分行將延長營業時間，平日營業到晚上 7 點。為慶祝開幕，6 月期間在 Grant 大道分行開立新儲蓄帳戶的客戶將獲得 50 美元獎金。親切的行員會在現場協助您辦理。',
    vocab: [['branch', 'n.', '分行'], ['the full range of', 'phr.', '全套的；完整的'], ['personal loan', 'n.', '個人貸款', 'personal loans'], ['financial planning', 'n.', '理財規劃'], ['extended hours', 'n.', '延長的營業時間'], ['savings account', 'n.', '儲蓄帳戶'], ['on hand', 'phr.', '在場（可提供協助）']]
  }, [
    [139, 'Choose the best answer for blank 139.', ['offering', 'offers', 'offered', 'offer'], 'D', '第 139 格最適合填入？', ['提供（-ing）', '提供（第三人稱）', '提供了', '提供（原形）'], ['The branch will'], ['139'], '助動詞 will 後面接原形動詞。'],
    [140, 'Choose the best answer for blank 140.', ['However', 'In addition', 'Otherwise', 'Instead'], 'B', '第 140 格最適合填入？', ['然而', '此外', '否則', '反而'], ['it will feature extended hours'], ['140'], '前面講服務完整，後面再加一個優點（延長營業），用 In addition（此外）。'],
    [141, 'Choose the best answer for blank 141.', ['receive', 'deliver', 'accept', 'award'], 'A', '第 141 格最適合填入？', ['獲得', '遞送', '接受', '頒發'], ['customers who open a new savings account'], ['141'], '主詞是顧客，顧客「獲得」獎金用 receive；award 的主詞應該是銀行。'],
    [142, 'Choose the best sentence for blank 142.', ['The branch on Grant Avenue closed last year.', 'Personal loans are no longer available.', 'Friendly staff will be on hand to help you get started.', 'Our main office has moved to a new city.'], 'C', '第 142 格最適合填入哪一句？', ['Grant 大道的分行去年關閉了。', '個人貸款已不再提供。', '親切的行員會在現場協助您。', '總行已搬到別的城市。'], ['To celebrate the opening'], ['142'], '開幕公告的結尾接「行員會協助您」最自然。(A)(B) 與前文矛盾。']
  ]);

  T.set('R', 'Part 6', 'R-143-146', {
    passage: {
      title: 'Brightpath Employees Give Back',
      blocks: [
        { type: 'p', text: 'Local software company Brightpath has launched a volunteer program that gives every employee two paid days off each year to {{143}} community projects. Since the program began in January, staff members have helped clean up city parks, tutored high school students, and {{144}} meals at a local shelter.' },
        { type: 'p', text: '"We wanted our employees to feel connected to the community," said CEO Laura Kim. {{145}} Other businesses in the area have expressed interest in {{146}} similar programs.' }
      ]
    },
    translation: '本地軟體公司 Brightpath 推出一項志工計畫，讓每位員工每年有兩天帶薪假去支援社區計畫。計畫從一月開始以來，員工已協助清掃市立公園、為高中生課業輔導，並在當地收容所供餐。執行長 Laura Kim 說：「我們希望員工感受到與社區的連結。」員工的反應非常正面。當地其他企業也表示有興趣推動類似的計畫。',
    vocab: [['launch', 'v.', '推出', 'launched'], ['paid day off', 'n.', '帶薪假', 'paid days off'], ['community project', 'n.', '社區計畫', 'community projects'], ['tutor', 'v.', '當家教；輔導', 'tutored'], ['shelter', 'n.', '收容所'], ['connected to', 'phr.', '與…有連結'], ['express interest in', 'phr.', '表示有興趣', 'expressed interest in']]
  }, [
    [143, 'Choose the best answer for blank 143.', ['support', 'supporting', 'supportive', 'supporter'], 'A', '第 143 格最適合填入？', ['支援（原形）', '支援（-ing）', '支持的', '支持者'], ['two paid days off each year to'], ['143'], '表目的的 to＋原形動詞。'],
    [144, 'Choose the best answer for blank 144.', ['serve', 'serving', 'served', 'serves'], 'C', '第 144 格最適合填入？', ['供應（原形）', '供應（-ing）', '供應（p.p.）', '供應（第三人稱）'], ['have helped clean up city parks, tutored high school students, and'], ['144'], '平行結構：have helped…, tutored…, and served…，都是過去分詞。'],
    [145, 'Choose the best sentence for blank 145.', ["The company's software is sold worldwide.", 'The response from employees has been very positive.', 'The city park will close next month.', 'Volunteers must pay a registration fee.'], 'B', '第 145 格最適合填入哪一句？', ['公司的軟體行銷全球。', '員工的反應非常正面。', '市立公園下個月關閉。', '志工必須付報名費。'], ['We wanted our employees to feel connected to the community'], ['145'], '執行長談計畫目的，接著說員工反應正面，再接其他企業有興趣，邏輯連貫。'],
    [146, 'Choose the best answer for blank 146.', ['create', 'created', 'creates', 'creating'], 'D', '第 146 格最適合填入？', ['建立（原形）', '建立了', '建立（第三人稱）', '建立（動名詞）'], ['have expressed interest in'], ['146'], '介系詞 in 後面接動名詞。']
  ]);
})();
