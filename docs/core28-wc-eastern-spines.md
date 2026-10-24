# core28 · 灣仔＋東區可駛主幹、入口、減速點

負責：關卡與地圖設計師 ｜ 2026-10-19（HKT）｜ 數據：`data/core28-wc-eastern-spines.json`（schema 同 core27）｜ 產生器：`tools/osm/core28_wc_eastern_spines.py`

來源：OSM Overpass（ODbL，© OpenStreetMap contributors）。原始數據喺 `data/osm_raw/wc_east_allroads_core28.json` 同 `wc_east_signals_core28.json`，bbox 22.262,114.160 → 22.296,114.226。路名跟爬蟲嘅 core28 數據包（`osm-wc|east-drive-extrude-core28.json`）。hkGeo：原點 22.355N 114.119E，K=1.5，−X 係東，+Z 係北。

## 規則
- 直路超過 400 game 單位，一定要有**實體**減速點：電車站島、斑馬線、燈位、lane-shift 安全島，全部有碰撞。設計插入一律 `source: design_not_osm`，±20 m 內有真 OSM 燈位／過路處就吸附過去（記錄喺 `snapped_osm`）。
- **唔可以駛（今版）**：告士打道、東區走廊、東區海底隧道引道。唔出主幹；真實側路上斜嘅位置放有碰撞嘅水馬，掛「道路封閉 ROAD CLOSED」。
- 葵涌唔放任何嘢（模組 |x|<3000 直接略過）。

## 灣仔區（`wan_chai`）— 最長直路 **374.6**（插入前 2271.8；設計插入 23；電車站島 22；violations 0）

| id | 路 | 級別 | 闊 | 長(game) | 電車 | 插入前最長 | **最長** | 插入 | 電車站 |
|---|---|---|---|---|---|---|---|---|---|
| `wc_hennessy_rd` | 軒尼詩道 Hennessy Road | trunk | 11 | 2791.7 | 有 0.61 | 1424.2 | **374.6** | 4 | 6 |
| `wc_jaffe_rd` | 謝斐道 Jaffe Road | connector | 8 | 874.1 | — | 874.1 | **226.2** | 3 | 0 |
| `wc_lockhart_rd` | 駱克道 Lockhart Road | connector | 8 | 2558.2 | — | 2271.8 | **296.7** | 7 | 0 |
| `wc_harbour_rd` | 港灣道 Harbour Road | trunk | 11 | 1021.0 | — | 859.1 | **230.1** | 3 | 0 |
| `wc_queens_rd_east` | 皇后大道東 Queen's Road East | inner | 8 | 2138.3 | — | 1328.1 | **355.0** | 3 | 0 |
| `wc_johnston_rd` | 莊士敦道 Johnston Road | inner | 8 | 1329.2 | 有 1.0 | 357.1 | **357.1** | 0 | 5 |
| `wc_leighton_rd` | 禮頓道 Leighton Road | trunk | 11 | 1286.0 | — | 474.4 | **250.9** | 1 | 0 |
| `wc_kennedy_rd` | 堅尼地道 Kennedy Road | connector | 8 | 2462.7 | — | 253.9 | **253.9** | 0 | 0 |
| `wc_morrison_hill_rd` | 摩理臣山道 Morrison Hill Road | connector | 8 | 708.5 | 有 0.56 | 320.9 | **320.9** | 0 | 0 |
| `wc_wong_nai_chung_rd` | 黃泥涌道 Wong Nai Chung Road | connector | 8 | 1287.7 | 有 1.0 | 510.3 | **299.9** | 1 | 3 |
| `wc_causeway_rd` | 高士威道 Causeway Road | trunk | 11 | 758.6 | 有 1.0 | 289.3 | **289.3** | 0 | 4 |
| `wc_yee_wo_st` | 怡和街 Yee Wo Street | trunk | 11 | 531.9 | 有 0.95 | 136.8 | **136.8** | 0 | 4 |
| `wc_tung_lo_wan_rd` | 銅鑼灣道 Tung Lo Wan Road | inner | 8 | 1278.5 | — | 427.7 | **303.4** | 1 | 0 |

