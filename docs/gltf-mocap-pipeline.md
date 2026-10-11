# 霓虹三角 — CC0 GLTF／動態捕捉管線（第一批）

專責：@3d資產與動態捕捉指導  
對齊：`data/gltf-asset-licenses.json`、`m1c/assets/gltf/README.txt`、`m1c/src/game2.js`（`loadCharacter`）／`game3.js`（步行混合）  
引擎：Three.js `m1c`（唔轉引擎）  
更新：2026-10-10 22:16 HKT  

規則：優先 **CC0／明確可商用**；戲仿塗裝唔抄真商標／警徽；第一批 VO **唔做 lip-sync**（跟配音組），動畫以 **walk 質素** 為先。

---

## 0. 現況快照

| 槽位 | 現用檔 | 授權 | 備註 |
|---|---|---|---|
| 主角／NPC 共用 | `m1c/assets/man.glb`（Quaternius Business Man） | CC0 | Idle／Walk／Run 等；代碼 `HUMAN.man` |
| 角色後備 | `m1c/assets/character.glb` | CC0 | Animated Men Pack |
| 的士暫代 | `m1c/assets/gltf/taxi-cc0.glb` | CC0 | Innerscene |
| 紅巴暫代 | `m1c/assets/gltf/minibus-cc0.glb` | CC0 | 3dassets.dev |
| EU 廂型暫代 | `m1c/assets/gltf/delivery-van-cc0.glb` | CC0 | ＋戲仿貼圖 |
| 巡邏 SUV 備選 | `m1c/assets/gltf/police-suv-cc0.glb` | CC0 | 通用塗裝 |

待補（第二優先，唔阻 walk）：Kenney Modular Buildings（唐樓組件）、Kenney Car Kit（車流）、Quaternius Cars Bundle。

---

## 1. Walk 質素（本批優先 · 已拍板）

**目標**：步行時減少滑步／腳速唔合；唔換骨架；唔為 lip-sync 鎖頭。

| 項 | 做法 | 錨點 |
|---|---|---|
| A. 混合曲線 | Idle 更快淡出；Run 較晚切入，拉闊 Walk 帶 | `game3.js` `updatePlayer` 權重 |
| B. 腳步節奏 | Business Man Walk 基準速 ≈1.4 m/s；收窄 `timeScale` 夾 | `game3.js`（非 UAL 分支） |
| C. NPC 對齊 | 同基準，避免途人滑步 | `mod3a_npc.js` 動畫權重 |
| D. 停步 | 減速 damp 略加快，唔拖尾走 | `player.speed` damp |

**不做（本批）**：重錄 mocap、換 UAL 角色、臉部 blendshape／lip-sync。

**驗收**：腳模式慢行／正常行／衝刺；停步唔「月亮步」；NPC 近距同行唔明顯滑。

---

## 2. 資產入庫 checklist

入 `m1c/assets/gltf/` 前：

1. 核授權頁＝CC0 或可商用免署名（寫入 `data/gltf-asset-licenses.json`）。
2. GLB 盡量 draco／合理面數；車殼可換色，**唔**帶真警徽／真商標。
3. 角色類：必有可映射 `Idle`／`Walk`／`Run`（見 `loadCharacter` regex）。
4. 更新 `m1c/assets/gltf/README.txt` 一行說明。

---

## 3. 下一步順序

1. ~~拍板 walk 優先~~（製作人已定）→ **本批調混合**（見上）。
2. 唐樓／公屋 Kenney Modular（第二）。
3. 車流 Kenney Car Kit；GT-R／Alphard 繼續用暫代外形＋戲仿塗裝。
4. 若 Walk 仍滑：再評估另下 CC0 walk-in-place clip（同骨架），唔先動 VO。

---

## 4. 對外／合規備註

- 車身／霓虹字跟法律組戲仿表（「信旺中心」等）。
- 警察車只用通用／戲仿塗裝，唔用真編制名／真徽。


---

## 5. 聽日 Safari／Pages 安全（2026-10-10 夜）

- **唔直接推 Pages**；合並經代碼。Rebuild 必須保留：`./vendor/three@0.186.1/` importmap、`USE_LDR`／`UnsignedByteType`／`setClearColor(0x0b0c0e)`。
- **唐樓 Kenney 暫緩 embed**（唔入 `EMBED.txt`），避免手機 0% loading 變重；本地可放 `m1c/assets/gltf/` 懶載。
- 法律 P0 協助：`star-ferry-pier-day.jpg` → 本地戲仿 `harbour-ferry-pier-day.jpg`（塗走 STAR FERRY／星光字，標「維港渡輪」）；`modYp_batch2_art.js` 已改路徑。**待代碼安全合並**，唔入今晚 Pages。


---

## 6. 現實錨定（用戶：全部真實＝似真實世界）

