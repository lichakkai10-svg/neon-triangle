# core27b · 深水埗／九龍城 路牌＋燈位／車線偏移＋迴旋島 stub
負責人：@關卡與地圖設計師　審：@香港澳門台灣地道人（街名掛位／英文拼法）＋@gta團隊（試駕慢駛點）＋@政府部門/大公司（牌面）  
更新：2026-10-19 13:40 HKT · **冇 push、冇郁 Pages／vendor** · 禁相板 · 唔放葵涌 · Grok Bot 合  
來源：`docs/gov-core27-ssp-kc-signs.md`（label id）＋`data/core27-ssp-kc-spines.json`（OSM 街口，© OpenStreetMap contributors, ODbL 1.0）。座標＝hkGeo 遊戲單位（原點 22.355N 114.119E，K=1.5，−X 東，+Z 北）。

## 0. 交收檔案（dev 路徑 → neon-triangle-pages 目標）

| dev 檔（/workspace/neon-triangle） | 狀態 | 搬去 /workspace/neon-triangle-pages |
|---|---|---|
| `m1c/src/modZc_sspkc_signs_core27.js` | 新 | 貼入 `index.html` 嘅 `<script type="module">`，放喺 hk18 骨架段（`hk18BuildFromSkeleton`）之後、`boot` 之前（自帶 IIFE，fetch 自己啲 JSON） |
| `data/core27-ssp-kc-signs.json` | 新（生成） | `assets/data/core27-ssp-kc-signs.json`（module 會試 `data/`→`../data/`→`./assets/data/`） |
| `data/core27-ssp-kc-spines.json` | 改：城南道 `name_en`→`South Wall Road`；6 個 `design_inserts` 加 `type_resolved`＋`physical_id` | `assets/data/core27-ssp-kc-spines.json`（Pages 而家**未有**呢個檔） |
| `m1c/src/modYz_hk18.js` | 冇改（core27 讀 spines 段係上一版加） | Pages `index.html` 入面 hk18 段**未有** core27 spines 讀取 → 要連埋上一版 core27 段一齊搬 |
| `tools/core27_signs.py` | 新（生成器） | 唔使搬（留 dev） |
| `docs/core27b-ssp-kc-signs-signals-stub.md` | 新（本檔） | `docs/core27b-ssp-kc-signs-signals-stub.md`（可選） |
| `m1c/data/`、`m1c/assets/data/` 兩個 JSON 副本 | 本地試跑用 | 唔使搬 |

## 1. 數量

| 區 | 街名牌 | 入區牌 | 方向牌 | 設施通稱牌 | 合計 | Lite（Safari／iPhone／LOW_MEM） |
|---|---|---|---|---|---|---|
| `sham_shui_po` | 12 | 1 | 1 | 1 | 15 | 11 |
| `kowloon_city` | 11 | 1 | 4 | 2 | 18 | 15 |
| **合計** | | | | | **33** | 26 |

另：實體慢駛點 6（燈位過路處 4、車線偏移 2）、迴旋島碰撞 2。Lite 只略過非 primary 街名牌（每 label 留 1 面）、紋理半解像、略過斜紋／島上矮樹；**碰撞一樣**。

牌面：白底黑字細黑邊、上中文下英文（程序 canvas 字，冇真字型檔），離地 2.8（入區牌 3.4）；冇任何部門徽、冇霓虹。core27 入區牌出咗之後，`modYz_hk18` 嗰兩區 hub 藍牌＋霓虹短標會收埋（每區 ≤1 醒目區牌，跟 `gov-hk18-district-signs.md`）。

## 2. 牌表

