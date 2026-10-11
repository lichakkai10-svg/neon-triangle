# 葵涌／葵青貨櫃碼頭 — 真實佈局與重建規格

負責人：@關卡與地圖設計師 + @爬蟲與資料庫專家 + @美術  
範圍：序章起點「葵涌八號碼頭」場景重建（唔再係一條大直路）  
更新：2026-10-10 23:10 HKT  
**禁止**：下載／嵌入 Google Earth／Google 3D 網格。Google Earth **只可目視參考**。幾何來源優先 **OSM（ODbL）** + **LandsD 高度**（見下方路徑）。

---

## 0. 命名

| 常用名 | 正式／現況 | 遊戲戲仿 |
|---|---|---|
| 葵涌貨櫃碼頭 | 早期名；民間仍常用 | 對外可用「葵涌碼頭」 |
| **葵青貨櫃碼頭** Kwai Tsing Container Terminals | 官方現名（含青衣 CT9） | 地標文案：`葵涌貨櫃碼頭（戲仿）`（`modYe_landmarks.js` `kwai_chung_pier`） |
| KTCT / HIT / MTL / ACT / CHT | 營運商縮寫 | **唔用真 logo／真招牌**；數字 berth／crane 可寫實 |

座標原點（現碼）：`22.355N, 114.119E`（葵涌 Berth 8 一帶）— `modYe_landmarks.js`／`MAP_SPEC_HK`。

---

## 1. 真實地理：三 part 骨架（對應用戶「有三 part」）

整體在 **藍巴勒海峽（Rambler Channel）** 兩岸：葵涌岸 + **青衣島**，唔係一塊普通半島「一條直路伸出去」。

### Part A — 葵涌岸傳統碼頭（CT1–CT7 一帶）

- 沿葵涌填海岸線南北展開，面向藍巴勒海峽。
- 營運商混雜：**MTL**（CT1/2/5）、**DP World HK**（CT3）、**HIT**（CT4/6/7）。
- 陸上經 **貨櫃碼頭路／葵涌道** 接九龍工業區；唔係一條無限長直線穿過整個堆場。
- 遊戲序章「八號碼頭」敘事可錨在 **CT8 鄰近／葵涌側深水泊位**，但視覺要連到 Part B/C，唔好縮成單直線。

### Part B — 昂船洲／石岬方向延伸（CT8 East + CT8 West）

- **CT8E**（COSCO-HIT／CHT）：約 2 泊位、岸線約 640 m、水深約 15.5 m。
- **CT8W**（ACT）：約 2 泊位、岸線約 740 m。
- 相對 Part A 更偏東南／昂船洲填海方向；與葵涌主堆場之間有閘口、內港池／航道彎，**唔係同一條直車路貫穿**。

### Part C — 青衣島 CT9（用戶「仲係一個島」嘅核心）

- **CT9 North**（HIT）+ **CT9 South**（MTL）：青衣西南岸，面向海峽對岸葵涌碼頭。
- 青衣＝有道路／橋隧連住嘅島；碼頭堆場在島西南，島北／西接路網。
- 對玩家體感：過海峽（渡輪／橋隧／遠景）先到對岸吊機牆，而唔係同一直線貨櫃巷。

### 三 part 示意（文字）

```
        [汀九橋]──► 青衣北／西北
                         │
        [青馬大橋]──► 青衣西 ──► 馬灣／大嶼山（機場方向）
                         │
                    ┌────┴────┐
                    │ 青衣島   │  Part C: CT9N / CT9S + 岸吊
                    │  CT9    │
                    └────┬────┘
           藍巴勒海峽 ◄──┼──► 藍巴勒海峽
                    ┌────┴────┐
   葵涌岸 Part A    │ CT1–7   │──貨櫃碼頭路──► 葵涌／九龍
   （序章可玩堆場） │ 堆場+吊 │
                    └────┬────┘
                         │ 岸線彎向東南
                    Part B: CT8E / CT8W（昂船洲側）
```

**總量級（港府／業界公開數字，重建用比例尺）**

| 項 | 約數 | 來源類型 |
|---|---|---|
| 碼頭數 | 9 個 terminal（CT1–9，8／9 再分東西／南北） | Wikipedia / HKMPDB |
| 深水泊位 | **24** berths | hkmpdb.gov.hk |
| 岸線 | 約 **7,794 m** | 同上 |
| 土地 | 約 **279 ha** | 同上 |
| 海盆水深 | 約 15 m（航道加深後更深） | 同上 |
| HIT 系（T4/6/7/9N 等）岸吊 | 數十台 quay crane 量級 | hit.com.hk Key Facts |

---

## 2. 橋隧連接（青衣島「連青馬／汀九」）

