/* =========================================================================
 * core27f · 外傭假日中環 · 3 個近景具名街坊（人物設計）
 *  · 星期日 + 日頭 10:00–18:00；錨點真 lat/lon
 *  · 便服 OUTFITS（跟 ped-outfits helper）；say() 抽普通粵語，零口音笑位
 *  · 禁真 NGO／領事館名／機構道具；唔掂 Pages 合入——交 Grok Bot 貼標記段
 * ========================================================================= */
(function () {
  if (typeof OUTFITS === 'undefined') return;
  Object.assign(OUTFITS, {
    fdw_a: { jacket: 0xe87a5a, shirt: 0xe87a5a, tie: 0xe87a5a, pants: 0x3a4a6a, shoe: 0xe8e8e8, skin: 0xa87a56, hair: 0x1a120c },
    fdw_b: { jacket: 0x3a8aa8, shirt: 0x3a8aa8, tie: 0x3a8aa8, pants: 0x1a1a1a, shoe: 0x101010, skin: 0xb07c58, hair: 0x0e0a08 },
    fdw_c: { jacket: 0x5a5a8a, shirt: 0xf0ece4, tie: 0xf0ece4, pants: 0x2a2a2a, shoe: 0x2a2a2a, skin: 0xa8805c, hair: 0x2a1a10 }
  });
  // [id, name, lat, lon, dx, dz, yaw, outfit, lines]
  const PEDS = [
    ['npc_cn_sun_a', '休息區姐姐', 22.2806, 114.1606, 2, -1, 2.5, 'fdw_a',
      ['呢度遮陽啲，坐陣先。', '午後先去超市買餸。']],
    ['npc_cn_sun_b', '影相朋友', 22.2810, 114.1598, -1, 2, 4.0, 'fdw_b',
      ['借借呀，我影張相。', '朋友喺對面等緊我。']],
    ['npc_cn_sun_c', '散步阿姨', 22.2814, 114.1588, 1, 1, 1.2, 'fdw_c',
      ['今日放假，慢慢行。', '唔好意思，膠袋唔好踩親。']]
  ];
  const ST = { live: {}, cd: {}, t: 0, w: {} };

  function isSundayDay() {
    try {
      if (typeof TOD === 'undefined' || TOD.mode !== 'day') return false;
      // 遊戲日曆：優先 NT.gameDate；否則用真實星期日方便試（?fdwsun 強制）
      if (/[?&]fdwsun\b/.test(location.search)) return true;
      if (window.NT && NT.gameDate && typeof NT.gameDate.getDay === 'function') return NT.gameDate.getDay() === 0;
      return new Date().getDay() === 0;
    } catch (e) { return false; }
  }
  function inClock() {
    try {
      if (window.NT && NT.DAY27C && NT.DAY27C.clockMin != null) {
        const m = NT.DAY27C.clockMin | 0; return m >= 10 * 60 && m < 18 * 60;
      }
    } catch (e) {}
    return true; // 無鐘就只靠日頭＋星期
  }
  function wpos(p) {
    const k = p[0];
    if (!ST.w[k] && typeof hkGeo === 'function') {
      const g = hkGeo(p[2], p[3]); if (g) ST.w[k] = { x: g.x + p[4], z: g.z + p[5] };
    }
    return ST.w[k];
  }
  function inHK() {
    return !(typeof TW !== 'undefined' && TW.active) && !(typeof AREA !== 'undefined' && AREA.active)
      && !(typeof INT !== 'undefined' && INT.active);
  }

  function tick(dt) {
    ST.t -= dt; if (ST.t > 0) return; ST.t = 0.5;
    if (typeof spawnNPC !== 'function' || !HUMAN || !HUMAN.gltf || !player) return;
    const ok = inHK() && isSundayDay() && inClock();
    const pp = player.pos, now = performance.now() / 1000;
    for (const p of PEDS) {
      const w = wpos(p); if (!w) continue;
      const d = Math.hypot(w.x - pp.x, w.z - pp.z);
      let n = ST.live[p[0]];
      if (n && (!n.alive || !ok || d > 420)) {
        if (n.alive && typeof removeNPC === 'function') removeNPC(n);
        delete ST.live[p[0]]; n = null;
      }
      if (!n && ok && d < 320) {
        n = spawnNPC('civ', w.x, w.z, p[6], {
          hostile: false, unarmed: true, hp: 60, cash: 20,
          outfit: OUTFITS[p[7]], state: 'idle', tag: 'fdw-central-sunday'
        });
        if (n) { n.kind = 'civ'; n.hostile = false; n.pedName = p[1]; ST.live[p[0]] = n; }
      }
      if (n && n.alive && d < 3.2 && (ST.cd[p[0]] || 0) < now && typeof say === 'function') {
        ST.cd[p[0]] = now + 22;
        const L = p[8]; say(p[1], L[(Math.random() * L.length) | 0], 3.0);
      }
    }
  }
  if (typeof HOOKS !== 'undefined' && HOOKS.sim) HOOKS.sim.push(tick);
  Object.assign(window.NT = window.NT || {}, { FDW_CENTRAL: { PEDS, ST, isSundayDay } });
})();
