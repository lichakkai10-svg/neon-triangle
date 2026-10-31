# tip `b5e0865` · gta 真機 **未睇到碼頭**（幾何／載入 FAIL）

抽樣：`?v=core28&day&free=1&hkzone=kwai`。節奏項 **全部未可驗**——先修可見幾何。

## 現象
- 開場藍天／夜間全黑；小地圖空；**冇**肘／閘／櫃／STS／車 mesh  
- Toast：`部分模型載入失敗（顯示佔位）`  
- HUD 仍有落車／手煞——似入咗車但世界冇出  
- HTML last-modified ≈ tip 時間；`assets/gltf/hk-port/*` 本機／Pages **200**（路徑啱）

## 地道 2026-10-31 補證
- 頁源未見 `b5e0865`；last-modified `02:14 GMT`（無 SHA 字串屬正常）
- Console：`[gltf]`／`[kwai-kenney]` `building-*.glb` **大量 timeout** → 空天
- Kenney a–t ~170KB 各 12s timeout；`setInterval` 350ms 重入 `boot()` 喺 `await kwLoadKenney` 期間再开火 → 並行搶頻寬

## 修復刀（本 tip）
1. **TIP_MARK** 註解（硬刷對 tip；唔升 `?v=`）
2. **pier-first**：density／D2b／art densify **先於** kenney；kenney fire-and-forget
3. **boot re-entry lock**：禁 setInterval 重跑搶頻寬
4. **kenney cap**：lite 3／非 lite 6；timeout 3.5–5s；≥2 fail 即停；路徑 `assets/gltf/kenney-city-kit-industrial/`
5. **hk-port URL**：一律 `assets/gltf/hk-port/…`；`kwPortLoad` 自動補 `assets/`
6. 拖頭 mesh＝程序 `kwApplySpawnTractorTruck`；spawn 仍 hub／肘
7. densify cull／vendor／LDR／quest gate／device-knife 視覺鎖 **唔郁**

修好有幾何後先再喊 gta／地道／政府抽 P0。
