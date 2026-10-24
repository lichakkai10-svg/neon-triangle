# 霓虹三角 — 市政／公文街景短表（下一輪 props）
負責人：@政府部門/大公司  
對齊：`docs/streetscape-authenticity-checklist.md`、`docs/streetscape-p0-props-stub.md`、`docs/legal-risk-and-parody-assets.md`  
原則：稀疏、真有先加；牌面戲仿、唔印真警徽／真路政標誌編號。  
更新：2026-10-24 HKT · 加假日臨時行人／封閉牌；工地仍用 `sign_works`

---

## 1. Prop 類型（畀地圖掛）

| type id | 外形 | 用途 | 優先區 |
|---|---|---|---|
| `barrier_yb` | 黃黑相間橫紋欄／防撞墩 | 隧道口、橋墩、渠邊、臨時封路 | 港隧道走廊、碼頭車路邊緣 |
| `box_junction` | 黃格路口（斜黃網） | 繁忙交界「勿停格」 | 旺角／彌敦交界、中環出口（稀疏 1–2 個） |
| `sign_height` | 限高牌（白底紅圈／黑箭） | 天橋底、隧道口、舊區限高 | 天橋底、紅隧／東隧方向過場 |
| `sign_lane` | 行車定向箭咀牌 | 單行／分線 | 澳窄街入口、港單行後巷口 |
| `line_yellow_dual` | 雙黃線（禁停） | 路邊 | 彌敦／賭場大道稀疏段 |
| `line_border_yellow` | 口岸引道粗黃線 | 排隊／車輛通道 | `mac_outer`、港澳碼頭、機場引道 |
| `rail_police_blue` | 警署外藍／灰金屬欄 | 署門外圍 | `kln_central_ps`（戲仿警署） |
| `cone_temp` | 橙臨時雪糕筒 | 掘路／封一條線 | 各區可隨機極稀 |
| `sign_works` | 「小心行人／工程進行」黃牌（戲仿） | 圍板旁 | 港市區 P1 |
| `sign_temp_ped` | 臨時行人區／假日封閉（白底黑字） | 遮打道日／假期行人化 | 中環假日；詳見 `gov-temp-pedestrian-closure-signs.md` |
| `sign_temp_divert` | 「請改道」臨時牌 | 封段兩端 | 同上 |
| `sign_temp_closed` | 「此路段暫時封閉」 | 短支路完全封 | 同上 |

---

## 2. 分區掛載建議（唔好塞滿）

| 區 id | 加咩（每區 ≤3 類） | 唔好加 |
|---|---|---|
| `mk_nathan` | `box_junction`×1–2、路邊 `line_yellow_dual` 短段、間中 `cone_temp` | 隧道黃黑欄、限高牌（正街無） |
| `central_pier` | 車路緣 `barrier_yb` 短柱、碼頭車道 `line_border_yellow` | 警署藍欄、黃格（碼頭少見） |
| 隧道／快速過場 | 入口必備 `barrier_yb`＋`sign_height`；逃生門標戲仿 | 穿過彌敦行人區 |
| `mac_outer` | `line_border_yellow`、排隊延續欄、`sign_lane`（中葡短字） | 港式黃格密佈 |
| 內港／下環 | `sign_lane`（單行）、極稀 `barrier_yb` | 高速限高牌 |
| `ximen` | 一般**唔掛**黃格／黃黑欄（徒步區） | 機車格已有就得 |
| `kh_port` | 港區 `barrier_yb`、指示向碼頭 `sign_lane` | 旺角式黃格 |
| `kln_central_ps` | 門外 `rail_police_blue`；門牌「警署（戲仿）」 | 真警徽、真區編號 |
| `xinyi_office`／國金大堂外 | 訪客車路上客灣短黃線即可 | 隧道道具 |

---

## 3. 牌面文案（戲仿 · 可入 texture／label）

| type | 港（繁中） | 澳 | 台（正體） |
|---|---|---|---|
| `sign_height` | `限高 3.5 m`（數字可調） | `高度限制 3,5 m`／夾 `altura` 極短 | `限高 3.5 公尺` |
| `sign_lane` | `前方靠左`／`單線路口` | `單行`＋小字葡語可選 | `請依標線行駛` |
| `sign_works` | `工程進行中 · 小心行人` | 同左（澳粵牌常見中文為主） | `施工中 請小心` |
| `sign_temp_ped` | `臨時行人區`（假日句，見專文） | 同左中文為主 | `臨時行人區` |
| `sign_temp_divert` | `請改道` | `請改道` | `請改道` |
| 口岸黃線旁立牌 | `請跟車道前進` | `請跟指示通道`／`siga a faixa` 一句 | `請依車道前進` |

**禁止：** 真「路政署」全徽、真隧道營辦商 logo、真警察局徽章。

---

## 4. 交給邊個

| 誰 | 做咩 |
|---|---|
| @關卡與地圖設計師 | 下一輪把 type id 寫入 `streetscape-p0-props.json`（或 p1 檔）稀疏掛載 |
| @香港澳門台灣地道人 | 掛完逐區 ✅／❌／改（尤其澳牌中葡、西門唔掛黃格） |
| @音效配樂總監 | 非阻；隧道回聲／臨時工程叮叮可後對 |
| 部署 | **唔郁 Pages／vendor** |

**狀態：** 市政短表定稿，可掛 P1；**唔阻聽日 P0 包。**
