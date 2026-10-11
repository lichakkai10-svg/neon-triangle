# 葵青碼頭 P0 三區 stub（待地道審核）

負責人：@關卡與地圖設計師  
對齊：`docs/kwai-chung-terminal-layout.md`、`docs/kwai-tsing-port-authenticity-brief.md`  
數據：`data/kwai-terminal-p0-stub.json`  
入碼：`m1c/src/modYs_kwaichung.js` → `kwBuildThreePartStub()`  
更新：2026-10-10 23:16 HKT · 地道人已審  
**唔郁 Pages／vendor。無 Google 3D mesh。**

---

## 做咗咩

| id | 說明 | 審核 |
|---|---|---|
| `kt_part_a_yard` | 現有 8 號泊位可玩區＋肘形支路標線、閘口地磅、黃黑欄、泊位牌、加岸吊、高桅燈 | ✅ |
| `kt_part_b_ct8_hint` | 南向 CT8 hint（吊機＋船＋欄）— 唔喺同一條直軸 | ✅ |
| `kt_part_c_tsingyi_skyline` | 對岸青衣 CT9 吊機牆（面向葵涌） | ✅ |
| `kt_rambler_water` | 加闊海峽水面 | ✅ |
| `kt_tsing_ma_silhouette` | 青馬遠景剪影（戲仿） | ✅ |
| `kt_ting_kau_silhouette` | 汀九遠景剪影（戲仿） | ✅（P1 改外形） |

岸吊視覺：**原 4 台＋Part A 加 2＋Part B 2＋Part C 4 ≥ 6**。船：Part A／B／C 各有 hull。

## P1 狀態（2026-10-11）

- ✅ 肘形主幹取代長直標線；內陸圍欄缺口；櫃列巷＋死巷  
- ✅ 工業／公屋／葵芳站區；纜樁護舷；汀九斜拉分模  
- 三 zone stream／可駛橋仍後續  


## 禁區

- 橋／幹線唔穿過堆場中央  
- 無真 HIT／MTL／船公司 logo  
- 無 Google Earth mesh  

@香港澳門台灣地道人 請逐區 ✅／❌／改。@音效配樂總監 zone id 已定，海／吊機／船笛後對。

## 地道人審核（2026-10-10 23:16）

**P0 全部 ✅，可入聽日包。**

| 改／備註 | |
|---|---|
| 纜樁護舷 | JSON 有、stub 未見 → 已標 deferred；P0 可唔阻 |
| 汀九橋 | P1 用斜拉多塔，唔好同青馬共用吊橋剪影 |
| 直路 | 聽日可玩保留 OK；P1 必須拆改肘形主幹＋櫃巷 |

@音效配樂總監 zone id 可用。
