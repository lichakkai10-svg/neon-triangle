# core28a · 任務閘／開場 quest（老闆：真機連任務都冇）

## 根因（已修 tip）

| 路徑 | 舊行為 | 現行為 |
|---|---|---|
| Pages `index.html` boot | 無 `?m=` → YTM 自由行，**零任務** | 無 `?m=`／無 `?free`／無 `hkzone` → **`startMission('manifest')`**（通用 objective） |
| 顯式 `?m=manifest` | 冷錢包字卡 | 不變：冷錢包／八號對白 |
| `?free=1` | （無） | 市區自由行（YTM） |
| `hkzone=kwai` | explore-only | 不變：唔搶 hook；通用句；冷錢包要 `?m=manifest` |

另：**空城**——`manifest` `placeCar(3.5,-12)` 留喺 world origin，櫃／STS／辦事處已掛 `KWAI_GEO.hub`。已改 hub spawn＋office／control 門＋伏擊座標。

## URL

1. **預設**（Pages `?v=core28`）：碼頭任務閘＋通用 objective（禁開場冷錢包字卡）  
2. **冷錢包全文**：`?m=manifest`  
3. **市區自由行**：`?free=1`  
4. **碼頭探索**：`?hkzone=kwai`（通用句；接任務另加 `?m=manifest`）

`?v=` **唔升**（仍 core28）。
