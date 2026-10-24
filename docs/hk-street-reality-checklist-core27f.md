# 香港街道實況清單（core27f 參考）

整理日期：2026-10-19（HKT）。用途：俾美術／3D／代碼／關卡對照，修正「啲樓一模一樣、似爛尾樓、冇人、冇垃圾桶、冇欄杆、路色唔啱」。
標記：**[官方]** 有政府或官方文件出處；**[文獻]** 有學術或傳媒出處；**[觀察]** 冇搵到官方數字，係常見街景，請實地或用街景再核對。
法律提醒：所有招牌同店名照用 `docs/legal-core27-ssp-klc-parody-names.md`、`docs/legal-core28-wc-east-parody-names.md`；唔好放政府署徽、電車公司或巴士公司 logo、真車號。

---

## 1. 路面

| 元素 | 實況 | 遊戲要點 | 出處 |
|---|---|---|---|
| 瀝青 | 深灰，舊路面偏淺灰、有修補塊同沙井蓋；日頭係乾嘅 | 成個車路用**同一個**乾瀝青材質，濕水反光只喺落雨或者夜晚先開 | [觀察] |
| 雙黃線 | 貼住**路邊**畫，意思係「任何時間不得停車」；單黃線就係按時段禁止停車 | 只畫喺路邊（近石壆），**唔好**畫喺行車線中間 | [官方] TD Road Users' Code「Where Not to Stop」https://www.td.gov.hk/en/road_safety/road_users_code/index/chapter_5_for_all_drivers/where_not_to_stop_/ |
| 中線／分線 | 雙白線、單白虛線、白色分流 chevron、巴士線開頭會寫時段 | 道路中線用白色 | [官方] TD「Road Markings giving Orders」https://www.td.gov.hk/en/road_safety/road_users_code/index/chapter_8_the_language_of_the_road/road_markings_giving_orders_/index.html |
| 黃格（box junction） | 路口畫黃色交叉斜格，出口唔清就唔可以駛入；電車或輕鐵路口另有一款 | 大路口加黃格 decal | [官方] TD「Traffic Light Junctions」https://www.td.gov.hk/en/road_safety/road_users_code/index/chapter_5_for_all_drivers/traffic_light_junctions_/index.html |
| 行人過路處 | 斑馬線兩邊有鋸齒線（zigzag）；「綠公仔」燈位過路處嘅黃色斜紋範圍內唔准停車；白色交叉格係行人可以斜過嘅範圍 | 斑馬線加鋸齒線；燈位用兩條白實線，**唔好**一律畫斑馬紋 | [官方] 同上 + Road Users' Code PDF https://www.td.gov.hk/filemanager/en/content_172/road_users_code_2020_eng.pdf |
| 「LOOK RIGHT／望右」「LOOK LEFT／望左」 | 地面白字，中英對照，喺過路處嘅石壆前面；巴士線嗰邊會用相反方向 | 每個過路處兩邊各寫一個 | [官方] Road Users' Code PDF（同上） |
| 巴士站／小巴站／的士站地面標記 | 巴士站有黃框加「BUS STOP」字；小巴同的士站有自己嘅標記；電車站要停車讓行人 | 巴士站嘅地面黃框要同上蓋對齊 | [官方] TD「Road Markings giving Orders」（同上） |
| 電車路軌 | 港島北岸由堅尼地城到筲箕灣，路軌喺路中間，電車站多數係路中心嘅安全島 | core28 灣仔／東區要有路軌同路中站台 | [文獻] https://en.wikipedia.org/wiki/Hong_Kong_Tramways |

## 2. 行人路

| 元素 | 實況 | 遊戲要點 | 出處 |
|---|---|---|---|
| 鋪路磚 | 多數係混凝土鋪路磚（灰色、淺灰或者紅灰），有指定嘅鋪砌方法同收邊 | 每區揀 1–2 款磚色，連續鋪滿成條街，唔好斷斷續續 | [官方] HyD GN044 https://www.hyd.gov.hk/en/technical_references/technical_document/guidance_notes/pdf/gn044c.pdf |
| 導盲磚 | 唔一定係黃色，但一定要同周圍地面有明顯對比（例如灰或紅地面上鋪黃色）；過路處嘅警示帶大約 **600mm** 闊，中央安全島約 300mm | 每個過路口鋪一條 600mm 闊嘅黃色點狀磚 | [官方] HyD H5118E https://www.hyd.gov.hk/en/technical_references/standard_drawings/hyd_standard_drawings/doc/section_5/pdf/h5118e.pdf ；H5121A https://www.hyd.gov.hk:10443/en/technical_references/standard_drawings/hyd_standard_drawings/doc/section_5/pdf/h5121a.pdf |
| 石壆 | 花崗石或混凝土，高過路面大約 12–15cm；過路處會斜落地面 | 行人路要高過車路，路口做斜坡 | [觀察] |
| 行人路闊度 | 舊區大約 2–4m，旺角或者銅鑼灣大街大約 4–6m | 要沿**每一條**街連續鋪，唔可以淨係主幹道有 | [觀察] |

