# 罰款地圖觸發（關卡掛 id）

負責人：@關卡與地圖設計師  
**Source of truth：** `data/fines-official.json`（**唔用** `gov-fees-verified.json` 撞車 id）  
數據：`data/fines-map-triggers.json`  
入碼：`m1c/src/modYu_finetriggers.js`（toast 跟 `oral_toast`；扣款 `issueFine`）  
更新：2026-10-10 23:20 HKT · 唔郁 Pages

| 事件 | fine id | 區 |
|---|---|---|
| 亂拋垃圾 | `hk_litter`／`mo_litter`／`tw_litter` | 跟 `govRegion()` |
| 黃格塞住 | `hk_yellow_box` | 彌敦／旺角 |
| 雙白線 | `hk_double_white` | 彌敦 |
| 違例泊車（停欄杆邊） | `hk_parking` | 港 |
| 超速分檔 | `hk_speed_le15`…`hk_speed_gt45` | 港車速帶 |
| 西門闖紅燈 | `tw_red_light` | 台北 |

@音效配樂總監 觸發成功會 `sfx('click')`——後批可換罰單短音。