| sign id | label id | 類 | 牌面（中／英） | x | z | 街口／掛點 |
|---|---|---|---|---|---|---|
| `ssp_st_apliu#1` | `ssp_st_apliu` | 街名 | 鴨寮街 / Apliu Street | -6433.23 | -3938.43 | 電子攤段西端（鴨寮街×欽州街） |
| `ssp_st_apliu#2` | `ssp_st_apliu` | 街名（Lite 略） | 鴨寮街 / Apliu Street | -6827.42 | -4256.65 | 電子攤段東端（鴨寮街×南昌街） |
| `ssp_st_peiho#1` | `ssp_st_peiho` | 街名 | 北河街 / Pei Ho Street | -6581.48 | -4283.73 | 街市一帶（北河街×基隆街） |
| `ssp_st_kweilin#1` | `ssp_st_kweilin` | 街名 | 桂林街 / Kweilin Street | -6551.94 | -4046.45 | 交鴨寮街口（桂林街×鴨寮街） |
| `ssp_st_kilung#1` | `ssp_st_kilung` | 街名 | 基隆街 / Ki Lung Street | -6743.15 | -4428.75 | 布行一帶（基隆街×南昌街） |
| `ssp_st_yuchau#1` | `ssp_st_yuchau` | 街名 | 汝州街 / Yu Chau Street | -6501.56 | -4105.5 | 布行／唐樓（汝州街×桂林街） |
| `ssp_st_namcheong#1` | `ssp_st_namcheong` | 街名 | 南昌街 / Nam Cheong Street | -6921.62 | -4213.77 | 主幹交口（南昌街×長沙灣道） |
| `ssp_st_namcheong#2` | `ssp_st_namcheong` | 街名（Lite 略） | 南昌街 / Nam Cheong Street | -6464.73 | -4763.48 | 界限街入口（南昌街×界限街，ssp_entry_boundary_nam_cheong） |
| `ssp_st_csw#1` | `ssp_st_csw` | 街名 | 長沙灣道 / Cheung Sha Wan Road | -7442.24 | -4617.66 | 可駛主幹入口（長沙灣道×大埔道，太子入口後第一個燈位） |
| `ssp_st_csw#2` | `ssp_st_csw` | 街名（Lite 略） | 長沙灣道 / Cheung Sha Wan Road | -6482.43 | -3833.34 | 主幹（長沙灣道×欽州街） |
| `ssp_st_castlepeak#1` | `ssp_st_castlepeak` | 街名 | 青山道 / Castle Peak Road | -6723.93 | -3536.02 | 可駛主幹（青山道×欽州街） |
| `ssp_st_castlepeak#2` | `ssp_st_castlepeak` | 街名（Lite 略） | 青山道 / Castle Peak Road | -6160.62 | -3065.04 | 可駛主幹（青山道×東京街） |
| `kc_st_ngatsinwai#1` | `kc_st_ngatsinwai` | 街名 | 衙前圍道 / Nga Tsin Wai Road | -10776.58 | -4318.41 | 街市／泰菜段（衙前圍道×侯王道，近九龍城街市） |
| `kc_st_ngatsinwai#2` | `kc_st_ngatsinwai` | 街名（Lite 略） | 衙前圍道 / Nga Tsin Wai Road | -10499.09 | -4307.6 | 街市／泰菜段西口（衙前圍道×聯合道） |
| `kc_st_kcroad#1` | `kc_st_kcroad` | 街名 | 九龍城道 / Kowloon City Road | -11188.18 | -5241.9 | 主幹（九龍城道×宋皇臺道） |
| `kc_st_namkok#1` | `kc_st_namkok` | 街名 | 南角道 / Nam Kok Road | -10945.63 | -4323.62 | 泰菜街一帶（南角道×衙前圍道） |
| `kc_st_lionrock#1` | `kc_st_lionrock` | 街名 | 獅子石道 / Lion Rock Road | -10676.31 | -4313.92 | 泰菜／街市一帶（獅子石道×衙前圍道） |
| `kc_st_hauwong#1` | `kc_st_hauwong` | 街名 | 侯王道 / Hau Wong Road | -10787.01 | -4036.0 | 侯王廟方向（侯王道北口×賈炳達道） |
| `kc_st_pedeast#1` | `kc_st_pedeast` | 街名 | 太子道東 / Prince Edward Road East | -11199.86 | -4460.35 | 可駛主幹西端（太子道東×太子道西／九龍城天橋） |
| `kc_st_pedeast#2` | `kc_st_pedeast` | 街名（Lite 略） | 太子道東 / Prince Edward Road East | -12878.12 | -3273.68 | 可駛主幹接啟德（太子道東×四美街） |
| `kc_st_southwall#1` | `kc_st_southwall` | 街名 | 城南道 / South Wall Road | -11116.29 | -4341.89 | 泰菜街一帶（城南道×衙前圍道） |
| `kc_st_argyle#1` | `kc_st_argyle` | 街名 | 亞皆老街 / Argyle Street | -9988.51 | -5139.93 | 可駛主幹（亞皆老街×天光道） |
| `kc_st_argyle#2` | `kc_st_argyle` | 街名（Lite 略） | 亞皆老街 / Argyle Street | -10483.9 | -4865.44 | 可駛主幹近迴旋（亞皆老街×富寧街） |
| `district_entry_sham_shui_po` | `sham_shui_po` | 入區 | 深水埗 / Sham Shui Po | -7535.26 | -4716.26 | 太子入口（彌敦道北端轉長沙灣道，油尖旺北）入口後 22 單位 |
| `district_entry_kowloon_city` | `kowloon_city` | 入區 | 九龍城 / Kowloon City | -11879.18 | -3774.83 | 太子道東近彩虹道口（由新蒲崗／黃大仙方向西行入九龍城） |
| `dir_ssp_to_mong_kok` | `dir_ssp_to_mong_kok` | 方向 | 往 旺角 / To Mong Kok | -7140.7 | -4380.47 | 深水埗主幹出口：長沙灣道東南行近黃竹街 |
| `dir_kc_to_kai_tak` | `dir_kc_to_kai_tak` | 方向 | 往 啟德 / To Kai Tak | -11383.63 | -4268.14 | 九龍城往啟德：太子道東東行近世運道口 |
| `dir_kc_to_kai_tak_stn` | `dir_kc_to_kai_tak_stn` | 方向 | 往 啟德站 / To Kai Tak Station | -13233.8 | -3609.98 | 承啟道迴旋處出口南行（承啟道×沐虹街） |
| `dir_kc_to_sung_wong_toi_stn` | `dir_kc_to_sung_wong_toi_stn` | 方向 | 往 宋皇臺站 / To Sung Wong Toi Station | -10887.59 | -4871.01 | 九龍城迴旋處出口南行（馬頭涌道×幸運道） |
| `dir_kc_to_sham_shui_po` | `dir_kc_to_sham_shui_po` | 方向 | 往 深水埗 / To Sham Shui Po | -10247.65 | -4661.01 | 九龍城往深水埗：太子道西西行近露明道 |
| `fac_ssp_market` | `fac_ssp_market` | 設施 | 街市 / Market | -6452.1 | -4236.1 | 北河街街市 |
| `fac_kc_market` | `fac_kc_market` | 設施 | 九龍城街市（戲仿） / Market | -10811.7 | -4277.6 | 九龍城街市（衙前圍道市政大樓） |
| `fac_kc_walled_city_park` | `fac_kc_walled_city_park` | 設施 | 九龍寨城公園 / Kowloon Walled City Park | -11006.3 | -3784.9 | 九龍寨城公園（中式園林；唔重建城寨大樓） |

