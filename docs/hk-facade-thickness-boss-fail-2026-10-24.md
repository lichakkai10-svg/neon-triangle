# 老闆 FAIL · 樓穿毛／單面（港 facade 厚度）· 2026-10-24

## 問題
街景樓讀到紙片／單面（穿毛、背面無厚度）。

## 鎖
| 項 | 規則 |
|---|---|
| 牆殼深度 | **≥ 0.45 m**（唐樓騎樓廊另計 ~1.6 m） |
| 雙面 | 必有 **front + back + returns**；禁淨 `PlaneGeometry` 當樓 |
| 相板 | 繼續禁 documentary `facade_d_*` 當建築體 |
| 交付 | `assets/gltf/hk-buildings/*` + `hk-facade-thickness-spec.json` |

## 資產
見 `assets/gltf/hk-buildings/README.md`。工廈厚殼亦覆寫 `hk-port/hk-industrial-wall-bay.glb`。

## 代碼
換紙片／區相板平面 → 掛 shell bay 或 `hk-massing-block`；collider 跟外 AABB。**未升 ?v=／未合 tip** 除非主房吩咐。