## 東區（`eastern`）— 最長直路 **384.8**（插入前 1436.9；設計插入 18；電車站島 16；violations 0）

| id | 路 | 級別 | 闊 | 長(game) | 電車 | 插入前最長 | **最長** | 插入 | 電車站 |
|---|---|---|---|---|---|---|---|---|---|
| `east_kings_rd` | 英皇道 King's Road | trunk | 11 | 6314.2 | 有 0.88 | 542.0 | **377.5** | 4 | 15 |
| `east_java_rd` | 渣華道 Java Road | connector | 8 | 2395.8 | — | 1436.9 | **359.2** | 6 | 0 |
| `east_electric_rd` | 電氣道 Electric Road | connector | 8 | 965.0 | — | 769.6 | **384.8** | 1 | 0 |
| `east_watson_rd` | 屈臣道 Watson Road | inner | 8 | 231.4 | — | 231.4 | **231.4** | 0 | 0 |
| `east_quarry_bay_st` | 鰂魚涌街 Quarry Bay Street | inner | 8 | 495.2 | — | 191.9 | **191.9** | 0 | 0 |
| `east_taikoo_shing_rd` | 太古城道 Taikoo Shing Road | connector | 8 | 1409.6 | — | 831.1 | **284.6** | 3 | 0 |
| `east_taikoo_wan_rd` | 太古灣道 Taikoo Wan Road | connector | 8 | 968.5 | — | 968.5 | **242.2** | 3 | 0 |
| `east_kornhill_rd` | 康山道 Kornhill Road | connector | 8 | 552.6 | 有 1.0 | 303.3 | **303.3** | 0 | 1 |
| `east_braemar_hill_rd` | 寶馬山道 Braemar Hill Road | connector | 8 | 1478.3 | — | 136.3 | **136.3** | 0 | 0 |
| `east_tin_hau_temple_rd` | 天后廟道 Tin Hau Temple Road | connector | 8 | 2951.4 | — | 500.3 | **331.9** | 1 | 0 |

## 中西區（金鐘接口）（`central_west`）— 最長直路 **265.3**（插入前 447.0；設計插入 1；電車站島 3；violations 0）

| id | 路 | 級別 | 闊 | 長(game) | 電車 | 插入前最長 | **最長** | 插入 | 電車站 |
|---|---|---|---|---|---|---|---|---|---|
| `cw28_queensway_link` | 金鐘道 Queensway (Admiralty link) | trunk | 11 | 1159.9 | 有 1.0 | 447.0 | **265.3** | 1 | 3 |

電車：莊士敦道 1.00、軒尼詩道 0.61、英皇道 0.88 都標 `tram:true`，連 `tram_coverage`。`tram_tracks` 逐區列出路軌線；`tram_stops` 喺 OSM `railway=tram_stop` 原位，40 m 內嘅合併。

## 設計減速點（42 個，全部 design_not_osm、實體）

類型：{'ped_crossing_signal': 32, 'lane_shift': 10}；吸附真 OSM 節點：17/42。