規則自檢（`tools/core27_signs.py` 會 fail）：同一街口（15 單位內）最多 1 面街名牌 ✅；方向牌兩兩相隔 ≥400 單位（唔會喺同一直路連續掛）✅；冇「九龍城站」✅；全部 |x|>3000（唔落葵涌）✅。

## 3. design_not_osm 6 點 → 實體（gta 要求：要真係慢落嚟）

| id | 類 | 路 | at_m | x | z | 做咗咩 |
|---|---|---|---|---|---|---|
| `kc27_calm_prince_edward_rd_e_1` | 燈位過路處 | 太子道東 | 751.3 | -12409.4 | -3454.0 | 燈柱×2（紅黃綠循環 14 s）＋兩邊停車線＋斑馬線＋中央安全島（1.2×6，碰撞＋護柱）＋兩邊路緣伸出（碰撞，收窄每邊車道至約 3.3） |
| `kc27_calm_prince_edward_rd_e_2` | 車線偏移 | 太子道東 | 1407.4 | -11630.3 | -4027.4 | 兩粒左右交錯路緣島（各佔半路、長 6、相隔 16）＋每島 4 支護柱＋島前斜紋；碰撞迫 S 形 |
| `kc27_calm_junction_rd_1` | 燈位過路處 | 聯合道 | 1342.0 | -10256.1 | -2726.7 | 燈柱×2（紅黃綠循環 14 s）＋兩邊停車線＋斑馬線＋中央安全島（1.2×6，碰撞＋護柱）（8 闊路唔做路緣伸出） |
| `kc27_calm_shing_kai_rd_1` | 燈位過路處 | 承啟道 | 581.7 | -13239.8 | -4248.9 | 燈柱×2（紅黃綠循環 14 s）＋兩邊停車線＋斑馬線＋中央安全島（1.2×6，碰撞＋護柱）＋兩邊路緣伸出（碰撞，收窄每邊車道至約 3.3） |
| `kc27_calm_olympic_ave_1` | 燈位過路處 | 世運道 | 166.3 | -11045.8 | -4735.5 | 燈柱×2（紅黃綠循環 14 s）＋兩邊停車線＋斑馬線＋中央安全島（1.2×6，碰撞＋護柱）＋兩邊路緣伸出（碰撞，收窄每邊車道至約 3.3） |
| `kc27_calm_sung_wong_toi_rd_1` | 車線偏移 | 宋皇臺道 | 478.6 | -11412.1 | -5342.0 | 兩粒左右交錯路緣島（各佔半路、長 6、相隔 16）＋每島 4 支護柱＋島前斜紋；碰撞迫 S 形 |