## 3. 欄杆、石墩

| 元素 | 實況 | 遊戲要點 | 出處 |
|---|---|---|---|
| Type 2 行人欄杆（最常見） | HyD 標準欄杆，用嚟控制行人路線，**熱浸鍍鋅**，所以係銀灰色金屬，唔係綠色 | 柱距大約 1–2m，扶手高大約 1.1m；路口同過路處兩邊都要連續圍住 | [官方] H2130I https://www.hyd.gov.hk/en/technical_references/standard_drawings/hyd_standard_drawings/doc/section_2/pdf/h2130i.pdf ；系列目錄 https://www.hyd.gov.hk/en/technical_references/standard_drawings/hyd_standard_drawings/section2.html |
| Type 7／8 欄杆（半板或全板） | 標準色係**炭灰 RAL 7021** | 新區或者翻新路段可以用深灰色板式欄杆 | [官方] H2287 https://www.hyd.gov.hk:6065/en/technical_references/standard_drawings/hyd_standard_drawings/doc/section_2/pdf/h2287.pdf ；H2288 https://www.hyd.gov.hk/en/technical_references/standard_drawings/hyd_standard_drawings/doc/section_2/pdf/h2288.pdf |
| Type 12／13（裝飾或新款） | 粉末塗層，H2295 寫明用 RAL 9017 同 RAL 1036；Type 9 用藍色 NCS 1548-R89B；其他顏色要運輸署同 HyD 同意 | 個別區（例如海濱、新市鎮）用唔同顏色，可以幫區與區之間做出分別 | [官方] H2295 https://www.hyd.gov.hk/en/technical_references/standard_drawings/hyd_standard_drawings/doc/section_2/pdf/h2295.pdf |
| 設計原則 | 欄杆主要用嚟引導行人，唔係用嚟擋車；要簡潔，顏色要配合周圍環境 | — | [官方] HyD TC 2/2017 https://www.hyd.gov.hk/en/technical_references/technical_document/hyd_technical_circulars/doc/2017/02/TC0217.pdf |
| 石墩、欄杆加石墩 | 路口轉角同行人路出入口會放 | 有標準圖 H2139B | [官方] 系列目錄（同上） |

## 4. 垃圾桶、回收桶

| 元素 | 實況 | 遊戲要點 | 出處 |
|---|---|---|---|
| 食環署廢屑箱 | **橙色**。全港大約 11,000 個：130L 約 9,600 個、70L 約 1,400 個、100L 約 100 個；新款投入口細（130L 嘅口係 230×150mm），有警告貼紙；2023 年試新款圓頂膠桶，仍然係橙色，連煙灰盅 | 大約 1.0m 高、0.5m 闊嘅橙色桶，頂部有煙灰盅；放喺**主要行人路口、交通交匯處、巴士站、碼頭** | [官方] FEHD 2016 新聞稿 https://www.fehd.gov.hk/english/news/details/20160606_0682.html ；[文獻] 大公報 2025-10-30 https://www.tkww.hk/a/202510/30/AP6902c37be4b0f2e74396f8d4.html ；Dimsum Daily 2023 https://www.dimsumdaily.hk/hong-kongs-new-waste-bin-design-raises-concerns-among-sanitation-workers-and-scavengers/ |
| 垃圾桶旁邊 | 大約 15% 嘅桶旁邊有垃圾，兩成就快滿或者已經滿瀉（油尖旺、銅鑼灣、鰂魚涌實地統計） | 隨機喺桶旁邊放膠袋或者外賣盒，即刻有生活感 | [文獻] 大公報（同上） |
| 三色回收桶（藍、黃、啡） | 市區路邊大約 800 套已經喺 **2022 年底前移除**，鄉郊仲有大約 820 至 1,100 套；屋苑大堂同公屋地下仍然常見 | 市區街道**唔好放**；新界村邊或者屋邨地下先放 | [官方] 立法會答覆 2024-02-21 https://www.info.gov.hk/gia/general/202402/21/P2024022100290.htm ；減廢網 https://www.wastereduction.gov.hk/zh-hk/recycling-faq/kerbside-recycling-bin-faq |
| 綠色垃圾桶 | 康文署公園、海濱等地方常見綠色桶 | 公園邊、海濱用綠色 | [觀察] |