| id | 路 | 類型 | lat, lon | x, z | 吸附 |
|---|---|---|---|---|---|
| `wc_hennessy_rd_calm_1` | 軒尼詩道 | ped_crossing_signal | 22.277684, 114.170534 | -7958.5, -12823.7 | node 11142553041 crossing:traffic_signals 3.7 m |
| `wc_hennessy_rd_calm_2` | 軒尼詩道 | ped_crossing_signal | 22.277621, 114.172793 | -8307.3, -12834.1 | — |
| `wc_hennessy_rd_calm_3` | 軒尼詩道 | ped_crossing_signal | 22.277851, 114.174965 | -8642.7, -12796.0 | node 9736395028 crossing:traffic_signals 12.3 m |
| `wc_hennessy_rd_calm_4` | 軒尼詩道 | ped_crossing_signal | 22.278804, 114.17948 | -9339.9, -12638.0 | node 6781156040 traffic_signals 19.0 m |
| `wc_jaffe_rd_calm_1` | 謝斐道 | ped_crossing_signal | 22.278677, 114.17311 | -8356.3, -12659.0 | node 12121601406 crossing:unmarked 3.9 m |
| `wc_jaffe_rd_calm_2` | 謝斐道 | lane_shift | 22.278603, 114.17173 | -8143.2, -12671.3 | node 3066150338 crossing:uncontrolled 2.3 m |
| `wc_jaffe_rd_calm_3` | 謝斐道 | ped_crossing_signal | 22.278724, 114.170304 | -7923.0, -12651.2 | node 8916755065 crossing:traffic_signals 2.9 m |
| `wc_lockhart_rd_calm_1` | 駱克道 | ped_crossing_signal | 22.279927, 114.181126 | -9594.2, -12451.7 | node 10962872861 crossing:unmarked 10.2 m |
| `wc_lockhart_rd_calm_2` | 駱克道 | lane_shift | 22.279327, 114.179529 | -9347.6, -12551.3 | node 2987721674 crossing:traffic_signals 3.6 m |
| `wc_lockhart_rd_calm_3` | 駱克道 | ped_crossing_signal | 22.278802, 114.177742 | -9071.5, -12638.3 | node 2995468923 crossing:traffic_signals 1.9 m |
| `wc_lockhart_rd_calm_4` | 駱克道 | lane_shift | 22.278452, 114.175951 | -8795.0, -12696.4 | — |
| `wc_lockhart_rd_calm_5` | 駱克道 | ped_crossing_signal | 22.278255, 114.174125 | -8512.9, -12729.0 | — |
| `wc_lockhart_rd_calm_6` | 駱克道 | lane_shift | 22.278069, 114.172297 | -8230.6, -12759.8 | — |
| `wc_lockhart_rd_calm_7` | 駱克道 | ped_crossing_signal | 22.278181, 114.170484 | -7950.8, -12741.3 | node 1619220582 crossing:traffic_signals 2.0 m |
| `wc_harbour_rd_calm_1` | 港灣道 | ped_crossing_signal | 22.280768, 114.175525 | -8729.3, -12312.2 | — |
| `wc_harbour_rd_calm_2` | 港灣道 | ped_crossing_signal | 22.280666, 114.174137 | -8514.9, -12329.1 | node 5478192365 traffic_signals 0.3 m |
| `wc_harbour_rd_calm_3` | 港灣道 | ped_crossing_signal | 22.280552, 114.172653 | -8285.6, -12348.0 | node 5478192364 crossing:uncontrolled 10.4 m |
| `wc_queens_rd_east_calm_1` | 皇后大道東 | ped_crossing_signal | 22.276606, 114.169357 | -7776.6, -13002.5 | node 13343829123 crossing:unmarked 18.7 m |
| `wc_queens_rd_east_calm_2` | 皇后大道東 | lane_shift | 22.275538, 114.170913 | -8017.0, -13179.7 | node 11155905461 traffic_signals 6.8 m |
| `wc_queens_rd_east_calm_3` | 皇后大道東 | ped_crossing_signal | 22.274576, 114.172826 | -8312.4, -13339.2 | — |
| `wc_leighton_rd_calm_1` | 禮頓道 | ped_crossing_signal | 22.278141, 114.186428 | -10412.9, -12747.9 | — |
| `wc_wong_nai_chung_rd_calm_1` | 黃泥涌道 | ped_crossing_signal | 22.275291, 114.183002 | -9883.9, -13220.6 | — |
| `wc_tung_lo_wan_rd_calm_1` | 銅鑼灣道 | ped_crossing_signal | 22.280872, 114.192085 | -11286.6, -12295.0 | — |
| `east_kings_rd_calm_1` | 英皇道 | ped_crossing_signal | 22.29093, 114.198781 | -12320.7, -10626.8 | node 4237662017 traffic_signals 1.3 m |
| `east_kings_rd_calm_2` | 英皇道 | ped_crossing_signal | 22.291585, 114.202002 | -12818.0, -10518.0 | — |
| `east_kings_rd_calm_3` | 英皇道 | ped_crossing_signal | 22.287071, 114.210438 | -14120.8, -11266.8 | — |
| `east_kings_rd_calm_4` | 英皇道 | ped_crossing_signal | 22.285168, 114.217827 | -15262.0, -11582.5 | — |
| `east_java_rd_calm_1` | 渣華道 | ped_crossing_signal | 22.292068, 114.207873 | -13724.8, -10437.9 | — |
| `east_java_rd_calm_2` | 渣華道 | lane_shift | 22.292439, 114.20662 | -13531.2, -10376.5 | — |
| `east_java_rd_calm_3` | 渣華道 | ped_crossing_signal | 22.292803, 114.205297 | -13327.0, -10316.1 | node 7252175605 crossing:unmarked 6.9 m |
| `east_java_rd_calm_4` | 渣華道 | lane_shift | 22.29265, 114.201821 | -12790.1, -10341.4 | — |
| `east_java_rd_calm_5` | 渣華道 | ped_crossing_signal | 22.292181, 114.19955 | -12439.5, -10419.3 | — |
| `east_java_rd_calm_6` | 渣華道 | lane_shift | 22.291719, 114.197278 | -12088.5, -10495.9 | — |
| `east_electric_rd_calm_1` | 電氣道 | ped_crossing_signal | 22.288827, 114.19321 | -11460.3, -10975.6 | — |
| `east_taikoo_shing_rd_calm_1` | 太古城道 | ped_crossing_signal | 22.286179, 114.216421 | -15044.8, -11414.7 | node 3005306584 crossing:zebra 7.1 m |
| `east_taikoo_shing_rd_calm_2` | 太古城道 | lane_shift | 22.286177, 114.217835 | -15263.2, -11415.0 | — |
| `east_taikoo_shing_rd_calm_3` | 太古城道 | ped_crossing_signal | 22.286177, 114.219181 | -15471.0, -11415.0 | — |
| `east_taikoo_wan_rd_calm_1` | 太古灣道 | ped_crossing_signal | 22.287309, 114.218963 | -15437.4, -11227.2 | — |
| `east_taikoo_wan_rd_calm_2` | 太古灣道 | lane_shift | 22.287342, 114.217397 | -15195.6, -11221.8 | — |
| `east_taikoo_wan_rd_calm_3` | 太古灣道 | ped_crossing_signal | 22.287347, 114.21583 | -14953.5, -11221.0 | — |
| `east_tin_hau_temple_rd_calm_1` | 天后廟道 | ped_crossing_signal | 22.283729, 114.193296 | -11473.6, -11821.0 | — |
| `cw28_queensway_link_calm_1` | 金鐘道 | ped_crossing_signal | 22.27798, 114.166028 | -7262.5, -12774.7 | — |

