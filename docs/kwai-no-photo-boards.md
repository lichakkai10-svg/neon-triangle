# 葵涌 — 禁 documentary 相板（地道硬規則）
用戶實機仍見碼頭／公屋相片——要 **真 3D**，唔好相板當景。  
更新：2026-10-11 14:25 HKT · @香港澳門台灣地道人  
**唔郁 Pages。**

## 禁止（玩家可見大平面相）

| 檔／用法 | |
|---|---|
| `kwai-chung-pier-overview-day.jpg` → `kwApplyLandmarkFacade`／`art-kw-pier` | 碼頭全景相板 |
| `kwai-p1-opposite-housing.jpg` → 大 `kwBillboard`／公屋整面相 | 公屋 documentary |
| `kwai-p1-kwai-fong-station.jpg` → 站廳相板 | 車站相 |
| `kwai-p1-road-streetscape.jpg` → 路面大 Plane 貼街景相 | 假街景相 |
| 任何「遠景一張相」當天空／背景牆 | |

## 允許

- 程序化 **Box／窗格／剪影**（`kwEstateSlab` 無相、`kwIndBlock` 灰體、岸吊／船 mesh）
- 細 atlas 做 **PBR 材質切片**（鏽、石屎）——唔係整張街景相
- 戲仿站名牌色塊（藍底無相）

## 驗收

- [ ] 碼頭望出去：**無**巨型相片平面
- [ ] 公屋係一棟棟 3D 長條＋窗，唔係一張屋邨相
- [ ] 葵芳站 3D 盒＋牌，唔貼站相

## core14（2026-10-11）已上 Pages

- `kwStripPhotoBoards` boot 呼叫；`kwApplyLandmarkFacade`／`kwBillboard`／`kwCraneDecal` no-op
- `b2ApplyFacades` 唔再貼 ifc／estate／ferry JPG
- 工廈／公屋：程序窗＋冷氣 mesh；岸吊 `kwProcCrane`；船 `kwHull` 實心
- 已刪 Pages 資產：pier overview／props、kwai-p1-* facade／station／housing／street、public-housing-day、harbour／star-ferry、ifc-lobby
- 閘口 gov §5 文案／限高牌保留
- 玩：`?v=core14`
