# core27 · 深水埗／九龍城 路牌＋區界牌（市政）
負責人：@政府部門/大公司  
對齊：`gov-hk18-district-signs.md`、`legal-core27-ssp-klc-parody-names.md`、`streetscape-ssp-kc-authenticity.md`、`data/osm-hk18-skeleton-core23.json`  
更新：2026-10-19 13:00 HKT · **唔郁 Pages** · 禁相板  
原則：**街名用真**（公共地名）；設施只寫通稱；**禁路政署／食環署／運輸署徽**；店名跟法律戲仿表。

---

## 1. 街名牌字款（港式 · 程序字，唔用真字型檔）

| 項 | 規格 |
|---|---|
| 底／字 | 白底、黑字、細黑邊框 |
| 排法 | 上中文、下英文（Title Case）；單行橫牌 |
| 掛點 | 街口燈柱／唐樓轉角牆，離地約 2.5–3 m |
| 密度 | 每個街口 **最多 1 面**；唔每柱掛 |
| 禁 | 霓虹化、彩色底、真標誌 |

## 2. 深水埗（`sham_shui_po`）

| label id | 中文 | English | 掛邊 |
|---|---|---|---|
| `ssp_st_apliu` | 鴨寮街 | Apliu Street | 電子攤段兩端 |
| `ssp_st_peiho` | 北河街 | Pei Ho Street | 街市一帶 |
| `ssp_st_kweilin` | 桂林街 | Kweilin Street | 交鴨寮街口 |
| `ssp_st_kilung` | 基隆街 | Ki Lung Street | 布行一帶 |
| `ssp_st_yuchau` | 汝州街 | Yu Chau Street | 布行／唐樓 |
| `ssp_st_namcheong` | 南昌街 | Nam Cheong Street | 主幹交口 |
| `ssp_st_csw` | 長沙灣道 | Cheung Sha Wan Road | **可駛主幹**入口 |
| `ssp_st_castlepeak` | 青山道 | Castle Peak Road | 可駛主幹（跟 drive-rhythm） |

設施通稱牌：`街市`／`熟食中心`／`巴士站 BUS STOP`（虛構路線號）。電腦商場用法律表 **金河電腦城**／**高地電腦坊**，唔係市政牌。

## 3. 九龍城（`kowloon_city`）

| label id | 中文 | English | 掛邊 |
|---|---|---|---|
| `kc_st_ngatsinwai` | 衙前圍道 | Nga Tsin Wai Road | 街市／泰菜段 |
| `kc_st_kcroad` | 九龍城道 | Kowloon City Road | 主幹 |
| `kc_st_namkok` | 南角道 | Nam Kok Road | 泰菜街一帶 |
| `kc_st_lionrock` | 獅子石道 | Lion Rock Road | 泰菜／街市一帶 |
| `kc_st_hauwong` | 侯王道 | Hau Wong Road | 侯王廟方向 |
| `kc_st_pedeast` | 太子道東 | Prince Edward Road East | **可駛主幹**；接啟德 |
| `kc_st_southwall` | 城南道 | South Wall Road | 泰菜街一帶 |
| `kc_st_argyle` | 亞皆老街 | Argyle Street | 可駛主幹（跟 drive-rhythm） |

公園／廟：`九龍寨城公園` 門牌只寫名，**禁康文署徽**；侯王廟外形 OK，**唔做破壞玩法**。街市用 **九龍城街市（戲仿）**。

## 4. 區界／入區牌（每區 ≤1）

| id | 牌面 | 掛點 | 
|---|---|---|
| `sham_shui_po` | `深水埗` | 由油尖旺北（太子／界限街附近）入口 1 面 |
| `kowloon_city` | `九龍城` | 太子道東近彩虹道口 1 面（由新蒲崗／黃大仙方向西行入九龍城；啟德本身已屬九龍城區） |

入區 toast 跟 `hk-18-districts-labels.md`（`進入：深水埗區`／`進入：九龍城區`）。

站名提示：九龍城中心**無鐵路站**——方向牌寫 `往 宋皇臺站`／`往 啟德站`，唔好寫「九龍城站」。

## 5. 方向牌（極稀 · 主幹口）

| 掛點 | 牌面 |
|---|---|
| 深水埗主幹出口 | `往 旺角 Mong Kok` |
| 九龍城往啟德 | `往 啟德 Kai Tak` |
| 九龍城迴旋處南出 | `往 宋皇臺站` To Sung Wong Toi Station |
| 承啟道往站前 | `往 啟德站` To Kai Tak Station |
| 九龍城往深水埗 | `往 深水埗 Sham Shui Po` |

**禁**直長路連續方向牌（跟 @gta團隊 駕駛節奏）。

## 6. 交收

| 誰 | 做咩 |
|---|---|
| @關卡與地圖設計師 | 按 label id 掛街口；入區牌跟主幹入口 |
| @香港澳門台灣地道人 | 審街名掛位／英文拼法口感 |
| @Grok Bot | 合 `core27`；**唔郁 Pages** |
