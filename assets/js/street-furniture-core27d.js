/* core27d · 香港街道傢俬（美術）— 純程序 3D InstancedMesh，禁相板／Google mesh／真商標
 * 有 osm-street-furniture-core27d.json 嘅區（ytm/ssp/cw）按真 OSM 點擺；冇嘅區（kt/kcity）沿 drive_trunk 程序補。
 * 用法（index.html module 內一行）：
 *   import('./assets/js/street-furniture-core27d.js').then((m) => m.attachAll(THREE));
 * 自動掛落 NT.YTM／CW／KT／SSP／KCITY 嘅 .group（跟返 lazy 顯示／收起），每區只做一次。
 * 沿 drive_trunk 兩邊行人路放：行道樹、路燈、交通燈、路邊欄杆、石墩、橙色垃圾桶、巴士站、綠路牌、
 * 唐樓伸出招牌（戲仿 emissive 色盒，冇字）、電線桿（只限 KT／新界味路段）。
 * TODO(core27f): 欄杆覆蓋率改讀 assets/data/core27f-sidewalk-railing-bin-layout.json 嘅 match_name_zh（而家仍用 WIDE regex＋硬編碼 40%/連續段）。
 */
const WIDE = /彌敦|長沙灣|荔枝角|太子道|界限街|亞皆老|馬頭涌|衙前圍|東頭村|承啟|干諾|德輔|告士打|梳士巴利|葵涌道|青山公路/;
const KEYS = ['YTM', 'CW', 'KT', 'SSP', 'KCITY', 'WC', 'EAST', 'TW', 'ST'];
const SIGN_COLS = [0xd8402e, 0x2e7fd8, 0xe8b830, 0x2ea860, 0xd86aa8, 0xf0f0e8, 0x8a3ad8];

