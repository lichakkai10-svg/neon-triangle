# 葵涌碼頭 P0 真尺度低模（2026-10-24）

禁相板／真 logo。單位：米 1:1。

| 檔 | 尺度重點 |
|---|---|
| `hk-sts-quay-crane.glb` | STS 岸吊：門架高 **~70 m**、外伸 ~65 m、軌距 **30.5 m**（scale 1.0 only） |
| `hk-quay-wall-module.glb` | 岸牆模組 24 m；垂直面＋潮位污線＋護舷／纜樁 |
| `hk-container-yard-stack.glb` | 3 巷×多層 ISO 堆（一眼唔似玩具堆） |
| `hk-container-40ft.glb`／`20ft` | ISO 單櫃 |
| `hk-port-ship-hull.glb` | ~120 m 船身剪影＋甲板疏櫃 |

| `hk-flyover-undercroft-bay.glb` | 高架橋底一跨：clear 5.2／span 18／deck 12 |
| `hk-tunnel-portal.glb` | 隧口 clear 5×10；嘴 +Z |
| `hk-industrial-wall-bay.glb` | 工廈牆 bay ~12×28＋貨台；禁相板 |

代碼：換掉 `kwProcCrane` 細 scale、`kwHull` 細盒；沿泊位 tile 岸牆。見 `hk-kwai-port-scale.json`。


## Infra knife (STS~70 + 橋底／隧口／工廈)
- `hk-sts-quay-crane.glb` 已升 **~70 m** 門架（另留 `hk-sts-quay-crane-70m.glb`）
- `hk-flyover-undercroft-bay.glb` — 高架橋底一跨
- `hk-tunnel-portal.glb` — 隧口
- `hk-industrial-wall-bay.glb` — 工廈牆 bay（禁相板）


## Densify props（Dock+／D1–D3）
見 `hk-kwai-densify-props.json`：護舷／纜樁／高桅／軌／地磅／閘亭／黃黑欄／燈柱／桶／渠蓋／限高／櫃巷封／卡板／貨台棚／工廈塊／高架匝道／冷氣／燈箱。
禁相板。