| 項 | 現實參考 | 遊戲現況／下一步 |
|---|---|---|
| 步行節奏 | 成人平地約 1.3–1.5 m/s；跑約 4–6 m/s | Walk 基準 1.4、Run 混合已調；聽日 Safari 體感滑再微調 `timeScale` |
| 紅的／小巴／廂型 | 豐田 Comfort 紅的、十六座紅巴、歐系廂型比例 | 現 CC0 **外形暫代**；塗裝戲仿、唔抄真商標／警徽；換真比例模型排 Safari 可玩之後 |
| 維港渡輪 | 綠白雙層、碼頭門面 | 已換 `harbour-ferry-pier-day.jpg`（去 STAR FERRY 字，標戲仿「維港渡輪」） |
| 唐樓／公屋 | 窄面闊、騎樓、冷氣機外機密度 | Kenney 只作塊件；材質板用港式窗／冷氣密度拉近現實；**暫緩 embed** |
| 警察車 | 白藍通用巡邏外形即可 | `police-suv-cc0` 通用塗裝；唔印 HKPD／EU 全稱（跟法律 §9） |

原則：外形可以「暫代」，節奏／比例／街景密度要似香港；法律戲仿名優先於視覺裝飾字。


---

## 7. 車模比例核對（2026-10-11）

`prepVehicle(gltf, len)` 以車身長度（Z）統一縮放。對照港常見車型（現實約值）：

| 槽位 | 現實參考 L (m) | 舊目標 | **新目標** | 備註 |
|---|---:|---:|---:|---|
| 紅的 `taxi-cc0` | Comfort ≈4.70 | 4.5 | **4.7** | 外形仍暫代；長對齊 |
| 紅巴 `minibus-cc0` | 十六座短軸 ≈6.2–7.0 | 5.8 | **6.4** | −17%→≈−8%；全 7m 易卡巷 |
| EU 廂型 `delivery-van-cc0` | Sprinter 級 ≈5.9 | 5.4 | **5.9** | 作衝鋒／物流暫代 |
| 巡邏 SUV `police-suv-cc0` | ≈4.85–5.0 | 4.9 | **4.9** | OK |
| 舊 `police.glb` sedan | ≈4.7 | 4.7 | **4.7** | Safari lite 後備 |
| `van-black.glb` | ≈5.0 | 5.0 | **5.0** | OK |

**Safari／LOW_MEM**：重型 CC0（廂型／小巴／SUV）仍跳過，只用細檔 `police`／`van`——比例改對桌面／非 lite 生效。

**未做（上架前）**：換真比例網格（紅的／紅巴外形）；去塗改渡輪圖。本地改 `mod3a_npc.js`，**唔推 Pages**——等安全合並。


---

## 8. 禁 documentary 門面相板（2026-10-11）

跟 `docs/kwai-no-photo-boards.md`：碼頭／公屋玩家可見大平面相 **禁止**。

| 改動 | |
|---|---|
| `modYp_batch2_art.js` | 停用 ifc／estate／ferry `b2FacadePlane`；唔再載該三張 JPG |
| `modYe_landmarks.js` | `estate_corridor` 程序窗＋冷氣盒；`starferry_tst` 綠頂／柱／碼頭 apron |
| 車身 `vehDN` sheet | 暫留（細側貼，非街景 documentary） |

本地改完 **唔推 Pages**——等 Grok Bot／代碼合並 `core14`。


---

## 9. 程序門面擴充（2026-10-11 22:52）

- `estate_corridor`／`starferry_tst`：已有程序窗／綠頂柱 apron
- **新增** `ifc_lobby`／`boa_tower` 玻璃幕＋橫樑；`lockhart` 霓虹窗＋色帶
- `modYg_art.js` 已禁 P0 JPG；strip 擴大匹配 `art-b2-*`
- 唔掂 Pages——等合並


## 10. core16 合並（2026-10-11）

- IFC／中銀玻璃幕＋橫樑、駱克道霓虹窗＋色帶、公屋／天星程序門面已上 Pages
- `artStripPhotoBoards` 匹配 `art-b2-*`＋`userData.artB2`
- 另：葵涌 D3 細節＋閘口／工廈大堂／葵芳站可入
- 玩：`?v=core16`

## 11. core17 合並（2026-10-11）

- Kwai D2a：`kwBuildDensityD2a()` 肘形 5 段弧＋輔路／丁字／行人路／燈柱
- 碼頭環境音加密：`fender_thud`／`crane_rail`（`modYt_portamb`）
- Dock+：`kwBuildDockPlus()` 岸壁污線／吊機軌／護舷加密／高桅／地磅（**D2b 未做**）
- 保留：vendor／LDR／禁相板（`kwStripPhotoBoards`）
- 玩：`?v=core17`