| 結構 | 角色 | 遊戲遠景／可達建議 |
|---|---|---|
| **青馬大橋** Tsing Ma Bridge | 青衣 ↔ 馬灣／大嶼山（機場、北大嶼山公路） | P0：遠景剪影＋夜間航空燈；P1：簡化引道可駛 |
| **汀九橋** Ting Kau Bridge | 青衣西北 ↔ 汀九／屯門公路（新界西北） | 同上；貨櫃車走廊敘事 |
| 長青橋／長青隧道等 | 葵涌／青衣之間本土連接（Route 3 走廊） | 過海峽可視為「短橋隧」載入鄰近 zone |
| 藍巴勒海峽水面 | CT 葵涌岸 ↔ CT9 對望 | **必有水面＋對岸吊機剪影**（而家只有單側海＋4 台剪影吊機） |

參考（佈局／橋）：  
- https://en.wikipedia.org/wiki/Kwai_Tsing_Container_Terminals  
- https://www.hkmpdb.gov.hk/en/port.html  
- https://www.hit.com.hk/en/About-Hit/Terminal-Layout.html  
- https://en.wikipedia.org/wiki/Ting_Kau_Bridge  

---

## 3. 吊機、船、泊位（視覺真實清單）

### 3.1 岸吊 Quay crane（門式）

- 跨軌門架、長吊臂伸向水面、機房、頂部紅燈（航空障礙燈）。
- 沿**彎曲岸線**疏落排列（每 berth 數台），唔好只喺直路邊擺 4 個剪影。
- HIT 公開量級：單一營運商組已有數十台 quay crane + RTG／RMG（堆場用）。

### 3.2 堆場設備

- **RTG**（輪胎龍門吊）／**RMG**（軌道龍門吊）行貨櫃巷。
- 正面吊／堆高機、拖車頭＋車架、空櫃區。
- ISO 櫃：20′／40′（現碼 `CONT` 尺寸 OK：2.44×2.59×6.06／12.19 m）。

### 3.3 船／泊位

- 沿岸 **berth 編號牌**（戲仿「第 N 號泊位」，可保留「8」作序章錨）。
- 至少 1–2 艘 **大型貨櫃船剪影／低面數 hull** 泊岸（甲板櫃可 instance）；遠景再加航行燈點。
- 躉船／駁船 berth（HIT 有 barge berths）可作 P1。
- 水面：油污色帶、護舷、纜樁、黃黑防撞欄。

### 3.4 建築／交通

- 閘口、地磅、海關／保安亭、堆場照明高桅燈、變電／機房、工人宿舍／辦公室低層。
- 車路：**多段直角／斜接**、環形行車、雙線＋路邊黃線；貨櫃車專用闊彎。
- **唔好**：單一 `ROAD_HALF` 直路貫穿 ±172 m 堆場中軸。

---

## 4. 而家遊戲做錯咗咩（對碼）

來源：`m1c/src/game1.js`、`game2.js`、`mod3c_osm.js`、`reference/MAP_SPEC_HK.txt`。

| 現況 | 問題 |
|---|---|
| 「葵涌貨櫃碼頭 **8 號泊位**」單一長方形圍欄 `BOUND ≈ ±28.5 × ±186 m` | 尺度像一條封閉直巷，唔似 279 ha／多 terminal 盆地 |
| 中央雙白線直路 `ROAD_HALF=7`，貨櫃列對稱夾路 `ROW_X0`／`YARD_Z=172` | **一條大直路**夾兩排櫃——用戶明確點名錯 |
| 海只放在 `BOUND.x + 36` 一側；4 台剪影吊機 `cz ∈ {-70,-5,60,125}` | 缺對岸青衣 CT9、缺船、缺彎岸多泊位 |
| MAP_SPEC：「keep the existing docks unchanged」＋葵涌→油尖旺簡化快速公路 | 早期 milestone 合理；而家用戶要求真實化 → **要重建** |
| `OSM_KWAICHUNG` 遠景樓塊（`mod1_osmdata.js`） | 有 OSM 輪廓，但碼頭玩法空間仍係直路堆場，未表達三 part |
| 無青馬／汀九遠景 | 青衣「島＋橋」敘事缺失 |

---

## 5. 資料路徑（已有，勿 Google mesh）

| 路徑 | 用途 |
|---|---|
| `/workspace/neon-triangle/tools/osm/kwaichung.json` | OSM 原始擷取（ODbL） |
| `/workspace/neon-triangle/tools/osm/kc2.json`、`parsed.json` | 轉換中間檔 |
| `/workspace/neon-triangle/tools/osm/convert.py`、`fetch.sh` | 重建 pipeline |
| `/workspace/neon-triangle/m1c/src/mod1_osmdata.js` | 已 bake 嘅 `OSM_KWAICHUNG` |
| `/workspace/neon-triangle/m1c/src/mod3c_osm.js` | 葵涌＋青衣遠景合併網格 |
| `/workspace/neon-triangle/tools/osm/hk/landsd_heights.json` | LandsD 高度（地標／樓高） |
| `/workspace/neon-triangle/tools/landsd/` | `heights.py` 等工具 |