function rngOf(seed) { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

export function buildStreetFurniture(THREE, parent, trunks, opts = {}) {
  const lite = !!opts.lite, day = opts.day !== false, rnd = rngOf(opts.seed || 27);
  const dens = lite ? 0.45 : 1;
  const M = (c, r = 0.8, m = 0.1, e) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m, emissive: e || 0x000000, emissiveIntensity: e ? (day ? 0.25 : 1.6) : 0 });
  const mat = {
    pole: M(0x8d9296, 0.55, 0.6), dark: M(0x2b2d2f, 0.6, 0.4), trunk: M(0x5a4632, 0.95, 0),
    leaf: M(0x5f8a3f, 0.9, 0), leaf2: M(0x4c7434, 0.9, 0), railG: M(0xa9afb3, 0.45, 0.7), railPanel: M(0xb4b8bc, 0.55, 0.35), binTop: M(0x2a2a2a, 0.7, 0.1),
    bollard: M(0x6d7175, 0.85, 0.1), bin: M(0xe8701e, 0.55, 0.05), green: M(0x1f6b3a, 0.6, 0.1),
    roof: M(0xd9dde0, 0.4, 0.3), glass: new THREE.MeshStandardMaterial({ color: 0xbcd6e6, roughness: 0.1, metalness: 0.3, transparent: true, opacity: 0.35 }),
    red: M(0x401010, 0.4, 0, 0xff3020), amber: M(0x403010, 0.4, 0, 0xffb020), grn: M(0x103018, 0.4, 0, 0x20ff70),
    lamp: M(0xfff0d0, 0.3, 0, 0xfff0c8), wood: M(0x6b5a46, 0.95, 0),
    zebra: M(0xeeeeea, 0.7, 0), hydrant: M(0xc8281e, 0.5, 0.2), bench: M(0x7a6248, 0.9, 0),
  };
  const signMats = SIGN_COLS.map((c) => M(0x222222, 0.5, 0, c));
  const G = {
    box: new THREE.BoxGeometry(1, 1, 1), cyl: new THREE.CylinderGeometry(0.5, 0.5, 1, lite ? 6 : 10),
    cone: new THREE.CylinderGeometry(0.5, 0.62, 1, 8), ball: new THREE.IcosahedronGeometry(1, lite ? 0 : 1),
    disc: new THREE.CylinderGeometry(0.11, 0.11, 0.04, 10),
  };
  const buckets = new Map(); const railSegments = [];
  const put = (geo, m, x, y, z, sx, sy, sz, yaw = 0, rx = 0) => {
    const k = geo.uuid + m.uuid; if (!buckets.has(k)) buckets.set(k, { geo, m, list: [] });
    buckets.get(k).list.push([x, y, z, sx, sy, sz, yaw, rx]);
  };
  const local = (o, yaw) => (dx, dz) => [o.x + Math.cos(yaw) * dx + Math.sin(yaw) * dz, o.z - Math.sin(yaw) * dx + Math.cos(yaw) * dz];

  const P = {
    tree(x, z, yaw) { const s = 0.8 + rnd() * 0.5; put(G.cyl, mat.trunk, x, 1.6 * s, z, 0.28 * s, 3.2 * s, 0.28 * s);
      put(G.ball, rnd() < 0.5 ? mat.leaf : mat.leaf2, x, 4.2 * s, z, 2.1 * s, 1.6 * s, 2.1 * s, rnd() * 6);
      if (!lite) put(G.ball, mat.leaf2, x + 0.7, 5.0 * s, z - 0.4, 1.3 * s, 1.1 * s, 1.3 * s); },
    lamp(x, z, yaw, toRoad) { put(G.cyl, mat.pole, x, 5, z, 0.16, 10, 0.16); const L = local({ x, z }, yaw);
      const [ax, az] = L(toRoad * 1.1, 0); put(G.box, mat.pole, ax, 9.9, az, 2.2, 0.1, 0.12, yaw);
      const [hx, hz] = L(toRoad * 2.1, 0); put(G.box, mat.lamp, hx, 9.75, hz, 0.7, 0.14, 0.3, yaw); },
    light(x, z, yaw, toRoad) { put(G.cyl, mat.dark, x, 1.9, z, 0.13, 3.8, 0.13); const L = local({ x, z }, yaw);
      const [bx, bz] = L(0, 0.18); put(G.box, mat.dark, bx, 3.3, bz, 0.34, 1.0, 0.24, yaw);
      [[mat.red, 3.62], [mat.amber, 3.3], [mat.grn, 2.98]].forEach(([m, y]) => { const [dx, dz] = L(0, 0.31); put(G.disc, m, dx, y, dz, 1, 1, 1, yaw, Math.PI / 2); });
      put(G.box, mat.dark, x, 1.15, z, 0.22, 0.32, 0.18, yaw); /* 行人燈 */ },
    railing(x, z, yaw, len) { // HyD Type 2 鍍鋅銀灰：高 1.0m，柱距 ≤1.5m；lite／full 都用實心板（禁逐枝爆炸 instance）
      const m = mat.railG, L = local({ x, z }, yaw), half = len / 2;
      const [x0, z0] = L(0, -half), [x1, z1] = L(0, half);
      railSegments.push({ x0, z0, x1, z1, h: 1.0, id: 'r' + railSegments.length });
      put(G.box, m, x, 0.965, z, 0.07, 0.07, len, yaw);
      put(G.box, mat.railPanel, x, 0.56, z, 0.04, 0.78, Math.max(0.2, len - 0.08), yaw); // 實心板 0.9 高、底離地 ≤0.11
      for (let t = -half; t <= half + 0.01; t += Math.min(1.5, len / Math.max(1, Math.ceil(len / 1.5)))) { const [px, pz] = L(0, t); put(G.box, m, px, 0.5, pz, 0.08, 1.0, 0.08, yaw); } },
    bollard(x, z) { put(G.cyl, mat.bollard, x, 0.45, z, 0.22, 0.9, 0.22); },
    bin(x, z, yaw) { put(G.box, mat.bin, x, 0.45, z, 0.42, 0.9, 0.36, yaw); put(G.box, mat.binTop, x, 0.92, z, 0.44, 0.05, 0.38, yaw); }, // 食環署 70L 橙桶（尺寸係遊戲估算）
    binLarge(x, z, yaw) { put(G.box, mat.bin, x, 0.53, z, 0.55, 1.06, 0.46, yaw); put(G.box, mat.binTop, x, 1.09, z, 0.57, 0.06, 0.48, yaw); }, // 食環署 130L 橙桶（取代 660L：660L 唔擺路邊；尺寸係遊戲估算）
    cone(x, z) { put(G.cone, mat.bin, x, 0.45, z, 0.32, 0.9, 0.32); put(G.box, mat.zebra, x, 0.72, z, 0.34, 0.08, 0.34); }, // 橙錐（遊戲估算；白條用 zebra 白）
    busStop(x, z, yaw, toRoad) { const L = local({ x, z }, yaw);
      for (const t of [-3.5, 3.5]) { const [px, pz] = L(-toRoad * 0.6, t); put(G.box, mat.pole, px, 1.3, pz, 0.1, 2.6, 0.1, yaw); }
      put(G.box, mat.roof, x, 2.65, z, 2.0, 0.12, 8, yaw); const [gx, gz] = L(-toRoad * 0.9, 0); put(G.box, mat.glass, gx, 1.3, gz, 0.04, 2.0, 7.4, yaw);
      const [sx, sz] = L(toRoad * 0.7, 4.6); put(G.cyl, mat.pole, sx, 1.6, sz, 0.08, 3.2, 0.08); put(G.box, mat.green, sx, 2.9, sz, 0.05, 0.5, 0.6, yaw); },
    roadSign(x, z, yaw) { put(G.cyl, mat.pole, x, 1.6, z, 0.08, 3.2, 0.08); put(G.box, mat.green, x, 3.1, z, 0.06, 0.9, 1.6, yaw); },
    pole(x, z) { put(G.cyl, mat.wood, x, 4.5, z, 0.2, 9, 0.2); put(G.box, mat.wood, x, 8.3, z, 1.6, 0.12, 0.12); },
    zebra(x, z, yaw) { const L = local({ x, z }, yaw); for (let t = -4; t <= 4; t += 1) { const [px, pz] = L(t, 0); put(G.box, mat.zebra, px, 0.075, pz, 0.5, 0.02, 3.2, yaw); } },
    hydrant(x, z) { put(G.cyl, mat.hydrant, x, 0.4, z, 0.26, 0.8, 0.26); put(G.ball, mat.hydrant, x, 0.82, z, 0.15, 0.1, 0.15); },
    bench(x, z, yaw) { put(G.box, mat.bench, x, 0.45, z, 0.45, 0.08, 1.6, yaw); put(G.box, mat.dark, x, 0.22, z, 0.4, 0.44, 1.4, yaw); },
    shopSign(x, z, yaw, outSide) { const L = local({ x, z }, yaw); const h = 3.8 + rnd() * 5, w = 0.9 + rnd() * 1.4, hh = 0.9 + rnd() * 2.2;
      const [px, pz] = L(outSide * 0.2, 0); put(G.box, signMats[(rnd() * signMats.length) | 0], px, h, pz, w, hh, 0.22, yaw + Math.PI / 2);
      const [bx, bz] = L(outSide * 0.9, 0); put(G.box, mat.dark, bx, h + hh / 2 - 0.1, bz, 1.4, 0.06, 0.06, yaw + Math.PI / 2); },
  };

  let count = 0;
  const pts0 = opts.points;
  if (pts0) {
    const each = (arr, f, keep = 1) => { for (const q of arr || []) { if (keep < 1 && rnd() > keep) continue; f(q); count++; } };
    each(pts0.trees, (q) => P.tree(q.x, q.z, 0), lite ? 0.5 : 1);
    each(pts0.lamps, (q) => P.lamp(q.x, q.z, q.yaw || 0, 1), lite ? 0.6 : 1);
    each(pts0.poles, (q) => P.pole(q.x, q.z));
    if (opts.rural && !(pts0.poles || []).length) for (const t of trunks) { const a = t.points || []; let g = 0; // KT 電線桿：沿 trunk 每 45m 一支
      for (let i = 0; i + 1 < a.length; i++) { const L = Math.hypot(a[i + 1].dx - a[i].dx, a[i + 1].dz - a[i].dz); const yaw = Math.atan2(a[i + 1].dx - a[i].dx, a[i + 1].dz - a[i].dz);
        for (let d = 0; d < L; d += 1, g++) if (g % 45 === 20) { const [x, z] = local({ x: a[i].dx, z: a[i].dz }, yaw)(-9.5, d); P.pole(x, z); count++; } } }
    each(pts0.signals, (q) => P.light(q.x, q.z, q.yaw || 0, 1));
    each(pts0.crossings, (q) => P.zebra(q.x, q.z, q.yaw || 0), lite ? 0.6 : 1);
    each(pts0.bus_stops, (q) => P.busStop(q.x, q.z, q.yaw || 0, 1), lite ? 0.5 : 1);
    each(pts0.hydrants, (q) => P.hydrant(q.x, q.z));
    each(pts0.benches, (q) => P.bench(q.x, q.z, q.yaw || 0));
    each(pts0.bins, (q) => P.bin(q.x, q.z, q.yaw || 0));
    each(pts0.cones, (q) => P.cone(q.x, q.z), lite ? 0.7 : 1);
    each(pts0.sign_anchors, (q) => P.shopSign(q.x, q.z, q.yaw || 0, 1), lite ? 0.45 : 1);
    // 主幹道 kerb 連續欄杆（約 55% 長度，段長 18–40m）＋70L／130L 橙桶每 ~50m 交錯兩邊（40–60m 係遊戲建議，唔係官方數）
    const GAP = new Map(), gk = (x, z) => Math.floor(x / 16) + ',' + Math.floor(z / 16); // 過路處 ±6m、巴士站 ±12m 唔擺欄杆
    for (const [arr, r] of [[pts0.crossings, 6], [pts0.bus_stops, 12]]) for (const q of arr || []) { const k = gk(q.x, q.z); if (!GAP.has(k)) GAP.set(k, []); GAP.get(k).push([q.x, q.z, r]); }
    const nearGap = (x, z) => { const cx = Math.floor(x / 16), cz = Math.floor(z / 16); for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) for (const [qx, qz, r] of GAP.get((cx + i) + ',' + (cz + j)) || []) if ((qx - x) ** 2 + (qz - z) ** 2 < r * r) return true; return false; };
    for (const t of trunks) { const a = t.points || []; if (a.length < 2) continue;
      const busy = WIDE.test((t.name_zh || '') + (t.id || '')), width = a._w || (busy ? 14 : 11), kerb = width * 0.5 + 0.5, bk = width * 0.5 + 0.9; let g = 0; // bin 靠路壆 half+0.9（layout JSON）
      for (let i = 0; i + 1 < a.length; i++) { const L = Math.hypot(a[i + 1].dx - a[i].dx, a[i + 1].dz - a[i].dz); if (L < 2) continue;
        const yaw = Math.atan2(a[i + 1].dx - a[i].dx, a[i + 1].dz - a[i].dz), loc = local({ x: a[i].dx, z: a[i].dz }, yaw);
        if (busy) for (const s2 of [-1, 1]) { // 繁忙街：成段連續，淨係過路處、巴士站、上落貨位斷開（霓虹三角2 拍板）
          let st = -1, nextLoad = 60 + rnd() * 60;
          const flush = (e) => { if (st >= 0 && e - st > 3) { const [rx, rz] = loc(s2 * kerb, (st + e) / 2); P.railing(rx, rz, yaw, e - st); count++; } st = -1; };
          for (let d = 2; d <= L - 2; d += 1) { const [px, pz] = loc(s2 * kerb, d); let gap = nearGap(px, pz);
            if (d >= nextLoad && d < nextLoad + 8) gap = true; else if (d >= nextLoad + 8) nextLoad = d + 60 + rnd() * 60; // 上落貨位 8m
            if (gap) flush(d); else if (st < 0) st = d; }
          flush(L - 2); }
        else for (const s2 of [-1, 1]) { let d = 4; while (d < L - 4) { const seg = Math.min(L - 4 - d, 18 + rnd() * 22); if (rnd() < 0.4 && seg > 4) { const [rx, rz] = loc(s2 * kerb, d + seg / 2); if (!nearGap(rx, rz)) { P.railing(rx, rz, yaw, seg); count++; } } d += seg + 3 + rnd() * 6; } } // 住宅街：疏啲
        for (let d = 0; d < L; d += 1, g++) { if (g % Math.round(50 / dens) === 30) { const [bx, bz] = loc(bk, d); P.bin(bx, bz, yaw); count++; } if (g % Math.round(50 / dens) === 5) { const [bx, bz] = loc(-bk, d); P.binLarge(bx, bz, yaw); count++; } } } }
    for (const r of pts0.railings || []) { const a = r.points || []; for (let i = 0; i + 1 < a.length; i++) {
      const [x0, z0] = a[i], [x1, z1] = a[i + 1]; const len = Math.hypot(x1 - x0, z1 - z0); if (len < 0.5 || len > 200) continue;
      P.railing((x0 + x1) / 2, (z0 + z1) / 2, Math.atan2(x1 - x0, z1 - z0), len); count++; } }
  }
  const proc = !pts0; // core27f：有 OSM 點都照行程序生成（只補 OSM 冇嘅：欄杆缺口、路牌、bollard）
  for (const t of trunks) {
    if ((t.path_chord_ratio || 1) > 4) continue;
    const pts = t.points || []; if (pts.length < 2) continue;
    const width = pts._w || (WIDE.test((t.name_zh || '') + (t.id || '')) ? 14 : 11);
    const off = width * 0.5 + 1.6, kerb = width * 0.5 + 0.6, front = width * 0.5 + 0.9; // bin/樹招牌：桶靠 kerb // 行人路 3.2 m：內緣種樹放燈，外緣伸招牌
    const rural = opts.rural || /葵|青衣|貨櫃|涌/.test(t.name_zh || '');
    let acc = 0, prevYaw = null;
    for (let i = 0; i + 1 < pts.length; i++) {
      const a = pts[i], b = pts[i + 1]; const len = Math.hypot(b.dx - a.dx, b.dz - a.dz); if (len < 2) continue;
      const yaw = Math.atan2(b.dx - a.dx, b.dz - a.dz), turn = prevYaw == null ? 0 : Math.abs(Math.atan2(Math.sin(yaw - prevYaw), Math.cos(yaw - prevYaw))); prevYaw = yaw;
      const L = local({ x: a.dx, z: a.dz }, yaw);
      if (proc && (turn > 0.3 || i === 0)) for (const s of [-1, 1]) { const [x, z] = L(s * kerb, 1.5); P.light(x, z, yaw, -s); count++; }
      for (let d = 0; d < len; d += 1) {
        const g = acc + d;
        for (const s of [-1, 1]) {
          const [kx, kz] = L(s * kerb, d), [fx, fz] = L(s * front, d);
          if (proc && g % Math.round(14 / dens) === (s > 0 ? 0 : 7)) { P.tree(kx, kz, yaw); count++; }
          if (proc && g % 32 === (s > 0 ? 3 : 19)) { P.lamp(kx, kz, yaw, -s); count++; }
          if (proc && g % (lite ? 36 : 24) === 11 && rnd() < 0.7) { const [rx, rz] = L(s * (width * 0.5 + 0.5), d); P.railing(rx, rz, yaw, 6); count++; }
          if (g % 9 === 4 && rnd() < 0.5) { P.bollard(kx, kz); count++; }
          if (proc && g % 70 === (s > 0 ? 40 : 5)) { P.bin(fx, fz, yaw); count++; }
          if (proc && g % 260 === (s > 0 ? 130 : 0)) { P.busStop(kx, kz, yaw, -s); count++; }
          if (g % 150 === 75 && s > 0) { P.roadSign(kx, kz, yaw); count++; }
          if (proc && rural && g % 45 === 20 && s < 0) { P.pole(fx, fz); count++; }
          if (proc && !rural && g % Math.round(6 / dens) === 2 && rnd() < 0.75) { P.shopSign(fx, fz, yaw, s); count++; }
        }
      }
      acc += Math.floor(len);
    }
  }

  const grp = new THREE.Group(); grp.name = (opts.id || 'dist') + '_street_furniture_core27d'; grp.userData.noMerge = true; grp.userData.railSegments = railSegments;
  const o = new THREE.Object3D();
  for (const { geo, m, list } of buckets.values()) {
    const im = new THREE.InstancedMesh(geo, m, list.length);
    list.forEach(([x, y, z, sx, sy, sz, yaw, rx], i) => { o.position.set(x, y, z); o.rotation.set(rx, yaw, 0, 'YXZ'); o.scale.set(sx, sy, sz); o.updateMatrix(); im.setMatrixAt(i, o.matrix); });
    im.castShadow = !lite && m !== mat.glass; im.receiveShadow = true; im.frustumCulled = false; im.userData.noMerge = true;
    grp.add(im);
  }
  parent.add(grp);
  return { group: grp, props: count, drawCalls: buckets.size, railSegments };
}

