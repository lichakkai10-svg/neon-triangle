# 港九十八區 · 分區路牌（市政後補 · core23+）
負責人：@政府部門/大公司  
對齊：`docs/hk-18-districts-labels.md`、`docs/hk-18-district-skeleton-stub.md`、`data/osm-hk18-skeleton-core23.json`  
更新：2026-10-17 19:59 HKT · **唔郁 Pages**  
原則：每區 **最多 1 塊** 稀疏區界／主幹入口牌；真區名可；**禁真路政署徽**；禁相板；唔塞葵涌碼頭。

## 1. id（必須跟 JSON）

`central_west` · `wan_chai` · `eastern` · `southern` · `yau_tsim_mong` · `sham_shui_po` · `kowloon_city` · `wong_tai_sin` · `kwun_tong` · `kwai_tsing` · `tsuen_wan` · `tuen_mun` · `yuen_long` · `north` · `tai_po` · `sha_tin` · `sai_kung` · `islands`  

**禁短碼** `cw`／`wch`／`tpo` 等（已廢）。

## 2. 牌面（戲仿 · 掛 hub／主幹口）

| id | 短標（牌面） | 長句（可選側牌） |
|---|---|---|
| `central_west` | `中西` | `中西區` |
| `wan_chai` | `灣仔` | `灣仔區` |
| `eastern` | `東區` | `東區` |
| `southern` | `南區` | `南區 · 香港仔海傍` |
| `yau_tsim_mong` | `油尖旺` | `油尖旺區` |
| `sham_shui_po` | `深水埗` | `深水埗區` |
| `kowloon_city` | `九龍城` | `九龍城區` |
| `wong_tai_sin` | `黃大仙` | `黃大仙區` |
| `kwun_tong` | `觀塘` | `觀塘區` |
| `kwai_tsing` | `葵青` | `葵青區 · 往葵芳（戲仿）`（**禁「葵涌站」**） |
| `tsuen_wan` | `荃灣` | `荃灣區` |
| `tuen_mun` | `屯門` | `屯門區` |
| `yuen_long` | `元朗` | `元朗區` |
| `north` | `北區` | `北區` |
| `tai_po` | `大埔` | `大埔區` |
| `sha_tin` | `沙田` | `沙田區` |
| `sai_kung` | `西貢` | `西貢區` |
| `islands` | `離島` | `離島區` |

Toast 跟 labels 表（已入 `modYz_hk18.js`）。

## 3. 葵涌肘形（市政維持）

- 牌位跟 D2b／`gov-kwai-d2b-signage.md`：閘口＋迴旋＋地磅  
- **禁**把區牌／限速牌當直高速公路連續掛  
- 玩家提示：`沿肘形碼頭路行——工廈一邊、公屋同葵芳站喺市區側。`

## 4. 交收

| 誰 | 做咩 |
|---|---|
| @關卡與地圖設計師 | hub 區牌已有短標則核對一字；缺則補 1／區 |
| @香港澳門台灣地道人 | 審密度（每區 ≤1 醒目牌） |
| @Grok Bot | 下版合；**唔郁 Pages** |

**狀態：** 分區路牌文案定稿；id 已對齊 JSON。core23 碼側短標／toast 已跟表。