## 5. 燈、交通燈

| 元素 | 實況 | 遊戲要點 | 出處 |
|---|---|---|---|
| 街燈柱 | HyD 標準柱有 5、8、10、12、15m 幾種高度，按道路類型揀；**灰色鋼柱**；柱距要按照明設計計，彎位會密啲；LED 燈色溫 3000K（暖白），預計 2029 年換晒 | 主幹道用 10–12m，橫街用 5–8m；夜晚用暖白燈（舊鈉燈係偏橙） | [官方] HyD 公共照明設計手冊 https://www.hyd.gov.hk/en/technical_references/technical_document/public_lighting_design_manual/doc/PLDM_2016.pdf ；柱標準尺寸 https://www.hyd.gov.hk/en/technical_references/standard_drawings/ltg_standard_drawings/doc/hldsdge01-cl0002j.pdf ；LED FAQ https://www.hyd.gov.hk/en/our_services/lighting/public_lighting/faq/doc/faq_en.pdf |
| 行人交通燈 | 全港都有電子響聲訊號（「嘟嘟」聲，綠燈時加快）同震動觸覺按鈕；新款有觸覺地圖、報位置、免觸按鈕 | 綠公仔閃之前要「嘟嘟嘟」加快；燈柱要有黑色按鈕盒 | [官方] TD https://www.td.gov.hk/en/transport_in_hong_kong/pedestrians/pedestrian_crossing_facilities/electronic_audible_traffic_signal/index.html ；2025 新聞稿 https://www.info.gov.hk/gia/general/202505/20/P2025052000184.htm |
| 倒數器 | **仲係試驗階段**：2023 年喺東涌開始試，2025 年擴展到 16 個試點，其中 4 個試紅燈倒數；初步結果預計 2026 年中出 | 只喺少數路口放，唔好全城都有 | [官方] 立法會 2025-07-23 https://www.info.gov.hk/gia/general/202507/23/P2025072300341.htm |

## 6. 車站、交通工具

| 元素 | 實況 | 遊戲要點 | 出處 |
|---|---|---|---|
| 的士 | **市區紅色**、新界綠色、大嶼山藍色 | 九龍同港島 9 成用紅的，新界就主要係綠的 | [官方] HKTB https://www.discoverhongkong.com/eng/travel-guide/traveller-essentials/getting-around.html ；TD TPDM V9 https://www.td.gov.hk/filemanager/en/content_5055/V9_08_2026.pdf |
| 小巴 | 車身係奶黃色；**綠頂**係專線，**紅頂**係非專線；19 座 | 車路上要有紅頂同綠頂兩款 | [官方] TD Minibuses https://www.td.gov.hk/en/transport_in_hong_kong/public_transport/minibuses/ ；Road Users' Code「Public Transport」https://www.td.gov.hk/en/road_safety/road_users_code/index/chapter_3_for_passengers/public_transport/ |
| 雙層巴士 | 主流公共巴士，大約 12m 長、4.4m 高 | 車身用戲仿顏色同虛構路線號（例如 2X、N7），唔好用真公司 logo | [官方] HKTB（同上）；尺寸係 [觀察] |
| 電車「叮叮」 | 雙層、窄身，堅尼地城至筲箕灣，車站多數喺路中安全島；車身有廣告 | 外形可以用；唔好用電車公司 logo 或者真車號（法律 core28 已經寫明） | [文獻] Wikipedia 電車（同上）；新標誌新聞稿 https://hktramways.com/media/files/press-releases/New%20logo_Press%20Release%20-%20Eng.pdf |
| 巴士站 | 有上蓋、廣告燈箱、路線牌柱；繁忙站會有幾支牌 | 上蓋同地面黃框要對齊 | [觀察] |
| 地鐵出口 | 每個出口有編號牌（A1、B2 等）同上蓋 | 用「地鐵站」通稱，唔好用港鐵 logo | [官方] 出口牌系統 https://exitboard.signage.mtr.com.hk/ （顏色未核實） |

## 7. 報攤、小販

