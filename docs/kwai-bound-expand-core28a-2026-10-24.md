# 葵涌 BOUND 放大 · core28a（2026-10-24）

對齊：`core28a-kwai-yard-asphalt-locks` · `core28a-kwai-dock-p0-scales` · `handoff-kwai-terminal-scale-core27f`  
分支：`fix/core28-arcade-cw-cam` · **未升 `?v=` / tip** · **未合 main**

## 舊 → 新

| 常數 | 舊 | 新 | 備註 |
|---|---|---|---|
| `BOUND.x`（半寬） | 28.5 | **90** | 全寬 180 m（≥180 footprint） |
| `BOUND.z`（半長） | 186 | **280** | 全長 560 m（岸線 ≥500） |
| `YARD_Z` | 172 | **260** | 貨櫃列跟長岸 |
| 可玩 footprint | ≈57×372 | **180×560** | 跟 asphalt P0 加鎖 |

## 改咗咩（代碼）

1. **圍欄**（`index.html` 石壆段）：跟 `BOUND` 自動擴；內陸肘缺口 `wGap0/1` → 20／160。  
2. **`hkWall` 交匯走廊**：閘口 Z 改 `-(BOUND.z)-0.5`；兩側接牆用 `BOUND.x`→±32（唔再寫死 ±28.5／-186.5）。  
3. **`zoneOf`**：`yard`／`yardhub` 跟 `BOUND`；**油尖旺本地** `lz ±186.5`（`HKM.T`）**未動**。  
4. **Fallback**：`28.5`／`186` → `90`／`280`（只 BOUND 相關）。  
5. **岸吊／纜樁**：boot＋`kwBuildDock` 沿 Z 疏排 ±220；Part B CT8 hint 推去 `-(BOUND.z)-50`。  
6. **≥3 段肘形行車廊 stub**：`kwYardDriveCorridorStub`（7 m 廊＋櫃巷＋hammerhead＋油漆行人帶＋斜停格戲仿）＋第三 `kwElbowRoadMark`；禁真 logo／相板。  
7. **`KWAI_SCALE`／`portGltf`／STS·hull hang**：保留；craneScale 全 1.0，**唔回退 ×0.9**。  
8. **`hkzone=kwai`（劇本）**：傳送落可玩碼頭（南閘內側 `z = -BOUND.z+36`），objective 抽 pier／通用池；**唔自動開冷錢包／八號泊位字卡**。冷錢包只喺 `startMission('manifest')`／`?m=manifest` 接任務後。旗標 `NT._c27fKwaiExploreOnly`；`c27fInYardPos` 跟新 BOUND。

## 未做（交下一手）

- 分線 decal 全堆場 bake／對 OSM 櫃巷網  
- 對岸青馬／青衣 Part C 真實距離感再校  
- 完整拆舊「單軸直瀝青」碰撞（stub 疊加，未刪死路 collider）  
- Arcade hero／taxi／bus GLB（3d 暫緩）  
- tip／`?v=` 升版（未過關唔升）

## 風險

| 項 | 說明 |
|---|---|
| Spawn／閘口 | `GATE_POS.z = -BOUND.z+9` 自動南移；舊存檔／書籤若寫死 z≈-177 會落喺堆場中間 |
| Zone 名 | `yard` AABB 放大；`yardhub` 走廊變長（閘→-263）；YTM `ytmhub` 本地座標不變 |
| 探索 vs 任務 | `hkzone=kwai` 預設探索；要冷錢包必須 `?m=manifest` 或接碼頭任務 |
| NaN／transform | 未改矩陣管線；若真機牆穿／車飞，先查 collider 舊硬碼 ±32 外重疊 |

過關句（尺度）：**「堆場有廊有巷有迴轉——唔係 ±28 直巷撞灰牆。」**  
過關句（劇本）：**「hkzone=kwai 只逛碼頭；冷錢包要接咗先出。」**
