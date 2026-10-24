/* =========================================================================
 * core28 · 港島電車（戲仿「港島叮叮」）程序模型 — 評估原型
 *  · 外形參考：雙層窄身電車，約長 12m／闊 2.4m／高 4.4m，軌距 1067mm（近似值，待參考圖校）
 *  · 全程序幾何＋canvas 字；禁真電車公司 logo／全稱；車身廣告用戲仿店名
 *  · 同材質 mergeGeometries → 每架約 18 個 draw call（實測兩架＋地面路軌 40）；Safari 可用
 *  用法：const t = makeTram({ livery: 0, ad: '金河電腦城' }); scene.add(t);
 * ========================================================================= */
(function () {
  const T = window.THREE || (window.NT && NT.THREE);
  if (!T) return;
  const merge = (T.BufferGeometryUtils && T.BufferGeometryUtils.mergeGeometries) || (window.NT && NT.mergeGeometries) || null;

  const LIVERIES = [
    { body: 0x2f7a4a, trim: 0xe9e2c8, roof: 0x3a3e40 },   // 綠＋米白（通用電車色，非任何公司專用塗裝）
    { body: 0x8a2a2a, trim: 0xece4d0, roof: 0x3a3e40 },
    { body: 0x2a4a8a, trim: 0xe8e6dc, roof: 0x3a3e40 }
  ];
  const ADS = ['金河電腦城', '金象泰菜館', '頌記泰貨', '城記餅家', '新記冰廳', '好運點心坊'];

  function adTex(text, bg, fg) {
    const c = document.createElement('canvas'); c.width = 1024; c.height = 128;
    const g = c.getContext('2d');
    g.fillStyle = bg; g.fillRect(0, 0, 1024, 128);
    g.fillStyle = fg; g.font = 'bold 84px "PingFang HK","Noto Sans CJK TC",sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(text, 512, 68);
    const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; return t;
  }
  function destTex(text) {
    const c = document.createElement('canvas'); c.width = 256; c.height = 64;
    const g = c.getContext('2d'); g.fillStyle = '#111'; g.fillRect(0, 0, 256, 64);
    g.fillStyle = '#ffd24a'; g.font = 'bold 40px "PingFang HK","Noto Sans CJK TC",sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(text, 128, 34);
    const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; return t;
  }

  const MAT = {};
  function mats(L) {
    const k = L.body;
    if (MAT[k]) return MAT[k];
    const S = (c, r, m) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m || 0 });
    return (MAT[k] = {
      body: S(L.body, 0.55, 0.15), trim: S(L.trim, 0.6, 0.05), roof: S(L.roof, 0.7, 0.2),
      glass: new T.MeshStandardMaterial({ color: 0x1a2630, roughness: 0.08, metalness: 0.6, transparent: true, opacity: 0.72 }),
      frame: S(0x2a2c2e, 0.5, 0.6), wheel: S(0x1a1a1a, 0.6, 0.7), lamp: new T.MeshStandardMaterial({ color: 0xfff4d0, emissive: 0xfff0c0, emissiveIntensity: 1.2 })
    });
  }

  // 收集同材質幾何
  function bucket() { const b = new Map(); b.add = (m, geo, x, y, z, ry) => { const g2 = geo.clone(); if (ry) g2.rotateY(ry); g2.translate(x, y, z); if (!b.has(m)) b.set(m, []); b.get(m).push(g2); }; return b; }
  const BOX = (w, h, d) => new T.BoxGeometry(w, h, d);

  function makeTram(opt = {}) {
    const L = LIVERIES[(opt.livery || 0) % LIVERIES.length], M = mats(L);
    const LEN = 12, W = 2.4, H1 = 2.3, H2 = 1.95, FLOOR = 0.45; // 下層／上層高
    const root = new T.Group(); root.name = 'tram-parody';
    const b = bucket();
    // 底盤＋裙板
    b.add(M.frame, BOX(LEN - 0.4, 0.35, W - 0.2), 0, 0.3, 0);
    // 下層車身：腰板（實色）＋窗帶
    b.add(M.body, BOX(LEN, 0.95, W), 0, FLOOR + 0.48, 0);
    b.add(M.trim, BOX(LEN + 0.02, 0.12, W + 0.02), 0, FLOOR + 1.0, 0);
    // 窗柱（下層）
    const nWin = 7, pitch = (LEN - 2.4) / nWin;
    for (let i = 0; i <= nWin; i++) for (const s of [-1, 1]) b.add(M.body, BOX(0.12, 1.1, 0.06), -LEN / 2 + 1.2 + i * pitch, FLOOR + 1.62, s * (W / 2 - 0.01));
    b.add(M.glass, BOX(LEN - 2.4, 1.0, W - 0.04), 0, FLOOR + 1.62, 0);
    // 兩頭駕駛室（圓角用斜削盒近似）
    for (const s of [-1, 1]) {
      b.add(M.body, BOX(1.2, 0.95, W - 0.1), s * (LEN / 2 - 0.6), FLOOR + 0.48, 0);
      b.add(M.glass, BOX(0.06, 1.0, W - 0.5), s * (LEN / 2 - 0.02), FLOOR + 1.62, 0);
      b.add(M.lamp, BOX(0.06, 0.18, 0.18), s * (LEN / 2 + 0.01), FLOOR + 0.75, 0);
    }
    // 腰線（上下層之間廣告板位）
    b.add(M.body, BOX(LEN, 0.5, W), 0, FLOOR + H1 + 0.02, 0);
    // 上層：窗帶＋窗柱
    const y2 = FLOOR + H1 + 0.27;
    b.add(M.glass, BOX(LEN - 0.6, 1.05, W - 0.06), 0, y2 + 0.75, 0);
    for (let i = 0; i <= 9; i++) for (const s of [-1, 1]) b.add(M.body, BOX(0.1, 1.15, 0.06), -LEN / 2 + 0.3 + i * ((LEN - 0.6) / 9), y2 + 0.75, s * (W / 2 - 0.01));
    b.add(M.body, BOX(LEN, 0.22, W), 0, y2 + 0.11, 0);
    b.add(M.trim, BOX(LEN, 0.16, W + 0.02), 0, y2 + 1.36, 0);
    // 車頂（微拱：兩層盒）
    b.add(M.roof, BOX(LEN - 0.1, 0.12, W - 0.1), 0, y2 + 1.5, 0);
    b.add(M.roof, BOX(LEN - 0.4, 0.08, W - 0.7), 0, y2 + 1.6, 0);
    // 集電桿（外形待參考圖確認）
    const pole = new T.CylinderGeometry(0.03, 0.03, 3.2, 6); pole.rotateZ(Math.PI / 2 - 0.35);
    b.add(M.frame, pole, -1.0, y2 + 2.15, 0);
    // 轉向架＋車輪（軌距 1.067m）
    const wheel = new T.CylinderGeometry(0.33, 0.33, 0.1, 14); wheel.rotateX(Math.PI / 2);
    for (const bx of [-3.0, 3.0]) {
      b.add(M.frame, BOX(2.2, 0.25, 1.3), bx, 0.33, 0);
      for (const dx of [-0.75, 0.75]) for (const s of [-1, 1]) b.add(M.wheel, wheel, bx + dx, 0.33, s * 0.533);
    }
    // 合併
    for (const [m, list] of b) {
      const geo = merge ? merge(list, false) : null;
      if (geo) { const mesh = new T.Mesh(geo, m); mesh.castShadow = m !== M.glass; mesh.receiveShadow = true; root.add(mesh); }
      else for (const g2 of list) root.add(new T.Mesh(g2, m));
    }
    // 廣告板（兩側腰線）＋目的地牌（兩頭）
    const ad = opt.ad || ADS[(opt.seed || 0) % ADS.length];
    const adMat = new T.MeshStandardMaterial({ map: adTex(ad + '（戲仿）', '#' + L.trim.toString(16).padStart(6, '0'), '#' + L.body.toString(16).padStart(6, '0')), roughness: 0.6 });
    for (const s of [-1, 1]) { const p = new T.Mesh(new T.PlaneGeometry(LEN - 1.6, 0.42), adMat); p.position.set(0, FLOOR + H1 + 0.02, s * (W / 2 + 0.012)); p.rotation.y = s > 0 ? 0 : Math.PI; root.add(p); }
    const dMat = new T.MeshBasicMaterial({ map: destTex(opt.dest || '筲箕灣') });
    for (const s of [-1, 1]) { const p = new T.Mesh(new T.PlaneGeometry(1.1, 0.28), dMat); p.position.set(s * (LEN / 2 + 0.012), y2 + 1.2, 0); p.rotation.y = s * Math.PI / 2; root.add(p); }
    const brand = new T.MeshStandardMaterial({ map: adTex('港島叮叮', '#' + L.body.toString(16).padStart(6, '0'), '#' + L.trim.toString(16).padStart(6, '0')), roughness: 0.6 });
    for (const s of [-1, 1]) { const p = new T.Mesh(new T.PlaneGeometry(2.4, 0.3), brand); p.position.set(0, FLOOR + 0.6, s * (W / 2 + 0.012)); p.rotation.y = s > 0 ? 0 : Math.PI; root.add(p); }
    root.userData = { len: LEN, width: W, height: y2 + 1.64, gauge: 1.067, parody: true };
    return root;
  }

  /* 沿 polyline 行駛（評估用）：speed m/s，停站 dwell 秒 */
  function tramRunner(tram, pts, opt = {}) {
    let i = 0, t = 0, dwell = 0; const sp = opt.speed || 6.5;
    return function step(dt) {
      if (dwell > 0) { dwell -= dt; return; }
      const a = pts[i], c = pts[(i + 1) % pts.length]; const dx = c.x - a.x, dz = c.z - a.z, L = Math.hypot(dx, dz) || 1;
      t += (sp * dt) / L;
      if (t >= 1) { t = 0; i = (i + 1) % pts.length; if (c.stop) dwell = opt.dwell || 8; }
      tram.position.set(a.x + dx * t, 0, a.z + dz * t); tram.rotation.y = Math.atan2(dx, dz) - Math.PI / 2;
    };
  }

  Object.assign(window.NT = window.NT || {}, { makeTram, tramRunner, TRAM_ADS: ADS });
})();
