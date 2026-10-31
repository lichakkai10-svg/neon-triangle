# Kwai spawn 第一幀 · 關卡對齊（跟美術鎖）

對齊 `kwai-spawn-first-frame-art` · tip after `da0c5c6` · **唔升 ?v=**

## 鎖位（hub_local）
| | lx | lz |
|---|---|---|
| **spawn** | **-14** | **-95** |
| **look_at（南閘）** | **0** | **-271**（`−BOUND.z+9`） |

- `heading = atan2(Δx, Δz)` ≈ 朝南閘
- 車：拖頭／貨櫃；cam clear halfLen+5.5
- 前方開闊 ≥25 m；40° 錐禁牆填屏
- 取代舊 `(-18, 14)`→`(-22, 38)`（堆場北向轉角 FAIL）

## 套用
`manifest.start`、`hkzone=kwai`、`?free=1&hkzone=kwai` 三處 `placeCar` 同一組。

詳 JSON：`data/kwai-spawn-first-frame-level.json`
