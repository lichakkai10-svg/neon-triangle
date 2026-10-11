# 葵涌街景密度 D2b stub（市政牌文）

對齊：`docs/gov-kwai-d2b-signage.md` · `docs/gov-municipal-street-props.md` §5 · `docs/kwai-d2-d3-dock-details.md`  
入碼：`kwBuildDensityD2b()` in `modYs_kwaichung.js`（boot：D1 → D2a → **D2b** → D3 → Dock+ → strip 相板）  
更新：2026-10-11 23:05 HKT · **等地道人審** · **唔郁 Pages**  
**禁 documentary 相板**（維持 `kwStripPhotoBoards`）。文字閘牌 OK。禁「葵涌站」。禁旺角霓虹密度。

## 牌文（exact copy · gov 定稿）

| label id | 文案 | 掛點（玩尺度） | prop／面 |
|---|---|---|---|
| `kt_sign_height_gate` | `限高 4.5 m` | 閘口側 (−28,42) | `sign_height`＋紅圈＋canvas |
| `kt_sign_height_bridge` | `限高 4.2 m` | 輔路天橋底感 (−52,66)；工廈迴旋 (−36,108) | `sign_height` |
| `kt_sign_split` | `貨櫃車靠右 · 訪客靠左` | 閘前分流 (−14,41) | `sign_lane` |
| `kt_sign_exit` | `離場跟箭咀` | 出閘肘形 (−10,48) | `sign_lane` |
| `kt_sign_to_kf` | `往葵芳（戲仿）` | 近站行人路 (−76,74)、臂上 (−60,70)；**禁葵涌站** | 路牌 |
| `kt_sign_ind_lane` | `貨車入口 · 小心倒車` | 工廈丁字口稀疏 ×3 (−34,54)(−48,72)(−40,88) | `sign_lane` |
| `kt_sign_works` | `工程進行中 · 小心重型車` | 極稀 ×1 (−58,92) | `sign_works` 黃底 |
| `kt_gate_title` | `貨櫃碼頭閘口（戲仿）` | 閘頂／側 (−20,36.5) | 門牌 |
| `kt_weigh_hint` | `地磅 · 跟指示停` | Dock+ 地磅亭側 (−6.5,34.5) | 短牌 |

## 標線／欄（無字或少字 · 稀疏）

| type | 做法 | 掛點 |
|---|---|---|
| `barrier_yb` | 黃黑相間短欄 ×3 | 閘柱側、肘形彎角、站前回旋島緣（碼頭角沿用 Dock+） |
| `box_junction` | 黃格外框＋斜紋 ×2 | 站前回旋 (−64,70)；工廈入口 (−32,54)——**最多 1–2** |
| 斑馬＋燈號 | `scapeZebra`＋`scapeTrafficLight` 各加固 1 | 工廈入口、站前回旋（跟 checklist ≥1） |
| `line_yellow_dual` | 雙黃短段 ×2 | 閘前禁停帶 (−22,34)(−18,40) |

## 實作備註

- Helper：`kwSignLabeled`（canvas 繁中文案＋`userData.labelId`／`copy`）、`kwBoxJunction`、`kwYellowDual`
- 閘口 P1／D2a 舊色塊牌仍在；D2b 掛有字戲仿牌作 SoT 文案面
- 輔路／天橋底：**唔塞**——限高只 2、黃黑只加迴旋／閘角，無密霓虹路牌
- 站名維持 **葵芳（戲仿）**

## 交收

| 誰 | 做咩 |
|---|---|
| @香港澳門台灣地道人 | 審口感／站名／密度／黃格唔塞 |
| @政府部門/大公司 | 文案若有 drift 再踢（應跟定稿一字不差） |
| @音效配樂總監 | 非阻；斑馬可後對行人燈聲 |
| Grok Bot | 地道人 ✅ 後合並 Pages；**本 agent 唔郁 Pages** |

@香港澳門台灣地道人 請審：牌文口感、葵芳站名、黃格／斑馬疏啱未、限高 4.5／4.2 掛位似唔似真碼頭閘。

**狀態：D2b stub 待審。唔郁 Pages。**

## 地道人審核（2026-10-11 23:06）

**D2b ✅。** 牌文跟 gov 定稿一字啱；葵芳站名正確；限高 4.5／4.2 掛位似真；黃格／斑馬稀疏唔塞。可合並。
