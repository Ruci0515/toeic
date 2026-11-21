/* ==========================================================================
   BESTEP 內建核心單字庫 + 線上免費辭典備援
   --------------------------------------------------------------------------
   資料格式（每筆）：
      "word": ["/IPA/", "詞性.|中文語意1；中文語意2", "詞性.|中文語意1；..."]
   - 第一個元素為音標（可空字串）
   - 其後每個元素以「詞性.|」開頭，語意以全形分號「；」分隔
   - 同一個字可有多個詞性，每個詞性可有多個語意
   - 片語、專有名詞與時態變化由 app 端 lemma 規則與線上 API 補足
   ========================================================================== */

window.BESTEP_DICTIONARY = {
  /* ---------- A ---------- */
  "abandon": ["/əˈbændən/", "v.|放棄；拋棄；遺棄", "n.|放任；無拘無束"],
  "ability": ["/əˈbɪləti/", "n.|能力；才能；本領"],
  "absent": ["/ˈæbsənt/", "adj.|缺席的；不在的；心不在焉的"],
  "academic": ["/ˌækəˈdemɪk/", "adj.|學術的；學校的；純理論的", "n.|大學教師；學者"],
  "accept": ["/əkˈsept/", "v.|接受；同意；承認"],
  "access": ["/ˈækses/", "n.|使用權；通道；接近的機會", "v.|存取；進入；取得"],
  "accident": ["/ˈæksɪdənt/", "n.|意外；事故；偶然"],
  "according": ["/əˈkɔːrdɪŋ/", "adv.|根據；依照（according to）"],
  "account": ["/əˈkaʊnt/", "n.|帳戶；說明；報導", "v.|解釋；佔（比例）"],
  "achieve": ["/əˈtʃiːv/", "v.|達成；實現；取得"],
  "acknowledge": ["/əkˈnɑːlɪdʒ/", "v.|承認；致謝；確認收到"],
  "acquire": ["/əˈkwaɪər/", "v.|獲得；取得；習得"],
  "adapt": ["/əˈdæpt/", "v.|適應；改編；調整"],
  "adequate": ["/ˈædəkwət/", "adj.|足夠的；適當的；尚可的"],
  "adjust": ["/əˈdʒʌst/", "v.|調整；適應；校正"],
  "administration": ["/ədˌmɪnɪˈstreɪʃn/", "n.|行政；管理；政府"],
  "admit": ["/ədˈmɪt/", "v.|承認；准許進入；收治"],
  "adopt": ["/əˈdɑːpt/", "v.|採用；收養；採取"],
  "advance": ["/ədˈvæns/", "v.|前進；促進；提前", "n.|進步；預付款", "adj.|預先的；先進的"],
  "advantage": ["/ədˈvæntɪdʒ/", "n.|優勢；優點；有利條件"],
  "affect": ["/əˈfekt/", "v.|影響；感動；侵襲"],
  "afford": ["/əˈfɔːrd/", "v.|負擔得起；提供；冒險做"],
  "agency": ["/ˈeɪdʒənsi/", "n.|機構；代理公司；作用"],
  "agenda": ["/əˈdʒendə/", "n.|議程；待辦事項；目的"],
  "agriculture": ["/ˈæɡrɪkʌltʃər/", "n.|農業；農藝"],
  "alarm": ["/əˈlɑːrm/", "n.|警報；驚慌；鬧鐘", "v.|使驚慌；警示"],
  "alternative": ["/ɔːlˈtɜːrnətɪv/", "n.|替代方案；選擇", "adj.|替代的；另類的"],
  "analyze": ["/ˈænəlaɪz/", "v.|分析；解析；檢討"],
  "ancient": ["/ˈeɪnʃənt/", "adj.|古代的；古老的；極舊的"],
  "announce": ["/əˈnaʊns/", "v.|宣布；公告；播報"],
  "annual": ["/ˈænjuəl/", "adj.|每年的；年度的", "n.|年刊；一年生植物"],
  "anticipate": ["/ænˈtɪsɪpeɪt/", "v.|預期；預料；提前準備"],
  "anxiety": ["/æŋˈzaɪəti/", "n.|焦慮；擔心；渴望"],
  "apparent": ["/əˈpærənt/", "adj.|明顯的；表面上的；顯而易見的"],
  "appeal": ["/əˈpiːl/", "v.|吸引；呼籲；上訴", "n.|吸引力；呼籲；上訴"],
  "appliance": ["/əˈplaɪəns/", "n.|家電；器具；裝置"],
  "apply": ["/əˈplaɪ/", "v.|申請；應用；塗抹；適用"],
  "appoint": ["/əˈpɔɪnt/", "v.|任命；指定；約定"],
  "appreciate": ["/əˈpriːʃieɪt/", "v.|感激；欣賞；理解；增值"],
  "approach": ["/əˈproʊtʃ/", "v.|接近；著手處理", "n.|方法；途徑；接近"],
  "appropriate": ["/əˈproʊpriət/", "adj.|適當的；合適的", "v.|挪用；撥款"],
  "approve": ["/əˈpruːv/", "v.|批准；贊成；認可"],
  "arise": ["/əˈraɪz/", "v.|出現；產生；起因於"],
  "artificial": ["/ˌɑːrtɪˈfɪʃl/", "adj.|人工的；人造的；虛假的"],
  "aspect": ["/ˈæspekt/", "n.|方面；層面；外觀"],
  "assess": ["/əˈses/", "v.|評估；評定；估算"],
  "assist": ["/əˈsɪst/", "v.|協助；幫助", "n.|助攻；協助"],
  "associate": ["/əˈsoʊsieɪt/", "v.|聯想；結交；關聯", "n.|同事；夥伴", "adj.|副的；聯合的"],
  "assume": ["/əˈsuːm/", "v.|假設；承擔；就任"],
  "assure": ["/əˈʃʊr/", "v.|保證；使確信；確保"],
  "atmosphere": ["/ˈætməsfɪr/", "n.|大氣；氣氛；環境"],
  "attach": ["/əˈtætʃ/", "v.|附上；繫上；使依戀"],
  "attempt": ["/əˈtempt/", "v.|嘗試；企圖", "n.|嘗試；企圖"],
  "attend": ["/əˈtend/", "v.|出席；參加；照料"],
  "attitude": ["/ˈætɪtuːd/", "n.|態度；看法；姿態"],
  "attract": ["/əˈtrækt/", "v.|吸引；引起；招引"],
  "audience": ["/ˈɔːdiəns/", "n.|觀眾；聽眾；讀者"],
  "authority": ["/əˈθɔːrəti/", "n.|權威；當局；權限"],
  "available": ["/əˈveɪləbl/", "adj.|可用的；有空的；可獲得的"],
  "avoid": ["/əˈvɔɪd/", "v.|避免；避開；逃避"],
  "aware": ["/əˈwer/", "adj.|察覺的；知道的；有意識的"],

  /* ---------- B ---------- */
  "barrier": ["/ˈbæriər/", "n.|障礙；屏障；關卡"],
  "benefit": ["/ˈbenɪfɪt/", "n.|利益；好處；福利", "v.|有益於；受益"],
  "bias": ["/ˈbaɪəs/", "n.|偏見；偏差；傾向", "v.|使有偏見"],
  "bond": ["/bɑːnd/", "n.|連結；債券；契約", "v.|建立關係；黏合"],
  "boost": ["/buːst/", "v.|提升；促進；推高", "n.|提升；推動"],
  "brief": ["/briːf/", "adj.|簡短的；短暫的", "n.|摘要；簡報", "v.|簡報；指示"],
  "budget": ["/ˈbʌdʒɪt/", "n.|預算；經費", "v.|編列預算", "adj.|低價的"],
  "burden": ["/ˈbɜːrdn/", "n.|負擔；重擔", "v.|使負擔；煩擾"],

  /* ---------- C ---------- */
  "campaign": ["/kæmˈpeɪn/", "n.|活動；競選；戰役", "v.|從事活動；參選"],
  "capable": ["/ˈkeɪpəbl/", "adj.|有能力的；能幹的；可勝任的"],
  "capacity": ["/kəˈpæsəti/", "n.|容量；能力；產能；身分"],
  "career": ["/kəˈrɪr/", "n.|職業；生涯；事業", "adj.|職業的"],
  "category": ["/ˈkætəɡɔːri/", "n.|類別；範疇；種類"],
  "cease": ["/siːs/", "v.|停止；終止；結束"],
  "challenge": ["/ˈtʃælɪndʒ/", "n.|挑戰；質疑；艱難任務", "v.|挑戰；質疑；考驗"],
  "characteristic": ["/ˌkærəktəˈrɪstɪk/", "n.|特徵；特性", "adj.|典型的；特有的"],
  "charge": ["/tʃɑːrdʒ/", "v.|收費；指控；充電；負責", "n.|費用；指控；電荷；責任"],
  "chart": ["/tʃɑːrt/", "n.|圖表；海圖", "v.|繪製圖表；記錄"],
  "circumstance": ["/ˈsɜːrkəmstæns/", "n.|情況；環境；境遇"],
  "cite": ["/saɪt/", "v.|引用；引證；傳喚"],
  "civil": ["/ˈsɪvl/", "adj.|公民的；民事的；文明的"],
  "claim": ["/kleɪm/", "v.|主張；聲稱；索取", "n.|主張；索賠；權利"],
  "classify": ["/ˈklæsɪfaɪ/", "v.|分類；歸類；將…列為機密"],
  "collapse": ["/kəˈlæps/", "v.|倒塌；崩潰；癱倒", "n.|倒塌；崩潰"],
  "colleague": ["/ˈkɑːliːɡ/", "n.|同事；同僚"],
  "combine": ["/kəmˈbaɪn/", "v.|結合；合併；兼具", "n.|聯合企業；聯合收割機"],
  "comment": ["/ˈkɑːment/", "n.|評論；意見", "v.|評論；發表意見"],
  "commercial": ["/kəˈmɜːrʃl/", "adj.|商業的；營利的", "n.|廣告"],
  "commit": ["/kəˈmɪt/", "v.|承諾；投入；犯（罪）；委託"],
  "communicate": ["/kəˈmjuːnɪkeɪt/", "v.|溝通；傳達；交流"],
  "community": ["/kəˈmjuːnəti/", "n.|社區；社群；共同體"],
  "compare": ["/kəmˈper/", "v.|比較；比擬；對照"],
  "compete": ["/kəmˈpiːt/", "v.|競爭；比賽；參賽"],
  "complain": ["/kəmˈpleɪn/", "v.|抱怨；投訴；控訴"],
  "complex": ["/ˈkɑːmpleks/", "adj.|複雜的；複合的", "n.|綜合體；情結；建築群"],
  "concentrate": ["/ˈkɑːnsntreɪt/", "v.|專注；集中；濃縮", "n.|濃縮物"],
  "conclude": ["/kənˈkluːd/", "v.|得出結論；結束；締結"],
  "conduct": ["/kənˈdʌkt/", "v.|進行；指揮；引導；傳導", "n.|行為；實施；指揮"],
  "confirm": ["/kənˈfɜːrm/", "v.|確認；證實；批准"],
  "conflict": ["/ˈkɑːnflɪkt/", "n.|衝突；矛盾；爭執", "v.|衝突；抵觸"],
  "confront": ["/kənˈfrʌnt/", "v.|面對；對抗；使面臨"],
  "consequence": ["/ˈkɑːnsɪkwens/", "n.|後果；結果；重要性"],
  "conserve": ["/kənˈsɜːrv/", "v.|保存；節約；保護"],
  "consider": ["/kənˈsɪdər/", "v.|考慮；認為；體諒"],
  "consist": ["/kənˈsɪst/", "v.|由…組成；在於；一致"],
  "constant": ["/ˈkɑːnstənt/", "adj.|持續的；恆定的；忠誠的", "n.|常數；恆量"],
  "construct": ["/kənˈstrʌkt/", "v.|建造；建構；構思", "n.|構思；建造物"],
  "consult": ["/kənˈsʌlt/", "v.|諮詢；請教；查閱；商議"],
  "consume": ["/kənˈsuːm/", "v.|消耗；消費；吃喝；吞噬"],
  "contain": ["/kənˈteɪn/", "v.|包含；容納；控制；抑制"],
  "contemporary": ["/kənˈtempəreri/", "adj.|當代的；同時代的", "n.|同代人"],
  "content": ["/ˈkɑːntent/", "n.|內容；目錄；含量", "adj.|滿足的；願意接受的"],
  "context": ["/ˈkɑːntekst/", "n.|上下文；背景；脈絡"],
  "contract": ["/ˈkɑːntrækt/", "n.|合約；契約", "v.|收縮；感染；訂約"],
  "contrast": ["/ˈkɑːntræst/", "n.|對比；差異；反差", "v.|對照；形成對比"],
  "contribute": ["/kənˈtrɪbjuːt/", "v.|貢獻；捐贈；促成；投稿"],
  "convenient": ["/kənˈviːniənt/", "adj.|方便的；便利的；就近的"],
  "conventional": ["/kənˈvenʃənl/", "adj.|傳統的；常規的；慣例的"],
  "convert": ["/kənˈvɜːrt/", "v.|轉換；改變；使皈依", "n.|皈依者；換算物"],
  "convince": ["/kənˈvɪns/", "v.|說服；使確信；使信服"],
  "cooperate": ["/koʊˈɑːpəreɪt/", "v.|合作；配合；協力"],
  "coordinate": ["/koʊˈɔːrdɪneɪt/", "v.|協調；配合", "n.|座標", "adj.|同等的；協調的"],
  "core": ["/kɔːr/", "n.|核心；果核；要點", "adj.|核心的；主要的", "v.|去核"],
  "corporate": ["/ˈkɔːrpərət/", "adj.|公司的；企業的；法人的；共同的"],
  "correspond": ["/ˌkɔːrəˈspɑːnd/", "v.|符合；相當；通信"],
  "crucial": ["/ˈkruːʃl/", "adj.|關鍵的；至關重要的；決定性的"],
  "cultivate": ["/ˈkʌltɪveɪt/", "v.|培養；耕作；結交"],
  "curriculum": ["/kəˈrɪkjələm/", "n.|課程；全部課程；教學大綱"],
  "customer": ["/ˈkʌstəmər/", "n.|顧客；客戶；買主"],

  /* ---------- D ---------- */
  "decline": ["/dɪˈklaɪn/", "v.|下降；拒絕；衰退", "n.|下降；衰退；減少"],
  "dedicate": ["/ˈdedɪkeɪt/", "v.|奉獻；致力於；題獻"],
  "defect": ["/ˈdiːfekt/", "n.|缺陷；瑕疵；缺點", "v.|叛逃；投靠"],
  "define": ["/dɪˈfaɪn/", "v.|定義；界定；闡明"],
  "definite": ["/ˈdefɪnət/", "adj.|明確的；肯定的；確定的"],
  "delay": ["/dɪˈleɪ/", "v.|延遲；拖延；耽誤", "n.|延誤；延遲"],
  "deliver": ["/dɪˈlɪvər/", "v.|遞送；傳達；交付；發表"],
  "demand": ["/dɪˈmænd/", "n.|需求；要求；需要", "v.|要求；需要；詢問"],
  "demonstrate": ["/ˈdemənstreɪt/", "v.|證明；示範；示威；顯示"],
  "deny": ["/dɪˈnaɪ/", "v.|否認；拒絕；剝奪"],
  "depend": ["/dɪˈpend/", "v.|依賴；取決於；信賴"],
  "derive": ["/dɪˈraɪv/", "v.|獲得；源自；推導"],
  "describe": ["/dɪˈskraɪb/", "v.|描述；形容；描繪"],
  "deserve": ["/dɪˈzɜːrv/", "v.|值得；應得；應受"],
  "despite": ["/dɪˈspaɪt/", "prep.|儘管；不管；雖然"],
  "detect": ["/dɪˈtekt/", "v.|偵測；察覺；發現"],
  "determine": ["/dɪˈtɜːrmɪn/", "v.|決定；確定；判定；下決心"],
  "develop": ["/dɪˈveləp/", "v.|發展；開發；培養；顯影"],
  "device": ["/dɪˈvaɪs/", "n.|裝置；設備；手段；策略"],
  "devote": ["/dɪˈvoʊt/", "v.|奉獻；致力於；專心於"],
  "differ": ["/ˈdɪfər/", "v.|不同；相異；意見不合"],
  "diminish": ["/dɪˈmɪnɪʃ/", "v.|減少；降低；貶低"],
  "discipline": ["/ˈdɪsəplɪn/", "n.|紀律；訓練；學科", "v.|訓練；懲罰；約束"],
  "discover": ["/dɪˈskʌvər/", "v.|發現；發覺；了解到"],
  "discriminate": ["/dɪˈskrɪmɪneɪt/", "v.|歧視；區別；辨別"],
  "dismiss": ["/dɪsˈmɪs/", "v.|解僱；解散；駁回；不予考慮"],
  "display": ["/dɪˈspleɪ/", "v.|展示；陳列；顯示", "n.|展示；顯示器；陳列"],
  "dispute": ["/dɪˈspjuːt/", "n.|爭論；糾紛；異議", "v.|爭論；質疑；爭奪"],
  "distinct": ["/dɪˈstɪŋkt/", "adj.|明顯的；截然不同的；清楚的"],
  "distinguish": ["/dɪˈstɪŋɡwɪʃ/", "v.|區分；辨別；使傑出"],
  "distribute": ["/dɪˈstrɪbjuːt/", "v.|分配；分發；散佈"],
  "diverse": ["/daɪˈvɜːrs/", "adj.|多樣的；不同的；多元的"],
  "document": ["/ˈdɑːkjument/", "n.|文件；文獻；紀錄", "v.|記錄；證明"],
  "domestic": ["/dəˈmestɪk/", "adj.|國內的；家庭的；馴養的", "n.|家庭糾紛；家僕"],
  "dominant": ["/ˈdɑːmɪnənt/", "adj.|主導的；優勢的；顯性的"],
  "donate": ["/ˈdoʊneɪt/", "v.|捐贈；捐獻；捐血"],
  "drawback": ["/ˈdrɔːbæk/", "n.|缺點；不利條件；障礙"],
  "dramatic": ["/drəˈmætɪk/", "adj.|戲劇性的；巨大的；引人注目的"],
  "duration": ["/duˈreɪʃn/", "n.|持續時間；期間；時長"],

  /* ---------- E ---------- */
  "economy": ["/ɪˈkɑːnəmi/", "n.|經濟；節約；經濟體系"],
  "efficient": ["/ɪˈfɪʃnt/", "adj.|有效率的；高效率的；能幹的"],
  "elaborate": ["/ɪˈlæbərət/", "adj.|精心製作的；複雜的", "v.|詳細說明；闡述"],
  "element": ["/ˈelɪmənt/", "n.|要素；元素；成分；惡劣天氣"],
  "eliminate": ["/ɪˈlɪmɪneɪt/", "v.|消除；淘汰；排除"],
  "emerge": ["/ɪˈmɜːrdʒ/", "v.|出現；浮現；脫穎而出"],
  "emphasis": ["/ˈemfəsɪs/", "n.|強調；重點；著重"],
  "employ": ["/ɪmˈplɔɪ/", "v.|僱用；使用；運用", "n.|受僱；使用"],
  "enable": ["/ɪˈneɪbl/", "v.|使能夠；使可行；啟用"],
  "encounter": ["/ɪnˈkaʊntər/", "v.|遇到；遭遇；意外碰見", "n.|遭遇；邂逅；衝突"],
  "encourage": ["/ɪnˈkɜːrɪdʒ/", "v.|鼓勵；促進；助長"],
  "endure": ["/ɪnˈdʊr/", "v.|忍受；忍耐；持續"],
  "enhance": ["/ɪnˈhæns/", "v.|提升；增強；改善"],
  "enormous": ["/ɪˈnɔːrməs/", "adj.|巨大的；龐大的；極大的"],
  "ensure": ["/ɪnˈʃʊr/", "v.|確保；保證；擔保"],
  "enterprise": ["/ˈentərpraɪz/", "n.|企業；事業；進取心"],
  "entire": ["/ɪnˈtaɪər/", "adj.|整個的；全部的；完整的"],
  "environment": ["/ɪnˈvaɪrənmənt/", "n.|環境；周圍狀況；自然環境"],
  "equal": ["/ˈiːkwəl/", "adj.|相等的；平等的；勝任的", "v.|等於；比得上", "n.|同等者"],
  "equip": ["/ɪˈkwɪp/", "v.|裝備；配備；使有能力"],
  "equivalent": ["/ɪˈkwɪvələnt/", "adj.|相等的；等效的", "n.|對等物；等值"],
  "essential": ["/ɪˈsenʃl/", "adj.|必要的；本質的；精華的", "n.|必需品；要素"],
  "establish": ["/ɪˈstæblɪʃ/", "v.|建立；確立；創辦；證實"],
  "estimate": ["/ˈestɪmeɪt/", "v.|估計；估算；評價", "n.|估計；估價；評價"],
  "evaluate": ["/ɪˈvæljueɪt/", "v.|評估；評價；估價"],
  "eventually": ["/ɪˈventʃuəli/", "adv.|最終；終於；後來"],
  "evidence": ["/ˈevɪdəns/", "n.|證據；跡象；證明", "v.|證明；顯示"],
  "evolve": ["/ɪˈvɑːlv/", "v.|演化；發展；逐步形成"],
  "exaggerate": ["/ɪɡˈzædʒəreɪt/", "v.|誇大；誇張；言過其實"],
  "exceed": ["/ɪkˈsiːd/", "v.|超過；超越；勝過"],
  "exchange": ["/ɪksˈtʃeɪndʒ/", "v.|交換；兌換；交流", "n.|交換；匯率；交易所"],
  "exclude": ["/ɪkˈskluːd/", "v.|排除；不包括；拒絕"],
  "exhibit": ["/ɪɡˈzɪbɪt/", "v.|展出；展示；表現", "n.|展品；展覽；證物"],
  "expand": ["/ɪkˈspænd/", "v.|擴張；擴大；詳述"],
  "expect": ["/ɪkˈspekt/", "v.|預期；期待；要求"],
  "expense": ["/ɪkˈspens/", "n.|費用；開支；代價"],
  "experiment": ["/ɪkˈsperɪmənt/", "n.|實驗；試驗", "v.|進行實驗；嘗試"],
  "expert": ["/ˈekspɜːrt/", "n.|專家；能手", "adj.|專家的；熟練的"],
  "explain": ["/ɪkˈspleɪn/", "v.|解釋；說明；辯解"],
  "explore": ["/ɪkˈsplɔːr/", "v.|探索；探勘；研究"],
  "expose": ["/ɪkˈspoʊz/", "v.|暴露；揭露；使接觸"],
  "extend": ["/ɪkˈstend/", "v.|延伸；延長；擴展；提供"],
  "external": ["/ɪkˈstɜːrnl/", "adj.|外部的；外在的；外國的", "n.|外部；外觀"],
  "extract": ["/ɪkˈstrækt/", "v.|提取；萃取；摘錄；拔出", "n.|萃取物；摘錄"],

  /* ---------- F ---------- */
  "facility": ["/fəˈsɪləti/", "n.|設施；設備；能力；便利"],
  "factor": ["/ˈfæktər/", "n.|因素；要素；因子", "v.|將…分解；考慮"],
  "feature": ["/ˈfiːtʃər/", "n.|特徵；特色；專題報導", "v.|以…為特色；主演"],
  "federal": ["/ˈfedərəl/", "adj.|聯邦的；聯邦制的"],
  "fee": ["/fiː/", "n.|費用；報酬；小費"],
  "figure": ["/ˈfɪɡjər/", "n.|數字；人物；圖形；身材", "v.|認為；計算；想通"],
  "finance": ["/ˈfaɪnæns/", "n.|財務；金融；資金", "v.|融資；提供資金"],
  "flexible": ["/ˈfleksəbl/", "adj.|有彈性的；靈活的；可彎曲的"],
  "focus": ["/ˈfoʊkəs/", "n.|焦點；重點；焦距", "v.|集中；聚焦；對焦"],
  "forecast": ["/ˈfɔːrkæst/", "n.|預測；預報", "v.|預測；預報"],
  "formal": ["/ˈfɔːrml/", "adj.|正式的；官方的；形式上的"],
  "former": ["/ˈfɔːrmər/", "adj.|以前的；前任的；前者的", "n.|前者"],
  "foster": ["/ˈfɔːstər/", "v.|促進；培養；收養", "adj.|寄養的"],
  "foundation": ["/faʊnˈdeɪʃn/", "n.|基礎；地基；基金會；建立"],
  "frequent": ["/ˈfriːkwənt/", "adj.|頻繁的；經常的", "v.|常去；常光顧"],
  "function": ["/ˈfʌŋkʃn/", "n.|功能；函數；職責；典禮", "v.|運作；發揮作用"],
  "fundamental": ["/ˌfʌndəˈmentl/", "adj.|基本的；根本的；基礎的", "n.|基本原則；基礎"],
  "funding": ["/ˈfʌndɪŋ/", "n.|資金；經費；資助"],

  /* ---------- G ---------- */
  "generate": ["/ˈdʒenəreɪt/", "v.|產生；發電；引起；生成"],
  "genuine": ["/ˈdʒenjuɪn/", "adj.|真正的；真誠的；非偽造的"],
  "global": ["/ˈɡloʊbl/", "adj.|全球的；整體的；全面的"],
  "gradual": ["/ˈɡrædʒuəl/", "adj.|逐漸的；逐步的；平緩的"],
  "grant": ["/ɡrænt/", "v.|授予；同意；承認", "n.|補助金；撥款"],
  "guarantee": ["/ˌɡærənˈtiː/", "v.|保證；擔保；確保", "n.|保證；保證金；保修"],
  "guideline": ["/ˈɡaɪdlaɪn/", "n.|指導原則；準則；方針"],

  /* ---------- H ---------- */
  "habit": ["/ˈhæbɪt/", "n.|習慣；習性；慣例"],
  "handle": ["/ˈhændl/", "v.|處理；操作；應付", "n.|把手；柄"],
  "harm": ["/hɑːrm/", "n.|傷害；損害", "v.|傷害；損害"],
  "headline": ["/ˈhedlaɪn/", "n.|頭條；標題", "v.|以…為標題；主演"],
  "hesitate": ["/ˈhezɪteɪt/", "v.|猶豫；躊躇；不情願"],
  "highlight": ["/ˈhaɪlaɪt/", "v.|強調；突出；標記", "n.|亮點；精華；高光"],
  "hire": ["/ˈhaɪər/", "v.|僱用；租用", "n.|僱用；租金"],
  "horizon": ["/həˈraɪzn/", "n.|地平線；眼界；範圍"],
  "household": ["/ˈhaʊshoʊld/", "n.|家庭；一家人", "adj.|家庭的；家用的"],
  "humid": ["/ˈhjuːmɪd/", "adj.|潮濕的；溼潤的"],
  "hypothesis": ["/haɪˈpɑːθəsɪs/", "n.|假設；假說；前提"],

  /* ---------- I ---------- */
  "identify": ["/aɪˈdentɪfaɪ/", "v.|辨識；確認；認同"],
  "ignore": ["/ɪɡˈnɔːr/", "v.|忽視；不理會；忽略"],
  "illustrate": ["/ˈɪləstreɪt/", "v.|說明；舉例說明；為…插圖"],
  "impact": ["/ˈɪmpækt/", "n.|影響；衝擊；撞擊", "v.|影響；衝擊；撞擊"],
  "implement": ["/ˈɪmplɪment/", "v.|實施；執行；落實", "n.|工具；器具"],
  "imply": ["/ɪmˈplaɪ/", "v.|暗示；意味著；必然包含"],
  "impose": ["/ɪmˈpoʊz/", "v.|強加；征收；強迫接受"],
  "improve": ["/ɪmˈpruːv/", "v.|改善；提高；增進"],
  "incentive": ["/ɪnˈsentɪv/", "n.|誘因；獎勵；動機", "adj.|激勵的；獎勵的"],
  "incident": ["/ˈɪnsɪdənt/", "n.|事件；事故；插曲"],
  "indicate": ["/ˈɪndɪkeɪt/", "v.|指出；顯示；暗示"],
  "individual": ["/ˌɪndɪˈvɪdʒuəl/", "n.|個人；獨立個體", "adj.|個別的；獨特的；個人的"],
  "industry": ["/ˈɪndəstri/", "n.|產業；工業；勤勉"],
  "inevitable": ["/ɪnˈevɪtəbl/", "adj.|不可避免的；必然發生的"],
  "infer": ["/ɪnˈfɜːr/", "v.|推論；推斷；暗示"],
  "influence": ["/ˈɪnfluəns/", "n.|影響；影響力；勢力", "v.|影響；左右"],
  "inform": ["/ɪnˈfɔːrm/", "v.|通知；告知；影響"],
  "initial": ["/ɪˈnɪʃl/", "adj.|最初的；開始的", "n.|首字母；姓名縮寫"],
  "initiative": ["/ɪˈnɪʃətɪv/", "n.|主動性；倡議；新方案", "adj.|自發的；初步的"],
  "injure": ["/ˈɪndʒər/", "v.|傷害；損傷；損害"],
  "innovate": ["/ˈɪnəveɪt/", "v.|創新；革新；引入新事物"],
  "insight": ["/ˈɪnsaɪt/", "n.|洞察力；深刻見解；領悟"],
  "inspect": ["/ɪnˈspekt/", "v.|檢查；視察；檢驗"],
  "install": ["/ɪnˈstɔːl/", "v.|安裝；設置；任命"],
  "instance": ["/ˈɪnstəns/", "n.|例子；實例；情況"],
  "institution": ["/ˌɪnstɪˈtuːʃn/", "n.|機構；制度；建立；習俗"],
  "instruct": ["/ɪnˈstrʌkt/", "v.|指示；教導；吩咐"],
  "insurance": ["/ɪnˈʃʊrəns/", "n.|保險；保險費；保障"],
  "integrate": ["/ˈɪntɪɡreɪt/", "v.|整合；融入；使一體化"],
  "integrity": ["/ɪnˈteɡrəti/", "n.|誠信；正直；完整性"],
  "intellectual": ["/ˌɪntəˈlektʃuəl/", "adj.|智力的；知識分子的", "n.|知識分子"],
  "intend": ["/ɪnˈtend/", "v.|打算；意圖；旨在"],
  "intense": ["/ɪnˈtens/", "adj.|強烈的；激烈的；密集的"],
  "interact": ["/ˌɪntərˈækt/", "v.|互動；相互作用；交流"],
  "interpret": ["/ɪnˈtɜːrprət/", "v.|解釋；口譯；理解"],
  "interrupt": ["/ˌɪntəˈrʌpt/", "v.|打斷；中斷；插話"],
  "invest": ["/ɪnˈvest/", "v.|投資；投入；購買"],
  "investigate": ["/ɪnˈvestɪɡeɪt/", "v.|調查；研究；偵查"],
  "involve": ["/ɪnˈvɑːlv/", "v.|涉及；包含；使參與"],
  "isolate": ["/ˈaɪsəleɪt/", "v.|隔離；孤立；分離"],
  "issue": ["/ˈɪʃuː/", "n.|問題；議題；期號", "v.|發行；發布；簽發"],

  /* ---------- J / L ---------- */
  "journal": ["/ˈdʒɜːrnl/", "n.|期刊；日誌；日記"],
  "justify": ["/ˈdʒʌstɪfaɪ/", "v.|證明…正當；辯護；對齊"],
  "label": ["/ˈleɪbl/", "n.|標籤；稱號；唱片公司", "v.|標示；貼標籤；歸類"],
  "labor": ["/ˈleɪbər/", "n.|勞動；勞工；分娩", "v.|勞動；努力；分娩"],
  "launch": ["/lɔːntʃ/", "v.|發射；推出；創辦", "n.|發射；推出；下水"],
  "legal": ["/ˈliːɡl/", "adj.|法律的；合法的；法定的"],
  "leisure": ["/ˈliːʒər/", "n.|閒暇；休閒", "adj.|休閒的；空閒的"],
  "license": ["/ˈlaɪsns/", "n.|執照；許可證；特許", "v.|授權；發許可證"],
  "likely": ["/ˈlaɪkli/", "adj.|可能的；有希望的", "adv.|很可能"],
  "limit": ["/ˈlɪmɪt/", "n.|限制；限度；界限", "v.|限制；限定"],
  "link": ["/lɪŋk/", "n.|連結；關係；環節", "v.|連接；聯繫"],
  "literacy": ["/ˈlɪtərəsi/", "n.|識字能力；讀寫能力；素養"],
  "locate": ["/ˈloʊkeɪt/", "v.|定位；找到；位於"],
  "logical": ["/ˈlɑːdʒɪkl/", "adj.|合乎邏輯的；合理的；邏輯上的"],

  /* ---------- M ---------- */
  "maintain": ["/meɪnˈteɪn/", "v.|維持；保養；主張"],
  "major": ["/ˈmeɪdʒər/", "adj.|主要的；重大的", "n.|主修；少校", "v.|主修"],
  "manage": ["/ˈmænɪdʒ/", "v.|管理；設法做到；應付"],
  "manufacture": ["/ˌmænjuˈfæktʃər/", "v.|製造；生產；捏造", "n.|製造；產品"],
  "margin": ["/ˈmɑːrdʒɪn/", "n.|邊緣；利潤；差額；頁邊"],
  "massive": ["/ˈmæsɪv/", "adj.|巨大的；大量的；結實的"],
  "measure": ["/ˈmeʒər/", "v.|測量；衡量；設法", "n.|措施；尺寸；程度"],
  "mechanism": ["/ˈmekənɪzəm/", "n.|機制；機械裝置；方法"],
  "media": ["/ˈmiːdiə/", "n.|媒體；大眾傳播；媒介（medium 複數）"],
  "medical": ["/ˈmedɪkl/", "adj.|醫療的；醫學的", "n.|健康檢查"],
  "mental": ["/ˈmentl/", "adj.|心理的；精神的；智力的"],
  "method": ["/ˈmeθəd/", "n.|方法；條理；秩序"],
  "migrate": ["/ˈmaɪɡreɪt/", "v.|遷移；移居；洄游"],
  "mitigate": ["/ˈmɪtɪɡeɪt/", "v.|減輕；緩和；使緩解"],
  "modify": ["/ˈmɑːdɪfaɪ/", "v.|修改；調整；緩和"],
  "monitor": ["/ˈmɑːnɪtər/", "v.|監控；監測；觀察", "n.|螢幕；監測器；班長"],
  "motive": ["/ˈmoʊtɪv/", "n.|動機；目的", "adj.|發動的；動機的"],
  "mutual": ["/ˈmjuːtʃuəl/", "adj.|相互的；共同的；彼此的"],

  /* ---------- N / O ---------- */
  "narrative": ["/ˈnærətɪv/", "n.|敘述；故事；敘事", "adj.|敘事的；敘述的"],
  "negative": ["/ˈneɡətɪv/", "adj.|負面的；否定的；消極的", "n.|負面；底片；否定"],
  "negotiate": ["/nɪˈɡoʊʃieɪt/", "v.|談判；協商；順利通過"],
  "neutral": ["/ˈnuːtrəl/", "adj.|中立的；中性的；平淡的", "n.|中立者；空檔"],
  "notion": ["/ˈnoʊʃn/", "n.|概念；想法；觀念"],
  "novel": ["/ˈnɑːvl/", "n.|小說；長篇故事", "adj.|新穎的；新奇的"],
  "nutrition": ["/nuˈtrɪʃn/", "n.|營養；營養學；滋養"],
  "objective": ["/əbˈdʒektɪv/", "n.|目標；目的；物鏡", "adj.|客觀的；公正的"],
  "obtain": ["/əbˈteɪn/", "v.|獲得；取得；得到"],
  "obvious": ["/ˈɑːbviəs/", "adj.|明顯的；顯而易見的；平淡的"],
  "occupy": ["/ˈɑːkjupaɪ/", "v.|佔據；居住；使忙碌"],
  "occur": ["/əˈkɜːr/", "v.|發生；出現；想起"],
  "offer": ["/ˈɔːfər/", "v.|提供；提出；願意", "n.|提議；錄取通知；出價"],
  "operate": ["/ˈɑːpəreɪt/", "v.|運作；操作；經營；動手術"],
  "opportunity": ["/ˌɑːpərˈtuːnəti/", "n.|機會；時機；良機"],
  "oppose": ["/əˈpoʊz/", "v.|反對；抵抗；對立"],
  "option": ["/ˈɑːpʃn/", "n.|選項；選擇；選擇權"],
  "organize": ["/ˈɔːrɡənaɪz/", "v.|組織；安排；整理"],
  "origin": ["/ˈɔːrɪdʒɪn/", "n.|起源；來源；出身"],
  "outcome": ["/ˈaʊtkʌm/", "n.|結果；成果；後果"],
  "overcome": ["/ˌoʊvərˈkʌm/", "v.|克服；戰勝；壓倒"],
  "overlook": ["/ˌoʊvərˈlʊk/", "v.|忽略；俯瞰；寬恕"],

  /* ---------- P ---------- */
  "participate": ["/pɑːrˈtɪsɪpeɪt/", "v.|參加；參與；分享"],
  "particular": ["/pərˈtɪkjələr/", "adj.|特定的；特別的；講究的", "n.|細節；特點"],
  "passion": ["/ˈpæʃn/", "n.|熱情；激情；愛好"],
  "perceive": ["/pərˈsiːv/", "v.|察覺；感知；認為"],
  "perform": ["/pərˈfɔːrm/", "v.|執行；表演；表現；履行"],
  "permanent": ["/ˈpɜːrmənənt/", "adj.|永久的；長期的；固定的", "n.|燙髮"],
  "permit": ["/pərˈmɪt/", "v.|允許；准許；使成為可能", "n.|許可證；執照"],
  "persuade": ["/pərˈsweɪd/", "v.|說服；勸服；使相信"],
  "phenomenon": ["/fəˈnɑːmɪnən/", "n.|現象；奇觀；非凡的人"],
  "policy": ["/ˈpɑːləsi/", "n.|政策；方針；保險單"],
  "pollute": ["/pəˈluːt/", "v.|污染；弄髒；敗壞"],
  "portion": ["/ˈpɔːrʃn/", "n.|部分；份量；一客", "v.|分配；分發"],
  "positive": ["/ˈpɑːzətɪv/", "adj.|正面的；積極的；確定的；陽性的", "n.|正面；正數"],
  "possess": ["/pəˈzes/", "v.|擁有；具有；控制"],
  "potential": ["/pəˈtenʃl/", "adj.|潛在的；可能的", "n.|潛力；可能性；電位"],
  "practical": ["/ˈpræktɪkl/", "adj.|實際的；實用的；務實的"],
  "precise": ["/prɪˈsaɪs/", "adj.|精確的；準確的；嚴謹的"],
  "predict": ["/prɪˈdɪkt/", "v.|預測；預言；預報"],
  "prefer": ["/prɪˈfɜːr/", "v.|偏好；更喜歡；寧願"],
  "prejudice": ["/ˈpredʒudɪs/", "n.|偏見；成見；歧視", "v.|使有偏見；損害"],
  "preserve": ["/prɪˈzɜːrv/", "v.|保存；保護；維持", "n.|保護區；果醬"],
  "prevent": ["/prɪˈvent/", "v.|防止；阻止；預防"],
  "previous": ["/ˈpriːviəs/", "adj.|先前的；以前的；上一個的"],
  "priority": ["/praɪˈɔːrəti/", "n.|優先事項；優先權；重點"],
  "privilege": ["/ˈprɪvəlɪdʒ/", "n.|特權；優待；榮幸", "v.|給予特權"],
  "probable": ["/ˈprɑːbəbl/", "adj.|很可能的；大概的", "n.|很可能的事"],
  "proceed": ["/proʊˈsiːd/", "v.|繼續；進行；前往"],
  "process": ["/ˈprɑːses/", "n.|過程；程序；工序", "v.|處理；加工"],
  "produce": ["/prəˈduːs/", "v.|生產；製造；產生；出示", "n.|農產品"],
  "profession": ["/prəˈfeʃn/", "n.|職業；專業；同行"],
  "profit": ["/ˈprɑːfɪt/", "n.|利潤；收益；益處", "v.|獲利；得益"],
  "prohibit": ["/prəˈhɪbɪt/", "v.|禁止；阻止；不准"],
  "project": ["/ˈprɑːdʒekt/", "n.|專案；計畫；工程", "v.|投射；預計；展現"],
  "promote": ["/prəˈmoʊt/", "v.|促進；推廣；升遷；宣傳"],
  "prompt": ["/prɑːmpt/", "v.|促使；提醒；提示", "adj.|迅速的；即時的", "n.|提示；提詞"],
  "proof": ["/pruːf/", "n.|證據；證明；校樣", "adj.|防…的；耐…的"],
  "proper": ["/ˈprɑːpər/", "adj.|適當的；正確的；固有的"],
  "propose": ["/prəˈpoʊz/", "v.|提議；建議；求婚；打算"],
  "prospect": ["/ˈprɑːspekt/", "n.|前景；可能性；潛在客戶", "v.|勘探；尋找"],
  "protect": ["/prəˈtekt/", "v.|保護；防護；保衛"],
  "prove": ["/pruːv/", "v.|證明；證實；結果是"],
  "provide": ["/prəˈvaɪd/", "v.|提供；供應；規定"],
  "publish": ["/ˈpʌblɪʃ/", "v.|出版；發表；公布"],
  "purchase": ["/ˈpɜːrtʃəs/", "v.|購買；採購", "n.|購買；購入物"],
  "pursue": ["/pərˈsuː/", "v.|追求；從事；追捕"],

  /* ---------- Q / R ---------- */
  "qualify": ["/ˈkwɑːlɪfaɪ/", "v.|取得資格；使合格；限定"],
  "quality": ["/ˈkwɑːləti/", "n.|品質；質量；特質", "adj.|優質的"],
  "quantity": ["/ˈkwɑːntəti/", "n.|數量；量；大量"],
  "quote": ["/kwoʊt/", "v.|引用；報價；引述", "n.|引文；報價；報價單"],
  "range": ["/reɪndʒ/", "n.|範圍；系列；山脈", "v.|涵蓋；排列；變動"],
  "rapid": ["/ˈræpɪd/", "adj.|快速的；迅速的；急促的", "n.|急流"],
  "rare": ["/rer/", "adj.|稀有的；罕見的；半熟的"],
  "rate": ["/reɪt/", "n.|比率；速度；價格；等級", "v.|評價；評估；被列為"],
  "react": ["/riˈækt/", "v.|反應；回應；起化學反應"],
  "realistic": ["/ˌriːəˈlɪstɪk/", "adj.|現實的；寫實的；逼真的"],
  "reasonable": ["/ˈriːznəbl/", "adj.|合理的；公道的；尚可的"],
  "recall": ["/rɪˈkɔːl/", "v.|回憶；召回；收回", "n.|回憶；召回"],
  "receive": ["/rɪˈsiːv/", "v.|收到；接受；接待"],
  "recognize": ["/ˈrekəɡnaɪz/", "v.|認出；承認；賞識"],
  "recommend": ["/ˌrekəˈmend/", "v.|推薦；建議；介紹"],
  "recover": ["/rɪˈkʌvər/", "v.|恢復；康復；尋回"],
  "reduce": ["/rɪˈduːs/", "v.|減少；降低；縮小；歸納"],
  "refer": ["/rɪˈfɜːr/", "v.|提及；參考；轉介；指"],
  "reflect": ["/rɪˈflekt/", "v.|反映；反射；深思"],
  "reform": ["/rɪˈfɔːrm/", "v.|改革；改造；革新", "n.|改革；改良"],
  "refuse": ["/rɪˈfjuːz/", "v.|拒絕；不肯；不接受", "n.|垃圾；廢物"],
  "regard": ["/rɪˈɡɑːrd/", "v.|認為；看待；注視", "n.|尊重；問候；關注"],
  "region": ["/ˈriːdʒən/", "n.|地區；區域；範圍"],
  "register": ["/ˈredʒɪstər/", "v.|登記；註冊；表達", "n.|登記簿；註冊表；音域"],
  "regulate": ["/ˈreɡjuleɪt/", "v.|規範；管理；調節"],
  "reject": ["/rɪˈdʒekt/", "v.|拒絕；排斥；駁回", "n.|廢品；不合格者"],
  "relate": ["/rɪˈleɪt/", "v.|關聯；敘述；理解；交往"],
  "release": ["/rɪˈliːs/", "v.|釋放；發行；公布；放開", "n.|釋放；發行；版本"],
  "relevant": ["/ˈreləvənt/", "adj.|相關的；切題的；有意義的"],
  "reliable": ["/rɪˈlaɪəbl/", "adj.|可靠的；可信賴的；確實的"],
  "relieve": ["/rɪˈliːv/", "v.|減輕；緩解；解除；換班"],
  "remain": ["/rɪˈmeɪn/", "v.|保持；仍然是；剩下；留下"],
  "remark": ["/rɪˈmɑːrk/", "n.|評論；言論；注意", "v.|評論；談論；注意到"],
  "remote": ["/rɪˈmoʊt/", "adj.|偏遠的；遙遠的；遠端的；渺茫的", "n.|遙控器"],
  "remove": ["/rɪˈmuːv/", "v.|移除；去除；開除；移動"],
  "repeat": ["/rɪˈpiːt/", "v.|重複；重說；再做", "n.|重複；重播"],
  "replace": ["/rɪˈpleɪs/", "v.|取代；替換；歸還"],
  "represent": ["/ˌreprɪˈzent/", "v.|代表；象徵；描繪；提出"],
  "require": ["/rɪˈkwaɪər/", "v.|需要；要求；規定"],
  "research": ["/rɪˈsɜːrtʃ/", "n.|研究；調查；學術研究", "v.|研究；調查"],
  "reserve": ["/rɪˈzɜːrv/", "v.|預訂；保留；儲備", "n.|儲備；保護區；預備"],
  "resident": ["/ˈrezɪdənt/", "n.|居民；住戶；住院醫師", "adj.|居住的；常駐的"],
  "resist": ["/rɪˈzɪst/", "v.|抵抗；抗拒；忍住"],
  "resolve": ["/rɪˈzɑːlv/", "v.|解決；決心；分解", "n.|決心；決議"],
  "resource": ["/ˈriːsɔːrs/", "n.|資源；資料；應變能力"],
  "respond": ["/rɪˈspɑːnd/", "v.|回應；反應；回答"],
  "restrict": ["/rɪˈstrɪkt/", "v.|限制；約束；管制"],
  "result": ["/rɪˈzʌlt/", "n.|結果；成績；成效", "v.|導致；產生"],
  "retain": ["/rɪˈteɪn/", "v.|保留；保持；聘請"],
  "reveal": ["/rɪˈviːl/", "v.|揭露；顯示；透露"],
  "revenue": ["/ˈrevənuː/", "n.|收入；營業額；稅收"],
  "review": ["/rɪˈvjuː/", "v.|檢討；複習；評論；審查", "n.|檢討；評論；複習"],
  "revise": ["/rɪˈvaɪz/", "v.|修改；修訂；複習"],
  "reward": ["/rɪˈwɔːrd/", "n.|獎勵；報酬；回報", "v.|獎勵；酬謝"],
  "rural": ["/ˈrʊrəl/", "adj.|鄉村的；農村的；田園的"],

  /* ---------- S ---------- */
  "sample": ["/ˈsæmpl/", "n.|樣本；樣品；試吃", "v.|取樣；品嘗；體驗"],
  "satisfy": ["/ˈsætɪsfaɪ/", "v.|滿足；使滿意；符合"],
  "scale": ["/skeɪl/", "n.|規模；比例；量表；鱗", "v.|攀登；縮放；衡量"],
  "scarce": ["/skers/", "adj.|稀少的；缺乏的；不足的"],
  "scenario": ["/səˈnærioʊ/", "n.|情境；劇情概要；可能的情況"],
  "schedule": ["/ˈskedʒuːl/", "n.|時間表；行程；班表", "v.|安排；排定；預定"],
  "scheme": ["/skiːm/", "n.|計畫；方案；陰謀", "v.|謀劃；密謀"],
  "scope": ["/skoʊp/", "n.|範圍；視野；機會", "v.|仔細查看；評估"],
  "secure": ["/sɪˈkjʊr/", "adj.|安全的；牢固的；有把握的", "v.|獲得；保護；固定"],
  "seek": ["/siːk/", "v.|尋求；尋找；試圖"],
  "select": ["/sɪˈlekt/", "v.|選擇；挑選", "adj.|精選的；優等的"],
  "senior": ["/ˈsiːniər/", "adj.|資深的；年長的；高年級的", "n.|長者；上司；畢業班學生"],
  "sense": ["/sens/", "n.|感覺；意義；判斷力", "v.|感覺到；意識到"],
  "separate": ["/ˈsepəreɪt/", "v.|分開；隔離；區分", "adj.|分開的；獨立的"],
  "sequence": ["/ˈsiːkwəns/", "n.|順序；序列；一連串", "v.|依序排列"],
  "series": ["/ˈsɪriːz/", "n.|系列；連續；叢書"],
  "severe": ["/sɪˈvɪr/", "adj.|嚴重的；嚴厲的；劇烈的"],
  "shift": ["/ʃɪft/", "v.|轉移；改變；換檔", "n.|轉變；輪班；班次"],
  "shortage": ["/ˈʃɔːrtɪdʒ/", "n.|短缺；不足；缺乏"],
  "significant": ["/sɪɡˈnɪfɪkənt/", "adj.|重要的；顯著的；有意義的"],
  "similar": ["/ˈsɪmələr/", "adj.|相似的；類似的；同類的"],
  "simplify": ["/ˈsɪmplɪfaɪ/", "v.|簡化；使單純；使易懂"],
  "site": ["/saɪt/", "n.|地點；網站；工地", "v.|設置；選址"],
  "situation": ["/ˌsɪtʃuˈeɪʃn/", "n.|情況；處境；職位"],
  "skill": ["/skɪl/", "n.|技能；技巧；本領"],
  "source": ["/sɔːrs/", "n.|來源；出處；消息人士", "v.|取得；採購"],
  "species": ["/ˈspiːʃiːz/", "n.|物種；種類（單複數同形）"],
  "specific": ["/spəˈsɪfɪk/", "adj.|特定的；具體的；明確的", "n.|細節；特徵"],
  "stable": ["/ˈsteɪbl/", "adj.|穩定的；牢固的；沉穩的", "n.|馬廄；一群"],
  "statistic": ["/stəˈtɪstɪk/", "n.|統計數字；統計量"],
  "status": ["/ˈsteɪtəs/", "n.|地位；狀態；身分"],
  "strategy": ["/ˈstrætədʒi/", "n.|策略；戰略；對策"],
  "stress": ["/stres/", "n.|壓力；重點；重音", "v.|強調；使緊張；加壓力"],
  "structure": ["/ˈstrʌktʃər/", "n.|結構；構造；建築物", "v.|建構；組織"],
  "struggle": ["/ˈstrʌɡl/", "v.|掙扎；奮鬥；努力", "n.|掙扎；奮鬥；難事"],
  "submit": ["/səbˈmɪt/", "v.|提交；屈服；主張"],
  "subscribe": ["/səbˈskraɪb/", "v.|訂閱；贊同；認購"],
  "subsidy": ["/ˈsʌbsədi/", "n.|補貼；津貼；補助金"],
  "substantial": ["/səbˈstænʃl/", "adj.|大量的；實質的；堅固的"],
  "substitute": ["/ˈsʌbstɪtuːt/", "n.|替代品；代替者", "v.|代替；替換"],
  "sufficient": ["/səˈfɪʃnt/", "adj.|足夠的；充分的"],
  "suggest": ["/səˈdʒest/", "v.|建議；暗示；顯示"],
  "summarize": ["/ˈsʌməraɪz/", "v.|總結；概述；摘要"],
  "supply": ["/səˈplaɪ/", "n.|供應；補給；供應量", "v.|供應；提供；補充"],
  "support": ["/səˈpɔːrt/", "v.|支持；支撐；供養；證實", "n.|支持；支撐物；支援"],
  "survey": ["/ˈsɜːrveɪ/", "n.|調查；問卷；概觀", "v.|調查；勘測；審視"],
  "survive": ["/sərˈvaɪv/", "v.|存活；倖存；挺過"],
  "suspect": ["/səˈspekt/", "v.|懷疑；猜想", "n.|嫌疑犯", "adj.|可疑的"],
  "sustain": ["/səˈsteɪn/", "v.|維持；支撐；遭受；持續"],

  /* ---------- T ---------- */
  "target": ["/ˈtɑːrɡɪt/", "n.|目標；靶子；對象", "v.|以…為目標；針對"],
  "task": ["/tæsk/", "n.|任務；工作；作業", "v.|交派任務；使費力"],
  "technique": ["/tekˈniːk/", "n.|技巧；技術；手法"],
  "technology": ["/tekˈnɑːlədʒi/", "n.|科技；技術；工藝"],
  "temporary": ["/ˈtempəreri/", "adj.|暫時的；臨時的；短暫的", "n.|臨時工"],
  "tend": ["/tend/", "v.|傾向；易於；照料"],
  "tense": ["/tens/", "adj.|緊張的；緊繃的", "n.|時態", "v.|拉緊；使緊張"],
  "terminate": ["/ˈtɜːrmɪneɪt/", "v.|終止；結束；解僱"],
  "theory": ["/ˈθɪri/", "n.|理論；學說；推測"],
  "threat": ["/θret/", "n.|威脅；恐嚇；危險"],
  "thrive": ["/θraɪv/", "v.|茁壯；興旺；蓬勃發展"],
  "tolerate": ["/ˈtɑːləreɪt/", "v.|容忍；忍受；容許"],
  "trace": ["/treɪs/", "v.|追蹤；追溯；描繪", "n.|痕跡；微量；蹤跡"],
  "tradition": ["/trəˈdɪʃn/", "n.|傳統；慣例；傳承"],
  "transfer": ["/trænsˈfɜːr/", "v.|轉移；轉讓；轉乘", "n.|轉移；轉乘；轉讓"],
  "transform": ["/trænsˈfɔːrm/", "v.|轉變；改造；變換"],
  "transition": ["/trænˈzɪʃn/", "n.|過渡；轉變；轉換", "v.|轉變；過渡"],
  "translate": ["/trænsˈleɪt/", "v.|翻譯；轉化；解讀"],
  "transport": ["/ˈtrænspɔːrt/", "n.|運輸；交通工具", "v.|運輸；運送；傳送"],
  "treat": ["/triːt/", "v.|對待；治療；處理；招待", "n.|款待；樂事"],
  "trend": ["/trend/", "n.|趨勢；傾向；流行", "v.|趨向；顯示趨勢"],
  "trigger": ["/ˈtrɪɡər/", "v.|觸發；引起；扣扳機", "n.|扳機；誘因；觸發器"],

  /* ---------- U / V / W / Y ---------- */
  "ultimate": ["/ˈʌltɪmət/", "adj.|最終的；極致的；根本的", "n.|極致；頂點"],
  "undergo": ["/ˌʌndərˈɡoʊ/", "v.|經歷；承受；接受（治療等）"],
  "undermine": ["/ˌʌndərˈmaɪn/", "v.|削弱；破壞；暗中損害"],
  "undertake": ["/ˌʌndərˈteɪk/", "v.|承擔；著手；保證"],
  "unique": ["/juˈniːk/", "adj.|獨特的；唯一的；罕見的"],
  "universal": ["/ˌjuːnɪˈvɜːrsl/", "adj.|普遍的；全球的；通用的"],
  "urban": ["/ˈɜːrbən/", "adj.|都市的；城市的；都市化的"],
  "urge": ["/ɜːrdʒ/", "v.|催促；強烈建議；力勸", "n.|衝動；強烈願望"],
  "utilize": ["/ˈjuːtəlaɪz/", "v.|利用；使用；運用"],
  "vague": ["/veɪɡ/", "adj.|模糊的；含糊的；不明確的"],
  "valid": ["/ˈvælɪd/", "adj.|有效的；正當的；有根據的"],
  "vary": ["/ˈveri/", "v.|變化；不同；改變"],
  "vast": ["/væst/", "adj.|廣大的；巨大的；大量的"],
  "vehicle": ["/ˈviːəkl/", "n.|車輛；交通工具；媒介；手段"],
  "venture": ["/ˈventʃər/", "n.|冒險事業；企業", "v.|冒險；敢於；前往"],
  "verify": ["/ˈverɪfaɪ/", "v.|驗證；核實；證實"],
  "version": ["/ˈvɜːrʒn/", "n.|版本；說法；改編版"],
  "victim": ["/ˈvɪktɪm/", "n.|受害者；犧牲者；罹難者"],
  "violate": ["/ˈvaɪəleɪt/", "v.|違反；侵犯；妨害"],
  "virtual": ["/ˈvɜːrtʃuəl/", "adj.|虛擬的；實質上的；事實上的"],
  "visible": ["/ˈvɪzəbl/", "adj.|可見的；明顯的；顯著的"],
  "vital": ["/ˈvaɪtl/", "adj.|至關重要的；生命的；充滿活力的"],
  "volunteer": ["/ˌvɑːlənˈtɪr/", "n.|志工；志願者", "v.|自願；主動提供", "adj.|志願的"],
  "vulnerable": ["/ˈvʌlnərəbl/", "adj.|脆弱的；易受傷害的；有弱點的"],
  "welfare": ["/ˈwelfer/", "n.|福利；幸福；社會救濟"],
  "whereas": ["/ˌwerˈæz/", "conj.|然而；反之；鑒於"],
  "widespread": ["/ˈwaɪdspred/", "adj.|廣泛的；普遍的；蔓延的"],
  "willing": ["/ˈwɪlɪŋ/", "adj.|願意的；樂意的；自願的"],
  "withdraw": ["/wɪðˈdrɔː/", "v.|撤回；提款；退出；收回"],
  "witness": ["/ˈwɪtnəs/", "n.|目擊者；證人；證據", "v.|目擊；見證；作證"],
  "workforce": ["/ˈwɜːrkfɔːrs/", "n.|勞動力；員工總數；工作人口"],
  "workshop": ["/ˈwɜːrkʃɑːp/", "n.|工作坊；研討會；工廠"],
  "worthwhile": ["/ˌwɜːrθˈwaɪl/", "adj.|值得的；有價值的；不虛此行的"],
  "yield": ["/jiːld/", "v.|產生；讓步；屈服；出產", "n.|產量；收益"],

  /* ---------- 測驗主題字 ---------- */
  "astronomy": ["/əˈstrɑːnəmi/", "n.|天文學；天體學"],
  "slowdown": ["/ˈsloʊdaʊn/", "n.|減速；放緩；經濟衰退"],
  "sophisticated": ["/səˈfɪstɪkeɪtɪd/", "adj.|精密的；複雜的；老練的"],
  "opt": ["/ɑːpt/", "v.|選擇；決定；opt for 選擇"],
  "prerequisite": ["/ˌpriːˈrekwəzɪt/", "n.|先決條件；前提", "adj.|必備的；先決的"],
  "methodical": ["/məˈθɑːdɪkl/", "adj.|有條理的；系統化的；細心的"],
  "distort": ["/dɪˈstɔːrt/", "v.|扭曲；歪曲；使變形"],
  "participant": ["/pɑːrˈtɪsɪpənt/", "n.|參與者；參賽者"],
  "renovation": ["/ˌrenəˈveɪʃn/", "n.|翻修；整修；更新"],
  "compelling": ["/kəmˈpelɪŋ/", "adj.|引人入勝的；令人信服的；迫切的"],
  "fossil": ["/ˈfɑːsl/", "n.|化石；老頑固", "adj.|化石的；陳腐的"],
  "undergraduate": ["/ˌʌndərˈɡrædʒuət/", "n.|大學部學生；大學生", "adj.|大學部的"],
  "productivity": ["/ˌproʊdʌkˈtɪvəti/", "n.|生產力；生產率；產能"],
  "pandemic": ["/pænˈdemɪk/", "n.|大流行病", "adj.|大流行的；普遍的"],
  "immune": ["/ɪˈmjuːn/", "adj.|免疫的；不受影響的；豁免的"],
  "virus": ["/ˈvaɪrəs/", "n.|病毒；電腦病毒；病毒性疾病"],
  "commute": ["/kəˈmjuːt/", "v.|通勤；減刑；交換", "n.|通勤路程"],
  "landlord": ["/ˈlændlɔːrd/", "n.|房東；地主"],
  "utility": ["/juːˈtɪləti/", "n.|公用事業；水電費；實用性", "adj.|多用途的；實用的"],
  "dormitory": ["/ˈdɔːrmətɔːri/", "n.|宿舍；學生宿舍"],
  "coach": ["/koʊtʃ/", "n.|教練；指導；長途客車", "v.|訓練；指導"],
  "evaluation": ["/ɪˌvæljuˈeɪʃn/", "n.|評估；評價；考核"],
  "physician": ["/fɪˈzɪʃn/", "n.|醫師；內科醫生"],
  "injury": ["/ˈɪndʒəri/", "n.|傷害；損傷；受傷"],
  "sunburn": ["/ˈsʌnbɜːrn/", "n.|曬傷", "v.|曬傷"],
  "debate": ["/dɪˈbeɪt/", "n.|辯論；討論", "v.|辯論；爭論；考慮"],
  "plastic": ["/ˈplæstɪk/", "n.|塑膠；塑膠製品", "adj.|塑膠的；可塑的；虛假的"],
  "aquarium": ["/əˈkweriəm/", "n.|水族館；魚缸"],
  "marine": ["/məˈriːn/", "adj.|海洋的；海生的；航海的", "n.|海軍陸戰隊員"],
  "habitat": ["/ˈhæbɪtæt/", "n.|棲息地；生境；居住環境"],
  "tortoise": ["/ˈtɔːrtəs/", "n.|陸龜；烏龜；行動遲緩的人"],
  "hatch": ["/hætʃ/", "v.|孵化；策劃；謀劃", "n.|孵化；艙口；開口"],
  "innate": ["/ɪˈneɪt/", "adj.|天生的；先天的；固有的"],
  "vertebrate": ["/ˈvɜːrtəbrət/", "n.|脊椎動物", "adj.|有脊椎的"],
  "biological": ["/ˌbaɪəˈlɑːdʒɪkl/", "adj.|生物的；生物學的；親生的"],
  "animation": ["/ˌænɪˈmeɪʃn/", "n.|動畫；動畫片；活力；生氣"],
  "random": ["/ˈrændəm/", "adj.|隨機的；任意的；偶然的", "n.|隨機；任意"],
  "reptile": ["/ˈreptaɪl/", "n.|爬行動物；爬蟲", "adj.|爬行動物的；卑鄙的"],
  "sensitivity": ["/ˌsensəˈtɪvəti/", "n.|敏感度；靈敏度；體貼"],
  "skeleton": ["/ˈskelɪtn/", "n.|骨骼；骨架；梗概", "adj.|骨瘦如柴的；基本的"],
  "dinosaur": ["/ˈdaɪnəsɔːr/", "n.|恐龍；過時的人事物"],
  "exhibition": ["/ˌeksɪˈbɪʃn/", "n.|展覽；展覽會；表現"],
  "intelligence": ["/ɪnˈtelɪdʒəns/", "n.|智能；智力；情報"],
  "satellite": ["/ˈsætəlaɪt/", "n.|衛星；人造衛星；附屬機構"],
  "amphibian": ["/æmˈfɪbiən/", "n.|兩棲動物；水陸兩用交通工具", "adj.|兩棲的"],
  "colossal": ["/kəˈlɑːsl/", "adj.|巨大的；龐大的；驚人的"],
  "mammal": ["/ˈmæml/", "n.|哺乳動物"],
  "protein": ["/ˈproʊtiːn/", "n.|蛋白質"],
  "calorie": ["/ˈkæləri/", "n.|卡路里；熱量"],
  "symptom": ["/ˈsɪmptəm/", "n.|症狀；徵兆；跡象"],
  "prescription": ["/prɪˈskrɪpʃn/", "n.|處方；藥方；指示"],
  "therapy": ["/ˈθerəpi/", "n.|治療；療法；心理治療"],
  "diagnosis": ["/ˌdaɪəɡˈnoʊsɪs/", "n.|診斷；判斷；診斷結果"],
  "surgery": ["/ˈsɜːrdʒəri/", "n.|手術；外科；診所"],
  "allergy": ["/ˈælərdʒi/", "n.|過敏；過敏症；反感"],
  "infection": ["/ɪnˈfekʃn/", "n.|感染；傳染；傳染病"],
  "vaccine": ["/vækˈsiːn/", "n.|疫苗；菌苗"],
  "depression": ["/dɪˈpreʃn/", "n.|憂鬱症；沮喪；蕭條；低窪地"],
  "insomnia": ["/ɪnˈsɑːmniə/", "n.|失眠；失眠症"],
  "obesity": ["/oʊˈbiːsəti/", "n.|肥胖；肥胖症"],
  "diabetes": ["/ˌdaɪəˈbiːtiːz/", "n.|糖尿病"],
  "pedestrian": ["/pəˈdestriən/", "n.|行人；步行者", "adj.|行人用的；平淡的"],
  "intersection": ["/ˌɪntərˈsekʃn/", "n.|十字路口；交叉點；交集"],
  "destination": ["/ˌdestɪˈneɪʃn/", "n.|目的地；終點；目標"],
  "itinerary": ["/aɪˈtɪnəreri/", "n.|行程；旅遊路線；旅行計畫"],
  "reservation": ["/ˌrezərˈveɪʃn/", "n.|預訂；保留；保留意見"],
  "cuisine": ["/kwɪˈziːn/", "n.|料理；烹飪風格；菜餚"],
  "ingredient": ["/ɪnˈɡriːdiənt/", "n.|食材；成分；要素"],
  "recipe": ["/ˈresəpi/", "n.|食譜；祕訣；方法"],
  "refund": ["/ˈriːfʌnd/", "n.|退款；退還", "v.|退款；退還"],
  "receipt": ["/rɪˈsiːt/", "n.|收據；發票；收到"],
  "warranty": ["/ˈwɔːrənti/", "n.|保固；保證書；擔保"],
  "discount": ["/ˈdɪskaʊnt/", "n.|折扣；減價", "v.|打折；不予重視"],
  "luggage": ["/ˈlʌɡɪdʒ/", "n.|行李；行囊"],
  "airfare": ["/ˈerfer/", "n.|機票費用；航空票價"],
  "boarding": ["/ˈbɔːrdɪŋ/", "n.|登機；搭車；寄宿", "adj.|登機的；寄宿的"]
};

