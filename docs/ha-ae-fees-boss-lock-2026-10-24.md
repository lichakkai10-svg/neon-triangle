# 醫管局急症收費核對（老闆 2026-10-24）

來源：ha.org.hk fees＋憲報 PDF（2026-01-01）

| 資格 | 現實港幣 | ÷40 | 遊戲$ | 常數 |
|---|---|---|---|---|
| 合資格 EP（I／II 免另計） | **400** | 10 | **10** | `HA_ELIGIBLE_AE` |
| 非合資格 NEP | **2100** | 52.5 → 四捨五入 | **53** | `HA_NONELIGIBLE_AE` |

- `index.html` `GOV_FEES` 已係 10／53，**程式唔使改**。
- `data/gov-fees-verified.json` 非合資格 `game_amount_div40` 已對齊 53。
- `data/fines-official.json` 已有／更新 `fee_hk_ae`（$10）同 `fee_hk_ae_noneligible`（$53）。
- UI 繼續戲仿院名（廣華坊等），唔顯示「醫管局」全稱若法律另有要求——跟現有 `govWasted*`。
- 屋宇署外機 Class III（外伸 ≤600 mm、支架頂 >3 m）係法例門檻；遊戲冷氣離地 1.5–2.5 m 只係街景估算，**唔當合規判定**（交 3D／法律，數值唔入罰款）。

## 劇本 toast vs 扣款（老闆公營 essay）
- **Toast／標籤**：顯示真港幣 EP **$400**／NEP **$2100**。
- **入帳／`govWastedFee()`**：仍然 ÷40 → 遊戲 **$10**／**$53**。
- `govWastedLabel()` 已改顯示港幣面額；扣款函數未改。