| 元素 | 實況 | 出處 |
|---|---|---|
| 固定攤位（報紙檔等） | 攤位面積分三級：約 0.9×1.2m、0.9×1.8m、1.2×1.8m；高度一般唔超過 2.5m，設計要食環署批 | [官方] FEHD 攤位面積 https://www.fehd.gov.hk/tc_chi/pleasant_environment/hawker/hawker_pitch_sizes_fees.html ；規格 https://www.fehd.gov.hk/english/pleasant_environment/hawker/hawker_construction_spec.html |
| 大笪地、排檔 | 屬另一類熟食牌照，數量好少（中環、深水埗有幾檔） | [官方] FEHD 固定攤位 https://www.fehd.gov.hk/english/pleasant_environment/hawker/fixedpitch.html |
| 街市檔 | 帆布簷篷、紅色燈膽、膠箱、外擺貨品；鴨寮街、北河街、春秧街好密 | [觀察] |

## 8. 招牌

| 元素 | 實況 | 出處 |
|---|---|---|
| 伸出式招牌 | 定義係伸出外牆超過 600mm。小型工程分級：III 級面積 ≤1m²、伸出 ≤1m、厚 ≤300mm、高度 ≤6m；II 級 ≤10m²；I 級 10–20m²、伸出 ≤4.2m、厚 ≤600mm；再大就要屋宇署批圖 | [官方] BD 1.20 https://www.bd.gov.hk/en/building-works/minor-works/minor-works-items/index_mwcs_item1_20.html ；Projecting signboard https://www.bd.gov.hk/en/building-works/minor-works/minor-works-items/index_mwcs_items_c6b.html ；招牌監管 https://www.bd.gov.hk/en/building-works/signboards/signboard-control-system/index.html |
| 遊戲要點 | 尺寸要有好大差距：細嘅 1m² 燈箱，大嘅 20m²、直身大牌伸出 4m；有直有橫；日頭唔亮燈，見到白底、紅底、黃底加黑字或紅字；夜晚先有大約一半著燈。招牌近年拆咗好多，彌敦道唔再係以前咁密 | [觀察] |

## 9. 建築類型同外牆

| 類型 | 特徵 | 出處 |
|---|---|---|
| 戰前唐樓（騎樓） | 1903 年條例限高 4 層；用柱支撐嘅騎樓蓋住成條行人路；牆貼牆；部分有新古典柱式（例如雷生春、荷李活道 60 號）| [文獻] 香港建解 https://cityunseen.hk/ghost-buildings/?lang=zh-hant ；中華書局 https://www.chunghwabook.com.hk/blog/detail/id/535 |
| 戰後唐樓 | 1955 年條例之後，冇電梯最高 9 層；包豪斯式外牆，簡單平直，懸臂露台，冇柱 | [文獻] 同上 |
| 1950–60 年代商住大廈（composite building） | 地舖加閣樓做商店，上面係住宅或工場；按日照規例，上層會逐級退台；外牆加滿鐵籠、冷氣機、晾衫架、僭建房、招牌、天線、渠管。例子：灣仔大廈、重慶大廈、美麗都大廈、北角僑冠大廈、鰂魚涌益昌大廈（怪獸大廈）；街角樓多數有弧形轉角 | [文獻] AJAR https://ajar.arena-architecture.eu/articles/10.5334/ajar.231 ；HKU Press《街角風情》https://hkupress.hku.hk/image/catalog/pdf-preview/9789888028726.pdf ；M+ 寶寧大廈（桃色外牆、垂直縫）https://www.mplus.org.hk/en/collection/archives/drawings-bell-house-19621970-nathan-road-hong-kong-ca9-1/ |
| 公共屋邨 | **每個邨用自己嘅配色**，冇統一色板；房委會透過屋邨改善計劃同「繽 FUN 屋邨」逐個邨揀主題（例如彩虹邨 1994 年髹七色，2014 年改做五色）；Harmony 同 Trident 只係標準建築設計，唔係標準顏色；2009 年之後嘅公屋按地盤個別設計 | [官方] 房委會 Housing Dimensions https://www.housingauthority.gov.hk/en/about-us/publications-and-statistics/housing-dimensions/article/20110902/fun-deck-public-housing-blocks-design-in-evolution.html ；屋邨改善計劃 https://www.housingauthority.gov.hk/en/public-housing/estate-maintenance-and-improvement/estate-improvement-programme/index.html ；[文獻] 大公報 https://www.tkww.hk/epaper/view/newsDetail/1739716890370117632.html ；Well-Being https://housingwellbeing.hk/pilot-projects/colourful-and-fun-estate-project/ |
| 私人屋苑 | 平台商場加多座 30–50 層住宅；有凸窗、統一顏色瓷磚（米、啡、粉藍）（例如太古城、美孚） | [觀察] |
| 甲級寫字樓 | 玻璃幕牆，藍、綠或銀色反光；地面有大堂同柱廊 | [觀察] |
| 工廈 | 長條窗、貨車上落台、鐵閘、大型貨梯 | [觀察] |

