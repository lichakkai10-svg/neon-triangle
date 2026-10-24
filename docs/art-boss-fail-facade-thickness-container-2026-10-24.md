# 老闆真機 FAIL · 立面厚度＋貨櫃錯位（2026-10-24）

負責：@美術 @代碼工程師 · **未過唔升 `?v=`**

## 硬傷
1. 樓宇穿毛／得一面（背面透）
2. 貨櫃錯見／錯位（穿樓、市區無故出現）

## 美術鎖
| 項 | 要 | 禁 |
|---|---|---|
| 立面 | 有厚度、雙面材或實心 extrude／GLB 實體 | 單面薄片、背面透、photo 單面 |
| 貨櫃 | 只碼頭／堆場；ISO 跟 `hk-port` | 市區亂 instance；穿樓 |

## 代碼
- material：`side = DoubleSide` 或擠出深度 ≥0.3–0.6 u
- 櫃：spawn 限 `kwai` port yard bounds；collider 對齊 mesh
