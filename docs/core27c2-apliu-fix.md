# core27c2 · 鴨寮街擋路修正（SPCLR 主幹淨空）

負責：關卡與地圖設計師 ｜ 日期：2026-10-19（HKT）｜ 交付：`docs/core27c2-apliu-clear.patch`（只限 Job 1）

## 根因
鴨寮街（`ssp_apliu_st`，walk 區，6 闊）同其他 core27 主幹，係**畫喺**舊 HKM 區（`ssp` 等 zone，H=230）同 OSM 拉伸模組上面嘅，但嗰啲模組建樓／碰撞時完全唔知道主幹喺邊：

1. **HKM zone OSM 樓 blob**（`hkBuildZone`）：樓腳多邊形同主幹重疊都照建，`hkPolyPush` 多邊形碰撞將人／車推走。鴨寮街中段 1040 個取樣有 792 個被多邊形推開（北河街、福華街、桂林街一樣）。
2. **zone 周邊牆**：牆段橫切主幹出口。
3. **拉伸模組 AABB**（`ytmExtrudeOne`／`cwExtrudeOne`／`ktExtrudeOne`／core27 `makeDistrict.extrude`）：每座樓一個 `addCollider` AABB。斜放、L 形嘅樓 AABB 會凸出去路面。長沙灣道一條就有 3852/6379 個取樣撞 AABB。
4. **hk18 hub 方塊**（22×16＋兩個衛星方塊）有時壓喺主幹上面。

所以唔係只係「一座樓」，而係凡係同主幹走廊重疊嘅樓腳或碰撞都會擋。

## 修正（通用，唔係逐座樓 hard-code）
新模組 `SPCLR`（插入喺 `function hkBuildZone(Z) {` 前面）：
- 讀 `core27-ssp-kc-spines.json`（`data/`、`./assets/data/`、`../data/` 三個路徑都試），之後可以再 `SPCLR.add(json, tag)` 加 core28 等數據包（`drivable===false` 會略過）。
- 走廊半闊 = `width/2`（冇就 arterial 11／walk 6／其他 8）＋ `M_CULL` 1.5。用 32 格 grid 做索引。
- `bldCollider(pts, …, mesh, ok)`：
  - 樓腳環同走廊相交 → mesh 同碰撞一齊剔走（`bldCull`）。
  - 只係 AABB 掂到 → 換成 2 米條狀碰撞，掂到路邊（+0.2）嘅條會丟走（`bldStrip`／`stripDrop`）。
  - 每座樓都登記，後加數據包時可以 `retro()` 重算。
- `hkBuildZone`：樓 blob `ringHit` 就跳過（`zoneCull`）；牆段用 `cutWalls` 開口（`wallCut`），並記低 `Z.spclrN`。
- 5 個拉伸模組嘅 `if (hx>1&&hz>1) addCollider(...)` 全部改成 `spclrBldCollider(...)`。
- `hk18BuildFromSkeleton` 會先 `await SPCLR.ready`；hub 方塊或衛星方塊同走廊相交（margin 1.5）就唔建（`hubCut`）。
- `retro()`：如果 INT／AREA 啟動緊（colliders 陣列換咗）就延後。已建 zone 嘅 `spclrN` 唔等於現時段數就 dispose，等 streaming 重建。
- 設計障礙（安全島、refuge，maxY ≤ 1.2）**刻意唔郁**。
- QA hook：`NT.SPCLR`（stats）、`NT.spclrProbe(pts, r)`（逐點 `resolveCircle`，回傳撞到幾多點）。

## 驗證（headless Chrome + swiftshader，port 8771 臨時副本）
| 項目 | 修正前 | 修正後 |
|---|---|---|
| 鴨寮街 AABB/多邊形撞擊（1040 取樣） | 28 / 792 | **0 / 0** |
| 鴨寮街 resolveCircle，行人 r0.45，偏移 −1.8/0/+1.8 | — | 0 / 0 / 0 |
| 鴨寮街 resolveCircle，車 r1.1，偏移 −1.8/0/+1.8 | — | 0 / 0 / 1（+1.8 嗰點係桂林街路牌柱，喺路邊，冇改） |
| 鴨寮街中線 mesh 光線 | 4 | **0** |
| 全部 31 條 core27 主幹 AABB/多邊形 | 多條數百至數千 | **全部 0 / 0** |
| console errors，?lowmem | — | **0** |
| console errors，normal | — | 只有一個本身已存在嘅 404：`assets/gltf/police-suv-cc0.glb`（repo 冇呢個檔） |

wiring core28 之後再跑一次回歸：31 條 core27 主幹 col 0、poly 0；鴨寮街 lowmem resolveCircle 結果同上。
stats（深水埗 zone 已建）：`spines 59, segs 474, bldCull 5, bldStrip 109, zoneCull 256, wallCut 414, hubCut 1`。
剩低嘅光線 hit 只係天幕球（1200）同 core27d 街道傢俬 InstancedMesh 嘅包圍盒（假陽性，唔係樓）。

## Pages 目標
`git apply docs/core27c2-apliu-clear.patch` 套落 `neon-triangle-pages/index.html`。已喺現時 live working tree（970a6e7＋未 commit 嘅 WIP）`git apply --check` 通過。
補丁係由 /tmp/ntp-copy 生成，冇直接改 Pages repo。

## 已知／留俾 Grok Bot
- `NT.safariLite` 成個專案都冇設定，所以 core27／hk18 嘅 lite 上限冇生效（modZc／modZe 用自己嘅 IS_SAFARI/IS_IPHONE/LOW_MEM）。建議喺 `window.NT` 定義後面加 `NT.safariLite = IS_SAFARI || IS_IPHONE || LOW_MEM;`。未包喺補丁入面。
- 桂林街路牌柱喺鴨寮街路邊 2.81 偏移：冇改。

> 2026-10-19 20:30 HKT 複驗：將現時 live working tree 抄去 /tmp/ntp-final，兩個補丁 `git apply --check` 都通過；鴨寮街探針 normal 同 ?lowmem 結果同上。72/72 個水馬有碰撞，HK18 冇任何告士打道／東區走廊／東隧 spine。live WIP 本身多咗 5 個 `assets/tex/facade/ytm/<冇副檔名>` 404（未套補丁嘅 live 副本一樣有），唔係呢啲補丁引起。