### 9a. 窗同外牆細節（避免「爛尾樓」感覺）[觀察]
- 窗框：鋁窗（銀色或者古銅色）、舊鋼窗、綠色或者藍色玻璃都有；**每戶唔同**，有啲換咗新窗、有啲裝咗鐵窗花或鐵籠。
- 冷氣機：窗口機同分體機隨機排，每 1–2 戶就有一部；底下有滴水痕。
- 晾衫：竹竿或者鐵架伸出窗外，掛住顏色衫褲。
- 窗簾：白、米、粉、藍色都有，一部分窗開咗。
- 日頭窗嘅反光：大部分窗係深色，但係會反射天空；**唔可以全部一樣咁黑**。夜晚大約 30–60% 單位著燈，燈色有暖黃同冷白。
- 外牆：紙皮石（米、粉綠、粉藍、粉紅）、上油（米、灰、黃）、瓷磚；有水漬、有新舊油色唔同嘅修補位。
- 天台：水箱、天線、僭建鐵皮屋、天台招牌。

### 9b. 地舖種類 [觀察]
茶餐廳（玻璃門、餐牌貼窗）、藥房（白光、貨架密）、便利店（戲仿名用「8仔」「OK 迷你店」「全日便利」）、金行（紅金色、強光）、地產舖（窗貼滿樓盤紙）、燒臘（玻璃櫃吊住燒鵝）、五金舖（貨擺出行人路）、涼茶舖、麻雀館、銀行（通稱）、藥行；**夜晚三至四成落咗閘**（銀灰色捲閘，有塗鴉或貼街招）。每 4–8m 就係一間舖，閣樓有窗。

## 10. 行人密度

- 旺角西洋菜南街高峰時每小時最多大約 **20,000 人次**（行人專用區年代）；之後週末高峰大約 10,700–14,800 人次（比 2014 年少 24%）；平日夜晚大約 13,000 人次。[文獻] Quartz https://qz.com/1343313/hong-kong-silences-street-performers-in-mong-kok-after-noise-complaints ；SCMP https://www.scmp.com/news/hong-kong/article/1346842/street-performers-accused-bringing-chaos-mong-kok-pedestrian-zone ；Civic Exchange https://civic-exchange.org/scmp-street-strife/
- 換算做遊戲目標（[觀察]，可以按效能縮細）：旺角、銅鑼灣大街，鏡頭 40m 範圍內最好有 20–40 個行人；深水埗、北角大約 10–20 個；葵涌工業區大約 2–6 個；手機 lite 版減半，用 instanced 低模或者 impostor。
- 行人種類要有：返工族、阿婆拉買餸車、學生、外傭（週日中環）、送外賣、推貨車嘅工人、拎膠袋嘅街坊。

---
## 遊戲用嘅數字小結
- 垃圾桶：每 40–60m 一個，路口同巴士站一定要有；橙色，大約 0.5×0.45×1.0m。
- 欄杆：每個燈位路口兩邊至少各圍 10–20m；過路處加導盲磚。
- 街燈：主幹道 10–12m 灰色柱；橫街 5–8m。
- 招牌：大小差 1–20m²，伸出 1–4m，有直有橫。
- 的士：市區紅色；小巴：紅頂同綠頂；巴士：雙層。

---

## 政府補充：尺寸與標線（core27f）

更新：2026-10-19 20:50 HKT · @政府部門/大公司 · 只寫 docs，**唔郁 Pages／vendor／index.html**
標記沿用上面：**[官方]** 數字係從官方文件原文讀出嚟；**[非官方·遊戲建議]** 係搵唔到官方數字，畀關卡用嘅估值，**唔好當真數**。
上面已經有出處嘅（Type 2 鍍鋅銀灰、Type 7/8 RAL 7021、橙色廢屑箱、導盲磚 600mm、街燈 3000K 等）唔再重複。

### A. 更正上面三個數（有官方出處）

