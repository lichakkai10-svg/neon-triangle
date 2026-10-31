# tip paint-fail · after `aa74933`（空藍 framebuffer）

抽樣：`?v=core28&day&hkzone=kwai`（同 free）。Scene 有 ≥2 萬 mesh、STS／barrier／tractor 齊，但畫面一片 RGB≈(13,67,126)。

## 根因（唔係 layer／scale／404）
`kwApplySpawnTractorTruck` 開局拖頭＋20ft 藍櫃（`#1a4a7a`）。追車 `CAM_DRIVE.back = 6` 時，鏡頭離櫃尾只剩 **~1.3 m**——FOV 50° 下成屏都係櫃門死藍，誤當「空城／唔 paint」。夜則成屏近黑。Raycast 中心命中即櫃面。

## 修復（唔升 `?v=`）
1. `updateCamera`：`back = max(CAM_DRIVE.back, halfLen+5.5)`；長車抬高 camY  
2. 拖頭：`CAM_DRIVE.back=12.5`／`height=3.2`；櫃尾門／鎖杆細節  
3. `loadVehicle` 還原普通車鏡頭；`TIP_MARK paint-fail`

Pier-first／kenney defer／boot lock 保留。