## 入口（lat/lon＋snap 落主幹嘅 x,z）

| id | 由／去向 | lat, lon | x, z（snap） | snap 落主幹 | 備註 |
|---|---|---|---|---|---|
| `wc_entry_admiralty_hennessy` | central_west → wan_chai，經 金鐘道東行 | 22.277999, 114.16729 | -7457.5, -12771.5 | `wc_hennessy_rd` 距離 0.0 | 金鐘道東行過軍器廠街口，轉入軒尼詩道（有燈，電車路口）；電車；同 core25 `cw_drive_軒尼詩道` 端點相差 0.1 |
| `wc_entry_admiralty_qre` | central_west → wan_chai，經 金鐘道／正義道 | 22.277999, 114.16729 | -7457.5, -12771.5 | `wc_queens_rd_east` 距離 0.0 | 金鐘道落斜轉皇后大道東，即入窄街慢區；同 core25 `cw_drive_軒尼詩道` 端點相差 0.1 |
| `wc_node_causeway_bay_yee_wo` | (區內節點) → wan_chai，經 軒尼詩道→怡和街→高士威道 | 22.280055, 114.184771 | -10157.1, -12430.5 | `wc_yee_wo_st` 距離 0.0 | 電車路口轉向；灣仔↔銅鑼灣；電車 |
| `east_entry_tin_hau_kings_rd` | wan_chai → eastern，經 高士威道東行 | 22.281978, 114.191359 | -11174.5, -12111.5 | `east_kings_rd` 距離 26.0 | 高士威道過維園東門口，接英皇道（電車路，有燈）；電車 |
| `east_entry_tin_hau_electric_rd` | wan_chai → eastern，經 興發街／英皇道 | 22.285919, 114.191431 | -11185.6, -11457.8 | `east_electric_rd` 距離 0.0 | 英皇道天后段北轉電氣道，短 block 慢駛 |
| `east_entry_tai_hang_tung_lo_wan_rd` | wan_chai → eastern，經 銅鑼灣道（大坑） | 22.282137, 114.191856 | -11251.2, -12085.1 | `wc_tung_lo_wan_rd` 距離 0.0 | 大坑窄街慢駛出天后，接高士威道／英皇道 |
| `east_entry_tin_hau_temple_rd` | wan_chai → eastern，經 英皇道天后段 | 22.28219, 114.191914 | -11260.2, -12076.3 | `east_tin_hau_temple_rd` 距離 0.0 | 英皇道南轉天后廟道上斜，彎多慢駛 |