export function attachAll(THREE, urls = ['./assets/data/osm-street-furniture-core27d.json', './assets/data/osm-street-furniture-core28.json', './assets/data/osm-street-furniture-core29.json']) {
  const done = new Set(); let PTS = {}, tried = false;
  Promise.all([].concat(urls).map((u) => fetch(u).then((r) => (r.ok ? r.json() : null)).catch(() => null)))
    .then((js) => { for (const j of js) if (j && j.districts) Object.assign(PTS, j.districts); }).finally(() => { tried = true; });
  const iv = setInterval(() => {
    if (!tried) return;
    const NT = window.NT || {}; const day = /[?&]day\b/.test(location.search);
    for (const k of KEYS) {
      const D = NT[k]; if (!D || done.has(k) || !D.group || !D.data) continue;
      done.add(k);
      try {
        const r = buildStreetFurniture(THREE, D.group, D.data.drive_trunk || [], { id: k.toLowerCase(), points: PTS && PTS[k.toLowerCase()], lite: !!NT.safariLite, day, rural: k === 'KT', seed: k.length * 97 });
        D.railSegments = r.railSegments; D.stats = Object.assign(D.stats || {}, { furniture: r.props, furnitureDraws: r.drawCalls, railSegments: r.railSegments.length });
        console.info('[core27d-furniture]', k, r.props, 'props /', r.drawCalls, 'draws /', r.railSegments.length, 'rails');
      } catch (e) { console.warn('[core27d-furniture]', k, e && e.message); }
    }
    /* 新區 lazy 出現都接到，唔 clear */
  }, 1500);
  Object.assign(window.NT = window.NT || {}, { C27D_FURNITURE: { buildStreetFurniture, done } });
}