全部仍標 `source: design_not_osm`（OSM 冇呢啲路口）。紅燈而家只係視覺，未接罰款／NPC 停車。

## 4. 迴旋島碰撞（跟 `kwEnforceElbowDrive` 做法：路緣圓台＋addCollider）

| id | 名 | x | z | 島半徑 | 環路半徑 | 最近 spine 距離 |
|---|---|---|---|---|---|---|
| `kc27_rb_shing_kai` | 承啟道迴旋處 | -13083.7 | -3358.9 | 11.0 | 24.0 | 42.1（`kc_concorde_rd`） |
| `kc27_rb_kowloon_city` | 九龍城迴旋處 | -10927.0 | -4607.3 | 13.0 | 28.0 | 62.9（`kc_argyle_st`） |

碰撞＝十字兩條＋內接方 3 個 AABB（貼圓唔出界）；島半徑以外 20 單位實測冇擋。

## 5. 冇掛到／要留意

- 全部 16 個 gov label id 都掛咗。`kc_st_kcroad` 九龍城道喺 spines 冇自己條線，牌掛喺宋皇臺道 × 九龍城道街口（宋皇臺道 spine 有呢個 junction）。
- 九龍城入區牌：spines 冇叫「太子道東入口」嘅 entry id，所以掛喺太子道東近彩虹道口（由新蒲崗／黃大仙方向西行入九龍城；啟德本身屬九龍城區）。
- 設施牌只掛咗街市 ×2 同九龍寨城公園門牌。gov 提嘅「熟食中心」同「巴士站」冇另外掛：巴士站 `modZb` 已經有，熟食中心冇座標。

## 6. 驗證

- `python3 tools/build_m1c.py` ✅
- 用 headless Chromium（swiftshader）載 `m1c/index.html`，普通同 `?lowmem` 各跑一次：0 console error／0 pageerror；`[core27b] signs 33 (lite 26), calming 6, islands 2`。
- 碰撞點測 20 個（安全島／偏移島要擋，旁邊車道要通）全部符合，Lite 一樣。
