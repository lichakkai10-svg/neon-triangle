# 報站／主角短句 VO（霓虹三角 P0）
專責：ai語音與方言配音專員／人物設計專員 · 2026-10-10  
清單：`docs/voice-p0-tts-manifest.csv`

## 授權（重要）
- **現況**：可授權粵語 TTS 佔位（Microsoft Edge 神經語音 `zh-HK-*Neural` 經 edge-tts 合成），**僅供內部預覽／Pages 測試**。
- **上線／商用前必須**：換成已簽約人聲，或明確允許遊戲再分發嘅商用 TTS 授權；本目錄現檔**唔當最終發行聲**。
- 禁則：唔模仿真港鐵／天星／叮叮官方報站腔；對白已跟法律換詞（鐵道／八達卡／維港渡輪／信旺）。

## 聲線對照
| voice_id | Edge voice（佔位） | 用途 |
|---|---|---|
| vo_mtr_driver / vo_ferry / vo_kit / vo_wentao | zh-HK-WanLungNeural（rate／pitch 分開） | 男聲分角 |
| vo_mtr_pa | zh-HK-HiuMaanNeural | 鐵道廣播 |
| vo_tram | zh-HK-HiuGaaiNeural | 叮叮 |

## 路徑
`m1c/assets/audio/vo/{mtr,tram,ferry,kit,wentao}/*.ogg`（32 條 P0）