| 上面寫 | 官方數字 | 出處 |
|---|---|---|
| §3 欄杆扶手高「大約 1.1m」 | **頂欄離地 1000mm**；要 HyD 同運輸署同意先可以加高到 1300mm | [官方] HyD H2130I 註 6、8 https://www.hyd.gov.hk/en/technical_references/standard_drawings/hyd_standard_drawings/doc/section_2/pdf/h2130i.pdf |
| §3／小結：路口兩邊「各圍 10–20m」 | 過路處兩邊嘅引導欄杆**一般限每邊 6m**，長度按現場定 | [官方] TPDM 第 2 冊第 3 章 3.9.2.10 https://www.td.gov.hk/filemanager/en/content_5055/V2_08_2026.pdf |
| §2 石壆「大約 12–15cm」 | 標準 K1 路壆（250×125mm）**高出車路面 125mm** | [官方] HyD H1101E https://www.hyd.gov.hk/en/technical_references/standard_drawings/hyd_standard_drawings/doc/section_1/pdf/h1101e.pdf ；H1118A https://www.hyd.gov.hk/en/technical_references/standard_drawings/hyd_standard_drawings/doc/section_1/pdf/h1118a.pdf |

### B. 行人欄杆（Type 2，控制類）

| 項目 | 數字 | 標記 |
|---|---|---|
| 柱距（每塊板長 L） | **≤1500mm** | [官方] H2130I |
| 板身 | 上下框 40×15 扁鐵，直枝 16mm 圓鐵，**中距 ≤125mm**；板身高 900mm（100+350+350+100）；板底離地 **≤110mm** | [官方] H2130I 立面圖 |
| 柱 | 40mm 實心方柱，300×300 混凝土腳 | [官方] H2130I |
| 物料／色 | 熱浸鍍鋅（即銀灰），唔髹色 | [官方] H2130I 註 5 |
| Type 11（控制類） | 黃色 **RAL 1018** 配黑色 **RAL 9017**，高 1000 | [官方] H2293 https://www.hyd.gov.hk/en/technical_references/standard_drawings/hyd_standard_drawings/doc/section_2/pdf/h2293.pdf |
| 離車路邊 | 按 Table 3.5.2.1：設計車速 ≤50km/h、物件矮過 3m 時 **500mm**（路面斜向物件會去到 600）；會令行人路有效闊度少過 1.5m 嘅話，可以減到 **200mm**；任何情況唔可以近過 200mm | [官方] TPDM V2 3.5.2.2、3.9.2.19 |
| 幾時唔放 | 唔好淨係為咗阻違泊而放；有花槽或者中央分隔已經擋住嘅地方唔放；Trunk Road／Primary Distributor 用防撞欄，唔用行人欄杆 | [官方] TPDM V2 3.9.2.4、3.9.2.18；HyD TC 2/2017 |
| 石墩 | 行人路闊 ≤2m 時，墩距可以去到 **2.5m**；闊過 2m 用 **2m** | [官方] TPDM V2 3.9.2.15 |
| 遊戲擺法 | 鏡頭內每個燈位或者斑馬線，兩邊各擺 **4 塊板（約 6m）**；有花槽嘅路段唔擺；欄杆外邊離石壆 **0.5m**（窄路 0.2m） | [非官方·遊戲建議]，跟上面官方規則推出嚟 |

### C. 食環署廢屑箱

| 項目 | 數字 | 標記 |
|---|---|---|
| 容量 | 街道上用 **70L 同 130L**，另外試用 100L | [官方] 政府新聞公報 2016-06-06 https://www.info.gov.hk/gia/general/201606/06/P201606060599.htm |
| 投入口 | 130L：由 370×190mm 改細做 **230×150mm**；70L：由 290×190 改做 **205×130mm**；100L：230×150mm | [官方] 同上 |
| 擺位 | 按人流、行人路闊度擺；擺喺**主要行人路口、公共運輸交匯處、巴士站、渡輪碼頭** | [官方] 同上；FEHD 年報 2023 第 4 章 https://www.fehd.gov.hk/tc_chi/publications/annualrpt/2023/4.html |
| 數量 | 全港街道廢屑箱 2023 年 **11,177 個**；深水埗 **535**、九龍城 **678**、灣仔 **800**、東區 **634**、油尖旺 666、葵青 605 | [官方] 立法會財委會答覆 EEB(F)105（2024-25）https://www.fehd.gov.hk/tc_chi/legco/2024-25/EEB(F)105.pdf |
| 外形尺寸（高、闊） | **未搵到官方數字** | — |
| 間距 | **未搵到官方數字** | — |
| 遊戲建議 | 130L 款約 0.5×0.45×1.0m；路口、巴士站一定擺，其餘每 40–60m 一個（同上面小結一樣） | [非官方·遊戲建議] |
| 郊區防野生動物新款 | 2022 年 9 月起喺受野豬／猴子滋擾地點用新款 | [官方] 立法會十四題 2024-03-13 https://www.info.gov.hk/gia/general/202403/13/P2024031300263.htm |

