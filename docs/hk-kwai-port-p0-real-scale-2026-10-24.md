# 葵涌碼頭 P0 · 真 3D 尺度（老闆改優先 2026-10-24）

禁細盒碼頭／相板。資產：`assets/gltf/hk-port/`

## 舊問題
`kwProcCrane(…, 0.9)` 門架 ~42 m×0.9；`kwHull` 闊 8／長 ~36–48 —— 同真 STS／中型櫃船一比就似玩具。

## 新鎖（米 1:1，唔再 ×0.9 玩具 scale）
| 資產 | 尺度 |
|---|---|
| STS 岸吊 | 門架高 **55 m**、boom 外伸 **58 m**、軌距 **30 m** |
| 岸牆模組 | 長 **24 m**、垂直面、潮位污線、護舷／纜樁 |
| 貨櫃堆 | ISO 20／40；堆場 block 3 巷多層 |
| 船 | ~**120×18×8** m 剪影＋甲板疏櫃 |

## 代碼掛
1. `GLTFLoader` 換 `kwProcCrane` → `hk-sts-quay-crane.glb`（+X 向海）
2. 沿泊位 tile `hk-quay-wall-module.glb`
3. 堆場用 `hk-container-yard-stack.glb`（或 ISO 單櫃 instance）
4. `kwHull` → `hk-port-ship-hull.glb`
5. collider 見 `hk-kwai-port-scale.json`

未過關唔升版。醫院／facade 次之。
