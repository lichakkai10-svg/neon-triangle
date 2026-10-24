# core27f 日頭街聲（音效配樂總監）

檔案：`docs/core27f-dayamb.js`。請貼喺 `index.html` 嘅 core27b 燈位執法之後、boot 之前。冇郁 Pages。

| 層 | 觸發 | 聲 |
|---|---|---|
| 過路燈 | 行路，喺 core27b 燈位 22 單位內 | 車綠燈（行人要等）：慢嘀，每 0.9 秒一下；車紅燈（行人綠燈）：快嘀，每 0.12 秒一下。原創合成近似，唔係錄真裝置 |
| 巴士 | 35 單位內有 bus／minibus | 低沉引擎；由行車減速到停有一下氣掣「嘶」 |
| 日頭人聲 | 只喺 `TOD.mode==='day'` | 彌敦道 1.0、長沙灣道／鴨寮街 0.9、衙前圍道 0.7、太子道東 0.4；揸車經過降到 0.4 |

夜晚繼續交返 `modYt_kowloonamb.js` 同 portamb 負責。葵涌唔加人聲，保持工業區咁疏。

## 宣傳片錄遊戲聲
用 `?recaudio` 開遊戲，例如 `?v=core27f&day&recaudio`。按 Shift+R 開始錄，再按一次停止，會自動下載 `neon-triangle-game-audio.webm`。錄落嚟係 `audio.master` 嘅實機聲，再對返畫面就得。iPhone Safari 支援 MediaRecorder，不過冇實體鍵盤，所以要用桌面 Chrome／Safari 錄。

## 待實機調
人聲頻率同巴士音量都係設計初值，要喺 iPhone 實機聽過先調。