### D. 三色回收桶：已核實，市區街道唔放

- [官方] 環保署 2022 年 6 月起移除市區路邊回收桶，**2022 年底前基本完成移除市區約 800 套**；而家只喺**鄉郊**公眾地方保留大約 820 個。出處：減廢網「路邊回收桶」https://www.wastereduction.gov.hk/zh-hk/waste-reduction-programme/kerbside-recycling-bin
- [官方] 代替品係「綠在區區」社區回收網絡：12 個回收環保站、**82 個回收便利點**、約 **600 個回收流動點（街站）**，連智能回收箱總共超過 800 個公共收集點。出處：https://www.wastereduction.gov.hk/zh-hk/waste-reduction-programme/green-at-community
- 遊戲：深水埗、九龍城、灣仔、東區、油尖旺嘅街道**唔擺三色桶**。要表現回收，就喺舊樓區擺一個「回收便利點（戲仿）」舖面，或者假日擺一個流動街站；**唔用「綠在區區」真標誌**。
- 三色桶外形尺寸：**未搵到官方數字**（反正市區唔擺）。

### E. 路面標線（TPDM 第 3 冊第 5 章，2026 年 8 月版）

出處：TPDM V3 https://www.td.gov.hk/filemanager/en/content_5055/V3_08_2026.pdf ；法律依據 Cap.374G 附表 2 https://www.elegislation.gov.hk/hk/cap374G

| 標線 | 顏色 | 尺寸（mm） | 標記 |
|---|---|---|---|
| 顏色總則 | 行車用**白**（可以係銀或淺灰）；停車／停車限制用**黃**（BS5252F 008E51 類嘅鮮黃）；其他顏色要運輸署批 | — | [官方] 5.2.3 |
| 分線 RM1101（限速 <70） | 白 | 劃 **1000**、空 **5000**、闊 **100** | [官方] 表 5.4.2.1 |
| 分線 RM1102（限速 ≥70） | 白 | 劃 2000、空 7000、闊 100 | [官方] 表 5.4.2.1 |
| 中線 RM1103（單程路兩線雙向） | 白 | 劃 **3000**、空 **5000**、闊 100 | [官方] 表 5.4.2.2 |
| 警告線 RM1104（≤50km/h，路口前） | 白 | 劃 **4000**、空 **2000**、闊 100，最少 7 劃 | [官方] 表 5.4.2.3 |
| 雙白線 RM1001–1004 | 白 | 線闊**未搵到官方數字**（圖無標）；路闊 ≤6m 唔建議用；一段最少 70m；亦用嚟劃「電車專線」 | [官方] 5.3.2.2、5.3.2.4、5.3.2.27 |
| 停車線 RM1011 | 白 | 闊 **200** | [官方] 5.3.2.32 圖 |
| 雙停車線 RM1012（「停」牌路口） | 白 | 200＋空 300＋200 | [官方] 同上 |
| 讓路線 RM1013 | 白 | 兩行虛線，每劃 600、空 300、闊 200，兩行相隔 200 | [官方] 同上 |
| 單車徑停車線 RM1014／讓路線 RM1015 | 白 | 線闊 100，相隔 150；讓路劃 300、空 150 | [官方] 同上 |
| 雙黃線 RM1040（24 小時禁停）／單黃線 RM1041（時段禁停） | 黃 | 沿路邊劃，起點同終點要劃一條橫黃線；線闊**未搵到官方數字** | [官方] 5.3.2.54–58 |
| 黃格 RM1038 | 黃 | 斜線間距 **2000**，邊長超過 9000 就用 **2500**；線闊未搵到官方數字 | [官方] 第 5 章附錄 A2 |
| 斑馬線 RM1070 | 白間黑（第一條黑係瀝青本色） | 過路闊 **2500–9000**；每條白間 **500–700**；讓路線離路釘約 **1000** | [官方] 5.7.2.4–5.7.2.6 |
| 斑馬鋸齒線 | 白 | 標準 **8 劃、每劃 2m**，最多 18 劃；鋸齒寬 500 | [官方] 5.7.2.8、圖 5.7.2.1 |
| 燈位過路處 | 黃斜紋（建議）；白交叉格 RM1126 只係參考性 | — | [官方] 5.4.2.53 |
| 巴士站 RM1047/1048 | 黃（上面 §1 已寫） | 標準站長 **13m／26m／39m × 3m**；「BUS STOP」英文字高 1600、「巴士站」中文字高 2700 | [官方] 圖 5.3.2.14；5.8.2 |
| 巴士線 RM1006（實線）／RM1007（虛線劃 1000 空 1000） | 白 | 闊最少 **3m**（由石壆面量）；起點寫「BUS LANE 巴士綫」 | [官方] 表 5.5.3.2；TPDM V6 3.5.3.26 https://www.td.gov.hk/filemanager/en/content_5055/V6_08_2026.pdf |
| 巴士線紅色路面 | **未搵到官方依據**：TPDM 只寫白／黃，其他顏色要另批 | 遊戲**唔塗紅色巴士線**，用灰瀝青加白線同字 | [非官方·遊戲建議] |
| 電車站 RM1045/1046 | 黃色橫線（其他車要喺後面停）＋「TRAM STOP 電車站」字 | 車速 ≥50km/h 或者要過多過一條線就唔用，改用路中安全島 | [官方] 5.3.2.62–63 |
| 標線厚度 | 熱熔標線，高出路面**唔超過 6mm** | — | [官方] 5.2.4.4、5.2.5 |
| 瀝青顏色 | **未搵到官方數字** | 乾瀝青深灰約 sRGB #3a3a3c，修補塊淺少少 | [非官方·遊戲建議] |

