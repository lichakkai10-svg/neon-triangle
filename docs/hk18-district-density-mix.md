# 港九新界 18 區 · 密度／樓種／人流（地道人）
負責：@香港澳門台灣地道人 · 更新：2026-10-24 20:40 HKT · **唔郁 Pages**
來源：老闆 2021 普查級 18 區核心 · 節奏對齊 `drive-rhythm-hk18-density-bands.md`（gta）
District id 一律長 id。**葵涌 ≠ 葵芳（戲仿）**；唔好寫「九龍城站」（用宋皇臺／啟德）。
詳細街名／主題街等指定區再開再補（已開見 core27f／core28／core29 shop-mix）。

---

## 1. 密度帶（同 gta 一致）
| 帶 | 區 | 樓種 | 街景 | 人流級（1–5） |
|---|---|---|---|---|
| **高密度舊區** | `yau_tsim_mong`、`sham_shui_po`、`wan_chai`、`eastern`（**北角**） | 唐樓／騎樓、街道導向 | 主題街＋濕貨；路口密；後巷多 | 主幹 **4–5** |
| **舊區混雜** | `kowloon_city`、`central_west`、`kwun_tong`（舊段）、`wong_tai_sin` | 唐樓＋屋邨／新樓混 | 局部主幹；九龍城泰菜主題；中環假日遮打另案 | **3–4**（中環假日遮打 4） |
| **podium 新市鎮** | `sha_tin`、`tsuen_wan`、`tuen_mun`、`sai_kung`（**將軍澳**市中心） | podium＋塔；商場平台 | 地面街靜；商場內高；**唔抄旺角棋盤／主題街** | 地面 **2**／商場口 **4** |
| **工業** | `kwai_tsing`（葵涌碼頭／工廈） | 工廈、貨櫃、起重機；公屋夾邊（葵芳市區另用新市鎮邏輯） | 行人極疏；貨車密；真營運商黑名單 | 行人 **1** |
| **疏** | `southern`、`sai_kung`（西貢墟／郊野側）、`islands`、`tai_po` | 低層／海岸／郊遊／零散屋苑 | 唔開長直觀光景大道 | **1–2** |
| **新界其餘（偏新市鎮／市鎮混合）** | `yuen_long`、`north` | 市中心有地面墟；外圍屋苑／道路 | 元朗大馬路仍有舊墟感；上水／粉嶺偏站＋商場 | 墟 **3**／外圍 **2** |

---

## 2. 十八區一行表
| id | 區 | 帶 | 開區時至少一個公營／街市錨 |
|---|---|---|---|
| `central_west` | 中西區 | 舊區混雜 | 遮打假日聚集；政府樓 |
| `wan_chai` | 灣仔 | 高密度舊區 | 街市／舊唐樓騎樓 |
| `eastern` | 東區 | 北角＝高密；其餘混／太古＝podium | 春秧街市；太古商場 |
| `southern` | 南區 | 疏 | 慎直公路 |
| `yau_tsim_mong` | 油尖旺 | 高密度舊區 | 主題街＋街市感 |
| `sham_shui_po` | 深水埗 | 高密度舊區 | 鴨寮／布料／北河街市 |
| `kowloon_city` | 九龍城 | 舊區混雜 | 泰菜街；寨城公園＝園（唔重建城寨） |
| `wong_tai_sin` | 黃大仙 | 舊區混雜 | 廟＋屋邨 |
| `kwun_tong` | 觀塘 | 舊區混雜 | 舊工業轉商住 |
| `kwai_tsing` | 葵青 | 工業＋葵芳 podium | 碼頭黑名單；**站名葵芳** |
| `tsuen_wan` | 荃灣 | podium 新市鎮 | 大河道舊舖一段可保留 |
| `tuen_mun` | 屯門 | podium 新市鎮 | 商場／站 |
| `yuen_long` | 元朗 | 新界混合 | 舊墟地面舖 |
| `north` | 北區 | 新界混合 | 上水／粉嶺站場 |
| `tai_po` | 大埔 | 疏（相對） | 唔抄旺角 |
| `sha_tin` | 沙田 | podium 新市鎮 | 新城市／站 A；馬鞍山今版 bbox 外 |
| `sai_kung` | 西貢 | 將軍澳＝podium；西貢墟＝疏 | 分兩套密度 |
| `islands` | 離島 | 疏 | 車路範圍另定 |

---

## 3. 關卡／shop-mix 用法
- 已開區細表：`core27f-district-building-shop-mix.md`、`core29-sha-tin-tsuen-wan-shop-mix.md`、`streetscape-central-fdw-sunday.md`
- 公營 massing：`streetscape-hk-public-buildings.md` · 全港類型池：`streetscape-hk-building-types-18.md`
- 未開區：只留 hk18 skeleton，**禁止**提早鋪彌敦道級招牌密度
- 人流倍數細節跟 gta `drive-rhythm-hk18-density-bands.md` 同 `core27f-crowd-traffic-density.md`

## 4. 交收
| 誰 | 做咩 |
|---|---|
| @關卡與地圖設計師 | skeleton／spine 按帶選密燈 vs 商場導向 |
| @gta團隊 | 倍數已對齊；開區再微調 |
| @Grok Bot | 合入總表 |
