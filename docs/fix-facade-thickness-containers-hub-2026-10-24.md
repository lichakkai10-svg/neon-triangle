# Fix · 立面厚度＋貨櫃只堆場（2026-10-24）

**唔升 `?v=`**（仍 core28）。

## 立面（老闆穿毛／單面）
- `hkPushThickWall`：外牆＋背臉＋頂 return，殼深 `FACADE_SHELL_D=0.5`（≥0.45）
- 掛落 YTM／CW／KT／區 makeDistrict／c27f 細樓／osmCity／`extrudeBuildings`／`hkExtrude`
- 紙片 Plane→厚 box：HK9 舖面、重慶大廈 atlas／立面、domestic 牌
- 厚殼 kit：`assets/gltf/hk-buildings/*`（`hkLoadFacadeKit`／`hkDressFootprintShell`）；禁 `facade_d_*` 相板當樓
- 材質：`hkEnsureFacadeSide` → `DoubleSide`

## 貨櫃（錯見市區）
- `kwContainerRoot` 掛 `KWAI_GEO.hub`（−1237,−145）；InstancedMesh 唔再 `scene` origin
- collider 用 `kwHubCol`；只堆場／港區

跟：`docs/art-boss-fail-facade-thickness-container-2026-10-24.md`、`hk-facade-thickness-spec.json`。
