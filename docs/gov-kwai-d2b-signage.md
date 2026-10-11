# 葵涌 D2b — 市政牌文（定稿）
負責人：@政府部門/大公司  
對齊：`docs/gov-municipal-street-props.md` §5、`docs/kwai-d2-d3-dock-details.md`、`docs/kwai-street-density-d2a-stub.md`  
原則：文字牌／黃黑欄／斑馬——**唔係** documentary 相板；戲仿、唔印真路政署徽／真營辦商。  
更新：2026-10-11 22:58 HKT · **唔郁 Pages**

---

## 1. 必掛牌文（跟 id）

| label id | 文案 | 掛點（建議） | prop |
|---|---|---|---|
| `kt_sign_height_gate` | `限高 4.5 m` | 閘口（已有 §5，維持） | `sign_height` |
| `kt_sign_height_bridge` | `限高 4.2 m` | 輔路天橋底／工廈迴旋入口（若有） | `sign_height` |
| `kt_sign_split` | `貨櫃車靠右 · 訪客靠左` | 閘前分流（§5 維持） | `sign_lane` |
| `kt_sign_exit` | `離場跟箭咀` | 出閘肘形 | `sign_lane` |
| `kt_sign_to_kf` | `往葵芳（戲仿）` | 近站／行人路；**禁「葵涌站」** | 路牌 |
| `kt_sign_ind_lane` | `貨車入口 · 小心倒車` | 工廈貨台丁字口（稀疏 2–3） | `sign_lane` |
| `kt_sign_works` | `工程進行中 · 小心重型車` | 極稀 0–1 | `sign_works` |
| `kt_gate_title` | `貨櫃碼頭閘口（戲仿）` | 閘頂／側 | 門牌 |
| `kt_weigh_hint` | `地磅 · 跟指示停` | 地磅閘亭側（Dock+ 已有亭） | 短牌 |

## 2. 標線／欄（無字或少字）

| type | 做法 | 掛點 |
|---|---|---|
| `barrier_yb` | 黃黑相間 | 閘柱、肘形彎角、迴旋島緣、碼頭角（Dock+ 可重用） |
| `box_junction` | 黃格 | 站前回旋／工廈入口 **最多 1–2**（唔塞） |
| 斑馬＋燈號 | 白間條＋行人燈柱 | checklist：工廈入口、站前回旋各 ≥1 |
| `line_yellow_dual` | 雙黃短段 | 閘前禁停帶稀疏 |

## 3. 明示唔做

- 真「路政署」全徽、真隧道／碼頭營辦商 logo  
- 「葵涌站」任何 UI／牌  
- 相板當牌、旺角霓虹路牌密度  

## 4. 交收

| 誰 | 做咩 |
|---|---|
| @關卡與地圖設計師 | `kwBuildDensityD2b()` 掛上表 label；斑馬／黃格稀疏 |
| @香港澳門台灣地道人 | 審口感／站名／密度 |
| @音效配樂總監 | 非阻；斑馬可後對行人燈聲 |

**狀態：D2b 牌文定稿，可開 stub。**