重建原則：

1. 用 OSM 岸線／碼頭 polygon／道路畫 **三 zone footprint**（A 葵涌岸、B CT8、C 青衣 CT9）。  
2. LandsD 只補高度／關鍵建築；櫃、吊、船用程序化／CC0。  
3. Google Earth：**對照照片級參考 OK**；禁止任何 Google 3D tiles／網格下載嵌入。

---

## 6. P0 props 清單（聽日可玩後重建用）

稀疏、寫實、唔 cyber。建議新模組名：`modYs_kwai_terminal.js`（或擴 `game1`/`game2` dock 段）。戲仿名，禁真營運商標。

### 6.1 地形／區分

| id | 說明 | 優先 |
|---|---|---|
| `kt_part_a_yard` | 葵涌岸可玩堆場（縮比例，仍多段路） | P0 |
| `kt_part_b_ct8_hint` | CT8 方向閘／岸彎＋遠景櫃 | P0 |
| `kt_part_c_tsingyi_skyline` | 對岸青衣 CT9 吊機牆＋燈 | P0 |
| `kt_rambler_water` | 海峽水面（兩岸之間） | P0 |
| `kt_tsing_ma_silhouette` | 青馬橋遠景剪影 | P0 |
| `kt_ting_kau_silhouette` | 汀九橋遠景剪影 | P0 |

### 6.2 吊機／船／泊位

| id | 說明 | 優先 |
|---|---|---|
| `quay_crane_xN` | 岸吊 ≥6（兩岸分布），紅燈閃 | P0 |
| `rtg_sparse` | 堆場 RTG 2–4 台靜態 | P1 |
| `berth_ship_loom` | 泊岸貨櫃船 1–2（低面） | P0 |
| `bollard_fender` | 纜樁＋護舷一排 | P0 |
| `berth_sign_8` | 「8 號泊位」地面／牌（戲仿） | P0 |

### 6.3 路／市政

| id | 說明 | 優先 |
|---|---|---|
| `yard_road_elbow` | 直角／斜接車路（取代單一直路） | P0 |
| `double_white_segment` | 分段雙白線（跟彎） | P0 |
| `gatehouse_weighbridge` | 閘口＋地磅 | P0 |
| `high_mast_light` | 高桅工礦燈 | P0 |
| `barrier_yb_port` | 黃黑欄／碼頭黃線（跟 `gov-municipal-street-props`） | P0 |
| `trailer_park_slot` | 拖車位黃格稀疏 | P1 |

### 6.4 櫃／碰撞

| id | 說明 | 優先 |
|---|---|---|
| `container_blocks_aisle` | 櫃列改「巷＋死巷」，唔對稱夾直路 | P0 |
| `empty_stack_zone` | 空櫃區一角 | P1 |

---

## 7. 分期建議（唔郁 Pages／vendor）

| 階段 | 內容 | 備註 |
|---|---|---|
| **P0 佈局** | 拆直路 → 肘形路＋單側主海＋對岸剪影＋船＋≥6 岸吊 | 保持序章可玩；draw calls 盯 ≤250／zone |
| **P1 三 zone stream** | Part A 可玩；B／C LOD／遠景；橋可駛簡化 | 接 `mod1d_hkcore` 空間索引 |
| **P2** | RTG 動線、更多 berth 牌、駁船 | 美術換真比例車模後再加 |

---

## 8. 對齊其他 docs

- 街景真實：`docs/streetscape-authenticity-checklist.md`（碼頭黃線、欄杆）  
- 市政 props：`docs/gov-municipal-street-props.md`  
- 地圖總規：`reference/MAP_SPEC_HK.txt`（本檔生效後，「keep docks unchanged」改為「跟本檔重建」）  
- 法律／商標：真 HIT／MTL／船公司色可作**無 logo 色塊**；禁真商標貼圖（`docs/legal-risk-and-parody-assets.md`）

---

## 9. 驗收（QA）

- [ ] 俯視／小地圖唔再係「一條直隧道夾兩排櫃」  
- [ ] 見到海峽對岸吊機或橋剪影（青馬或汀九至少一個）  
- [ ] 至少一艘岸邊船  
- [ ] 岸吊 ≥6 且沿岸分布  
- [ ] 無 Google 3D 資產；OSM／LandsD／CC0 有記 CREDITS  
- [ ] iPhone LDR 路徑無新巨型 GLB（船／吊優先程序化）


---

## 地道人審核（2026-10-10 23:12）

**✅ 通過。** 三 part（葵涌岸／CT8／青衣 CT9）＋藍巴勒海峽＋青馬／汀九遠景＋禁直路穿堆場——同 `kwai-tsing-port-authenticity-brief.md` 一致。長青橋作本土接駁寫得啱。戲仿名／無真營運商標 OK。等 @關卡與地圖設計師 stub 再逐區 ✅。
