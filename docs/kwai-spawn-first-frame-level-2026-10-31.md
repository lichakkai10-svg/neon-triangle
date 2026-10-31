# Kwai spawn 第一幀 · 關卡 rev2（`15344c0` QA FAIL）

**唔升 ?v=** · 對齊美術鎖

## FAIL
tip `15344c0` 用 (-14,-95)→南閘，真機仍**青綠牆角填屏**。

## rev2 鎖位（hub_local）
| | lx | lz |
|---|---|---|
| **spawn** | **-8.0** | **-228.0** |
| **look_at 南閘** | **0** | **-271** |

- 距閘 ≈ **44 m**（≥25；貼閘開闊瀝青）
- `heading = atan2(Δx,Δz)` ≈ 2.9576
- 前方 30 m×40° 錐：**清／搬** `kt_ind_block`／工廈殼／alleyBlocker
- 廢止 (-14,-95)

改 `kwSpawnElbowGatePose()` 內 lx/lz 即可。