連接：
- central_west → wan_chai：金鐘道東行→軒尼詩道／皇后大道東（取代 hub_link `harbour_central`）
- wan_chai → eastern：軒尼詩道→怡和街→高士威道→英皇道（天后）；興發街→電氣道；大坑→天后廟道（取代 hub_link `eastern_isle`）

## 封路水馬（72 個，有碰撞）

- **東區走廊**：25 個（OSM ways 215）。側路包括：(無名motorway_link)、中環及灣仔繞道、中環灣仔繞道、北角交匯處、太古城交匯處、太康街、康愉街、愛信道、維園道
- **告士打道**：43 個（OSM ways 148）。側路包括：(無名residential)、(無名secondary_link)、(無名trunk_link)、京士頓街、分域街、史釗域道、堅拿道東、堅拿道西、夏慤道、大坑道天橋、景隆街、杜老誌道、柯布連道、灣仔交匯處、百德新街、盧押道、糖街、維園道、維園道天橋、菲林明道、記利佐治街、軍器廠街、軍器廠街天橋、馬師道、高士威道
- **東區海底隧道**：4 個（OSM ways 32）。側路包括：東區走廊（交匯）

水馬放喺接入節點，沿封閉路偏移 8/−8/20… m，直到唔掂任何主幹走廊為止。同組 30 m 內去重。東隧喺佢同東區走廊嘅交匯處放。

## 接駁（hk18 / modZe）
- **hk18**（`modYz_hk18`；Pages 就係 `hk18BuildFromSkeleton`）：core27 嗰段之後 fetch `core28-wc-eastern-spines.json`，會試 `data/`、`../data/`、`./assets/data/`。
  - 有 `SPCLR` 就 `SPCLR.add(c28,'core28')`，灣仔／東區嘅 wch、cwb 牆同樓會自動讓路。
  - 加 24 條 spine（帶 `width`、`tram`）。
  - 丟走 `connections.replaces_hub_link` 指明嘅 hub_link（`harbour_central`、`eastern_isle`）。
  - 設定 `HK18.core28 = {entries, blocked, spines}`。
  - spine 闊度改用 `sp.width`，冇先 fallback 舊規則。
- **新模組 `modZe_wceast_calm_core28`**（m1c `m1c/src/modZe_wceast_calm_core28.js`；Pages 插喺 `/* core27b · modYt_kowloonamb` 前面）：
  - **燈位過路處**：斑馬線、停車線、兩支燈柱、有碰撞嘅 6×1.2 refuge、路邊伸出位。
  - **lane-shift**：交錯安全島。
  - **電車站島**：18×2 月台，有碰撞，配路軌；上蓋喺 Lite 唔建。
  - **封路水馬**：連 canvas 牌。
  - 14 秒燈號週期。紅燈時 AI 車停，玩家以 >18 km/h 衝紅燈 → `issueFine('hk_red_light')`。
  - 3200 以外 mesh 會隱藏，但碰撞保留。
  - QA：`NT.C28CALM`、`NT.C28ENF`。

