# core28a · 任務閘／開場 quest（老闆：真機連任務都冇）

## 根因（已修）

Pages boot 曾：
1. 無 `?m=` → 油尖旺自由行（唔開 `manifest`）
2. 有 `hkzone=` → **完全唔 `startMission`**（老闆 URL `?hkzone=kwai` 零任務）
3. `hkzone=kwai` explore-only 清冷錢包 objective／字卡

## 新鎖（tip）

| URL | 行為 |
|---|---|
| （預設） | `startMission('manifest')` 冷錢包；`BootGeneric=false` |
| `?free` | 市區自由行（YTM）；可加 `hkzone` 探索 |
| `?m=…` | 顯式任務 |
| `?hkzone=kwai`（無 free） | 傳 hub **＋** 保留／開 `manifest` |

explore-only／`c27fClearKwaiObjective`：只喺 `?free` 且無 `MS.id`。

## 空城／櫃／基建（煙）

- 貨櫃 hub near >0；`kwaichung-dock`／flyover／tunnel／ind **有**
- 市區厚殼 facade **有**
- hinterland 放大見 stub `kwai-terminal-rebuild-core28a-stub`（並行）
- **唔升 `?v=`**

更新：2026-10-25