/* ==========================================================================
   查詢引擎
   ========================================================================== */
(function () {
  'use strict';

  const DICT = window.BESTEP_DICTIONARY || {};
  const API_BASE = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  const TRANSLATE_API = 'https://api.mymemory.translated.net/get';
  const CACHE_KEY = 'bestep-dict-cache-v2';
  const CACHE_TTL = 1000 * 60 * 60 * 24 * 30;
  const CACHE_MAX = 240;

  let cache = {};

  try {
    cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}') || {};
  } catch (e) { cache = {}; }

  function saveCache() {
    try {
      const keys = Object.keys(cache);
      if (keys.length > CACHE_MAX) {
        keys.sort((a, b) => (cache[a].ts || 0) - (cache[b].ts || 0));
        keys.slice(0, keys.length - CACHE_MAX).forEach((k) => delete cache[k]);
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch (e) { /* 無痕模式或額度已滿時忽略 */ }
  }

  function normalize(word) {
    return String(word || '')
      .toLowerCase()
      .replace(/[’]/g, "'")
      .replace(/^[^a-z]+|[^a-z'-]+$/g, '')
      .replace(/'s$/, '');
  }

  const IRREGULAR = {
    am: 'be', is: 'be', are: 'be', was: 'be', were: 'be', been: 'be', being: 'be',
    has: 'have', had: 'have', does: 'do', did: 'do', done: 'do',
    went: 'go', gone: 'go', saw: 'see', seen: 'see', came: 'come',
    took: 'take', taken: 'take', made: 'make', got: 'get', gotten: 'get',
    gave: 'give', given: 'give', found: 'find', thought: 'think',
    said: 'say', told: 'tell', became: 'become', began: 'begin', begun: 'begin',
    brought: 'bring', bought: 'buy', caught: 'catch', chose: 'choose', chosen: 'choose',
    drove: 'drive', driven: 'drive', ate: 'eat', eaten: 'eat', fell: 'fall', fallen: 'fall',
    felt: 'feel', fought: 'fight', flew: 'fly', flown: 'fly', forgot: 'forget', forgotten: 'forget',
    grew: 'grow', grown: 'grow', held: 'hold', kept: 'keep', knew: 'know', known: 'know',
    led: 'lead', left: 'leave', lent: 'lend', lost: 'lose', meant: 'mean', met: 'meet',
    paid: 'pay', put: 'put', read: 'read', rode: 'ride', ridden: 'ride', rose: 'rise', risen: 'rise',
    ran: 'run', sold: 'sell', sent: 'send', set: 'set', shook: 'shake', shaken: 'shake',
    showed: 'show', shown: 'show', sang: 'sing', sung: 'sing', sat: 'sit', slept: 'sleep',
    spoke: 'speak', spoken: 'speak', spent: 'spend', stood: 'stand', stole: 'steal', stolen: 'steal',
    swam: 'swim', swum: 'swim', threw: 'throw', thrown: 'throw', understood: 'understand',
    wore: 'wear', worn: 'wear', won: 'win', wrote: 'write', written: 'write',
    children: 'child', people: 'person', men: 'man', women: 'woman', feet: 'foot',
    teeth: 'tooth', mice: 'mouse', geese: 'goose', data: 'datum', media: 'medium'
  };

  function lemmaCandidates(raw) {
    const w = normalize(raw);
    if (!w) return [];
    const out = [];
    const push = (value) => {
      const v = normalize(value);
      if (v && v.length > 1 && out.indexOf(v) === -1) out.push(v);
    };
    push(w);
    if (IRREGULAR[w]) push(IRREGULAR[w]);

    if (w.endsWith("'s")) push(w.slice(0, -2));
    if (w.endsWith('ies') && w.length > 4) push(w.slice(0, -3) + 'y');
    if (w.endsWith('ves') && w.length > 4) { push(w.slice(0, -3) + 'f'); push(w.slice(0, -3) + 'fe'); }
    if (w.endsWith('es') && w.length > 3) push(w.slice(0, -2));
    if (w.endsWith('s') && !w.endsWith('ss') && w.length > 3) push(w.slice(0, -1));

    if (w.endsWith('ied') && w.length > 4) push(w.slice(0, -3) + 'y');
    if (w.endsWith('ed') && w.length > 3) {
      push(w.slice(0, -2));
      push(w.slice(0, -1));
      if (/([bcdfghjklmnpqrstvwxz])\1ed$/.test(w)) push(w.slice(0, -3));
    }
    if (w.endsWith('ing') && w.length > 5) {
      push(w.slice(0, -3));
      push(w.slice(0, -3) + 'e');
      if (/([bcdfghjklmnpqrstvwxz])\1ing$/.test(w)) push(w.slice(0, -4));
    }
    if (w.endsWith('ly') && w.length > 4) {
      push(w.slice(0, -2));
      if (w.endsWith('ily')) push(w.slice(0, -3) + 'y');
    }
    if (w.endsWith('er') && w.length > 4) { push(w.slice(0, -2)); push(w.slice(0, -1)); }
    if (w.endsWith('est') && w.length > 5) { push(w.slice(0, -3)); push(w.slice(0, -2)); }
    if (w.endsWith('ity') && w.length > 5) push(w.slice(0, -3) + 'e');
    return out;
  }

  function parseBuiltin(word, tuple) {
    const phonetic = tuple[0] || '';
    const groups = [];
    for (let i = 1; i < tuple.length; i += 1) {
      const chunk = String(tuple[i] || '');
      const bar = chunk.indexOf('|');
      if (bar === -1) {
        groups.push({ pos: '', meanings: [chunk.trim()], definitions: [], examples: [] });
        continue;
      }
      const pos = chunk.slice(0, bar).trim();
      const meanings = chunk.slice(bar + 1)
        .split(/[;；]/)
        .map((s) => s.trim())
        .filter(Boolean);
      groups.push({ pos, meanings, definitions: [], examples: [] });
    }
    return {
      word,
      phonetic,
      groups,
      source: 'builtin',
      matchedForm: null
    };
  }

  function lookupBuiltIn(raw) {
    const candidates = lemmaCandidates(raw);
    for (let i = 0; i < candidates.length; i += 1) {
      const key = candidates[i];
      if (Object.prototype.hasOwnProperty.call(DICT, key)) {
        const entry = parseBuiltin(key, DICT[key]);
        if (normalize(raw) !== key) entry.matchedForm = normalize(raw);
        return entry;
      }
    }
    return null;
  }

  function hasChinese(text) {
    return /[\u3400-\u9fff]/.test(String(text || ''));
  }

  function decodeEntities(text) {
    return String(text || '')
      .replace(/&quot;/g, '"')
      .replace(/&#39;|&apos;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }

  async function fetchJson(url, timeout) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout || 9000);
    try {
      const response = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return await response.json();
    } finally {
      clearTimeout(timer);
    }
  }

  async function translateToZh(text) {
    const clean = String(text || '').replace(/\s+/g, ' ').trim();
    if (!clean) return '';
    if (hasChinese(clean)) return clean;
    const short = clean.length > 220 ? clean.slice(0, 220) : clean;
    const url = TRANSLATE_API + '?q=' + encodeURIComponent(short) + '&langpair=' + encodeURIComponent('en|zh-TW');
    try {
      const data = await fetchJson(url, 8000);
      let translated = data && data.responseData && data.responseData.translatedText;
      if (!translated) return '';
      translated = decodeEntities(translated);
      if (!hasChinese(translated)) return '';
      if (/MYMEMORY WARNING|QUERY LENGTH LIMIT/i.test(translated)) return '';
      return translated;
    } catch (e) {
      return '';
    }
  }

  function extractPhonetic(entries) {
    for (let i = 0; i < entries.length; i += 1) {
      const phonetics = entries[i].phonetics;
      if (Array.isArray(phonetics)) {
        for (let j = 0; j < phonetics.length; j += 1) {
          if (phonetics[j] && phonetics[j].text) return phonetics[j].text;
        }
      }
      if (entries[i].phonetic) return entries[i].phonetic;
    }
    return '';
  }

  async function lookupOnline(raw) {
    const word = normalize(raw);
    if (!word) return null;

    let entries = null;
    try {
      const data = await fetchJson(API_BASE + encodeURIComponent(word), 9000);
      if (Array.isArray(data) && data.length) entries = data;
    } catch (e) { entries = null; }

    if (entries) {
      const phonetic = extractPhonetic(entries);
      const byPos = [];
      const index = {};
      const defsToTranslate = [];

      entries.forEach((entry) => {
        (entry.meanings || []).forEach((meaning) => {
          const pos = meaning.partOfSpeech || '';
          let group = index[pos];
          if (!group) {
            if (byPos.length >= 4) return;
            group = { pos, meanings: [], definitions: [], examples: [] };
            index[pos] = group;
            byPos.push(group);
          }
          (meaning.definitions || []).slice(0, 3).forEach((def) => {
            if (!def || !def.definition) return;
            if (group.definitions.length >= 3) return;
            group.definitions.push(def.definition);
            if (def.example) group.examples.push(def.example);
          });
        });
      });

      byPos.forEach((group) => {
        group.definitions.forEach((def, i) => {
          if (defsToTranslate.length < 5) {
            defsToTranslate.push(translateToZh(def).then((zh) => {
              if (zh) group.meanings[i] = zh;
            }));
          }
        });
      });

      await Promise.allSettled(defsToTranslate);

      byPos.forEach((group) => {
        group.meanings = group.meanings.filter(Boolean);
        if (!group.meanings.length) {
          group.meanings = group.definitions.slice(0, 2);
        }
      });

      if (byPos.length) {
        return { word, phonetic, groups: byPos, source: 'online', matchedForm: null, hasEnglishDefs: true };
      }
    }

    // 最後備援：至少給出中文直譯，確保任何單字都有回饋。
    const zh = await translateToZh(word);
    if (zh) {
      return {
        word,
        phonetic: '',
        groups: [{ pos: '', meanings: [zh], definitions: [], examples: [] }],
        source: 'translate',
        matchedForm: null,
        note: '線上辭典未收錄此字，以下為機器翻譯；詞性可能從缺。'
      };
    }
    return null;
  }

  async function lookup(raw, options) {
    const opts = options || {};
    const word = normalize(raw);
    if (!word) return null;

    const builtin = lookupBuiltIn(word);
    if (builtin) return builtin;

    const cached = cache[word];
    if (!opts.force && cached && Date.now() - cached.ts < CACHE_TTL) {
      return cached.data;
    }

    const online = await lookupOnline(word);

    // 若原文只拿到機器直譯（例如複數形），改用 lemma 再查一次線上辭典，
    // 以取得完整詞性與多義釋義。
    if (!online || online.source === 'translate') {
      const candidates = lemmaCandidates(word).slice(1, 4);
      for (let i = 0; i < candidates.length; i += 1) {
        const better = await lookupOnline(candidates[i]);
        if (better && better.source !== 'translate') {
          better.matchedForm = word;
          cache[word] = { ts: Date.now(), data: better };
          saveCache();
          return better;
        }
      }
    }

    if (online) {
      cache[word] = { ts: Date.now(), data: online };
      saveCache();
      return online;
    }

    // 最後再嘗試 lemma 的內建字庫
    const candidates = lemmaCandidates(word).slice(1);
    for (let i = 0; i < candidates.length; i += 1) {
      const again = lookupBuiltIn(candidates[i]);
      if (again) {
        again.matchedForm = word;
        return again;
      }
    }
    return null;
  }

  let voices = [];
  function refreshVoices() {
    if (!('speechSynthesis' in window)) return;
    const all = window.speechSynthesis.getVoices()
      .filter((v) => /^en(-|_|$)/i.test(v.lang));
    if (all.length) voices = all;
  }
  refreshVoices();
  if ('speechSynthesis' in window) {
    window.speechSynthesis.addEventListener('voiceschanged', refreshVoices);
  }

  function pickVoice() {
    if (!voices.length) refreshVoices();
    const preferred = ['Samantha', 'Google US English', 'Microsoft Aria', 'Microsoft Jenny', 'Zira', 'Alex'];
    for (let i = 0; i < preferred.length; i += 1) {
      const found = voices.find((v) => v.name.indexOf(preferred[i]) !== -1);
      if (found) return found;
    }
    return voices[0] || null;
  }

  function speak(word, rate) {
    if (!('speechSynthesis' in window)) return false;
    const text = String(word || '').trim();
    if (!text) return false;
    try { window.speechSynthesis.cancel(); } catch (e) { /* ignore */ }
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = rate || 0.88;
    utter.pitch = 1;
    const voice = pickVoice();
    if (voice) utter.voice = voice;
    window.speechSynthesis.speak(utter);
    return true;
  }

  function size() {
    return Object.keys(DICT).length;
  }

  window.BESTEP_DICT = {
    lookup,
    lookupBuiltIn,
    lemmaCandidates,
    normalize,
    speak,
    size,
    translateToZh,
    hasChinese
  };
})();