## 驗證（headless Chrome＋swiftshader，臨時副本 /tmp/ntp-copy，Job 1＋core28 都已套）
- `NT.C28CALM`：ready，calming 42，tramStops 41，barriers 72，colliders 3262。normal 模式 `lite:false`，?lowmem 模式 `lite:true`。`HK18.core28.spines` = 24。
- 喺灣仔、銅鑼灣、北角、鰂魚涌四個站點 stream 完，探 23 條可駛 core28 主幹（中線，車 r1.1）：**AABB 撞擊 0，多邊形撞擊 0（全部）**。
  - 光線 hit 只有三類：天幕球；core27d 街道傢俬 InstancedMesh 包圍盒（假陽性）；電車站／燈柱本身（刻意設置嘅實體減速點）。
- SPCLR stats（銅鑼灣以東已建）：bldCull 13，bldStrip 244，stripDrop 4，zoneCull 156，wallCut 246。
- console errors：?lowmem **0**；normal 只有本身已存在嘅 `police-suv-cc0.glb` 404。
- m1c build（`python3 tools/build_m1c.py`）：normal 同 ?lowmem 都係 0 errors，`[core28] wc+eastern calm {calming 42, tramStops 41, barriers 72}`。

## Pages 目標
| 檔案 | 去邊 |
|---|---|
| `docs/core28-wc-eastern-spines.patch` | `neon-triangle-pages/index.html`。**要喺 core27c2 補丁之後套**；兩個一齊已喺現時 live 檔 `git apply --check` 通過 |
| `data/core28-wc-eastern-spines.json` | `neon-triangle-pages/data/` 同 `neon-triangle-pages/assets/data/`（同一個檔，放兩個位） |
| `m1c/src/modZe_wceast_calm_core28.js` | 已包喺補丁入面（Pages 插喺 `/* core27b · modYt_kowloonamb` 前面） |

## 已知衝突／未做
- **舊 HKR 快速公路 `cwb-wch`（銅鑼灣→灣仔）**：131 點，47% 喺軒尼詩道 25 m 以內（中位數 26 m）。佢係一條有牆嘅 expressway 走廊（HW 8；離中線 14 以內會被拉入走廊）。
  - 喺我探嘅中線上冇擋到 core28 主幹，但視覺上同軒尼詩道重疊，亦違反「唔好有 GTA 式直長高速」嘅精神。
  - `wch-cen`（灣仔→中環）離所有 core28 主幹中位數 524 m，係沿海旁（告士打道／夏慤道一帶）。
  - 兩條都**未改**，留俾 Grok Bot 決定停用定保留。
- 告士打道／東區走廊／東隧今版只有水馬，冇主幹。
- core28 WIP 拉伸模組（`makeDistrict.extrude` wc/east）已經經 `spclrBldCollider` 讓路；樓高、立面仲要 Grok Bot 調校。

> 2026-10-19 20:30 HKT 複驗：將現時 live working tree 抄去 /tmp/ntp-final，兩個補丁 `git apply --check` 都通過；鴨寮街探針 normal 同 ?lowmem 結果同上。72/72 個水馬有碰撞，HK18 冇任何告士打道／東區走廊／東隧 spine。live WIP 本身多咗 5 個 `assets/tex/facade/ytm/<冇副檔名>` 404（未套補丁嘅 live 副本一樣有），唔係呢啲補丁引起。

## 燈位間距（老闆 A1）
主幹實體燈／斑馬目標 **200–350 m**（300–525 GU）；電車站約 **250 m**；最長直路仍 **≤400 GU**。詳見 `core27f-trunk-signal-spacing.md`。
