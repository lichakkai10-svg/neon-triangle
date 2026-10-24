# 葵涌基建 glTF hang（2026-10-24）

**分支** `fix/core28-arcade-cw-cam` · **唔升 ?v=、唔合 main**

## 掛咗咩

| id | glTF | 做法 |
|---|---|---|
| STS（既有） | `hk-sts-quay-crane.glb` | `KWAI_SCALE.sts` → portalH **70**／gauge **30.5**／outreach **65**／tipY **85**；`kwProcCrane` @ **1.0** |
| `kt_flyover_north` | `hk-flyover-undercroft-bay.glb` | 北側／內陸 tile **10×** span 18 m（≥120–200 m）；**禁**穿堆場中軸 |
| `kt_tunnel_portal` | `hk-tunnel-portal.glb` | **1×** context stub（overlay `tunnel_roads`=0） |
| `kt_ind_block_n` | `hk-industrial-wall-bay.glb` | 閘／肘兩側 **8×** bay（矮過岸吊）；禁相板 |
| `kt_station_kwai_fong` | 程序盒 | 「葵芳（戲仿）」；**禁**「葵涌站」 |

灣岸 STS／船／quay／yard hang **保留**。禁 HIT／MTL／真營辦 logo。

## 布局鎖

- 剖面：`docs/core28a-kwai-terminal-context-layout.md`（葵芳→工廈→高架／隧→肘閘→堆場→海峽→青衣吊）
- GIS：`assets/data/kwai-terminal-gis-overlay-p0.json`（優先；內陸 bridge／工廈點不足則 stub）
- 掛位：`KWAI_GEO.hub`（−1237, −145）；唔擺 origin

## 代碼入口

- `KWAI_SCALE`／`KWAI_SCALE.gltf.flyover|tunnel|indWall`
- `kwBuildInfraGltf(root)` ← `kwBuildThreePartStub`

## 未做

- 青衣吊牆精校（Part C 仍疏排 STS）
- 隧道真 OSM（bbox `tunnel=yes`=0；等 GIS／房7）
- 高架跟青葵公路真 polyline 精貼（而家內陸 stub／overlay 篩選）
- 合 tip／升 `?v=`

## Loader 修（sz=0）
`kwPortLoad`：`loadGLTF` 回傳整份 glTF → 必須 `root = g.scene || g` 再 `traverse`／`clone`。未解包會 `traverse is not a function`，infra hang `sz=0`。
