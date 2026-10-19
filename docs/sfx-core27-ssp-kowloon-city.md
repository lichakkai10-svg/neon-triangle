# core27 環境音：深水埗＋九龍城

負責：@音效配樂總監 · 更新：2026-10-19 13:05 HKT · **唔郁 Pages**（交 Grok Bot 合 core27）  
入碼：`m1c/src/modYt_kowloonamb.js`＋`SFX10` 新 cue（`modX10b_ios.js`）；`modYt_hk18amb` 對呢兩區讓位。

原則：原創合成 placeholder，之後可換原創／授權錄音（**cue id 唔改**）。禁真歌、禁真電台、禁可辨商號叫賣、禁旺角霓虹床照搬。揸車經過音量權重減半。

## 深水埗（`sham_shui_po`）

| 點 | 真實位置 | Cue | 日／夜 | 感覺 |
|---|---|---|---|---|
| `apliu_st` | 鴨寮街 22.329923,114.162335 | `market_chatter`、`junk_stall_click` | 日密／夜仍有 | 攤檔人聲嘈（無可辨字）、二手電子插頭旋鈕卡嗒 |
| `pei_ho_st` | 北河街街市 22.32946,114.16078 | `market_chatter` | 日為主 | 街市講價嘈 |
| `golden_centre` | 黃金電腦商場（戲仿）22.33202,114.16202 | `junk_stall_click` | 日夜 | 商場門口零件卡嗒 |
| `ssp_shutters` | 鴨寮街／桂林街一帶 22.3302,114.1638 | `shutter_roll` | 只夜 | 夜深收檔拉閘 |

## 九龍城（`kowloon_city`）

| 點 | 真實位置 | Cue | 日／夜 | 感覺 |
|---|---|---|---|---|
| `kc_thai_st` | 南角道／衙前圍道泰菜街 22.3304,114.1902 | `thai_wok_sizzle`、`street_diner_clink`、`market_chatter` | 夜主 | 鑊氣嗞嗞、大排檔碗碟玻璃樽、食客嘈 |
| `kc_market` | 龍城街市 22.32921,114.18901 | `market_chatter` | 日主 | 街市嘈 |
| `walled_park` | 九龍寨城公園 22.3321,114.1903 | `hospital_quiet`（借靜層） | 日夜 | 園林靜、唔加城寨恐怖味 |
| `hau_wong` | 侯王廟一帶 22.3329,114.1880 | `district_breeze` | 日夜 | 疏風，靜 |

## 交收
- @關卡與地圖設計師：如入區位／主幹改咗街點座標，話我知即改 `KLNAMB_SPOTS`。
- @香港澳門台灣地道人：審街點同日夜比例（例如泰菜街係咪夜主、北河街收得早）。
- Grok Bot：合 `modYt_kowloonamb.js`＋`modX10b_ios.js`＋`modYt_hk18amb.js`（連前一版未合嘅 `modYt_hk18amb`／`modYt_muniamb` 一齊）。

## 2026-10-19 對齊 core27 spines anchor
`KLNAMB_SPOTS` 座標改用 `docs/core27-ssp-kc-spines.md` 嘅 lm_* anchor（鴨寮街、北河街街市、黃金電腦（戲仿）、泰菜街、九龍城街市、寨城公園、侯王古廟）。北河街街市原本偏咗約 450 m，已修正。ssp_shutters 保持原位，日夜比例冇改。
鴨寮街夜間權重 0.7→0.4（地道人建議，夜晚以拉閘聲為主）。


---
**core27b 合入（Grok Bot，2026-10-19）**：座標已對齊 `data/core27-ssp-kc-spines.json` 錨點（`pei_ho_st`→北河街街市 lm_pei_ho_market；`golden_centre`→lm_golden_arcade_parody；`kc_market`→lm_kowloon_city_market；`apliu_st`／`kc_thai_st` 亦跟錨點）。揸車經過音量 ×0.5（觸發率亦 ×0.5）；十八區骨架 `hk18AmbSim` 喺 sham_shui_po／kowloon_city 讓位俾呢份。
