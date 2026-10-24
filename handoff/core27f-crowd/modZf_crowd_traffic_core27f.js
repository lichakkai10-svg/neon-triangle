/* =========================================================================
 * core27f · 日頭人流＋街車（InstancedMesh｜程序｜禁相板）
 *  · 行人：9 個 InstancedMesh（腳×2、身、手×2、頭、頭髮、袋、帽）＝ 9 draw call
 *    五類造型（上班族／學生／阿姨／外傭／遊客）× 隨機配色；擺手擺腳程序動畫
 *  · 車：雙層巴士、紅頂小巴、綠頂小巴、紅的士 — 每款 1 個 InstancedMesh（頂點色）
 *    塗裝全通用（無巴士公司／的士公司 logo、無真車牌）；巴士牌只寫虛構路線
 *  · 路網：各區 osm-*-drive-extrude JSON 嘅 drive_trunk（dx/dz 已係遊戲座標）
 *    行人行兩邊行人路，車行兩條線；全部以玩家為中心循環重生（R 內永遠有人）
 *  · 上限：NT.CROWD.caps（數值線可改）；Safari／LOW_MEM 用 lite
 * ========================================================================= */
const CROWD = {
  ready: false, trunks: [], segs: [], peds: [], cars: [],
  // 數值線 docs/crowd-traffic-caps-core27f.md §4（原樣）
  caps: {
    lite: { peds: 120, pedR: 120, mainMin: 10, skinned: 6, pedHz: 15, cars: 18, bus: 3, minibus: 4, taxi: 6, priv: 5, carR: 180 },
    full: { peds: 400, pedR: 220, mainMin: 25, skinned: 24, pedHz: 30, cars: 48, bus: 6, minibus: 8, taxi: 16, priv: 18, carR: 320 }
  },
  fpsScale: 1, outfits: null,
  meshes: {}, vmesh: {}, t: 0
};
(function () {
  const lite = (typeof IS_SAFARI !== 'undefined' && IS_SAFARI) || (typeof LOW_MEM !== 'undefined' && LOW_MEM) || (typeof URLQ !== 'undefined' && URLQ.has && URLQ.has('ldr'));
  const CAP = () => CROWD.caps[lite ? 'lite' : 'full'];
  const REGION = { ytm: 'tst', cw: 'central', kt: 'kt', ssp: 'ssp', kcity: 'kc', wc: 'wanchai', east: 'quarrybay', tw: 'tw', st: 'st' };
  const FILES = ['ytm-drive-extrude-core24', 'cw-drive-extrude-core25', 'kt-drive-extrude-core25', 'ssp-drive-extrude-core27', 'kcity-drive-extrude-core27',
    'wc-drive-extrude-core28', 'east-drive-extrude-core28', 'tw-drive-extrude-core29', 'st-drive-extrude-core29'];
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[(Math.random() * arr.length) | 0];

  /* ---------- 造型配色（人物設計表到咗可直接覆蓋 CROWD.styles）---------- */
  CROWD.styles = {
    office:  { w: 0.30, top: [0xf2f2ee, 0xdfe6ee, 0x2a3240, 0x3a3a3e, 0xc8d4e0], bottom: [0x1e2430, 0x2a2a2e, 0x3a3a40], hat: 0, bag: 0.7, bagC: [0x1a1a1a, 0x3a2a20] },
    student: { w: 0.18, top: [0xf4f4f0, 0xe8eef4], bottom: [0x2a3a5a, 0x3a4a3a, 0x5a5a5a], hat: 0, bag: 0.9, bagC: [0x2a3a6a, 0x1a1a1a, 0x8a2a2a] },
    auntie:  { w: 0.18, top: [0xc85a7a, 0x8a5aa8, 0xe0a050, 0x5a8aa8, 0xd0d0c0], bottom: [0x2a2a2a, 0x4a3a30, 0x3a3a50], hat: 0.25, hatC: [0xd8c8a0, 0xf0f0f0], bag: 0.8, bagC: [0xc82a2a, 0x2a5aa8, 0xe8e0d0] },
    helper:  { w: 0.12, top: [0xe8a0b0, 0x6ac0d0, 0xf0d040, 0xffffff], bottom: [0x2a2a3a, 0x3a3a3a, 0x5a4a6a], hat: 0.1, hatC: [0x2a2a2a], bag: 0.6, bagC: [0xd8c8b0, 0x2a2a2a] },
    tourist: { w: 0.22, top: [0xf0e0a0, 0x9ad0e0, 0xffffff, 0xe07a4a, 0x7ab07a], bottom: [0xc8b898, 0x2a3a5a, 0x5a5a50], hat: 0.5, hatC: [0xf0f0e8, 0x2a2a3a, 0xc8a060], bag: 0.85, bagC: [0x3a3a3a, 0x6a5a40] }
  };
  const SKIN = [0xe0b090, 0xc89878, 0xb08060, 0x8a6040, 0xd8a888];
  const HAIR = [0x0e0a08, 0x1a120c, 0x2a1e14, 0x6a6058, 0xb0aaa0];
  function pickStyle(region) {
    const A = CROWD.outfits && CROWD.outfits.archetypes; const night = typeof TOD !== 'undefined' && TOD.mode === 'night';
    const ws = Object.keys(CROWD.styles).map((k) => {
      let w = CROWD.styles[k].w; const wt = A && A[k] && A[k].weight;
      if (wt) { const vals = Object.values(wt); w = wt[region] != null ? wt[region] : vals.reduce((a, b) => a + b, 0) / vals.length; }
      if (k === 'helper' && region === 'central' && new Date().getDay() === 0) w *= 3;
      if (night) w *= k === 'office' ? 0.4 : k === 'student' ? 0.2 : 1;
      return [k, w];
    });
    let tot = ws.reduce((a, b) => a + b[1], 0), r = Math.random() * tot; for (const [k, w] of ws) { r -= w; if (r <= 0) return k; } return 'office';
  }

  /* ---------- 路網 ---------- */
  async function loadTrunks() {
    for (const f of FILES) {
      let d = null;
      for (const u of ['assets/data/osm-' + f + '.json', 'data/osm-' + f + '.json']) { try { const r = await fetch(u); if (r.ok) { d = await r.json(); break; } } catch (e) { /* */ } }
      if (!d) continue;
      for (const t of (d.drive_trunk || [])) {
        if ((t.path_chord_ratio || 1) > 4 || !t.points || t.points.length < 2) continue;
        const pts = t.points.map((p) => ({ x: p.dx, z: p.dz }));
        const w = /彌敦|軒尼詩|英皇|德輔|干諾/.test(t.name_zh || '') ? 14 : 11;
        const cum = [0]; for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].z - pts[i - 1].z));
        addTrunk(t.name_zh, pts, w, REGION[f.split('-')[0]] || 'misc');
      }
    }
  }
  // 空間格（200 單位）：只喺玩家附近抽線段，唔使亂試
  const GRID = new Map(), CELL = 200, gk = (x, z) => Math.floor(x / CELL) + ',' + Math.floor(z / CELL);
  // 數值 §5 密度系數（旺角／銅鑼灣 1.0 … 葵涌碼頭 0.15）
  // §11 四類：級 5→1.0 … 1→0.15；常駐＝上限/3×dens。商場／平台級 4 另見 nearMall()
  const DENS = {
    tst: 1.0,       // 油尖旺舊街／旺角 5
    ssp: 0.8,       // 深水埗 4
    central: 0.6,   // 中環地面 3（§9 假日升 0.8）
    wanchai: 0.7,   // 灣仔 3–4
    quarrybay: 0.4, // 東區北角／鰂魚涌地面 2
    kc: 0.6,        // 九龍城食街 3
    kt: 0.15,       // 工廈／工業 1
    port: 0.15,     // 葵涌碼頭工業 1
    tw: 0.4,        // 荃灣地面 2（商場密另加）
    st: 0.4,        // 沙田地面 2
    misc: 0.5
  };
  const MALL_REG = { tw: 1, st: 1, kt: 1, central: 1 }; // podium 新市鎮／有大平台
  function nearMall(p) {
    if (!MALL_REG[localRegion(p)] && localRegion(p) !== 'central') return false;
    const NT = window.NT || {};
    for (const k of ['TW', 'ST', 'KT', 'CW', 'YTM', 'WC', 'EAST', 'SSP', 'KCITY']) {
      const list = NT[k] && NT[k].arcadeColliders;
      if (!list) continue;
      for (const a of list) {
        const cx = (a.x0 + a.x1) / 2, cz = (a.z0 + a.z1) / 2;
        if (Math.hypot(p.x - cx, p.z - cz) < 40) return true; // §7／§11：平台入口 40 m
      }
    }
    return false;
  }
  function addTrunk(name, pts, w, region) {
    // 長段切細（≤30），方便抽樣
    const P = [pts[0]];
    for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i], L = Math.hypot(b.x - a.x, b.z - a.z), n = Math.max(1, Math.ceil(L / 30)); for (let k = 1; k <= n; k++) P.push({ x: a.x + (b.x - a.x) * k / n, z: a.z + (b.z - a.z) * k / n }); }
    const cum = [0]; for (let i = 1; i < P.length; i++) cum.push(cum[i - 1] + Math.hypot(P[i].x - P[i - 1].x, P[i].z - P[i - 1].z));
    const tr = { id: CROWD.trunks.length, name, pts: P, cum, len: cum[cum.length - 1], w, region }; if (tr.len < 8) return; CROWD.trunks.push(tr);
    for (let i = 0; i < P.length - 1; i++) { const sg = { tr, i, x: (P[i].x + P[i + 1].x) / 2, z: (P[i].z + P[i + 1].z) / 2 }; CROWD.segs.push(sg); const key = gk(sg.x, sg.z); if (!GRID.has(key)) GRID.set(key, []); GRID.get(key).push(sg); }
  }
  // 基本城（碼頭／漆咸道）冇 OSM trunk → 用 ROADNET 邊補
  function addRoadnet() {
    if (typeof ROADNET === 'undefined') return 0; const seen = new Set(); let n = 0;
    for (let a = 0; a < ROADNET.length; a++) for (const b of ROADNET[a].nb) {
      const key = a < b ? a + '-' + b : b + '-' + a; if (seen.has(key)) continue; seen.add(key);
      const A = ROADNET[a], B = ROADNET[b], L = Math.hypot(B.x - A.x, B.z - A.z); if (L < 10 || L > 900) continue;
      // 已有 OSM trunk 覆蓋就跳過
      const mx = (A.x + B.x) / 2, mz = (A.z + B.z) / 2; if ((GRID.get(gk(mx, mz)) || []).some((s) => !s.tr.rn && Math.hypot(s.x - mx, s.z - mz) < 25)) continue;
      addTrunk('roadnet', [{ x: A.x, z: A.z }, { x: B.x, z: B.z }], 10, Math.abs(A.z) < 180 && Math.abs(B.z) < 180 ? 'port' : 'misc'); CROWD.trunks[CROWD.trunks.length - 1].rn = true; n++;
    }
    return n;
  }
  // 沿 trunk 取 s 位置＋方向
  function at(tr, s, out) {
    s = Math.max(0, Math.min(tr.len - 0.01, s));
    let i = 0, lo = 0, hi = tr.cum.length - 1; while (lo < hi) { const m = (lo + hi) >> 1; if (tr.cum[m + 1] <= s) lo = m + 1; else hi = m; } i = lo;
    const a = tr.pts[i], b = tr.pts[i + 1] || a, L = (tr.cum[i + 1] - tr.cum[i]) || 1, k = (s - tr.cum[i]) / L;
    const dx = (b.x - a.x) / L, dz = (b.z - a.z) / L;
    out.x = a.x + (b.x - a.x) * k; out.z = a.z + (b.z - a.z) * k; out.dx = dx; out.dz = dz; return out;
  }
  // 玩家所在區（最近 OSM 線段嘅區；冇就 port／misc）
  let _rgT = 0, _rg = 'misc';
  function localRegion(p) {
    if ((_rgT -= 1) > 0) return _rg; _rgT = 30;
    let best = 1e9, r = 'misc'; const cx = Math.floor(p.x / CELL), cz = Math.floor(p.z / CELL);
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) for (const s of (GRID.get((cx + i) + ',' + (cz + j)) || [])) { const d = Math.hypot(s.x - p.x, s.z - p.z) + (s.tr.rn ? 60 : 0); if (d < best) { best = d; r = s.tr.region; } }
    return (_rg = r);
  }
  const _near = [];
  function nearSeg(p, R) {
    _near.length = 0; const c = Math.ceil(R / CELL), cx = Math.floor(p.x / CELL), cz = Math.floor(p.z / CELL);
    for (let i = -c; i <= c; i++) for (let j = -c; j <= c; j++) { const L = GRID.get((cx + i) + ',' + (cz + j)); if (L) for (const s of L) if (Math.hypot(s.x - p.x, s.z - p.z) < R) _near.push(s); }
    if (!_near.length) return null;
    // 唔好喺主角眼前「變」出嚟：盡量揀 35 以外
    for (let k = 0; k < 6; k++) { const s = pick(_near); if (Math.hypot(s.x - p.x, s.z - p.z) > 35) return s; }
    return pick(_near);
  }

  /* ---------- 行人 Instanced ---------- */
  const PARTS = ['legL', 'legR', 'torso', 'armL', 'armR', 'head', 'hair', 'bag', 'hat'];
  function buildPedMeshes(N) {
    const M = () => new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
    const G = {
      legL: new THREE.BoxGeometry(0.15, 0.82, 0.17).translate(0, -0.41, 0), legR: null,
      torso: new THREE.BoxGeometry(0.4, 0.62, 0.24),
      armL: new THREE.BoxGeometry(0.1, 0.62, 0.11).translate(0, -0.3, 0), armR: null,
      head: new THREE.IcosahedronGeometry(0.12, 1).scale(1, 1.12, 1),
      hair: new THREE.SphereGeometry(0.128, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.55).scale(1, 1.1, 1.05),
      bag: new THREE.BoxGeometry(0.08, 0.3, 0.26),
      hat: new THREE.CylinderGeometry(0.15, 0.17, 0.08, 10)
    };
    G.legR = G.legL; G.armR = G.armL;
    for (const k of PARTS) {
      const im = new THREE.InstancedMesh(G[k], M(), N);
      im.instanceMatrix.setUsage(THREE.DynamicDrawUsage); im.frustumCulled = false; im.castShadow = !lite && (k === 'torso' || k === 'legL' || k === 'legR'); im.receiveShadow = false;
      im.name = 'crowd-' + k; im.count = N; im.userData.noMerge = true;
      for (let i = 0; i < N; i++) im.setColorAt(i, new THREE.Color(0xffffff));
      scene.add(im); CROWD.meshes[k] = im;
    }
  }
  const C = new THREE.Color();
  const jit = (hex) => { C.setHex(hex); const k = 1 + (Math.random() * 2 - 1) * 0.06; return C.setRGB(Math.min(1, C.r * k), Math.min(1, C.g * k), Math.min(1, C.b * k)).getHex(); };
  function dressPed(i, p) {
    const S = CROWD.styles[p.style]; let top = pick(S.top), bot = pick(S.bottom), skin = pick(SKIN), hair = p.style === 'auntie' && Math.random() < 0.4 ? 0x6a6058 : pick(HAIR);
    const O = CROWD.outfits && CROWD.outfits.archetypes && CROWD.outfits.archetypes[p.style];
    if (O && O.v && O.v.length) { const v = pick(O.v), h = (x) => parseInt(String(x).replace('#', ''), 16); top = h(Math.random() < 0.35 ? v.shirt : v.jacket); bot = h(v.pants); skin = h(v.skin); hair = h(v.hair); }
    top = jit(top); bot = jit(bot);
    const Mh = CROWD.meshes;
    Mh.torso.setColorAt(i, C.setHex(top)); Mh.armL.setColorAt(i, C.setHex(Math.random() < 0.5 ? top : skin)); Mh.armR.setColorAt(i, C);
    Mh.legL.setColorAt(i, C.setHex(bot)); Mh.legR.setColorAt(i, C); Mh.head.setColorAt(i, C.setHex(skin)); Mh.hair.setColorAt(i, C.setHex(hair));
    p.hasBag = Math.random() < S.bag; p.hasHat = Math.random() < (S.hat || 0);
    Mh.bag.setColorAt(i, C.setHex(pick(S.bagC || [0x222222]))); Mh.hat.setColorAt(i, C.setHex(pick(S.hatC || [0x222222])));
    p.h = rnd(0.9, 1.06) * (p.style === 'student' ? 0.96 : p.style === 'auntie' ? 0.93 : 1);
    p.speed = p.style === 'auntie' ? rnd(0.95, 1.2) : p.style === 'tourist' ? rnd(0.9, 1.25) : rnd(1.25, 1.7);
    for (const k of PARTS) if (Mh[k].instanceColor) Mh[k].instanceColor.needsUpdate = true;
  }
  function spawnPed(p, i, center, R) {
    const s = nearSeg(center, R); if (!s) { p.on = false; return; }
    p.on = true; p.tr = s.tr; p.s = s.tr.cum[s.i] + Math.random() * ((s.tr.cum[s.i + 1] - s.tr.cum[s.i]) || 1);
    p.side = Math.random() < 0.5 ? -1 : 1; p.dir = Math.random() < 0.5 ? -1 : 1;
    p.lat = s.tr.w / 2 + rnd(1.2, 3.6); p.ph = Math.random() * 6.28; p.style = pickStyle(s.tr.region); p.wait = Math.random() < 0.12 ? rnd(2, 8) : 0;
    dressPed(i, p);
  }
  const _o = new THREE.Object3D(), _q = new THREE.Quaternion(), _qy = new THREE.Quaternion(), _qx = new THREE.Quaternion(), _v = new THREE.Vector3(), _P = { x: 0, z: 0, dx: 0, dz: 0 };
  const UP = new THREE.Vector3(0, 1, 0), RX = new THREE.Vector3(1, 0, 0), ZERO = new THREE.Vector3(0, 0, 0), ONE = new THREE.Vector3(1, 1, 1);
  const _m = new THREE.Matrix4(), _hide = new THREE.Matrix4().makeScale(0, 0, 0);
  function put(k, i, base, yawQ, off, swing, scl) {
    _qx.setFromAxisAngle(RX, swing || 0); _q.copy(yawQ).multiply(_qx);
    _v.copy(off).applyQuaternion(yawQ).add(base);
    _m.compose(_v, _q, scl || ONE); CROWD.meshes[k].setMatrixAt(i, _m);
  }
  const OFF = { legL: new THREE.Vector3(-0.1, 0.86, 0), legR: new THREE.Vector3(0.1, 0.86, 0), torso: new THREE.Vector3(0, 1.16, 0),
    armL: new THREE.Vector3(-0.26, 1.44, 0), armR: new THREE.Vector3(0.26, 1.44, 0), head: new THREE.Vector3(0, 1.62, 0), hair: new THREE.Vector3(0, 1.64, -0.01),
    bag: new THREE.Vector3(0.3, 1.0, 0), hat: new THREE.Vector3(0, 1.76, 0) };
  const _b = new THREE.Vector3(), _sc = new THREE.Vector3(), _off = new THREE.Vector3();
  function updatePeds(dt, center) {
    const R = CAP().pedR, N = CROWD.peds.length, night = typeof TOD !== 'undefined' && TOD.mode === 'night';
    const reg = localRegion(center); CROWD.region = reg;
    // 數值 §5／§9：旺區常駐＝上限 ÷3 × 密度；假日中環級 4
    let dens = DENS[reg] ?? 0.5;
    if (reg === 'central' && isFdwSunday()) dens = Math.max(dens, 0.8); // §9
    if (nearMall(center)) dens = Math.max(dens, 0.8); // §11 商場／平台級 4
    const want = Math.round(N / 3 * dens * (night ? 0.5 : 1) * CROWD.fpsScale);
    const pp = typeof player !== 'undefined' ? player.pos : null;
    for (let i = 0; i < N; i++) {
      const p = CROWD.peds[i];
      if (i >= want) { if (p.on) { p.on = false; for (const k of PARTS) CROWD.meshes[k].setMatrixAt(i, _hide); } continue; }
      if (!p.on) { spawnPed(p, i, center, R); if (!p.on) { for (const k of PARTS) CROWD.meshes[k].setMatrixAt(i, _hide); continue; } }
      // 移動
      let moving = 1;
      if (p.wait > 0) { p.wait -= dt; moving = 0; }
      else { p.s += p.dir * p.speed * dt; if (p.s <= 0 || p.s >= p.tr.len) { p.dir = -p.dir; p.wait = rnd(0.5, 3); } }
      at(p.tr, p.s, _P);
      const nx = -_P.dz, nz = _P.dx; // 左法線
      const x = _P.x + nx * p.lat * p.side, z = _P.z + nz * p.lat * p.side;
      if (Math.hypot(x - center.x, z - center.z) > R * 1.15) { p.on = false; continue; }
      // 讓開主角
      let ox = 0, oz = 0;
      if (pp) { const ddx = x - pp.x, ddz = z - pp.z, d = Math.hypot(ddx, ddz); if (d < 1.4 && d > 0.01) { ox = ddx / d * (1.4 - d); oz = ddz / d * (1.4 - d); p.lat += 0.6 * dt; } }
      const yaw = Math.atan2(_P.dx * p.dir, _P.dz * p.dir);
      _qy.setFromAxisAngle(UP, yaw);
      p.ph += dt * moving * p.speed * 5.2;
      const sw = Math.sin(p.ph) * 0.55 * moving, bob = Math.abs(Math.cos(p.ph)) * 0.035 * moving;
      _b.set(x + ox, bob, z + oz); const h = p.h; _sc.set(h, h, h);
      const O = (k) => _off.copy(OFF[k]).multiplyScalar(h);
      put('legL', i, _b, _qy, O('legL'), sw, _sc); put('legR', i, _b, _qy, O('legR'), -sw, _sc);
      put('torso', i, _b, _qy, O('torso'), 0.03 * moving, _sc);
      put('armL', i, _b, _qy, O('armL'), -sw * 0.8, _sc); put('armR', i, _b, _qy, O('armR'), p.hasBag ? 0.05 : sw * 0.8, _sc);
      put('head', i, _b, _qy, O('head'), 0, _sc); put('hair', i, _b, _qy, O('hair'), 0, _sc);
      if (p.hasBag) put('bag', i, _b, _qy, O('bag'), 0, _sc); else CROWD.meshes.bag.setMatrixAt(i, _hide);
      if (p.hasHat) put('hat', i, _b, _qy, O('hat'), 0, _sc); else CROWD.meshes.hat.setMatrixAt(i, _hide);
    }
    for (const k of PARTS) CROWD.meshes[k].instanceMatrix.needsUpdate = true;
  }

  /* ---------- 車（頂點色合併幾何）---------- */
  function colored(geo, hex) { const c = new THREE.Color(hex), n = geo.attributes.position.count, a = new Float32Array(n * 3); for (let i = 0; i < n; i++) { a[i * 3] = c.r; a[i * 3 + 1] = c.g; a[i * 3 + 2] = c.b; } geo.setAttribute('color', new THREE.BufferAttribute(a, 3)); return geo; }
  function boxC(w, h, d, x, y, z, hex) { const g = new THREE.BoxGeometry(w, h, d).toNonIndexed(); g.translate(x, y, z); return colored(g, hex); }
  function wheels(list, len, wid, r) { for (const zx of [-len * 0.32, len * 0.32]) for (const s of [-1, 1]) { const g = new THREE.CylinderGeometry(r, r, 0.25, 10).toNonIndexed(); g.rotateZ(Math.PI / 2); g.translate(s * wid / 2, r, zx); list.push(colored(g, 0x111111)); } }
  const mergeG = (list) => mergeGeometries(list, false);
  const GLASS = 0x1a2630;
  function busGeo() { // 雙層巴士：長 12、闊 2.5、高 4.4（遊戲單位×1；外形通用）
    const L = []; const body = 0xe8e4d8, band = 0x2a7a8a;
    L.push(boxC(2.5, 1.2, 12, 0, 0.9, 0, body), boxC(2.52, 0.9, 11.2, 0, 2.0, 0.2, GLASS), boxC(2.52, 0.35, 12, 0, 2.62, 0, band),
      boxC(2.52, 1.0, 11.6, 0, 3.3, 0, GLASS), boxC(2.5, 0.4, 12, 0, 4.0, 0, body), boxC(2.3, 1.8, 0.05, 0, 2.6, 6.01, GLASS), boxC(1.6, 0.3, 0.05, 0, 3.95, 6.02, 0xffb020));
    wheels(L, 12, 2.4, 0.5); return mergeG(L);
  }
  function minibusGeo(roof) { // 公共小巴：長 7、闊 2.2、高 2.8；紅頂／綠頂係法定顏色（非商標）
    const L = []; L.push(boxC(2.2, 1.1, 7, 0, 0.85, 0, 0xf2eedc), boxC(2.22, 0.8, 6.0, 0, 1.8, -0.3, GLASS), boxC(2.2, 0.35, 7, 0, 2.35, -0.1, roof),
      boxC(2.0, 0.9, 0.05, 0, 1.7, 3.51, GLASS), boxC(0.8, 0.25, 0.06, 0, 2.6, 3.0, 0xf2eedc)); wheels(L, 7, 2.1, 0.38); return mergeG(L);
  }
  function taxiGeo() { // 市區紅的：車身紅、車頂銀（法定配色）；冇的士公司字樣
    const L = []; L.push(boxC(1.8, 0.7, 4.6, 0, 0.6, 0, 0xc81e1e), boxC(1.7, 0.55, 2.4, 0, 1.22, -0.2, 0xc8c8c8), boxC(1.72, 0.45, 2.2, 0, 1.2, -0.2, GLASS),
      boxC(0.5, 0.18, 0.25, 0, 1.58, -0.1, 0xf0f0f0)); wheels(L, 4.6, 1.75, 0.33); return mergeG(L);
  }
  function sedanGeo() { // 私家車：白底 × instanceColor 上色
    const L = []; L.push(boxC(1.8, 0.65, 4.5, 0, 0.58, 0, 0xffffff), boxC(1.66, 0.5, 2.3, 0, 1.15, -0.15, 0x2a2a2a)); wheels(L, 4.5, 1.75, 0.32); return mergeG(L);
  }
  function taxiGreenGeo() { const L = []; L.push(boxC(1.8, 0.7, 4.6, 0, 0.6, 0, 0x1e8a3a), boxC(1.7, 0.55, 2.4, 0, 1.22, -0.2, 0xe8e8e0), boxC(1.72, 0.45, 2.2, 0, 1.2, -0.2, GLASS), boxC(0.5, 0.18, 0.25, 0, 1.58, -0.1, 0xf0f0f0)); wheels(L, 4.6, 1.75, 0.33); return mergeG(L); }
  // 每款固定池（數值 CROWD_CAP：bus／minibus／taxi／priv）
  const VTYPES = [
    { k: 'bus', cap: 'bus', geo: busGeo, len: 12, speed: [7, 10], kerb: true },
    { k: 'mbRed', cap: 'minibus', half: 1, geo: () => minibusGeo(0xc81e1e), len: 7, speed: [9, 13], kerb: true },
    { k: 'mbGreen', cap: 'minibus', half: 0, geo: () => minibusGeo(0x1e8a3a), len: 7, speed: [8, 12], kerb: true },
    { k: 'taxiRed', cap: 'taxi', geo: taxiGeo, len: 4.6, speed: [9, 14] },
    { k: 'taxiGreen', cap: 'taxi', geo: taxiGreenGeo, len: 4.6, speed: [9, 13] },
    { k: 'priv', cap: 'priv', geo: sedanGeo, len: 4.5, speed: [9, 14], tint: true }
  ];
  // 數值 §6：的士紅／綠比例
  const GREEN_TAXI = { kt: 0.3, tw: 0.3, st: 0.8 };
  const PRIV_C = [0xf2f2f2, 0x1a1a1a, 0x8a8e94, 0x2a3a5a, 0x6a1a1a, 0xc8c0b0, 0x3a4a3a];
  function buildCars() {
    const cap = CAP(), mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.5, metalness: 0.2 });
    for (const t of VTYPES) {
      let n = cap[t.cap] || 0; if (t.cap === 'minibus') n = t.half ? Math.ceil(n / 2) : Math.floor(n / 2);
      const g = Math.max(1, Math.round((cap.taxi || 0) * 0.25)); if (t.k === 'taxiGreen') n = g; if (t.k === 'taxiRed') n = Math.max(0, n - g); // 總數＝CROWD_CAP.taxi
      if (!n) continue;
      const im = new THREE.InstancedMesh(t.geo(), mat, n); im.name = 'traffic-' + t.k; im.frustumCulled = false; im.castShadow = !lite;
      im.instanceMatrix.setUsage(THREE.DynamicDrawUsage); im.userData.noMerge = true;
      for (let i = 0; i < n; i++) { im.setMatrixAt(i, _hide); if (t.tint) im.setColorAt(i, C.setHex(pick(PRIV_C))); }
      scene.add(im); CROWD.vmesh[t.k] = im;
      for (let i = 0; i < n; i++) CROWD.cars.push({ on: false, ty: t, slot: i });
    }
  }
  function spawnCar(c, center, R) {
    const s = nearSeg(center, R); if (!s || (s.tr.region === 'port' && c.ty.kerb && Math.random() < 0.8)) { c.on = false; return; }
    if (c.ty.k === 'taxiGreen' && Math.random() > (GREEN_TAXI[s.tr.region] || 0)) { c.on = false; return; }
    if (c.ty.k === 'taxiRed' && Math.random() < (GREEN_TAXI[s.tr.region] || 0)) { c.on = false; return; }
    c.on = true; c.tr = s.tr; c.s = s.tr.cum[s.i]; c.dir = Math.random() < 0.5 ? -1 : 1; c.v = rnd(c.ty.speed[0], c.ty.speed[1]); c.max = c.v; c.dwell = 0;
    c.lane = c.ty.kerb ? s.tr.w * 0.36 : s.tr.w * 0.18; // 巴士小巴靠邊線
  }
  function updateCars(dt, center) {
    const R = CAP().carR;
    const pc = typeof car !== 'undefined' ? car.pos : null;
    // 同 trunk 同方向排隊：簡單跟車距離
    const byLane = new Map();
    for (const c of CROWD.cars) if (c.on) { const key = c.tr.id + (c.dir > 0 ? '+' : '-') + (c.lane > c.tr.w * 0.27 ? 'o' : 'i'); if (!byLane.has(key)) byLane.set(key, []); byLane.get(key).push(c); }
    for (const list of byLane.values()) { list.sort((a, b) => (a.s - b.s) * a.dir); for (let i = 0; i < list.length - 1; i++) { const a = list[i], b = list[i + 1]; const gap = Math.abs(b.s - a.s) - (a.ty.len + b.ty.len) / 2; a.lead = gap; } list[list.length - 1].lead = 1e9; }
    for (const c of CROWD.cars) {
      const im = CROWD.vmesh[c.ty.k];
      if (!c.on) { spawnCar(c, center, R); if (!c.on) { im.setMatrixAt(c.slot, _hide); continue; } }
      at(c.tr, c.s, _P);
      const nx = -_P.dz, nz = _P.dx, sx = c.dir > 0 ? 1 : -1; // 香港靠左：沿前進方向左邊
      const x = _P.x + nx * c.lane * sx, z = _P.z + nz * c.lane * sx;
      // 前面有主角架車／主角 → 減速
      let target = c.max;
      if (c.lead < 6) target = 0; else if (c.lead < 18) target = c.max * (c.lead - 6) / 12;
      if (pc) { const fx = _P.dx * c.dir, fz = _P.dz * c.dir, rx = pc.x - x, rz = pc.z - z, ahead = rx * fx + rz * fz, side = Math.abs(rx * fz - rz * fx); if (ahead > 0 && ahead < 14 && side < 2.2) target = 0; }
      if (c.ty.k === 'bus' && c.dwell <= 0 && Math.random() < dt * 0.02) c.dwell = rnd(4, 8); // 隨機埋站
      if (c.dwell > 0) { c.dwell -= dt; target = 0; }
      c.v = damp(c.v, target, target < c.v ? 4 : 1.2, dt);
      c.s += c.dir * c.v * dt;
      if (c.s <= 0 || c.s >= c.tr.len || Math.hypot(x - center.x, z - center.z) > R * 1.2) { c.on = false; im.setMatrixAt(c.slot, _hide); continue; }
      _qy.setFromAxisAngle(UP, Math.atan2(_P.dx * c.dir, _P.dz * c.dir));
      _m.compose(_v.set(x, 0.02, z), _qy, ONE); im.setMatrixAt(c.slot, _m);
    }
    for (const k in CROWD.vmesh) CROWD.vmesh[k].instanceMatrix.needsUpdate = true;
  }

  /* ---------- 主循環 ---------- */
  function setVisible(v) { for (const k in CROWD.meshes) CROWD.meshes[k].visible = v; for (const k in CROWD.vmesh) CROWD.vmesh[k].visible = v; }
  async function init() {
    try { const r = await fetch('assets/data/ped-outfits-core27f.json'); if (r.ok) CROWD.outfits = await r.json(); } catch (e) { /* 用內置配色 */ }
    await loadTrunks();
    if (!CROWD.segs.length) { console.warn('[crowd] 冇 drive_trunk 資料'); return; }
    const cap = CAP();
    const rn = addRoadnet();
    buildPedMeshes(cap.peds); for (let i = 0; i < cap.peds; i++) CROWD.peds.push({ on: false });
    buildCars();
    // 數值：FPS 跌穿 30 → 人數減 25%；回升 50 先慢慢加返
    let lowT = 0, hiT = 0; HOOKS.frame.push((dt) => { const f = dt > 0 ? 1 / dt : 60; if (f < 30) { lowT += dt; hiT = 0; if (lowT > 2) { CROWD.fpsScale = Math.max(0.4, CROWD.fpsScale * 0.75); lowT = 0; } } else if (f > 50) { hiT += dt; lowT = 0; if (hiT > 6) { CROWD.fpsScale = Math.min(1, CROWD.fpsScale + 0.1); hiT = 0; } } });
    HOOKS.frame.push((dt) => {
      if (!CROWD.ready || CROWD.off) return;
      const inside = (typeof INT !== 'undefined' && INT.active) || (typeof AREA !== 'undefined' && !!AREA.active);
      setVisible(!inside); if (inside) return;
      const center = state.mode === 'drive' ? car.pos : player.pos;
      CROWD.t += dt;
      updatePeds(Math.min(dt, 0.05), center); updateCars(Math.min(dt, 0.05), center); updateFdw(Math.min(dt, 0.05), center);
    });
    CROWD.ready = true;
    console.info('[core27f] crowd+traffic', { trunks: CROWD.trunks.length, roadnet: rn, segs: CROWD.segs.length, peds: cap.peds, cars: CROWD.cars.length, lite });
  }

  /* ---------- 外傭假日中環 · instanced 坐／企／蹲（紙皮墊）---------- */
  const FDW = { ready: false, meshes: null, cardboard: null, group: null, people: [] };
  const FDW_ANCHORS = [{ lat: 22.2806, lon: 114.1606 }, { lat: 22.2810, lon: 114.1598 }, { lat: 22.2814, lon: 114.1588 }];
  function isFdwSunday() {
    const sun = (typeof state !== 'undefined' && state.date) ? (new Date(state.date).getDay() === 0) : (new Date().getDay() === 0);
    const day = typeof TOD === 'undefined' || TOD.mode !== 'night';
    const h = (typeof state !== 'undefined' && state.hour != null) ? state.hour : ((typeof TOD !== 'undefined' && TOD.hour != null) ? TOD.hour : 12);
    return !!(sun && day && h >= 10 && h < 18);
  }
  function putF(k, i, base, yawQ, off, swing, scl) {
    _qx.setFromAxisAngle(RX, swing || 0); _q.copy(yawQ).multiply(_qx);
    _v.copy(off).applyQuaternion(yawQ).add(base);
    _m.compose(_v, _q, scl || ONE); FDW.meshes[k].setMatrixAt(i, _m);
  }
  function buildFdw() {
    if (FDW.ready || typeof hkGeo !== 'function' || !CROWD.meshes.torso) return;
    const N = lite ? 18 : 36;
    const g = new THREE.Group(); g.name = 'fdw-sunday-central';
    const card = new THREE.InstancedMesh(new THREE.BoxGeometry(0.9, 0.02, 1.4), new THREE.MeshStandardMaterial({ color: 0xc8b090, roughness: 0.95 }), N);
    card.instanceMatrix.setUsage(THREE.DynamicDrawUsage); card.frustumCulled = false; g.add(card); FDW.cardboard = card;
    const parts = {};
    for (const k of PARTS) {
      const src = CROWD.meshes[k]; if (!src) continue;
      const im = new THREE.InstancedMesh(src.geometry, src.material.clone(), N);
      im.instanceMatrix.setUsage(THREE.DynamicDrawUsage); im.frustumCulled = false; im.name = 'fdw-' + k;
      for (let j = 0; j < N; j++) im.setColorAt(j, new THREE.Color(0xffffff));
      g.add(im); parts[k] = im;
    }
    FDW.meshes = parts; FDW.group = g; scene.add(g);
    const poses = ['sit', 'stand', 'squat'];
    for (let i = 0; i < N; i++) {
      const a = FDW_ANCHORS[i % 3], gp = hkGeo(a.lat, a.lon);
      const ang = (i / N) * Math.PI * 2 + (i % 3) * 0.4, r = 4 + (i % 5) * 2.2;
      FDW.people.push({ x: gp.x + Math.cos(ang) * r, z: gp.z + Math.sin(ang) * r, yaw: ang + Math.PI, pose: poses[i % 3], ph: Math.random() * 6.28 });
      const O = CROWD.outfits && CROWD.outfits.archetypes && CROWD.outfits.archetypes.helper;
      const v = O && O.v && O.v[i % O.v.length];
      const hx = (x) => parseInt(String(x).replace('#', ''), 16);
      const top = v ? hx(Math.random() < 0.4 ? v.shirt : v.jacket) : pick(CROWD.styles.helper.top);
      const bot = v ? hx(v.pants) : pick(CROWD.styles.helper.bottom);
      const skin = v ? hx(v.skin) : pick(SKIN), hair = v ? hx(v.hair) : pick(HAIR);
      parts.torso.setColorAt(i, C.setHex(top)); parts.armL.setColorAt(i, C.setHex(skin)); parts.armR.setColorAt(i, C);
      parts.legL.setColorAt(i, C.setHex(bot)); parts.legR.setColorAt(i, C); parts.head.setColorAt(i, C.setHex(skin)); parts.hair.setColorAt(i, C.setHex(hair));
      parts.bag.setColorAt(i, C.setHex(0xd8c8b0)); parts.hat.setColorAt(i, C.setHex(0x2a2a2a));
    }
    for (const k of PARTS) if (parts[k].instanceColor) parts[k].instanceColor.needsUpdate = true;
    FDW.ready = true;
  }
  function poseFdw(i, p) {
    const base = _b.set(p.x, 0, p.z); _qy.setFromAxisAngle(UP, p.yaw); const h = 0.96; _sc.set(h, h, h);
    if (p.pose === 'sit' || p.pose === 'squat') { _m.compose(_v.set(p.x, 0.02, p.z), _qy, ONE); FDW.cardboard.setMatrixAt(i, _m); }
    else FDW.cardboard.setMatrixAt(i, _hide);
    const O = (k) => _off.copy(OFF[k]).multiplyScalar(h);
    if (p.pose === 'sit') {
      putF('legL', i, base, _qy, _off.set(-0.12, 0.28, 0.35).multiplyScalar(h), 1.15, _sc);
      putF('legR', i, base, _qy, _off.set(0.12, 0.28, 0.35).multiplyScalar(h), 1.15, _sc);
      putF('torso', i, base, _qy, _off.set(0, 0.55, -0.05).multiplyScalar(h), 0.2, _sc);
      putF('armL', i, base, _qy, _off.set(-0.28, 0.7, 0.1).multiplyScalar(h), 0.6, _sc);
      putF('armR', i, base, _qy, _off.set(0.28, 0.7, 0.1).multiplyScalar(h), 0.6, _sc);
      putF('head', i, base, _qy, _off.set(0, 0.95, 0).multiplyScalar(h), 0, _sc);
      putF('hair', i, base, _qy, _off.set(0, 0.97, -0.01).multiplyScalar(h), 0, _sc);
      putF('bag', i, base, _qy, _off.set(0.35, 0.35, 0.2).multiplyScalar(h), 0, _sc);
      FDW.meshes.hat.setMatrixAt(i, _hide);
    } else if (p.pose === 'squat') {
      putF('legL', i, base, _qy, _off.set(-0.12, 0.4, 0.15).multiplyScalar(h), 1.4, _sc);
      putF('legR', i, base, _qy, _off.set(0.12, 0.4, 0.15).multiplyScalar(h), 1.4, _sc);
      putF('torso', i, base, _qy, _off.set(0, 0.7, 0).multiplyScalar(h), 0.35, _sc);
      putF('armL', i, base, _qy, _off.set(-0.25, 0.55, 0.2).multiplyScalar(h), 0.9, _sc);
      putF('armR', i, base, _qy, _off.set(0.25, 0.55, 0.25).multiplyScalar(h), 0.5, _sc);
      putF('head', i, base, _qy, _off.set(0, 1.05, 0.05).multiplyScalar(h), 0.2, _sc);
      putF('hair', i, base, _qy, _off.set(0, 1.07, 0.04).multiplyScalar(h), 0.2, _sc);
      putF('bag', i, base, _qy, _off.set(0.3, 0.25, 0.15).multiplyScalar(h), 0, _sc);
      FDW.meshes.hat.setMatrixAt(i, _hide);
    } else {
      base.y = Math.sin(p.ph) * 0.01;
      putF('legL', i, base, _qy, O('legL'), 0.05, _sc); putF('legR', i, base, _qy, O('legR'), -0.05, _sc);
      putF('torso', i, base, _qy, O('torso'), 0, _sc);
      putF('armL', i, base, _qy, O('armL'), 0.15, _sc); putF('armR', i, base, _qy, O('armR'), -0.1, _sc);
      putF('head', i, base, _qy, O('head'), 0, _sc); putF('hair', i, base, _qy, O('hair'), 0, _sc);
      putF('bag', i, base, _qy, O('bag'), 0, _sc); FDW.meshes.hat.setMatrixAt(i, _hide);
    }
  }
  function updateFdw(dt, center) {
    if (!isFdwSunday()) { if (FDW.group) FDW.group.visible = false; return; }
    if (!FDW.ready) buildFdw();
    if (!FDW.ready) return;
    const near = Math.hypot(center.x - FDW.people[0].x, center.z - FDW.people[0].z) < 220;
    FDW.group.visible = near; if (!near) return;
    for (let i = 0; i < FDW.people.length; i++) { FDW.people[i].ph += dt * 0.6; poseFdw(i, FDW.people[i]); }
    for (const k of PARTS) if (FDW.meshes[k]) FDW.meshes[k].instanceMatrix.needsUpdate = true;
    FDW.cardboard.instanceMatrix.needsUpdate = true;
  }

  setTimeout(() => init().catch((e) => console.warn('[crowd]', e && e.message)), 1200);
  Object.assign(window.NT, { CROWD });
})();