### F. 石壆、行人路、單車徑

| 項目 | 數字 | 標記 |
|---|---|---|
| 石壆 | K1 預製混凝土，長 1000、闊 125、高 250，**露出車路面 125** | [官方] H1101E、H1118A |
| 過路處落壆 | 斜落到最低 **140**（行人過路處 K12） | [官方] HyD H1134（標準圖目錄 https://www.hyd.gov.hk/en/technical_references/standard_drawings/hyd_standard_drawings/section1.html） |
| 行人路 Through Zone 最少闊度 | 商業／高人流 **4.5m**；住宅一區 3.5m；住宅二、三區 3m；鄉郊 **2m**；市區盡量最少 **3m** | [官方] TPDM V6 表 10.5.5.1、10.5.5.2 |
| 街道設施及綠化帶 | **2.0m**（地點性高可以 3.0m）；巴士站上蓋闊過 1m 就再加最多 2m | [官方] 同上 |
| 行人路橫斜 | 2%–3.3% | [官方] TPDM V2 3.4.11.6 |
| 單車徑闊度 | 單程最少 2m（理想 2.8m）；雙程最少 3.5m（理想 4.0m）；同車路之間嘅分隔帶最少 1.8m | [官方] TPDM V2 表 3.8.3.1、3.8.3.4 |
| 舊區實況 | 深水埗、九龍城橫街好多達唔到上面標準（TPDM 3.4.11.5 都承認舊區受地方限制） | 遊戲：主幹 3–4.5m，橫街 1.5–2.5m [非官方·遊戲建議] |

### G. HUD 錢同罰款寫法

- 金額寫 **`HK$`** 加千位逗號，例如 `HK$1,500`、`HK$900`；唔用 `$` 綠色大字（照 `hud-de-gta-core27c.md`）。[非官方·遊戲規則]
- 交通罰款叫「**定額罰款**」，例如闖紅燈 HK$900，跟 `fines-official.json`（Cap.240）；亂拋垃圾嘅定額罰款係 **HK$1,500**（Cap.570，見上面 2016 新聞公報）。罰單 toast 寫「定額罰款通知書（戲仿）」。
- HUD 同罰單**唔印**任何政府部門徽號。

### H. 遊戲硬規則（重申）

- 欄杆、垃圾桶、回收點、路牌等道具**唔印真部門徽號或者 logo**；要有字就寫「（戲仿）」，例如「廢屑箱（戲仿）」。
- **禁相板**：全部用程序生成或者 3D 模型，唔貼實景相。
- 品牌一律用戲仿名，跟 `legal-*` 嗰幾份。

### I. 交收

| 邊個 | 做咩 |
|---|---|
| @關卡與地圖設計師 | 照 §B、§C、§F 擺欄杆、石墩、垃圾桶，同埋定行人路闊度；照 §E 改標線尺寸同顏色（虛線 1/5、中線 3/5、停車線 200）；市區唔擺三色桶 |
| @香港澳門台灣地道人 | 審樣：欄杆銀灰、垃圾桶橙色、黃線貼路邊、巴士線唔係紅色、舊區行人路窄 |
| @Grok Bot | 合並嗰陣收呢一節；**唔郁 Pages** |
