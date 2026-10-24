/* =========================================================================
 * core27f 日頭街聲（音效配樂總監）· 貼喺 index.html core27b 燈位執法之後、boot 之前
 *  · 過路燈「嘀嘀」：讀 NT.C27SIGNS.phase（車 G＝行人等，慢嘀；車 R＝行人綠，快嘀）
 *    原創合成近似，唔係錄真裝置；只喺行路、燈位 22 單位內
 *  · 巴士：附近 bus／minibus 低沉引擎；由行車減速到停有一下氣掣「嘶」
 *  · 日頭人聲：彌敦道、長沙灣道／鴨寮街、衙前圍道、太子道東四段，真 lat/lon
 *  · ?recaudio：MediaRecorder 錄 audio.master（宣傳片用實機聲），按 Shift+R 開始／停止，自動下載 .webm
 * 冇真歌、冇真電台、冇可辨商號叫賣、冇 WASTED sting。
 * ========================================================================= */
(function () {
  if (typeof SFX10 === 'undefined' || typeof tone !== 'function') return;
  Object.assign(SFX10, {
    xing_tick_slow: (v = 1) => tone([[1650, 0, 0.035, 'square', 0.5]], 0.05 * v),
    xing_tick_fast: (v = 1) => tone([[1650, 0, 0.03, 'square', 0.5]], 0.06 * v),
    bus_idle: (v = 1) => tone([[48, 0, 0.9, 'sawtooth', 0.5], [72, 0.05, 0.8, 'sine', 0.6], [96, 0.1, 0.6, 'triangle', 0.25]], 0.09 * v),
    bus_air_brake: (v = 1) => { const n = []; for (let i = 0; i < 10; i++) n.push([3200 + ((i * 523) % 1800), i * 0.025, 0.12, 'sawtooth', 0.18]); tone(n, 0.05 * v); },
    day_murmur: (v = 1) => { const n = []; for (let i = 0; i < 10; i++) { const f = 180 + ((i * 97) % 220); n.push([f, i * 0.12 + Math.random() * 0.08, 0.18 + Math.random() * 0.1, i % 3 ? 'sine' : 'triangle', 0.2 + Math.random() * 0.15]); } tone(n, 0.04 * v); }
  });

  const D = { tick: 0, cool: {}, buses: new WeakMap(), rec: null };
  const ZONES = [ // 日頭人聲：真 lat/lon，半徑 m，權重
    { id: 'nathan_rd',  lat: 22.3050, lon: 114.1716, r: 260, w: 1.0 },
    { id: 'csw_rd',     lat: 22.3303, lon: 114.1620, r: 200, w: 0.9 },
    { id: 'nga_tsin_wai', lat: 22.3297, lon: 114.1903, r: 140, w: 0.7 },
    { id: 'pe_rd_east', lat: 22.3311, lon: 114.1950, r: 160, w: 0.4 }
  ];
  const pos = () => {
    if (typeof state !== 'undefined' && state.mode === 'drive' && typeof car !== 'undefined' && car.pos) return { x: car.pos.x, z: car.pos.z, drive: true };
    if (typeof player !== 'undefined' && player.pos) return { x: player.pos.x, z: player.pos.z, drive: false };
    return null;
  };
  function sim(dt) {
    if (typeof state === 'undefined' || !state.started || typeof sfx !== 'function') return;
    if (typeof INT !== 'undefined' && INT.active) return;
    const p = pos(); if (!p) return;
    const day = typeof TOD !== 'undefined' && TOD.mode === 'day';
    const K = (typeof LM !== 'undefined' && LM.K) ? LM.K : 1;
    const cd = (k) => { D.cool[k] = Math.max(0, (D.cool[k] || 0) - dt); return D.cool[k] > 0; };

    // 過路燈嘀嘀
    const SG = typeof NT !== 'undefined' && NT.C27SIGNS;
    if (!p.drive && SG && SG.ready && SG.calmingData) {
      let best = 1e9;
      for (const c of SG.calmingData) { if (c.type === 'lane_shift') continue; const d = Math.hypot(p.x - c.x, p.z - c.z); if (d < best) best = d; }
      if (best < 22) {
        const walk = SG.phase === 'R';
        D.tick -= dt;
        if (D.tick <= 0) { D.tick = walk ? 0.12 : 0.9; sfx(walk ? 'xing_tick_fast' : 'xing_tick_slow', 1 - best / 26); }
      }
    }
    // 巴士
    if (typeof VEHS !== 'undefined') {
      for (const v of VEHS) {
        if (!v.pos || !/bus/.test(String(v.kind || v.model || ''))) continue;
        const d = Math.hypot(p.x - v.pos.x, p.z - v.pos.z); if (d > 35) continue;
        const f = 1 - d / 35, prev = D.buses.get(v) || 0, sp = Math.abs(v.speed || 0);
        if (prev > 2 && sp < 0.4 && !cd('brake')) { D.cool.brake = 6; sfx('bus_air_brake', f); }
        D.buses.set(v, sp);
        if (!cd('bus_idle') && Math.random() < dt * 0.5) { D.cool.bus_idle = 1.6; sfx('bus_idle', f * (p.drive ? 0.5 : 1)); }
      }
    }
    // 日頭人聲（夜晚交返 kowloonamb）
    if (day && typeof hkGeo === 'function') {
      for (const z of ZONES) {
        if (z._x == null) { const g = hkGeo(z.lat, z.lon); z._x = g.x; z._z = g.z; }
        const d = Math.hypot(p.x - z._x, p.z - z._z); if (d > z.r * K) continue;
        if (cd(z.id)) continue;
        if (Math.random() < dt * 0.25 * z.w) { D.cool[z.id] = 2.5 + Math.random() * 3; sfx('day_murmur', z.w * (1 - d / (z.r * K)) * (p.drive ? 0.4 : 1)); }
      }
    }
  }
  if (typeof HOOKS !== 'undefined') HOOKS.sim.push(sim);

  // ?recaudio：錄遊戲聲（宣傳片）
  if (/[?&]recaudio\b/.test(location.search)) {
    window.addEventListener('keydown', (e) => {
      if (!(e.shiftKey && e.code === 'KeyR')) return;
      const a = typeof audio !== 'undefined' && audio; if (!a || !a.ctx || !a.master) return;
      if (D.rec) { D.rec.stop(); return; }
      const dest = a.ctx.createMediaStreamDestination(); a.master.connect(dest);
      const r = new MediaRecorder(dest.stream), chunks = [];
      r.ondataavailable = (ev) => chunks.push(ev.data);
      r.onstop = () => { a.master.disconnect(dest); D.rec = null; const u = URL.createObjectURL(new Blob(chunks, { type: 'audio/webm' })); const l = document.createElement('a'); l.href = u; l.download = 'neon-triangle-game-audio.webm'; l.click(); };
      r.start(); D.rec = r;
    });
  }
  Object.assign(window.NT = window.NT || {}, { DAYAMB: D, DAYAMB_ZONES: ZONES });
})();
