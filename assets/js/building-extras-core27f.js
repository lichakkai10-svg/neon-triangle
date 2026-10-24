/* core27f · 樓宇 extras（美術）— 唐樓騎樓／podium 檐口／冷氣外機／晾衫架
 * 純程序 InstancedMesh，禁相板／真商標／Google mesh。尺寸跟 art-dims-street-acceptance-core27f.json。
 * 尺度：水平（深度／柱距）u=m×1.5；高度／淨空／細 prop（冷氣）≤1m 用 1:1，唔 ×1.5。
 * 用法（index.html module 內一行）：
 *   import('./assets/js/building-extras-core27f.js').then((m) => m.attachAll(THREE));
 * 自動掛落 NT.YTM／CW／KT／SSP／KCITY／WC／EAST／TW／ST 嘅 .group；暴露
 *   NT[區].arcadeColliders = [{x0,z0,x1,z1,y0,y1}]
 *   group.userData.arcadeColliders／podiumHeight
 * podium.height_m 已係遊戲單位（levels×3.1），唔再 ×1.5。
 */
const KEYS = ['YTM', 'CW', 'KT', 'SSP', 'KCITY', 'WC', 'EAST', 'TW', 'ST'];
const DATA_URL = {
  YTM: './assets/data/osm-ytm-drive-extrude-core24.json',
  CW: './assets/data/osm-cw-drive-extrude-core25.json',
  KT: './assets/data/osm-kt-drive-extrude-core25.json',
  SSP: './assets/data/osm-ssp-drive-extrude-core27.json',
  KCITY: './assets/data/osm-kcity-drive-extrude-core27.json',
  WC: './assets/data/osm-wc-drive-extrude-core28.json',
  EAST: './assets/data/osm-east-drive-extrude-core28.json',
  TW: './assets/data/osm-tw-drive-extrude-core29.json',
  ST: './assets/data/osm-st-drive-extrude-core29.json',
};

/* Boss research pick：水平 ×1.5；clear_h／AC 高度 1:1；boss P0 2026-10-24 已鎖（見 art-dims boss_p0） */
const ARC_DEPTH = 3.0;
const ARC_CLEAR = 3.0; /* 高度 1:1（2.7–3.5m pick 3.0），唔 ×1.5 */
const ARC_POST = 5.25; /* 柱距 3.5m×1.5＝5.25u（老闆 3.5–5m → 5.25–7.5u；揀下限密啲） */
const ARC_SLAB = 0.22;
const ARC_COL_W = 0.32;
const COL_FROM_SHOP = 2.0; /* 老闆實測舖門 1.0–1.8m ×1.5 → 1.5–2.7；pick 2.0 */
const COL_FROM_CURB = 2.4; /* 路壆 1.2–2.0m ×1.5 → 1.8–3.0；pick 中上 */
const POD_THICK = 0.3;
const POD_OUT = 0.4;
const AC_W = 0.85, AC_H = 0.60, AC_D = 0.35; /* 細 prop 1:1 */
const LAUNDRY_CLEAR_AC = 0.75; /* P0：避外機下 0.5–1m，取中 */
const FLOOR_H = 3.1; /* 同 index extrude levels*3.1 */
const CAP_ARC = { full: 80, lite: 40 };
const CAP_AC = { full: 2000, lite: 600 };

const AC_TYPES = /tong_lau|composite|private_estate|public_housing|residential/;
const AC_FEW = /commercial_office|institutional|industrial|office/;

function rngOf(seed) { let s = (seed >>> 0) || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
function hashId(id) { let h = 2166136261; const t = String(id); for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

/** 閉合 ring → 邊列表；outward 用中心推開（唔靠 winding） */
function edgesOf(ring) {
  if (!ring || ring.length < 3) return [];
  let cx = 0, cz = 0, n = ring.length - (ring[0].dx === ring[ring.length - 1].dx && ring[0].dz === ring[ring.length - 1].dz ? 1 : 0);
  if (n < 3) n = ring.length;
  for (let i = 0; i < n; i++) { cx += ring[i].dx; cz += ring[i].dz; }
  cx /= n; cz /= n;
  const edges = [];
  for (let i = 0; i < n; i++) {
    const a = ring[i], b = ring[(i + 1) % n];
    const dx = b.dx - a.dx, dz = b.dz - a.dz;
    const len = Math.hypot(dx, dz);
    if (len < 1.5) continue;
    const mx = (a.dx + b.dx) / 2, mz = (a.dz + b.dz) / 2;
    let nx = -dz / len, nz = dx / len; /* 其中一個法線 */
    if ((mx - cx) * nx + (mz - cz) * nz < 0) { nx = -nx; nz = -nz; } /* 指向外 */
    edges.push({ x0: a.dx, z0: a.dz, x1: b.dx, z1: b.dz, len, yaw: Math.atan2(dx, dz), nx, nz, mx, mz });
  }
  return edges;
}

/** 街面：取最長邊，其次長度 ≥ 中位數嘅邊（最多 3 面） */
function streetEdges(edges) {
  if (!edges.length) return [];
  const sorted = edges.slice().sort((a, b) => b.len - a.len);
  const med = sorted[Math.floor(sorted.length / 2)].len;
  const out = [];
  for (const e of sorted) {
    if (out.length >= 3) break;
    if (out.length === 0 || e.len >= Math.max(8, med * 0.85)) out.push(e);
  }
  return out;
}

export function buildBuildingExtras(THREE, parent, buildings, opts = {}) {
  const lite = !!opts.lite, rnd = rngOf(opts.seed || 27);
  const arcCap = lite ? CAP_ARC.lite : CAP_ARC.full;
  const acCap = lite ? CAP_AC.lite : CAP_AC.full;
  const laundryCap = Math.floor(acCap / 2);

  const M = (c, r = 0.85, m = 0.05) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
  const mat = {
    concrete: M(0x8a8c8e, 0.9, 0.05),
    concrete2: M(0x7a7c7e, 0.88, 0.05),
    ac: M(0xa9afb3, 0.45, 0.55),
    acDark: M(0x4a4e52, 0.5, 0.4),
    laundryMetal: M(0xb0b4b8, 0.4, 0.7),
    laundryBlack: M(0x2a2a2c, 0.55, 0.5),
    bamboo: M(0x3f5a2e, 0.85, 0.05),
    podium: M(0x9a9c9e, 0.82, 0.08),
  };
  const G = {
    box: new THREE.BoxGeometry(1, 1, 1),
    cyl: new THREE.CylinderGeometry(0.5, 0.5, 1, lite ? 6 : 8),
  };
  const buckets = new Map();
  const put = (geo, m, x, y, z, sx, sy, sz, yaw = 0) => {
    const k = geo.uuid + m.uuid;
    if (!buckets.has(k)) buckets.set(k, { geo, m, list: [] });
    buckets.get(k).list.push([x, y, z, sx, sy, sz, yaw]);
  };

  const arcadeColliders = [];
  let arcadeN = 0, podiumN = 0, acN = 0, laundryN = 0;
  const podiumHeights = [];

  const list = Array.isArray(buildings) ? buildings : [];
  /* —— 騎樓 —— */
  const arcBldgs = list.filter((b) => b && b.has_arcade && b.footprint_ring);
  for (let bi = 0; bi < arcBldgs.length && arcadeN < arcCap; bi++) {
    const b = arcBldgs[bi];
    const faces = streetEdges(edgesOf(b.footprint_ring));
    if (!faces.length) continue;
    let placed = false;
    for (const e of faces) {
      if (arcadeN >= arcCap) break;
      /* 沿邊外移 depth/2 做廊中心線 */
      const ox = e.nx * (ARC_DEPTH / 2), oz = e.nz * (ARC_DEPTH / 2);
      const cx = e.mx + ox, cz = e.mz + oz;
      /* 廊頂板 */
      put(G.box, mat.concrete, cx, ARC_CLEAR + ARC_SLAB / 2, cz, ARC_DEPTH, ARC_SLAB, Math.max(0.5, e.len - 0.2), e.yaw);
      /* 柱：沿邊每 ARC_POST */
      const nPost = Math.max(2, Math.floor(e.len / ARC_POST) + 1);
      for (let i = 0; i < nPost; i++) {
        const t = nPost === 1 ? 0.5 : i / (nPost - 1);
        /* 柱心：離舖門 COL_FROM_SHOP；若廊深允許再內退保離外緣≈路壆 */
        const out = Math.min(COL_FROM_SHOP, Math.max(ARC_COL_W, ARC_DEPTH - COL_FROM_CURB));
        const px = e.x0 + (e.x1 - e.x0) * t + e.nx * out;
        const pz = e.z0 + (e.z1 - e.z0) * t + e.nz * out;
        put(G.box, mat.concrete2, px, ARC_CLEAR / 2, pz, ARC_COL_W, ARC_CLEAR, ARC_COL_W, e.yaw);
      }
      /* 內側靠樓腳矮梁（視覺封邊） */
      put(G.box, mat.concrete2, e.mx + e.nx * 0.12, ARC_CLEAR - 0.08, e.mz + e.nz * 0.12, 0.2, 0.16, Math.max(0.4, e.len - 0.3), e.yaw);
      /* collider：廊底行走 AABB（玩家行入有蓋廊） */
      const xs = [e.x0, e.x1, e.x0 + e.nx * ARC_DEPTH, e.x1 + e.nx * ARC_DEPTH];
      const zs = [e.z0, e.z1, e.z0 + e.nz * ARC_DEPTH, e.z1 + e.nz * ARC_DEPTH];
      arcadeColliders.push({
        x0: Math.min(...xs), z0: Math.min(...zs),
        x1: Math.max(...xs), z1: Math.max(...zs),
        y0: 0, y1: ARC_CLEAR,
        id: 'arc_' + (b.osm_id || bi) + '_' + arcadeColliders.length,
      });
      placed = true;
    }
    if (placed) arcadeN++;
  }

  /* —— podium 檐口環 —— */
  for (const b of list) {
    if (!b || !b.podium || !b.footprint_ring) continue;
    /* podium.height_m 係研究稿米（10／15）；×K=1.5 → 遊戲單位。building.height_m 先至係世界 Y 直用。 */
    const ph = (b.podium.height_m != null && b.podium.height_m > 1)
      ? b.podium.height_m * 1.5
      : (b.podium.levels || 4) * (b.podium.storey_height_m ? b.podium.storey_height_m * 1.5 : FLOOR_H);
    const edges = edgesOf(b.footprint_ring);
    if (!edges.length) continue;
    for (const e of edges) {
      const cx = e.mx + e.nx * (POD_OUT / 2);
      const cz = e.mz + e.nz * (POD_OUT / 2);
      put(G.box, mat.podium, cx, ph, cz, POD_OUT + 0.15, POD_THICK, Math.max(0.4, e.len + POD_OUT * 0.5), e.yaw);
    }
    podiumHeights.push({ osm_id: b.osm_id, height: ph });
    podiumN++;
  }

  /* —— 冷氣外機 + 晾衫 —— */
  const facadeTypes = list.filter((b) => b && b.footprint_ring && (AC_TYPES.test(b.type || '') || AC_FEW.test(b.type || '')));
  for (const b of facadeTypes) {
    if (acN >= acCap && laundryN >= laundryCap) break;
    const seed = hashId(b.osm_id || b.name || 'x');
    const r = rngOf(seed);
    const edges = streetEdges(edgesOf(b.footprint_ring));
    if (!edges.length) continue;
    const levels = Math.max(2, Math.min(40, Math.floor(b.levels || (b.height_m ? b.height_m / FLOOR_H : 6))));
    const dense = AC_TYPES.test(b.type || '');
    const few = AC_FEW.test(b.type || '');
    const maxFloor = Math.min(levels, lite ? (dense ? 8 : 5) : (dense ? 8 : levels)); /* P0：晾衫／密排冷氣主要 2–8 層 */
    const startFloor = 1; /* 跳過地舖 */
    for (const e of edges) {
      const perFloor = few ? (r() < 0.45 ? 1 : 0) : (1 + ((r() < 0.55) ? 1 : 0)); /* 1–2 */
      if (perFloor < 1) continue;
      const slots = Math.max(1, Math.floor(e.len / (dense ? 5.5 : 8)));
      for (let fl = startFloor; fl < maxFloor; fl++) {
        const y = fl * FLOOR_H + (1.5 + r() * 1.0); /* mount_y 1.5–2.5 高度 1:1 */
        for (let s = 0; s < Math.min(perFloor, slots) && acN < acCap; s++) {
          const t = (s + 0.35 + r() * 0.3) / Math.max(1, slots);
          const px = e.x0 + (e.x1 - e.x0) * t + e.nx * (AC_D / 2 + 0.15);
          const pz = e.z0 + (e.z1 - e.z0) * t + e.nz * (AC_D / 2 + 0.15);
          put(G.box, mat.ac, px, y, pz, AC_D, AC_H, AC_W, e.yaw); /* sx=深(法線) sz=闊(沿牆) */
          /* 細風扇面 */
          if (!lite) put(G.box, mat.acDark, px + e.nx * (AC_D * 0.35), y, pz + e.nz * (AC_D * 0.35), 0.06, AC_H * 0.55, AC_W * 0.7, e.yaw);
          acN++;
          /* 晾衫：同層但錯開，唔喺冷氣正下方 */
          if (laundryN < laundryCap && dense && r() < 0.55) {
            /* P0：側移，唔掛外機正下方 0.5–1m 帶 */
            const t2 = Math.min(0.95, t + 0.22 + r() * 0.12);
            const protrude = 1.5 + r() * 0.75;
            const lx = e.x0 + (e.x1 - e.x0) * t2 + e.nx * (protrude / 2);
            const lz = e.z0 + (e.z1 - e.z0) * t2 + e.nz * (protrude / 2);
            const ly = y; /* 同層側移；垂直淨空改由側移保證 */
            const poleMat = r() < 0.35 ? mat.bamboo : (r() < 0.5 ? mat.laundryMetal : mat.laundryBlack);
            /* 橫桿：local Z 對準外法線伸出；兩支撐用幼 box */
            const yawN = Math.atan2(e.nx, e.nz);
            put(G.box, poleMat, lx, ly, lz, 0.06, 0.05, protrude, yawN);
            const bx = e.x0 + (e.x1 - e.x0) * t2 + e.nx * 0.12;
            const bz = e.z0 + (e.z1 - e.z0) * t2 + e.nz * 0.12;
            put(G.box, poleMat, bx, ly - 0.12, bz, 0.05, 0.45, 0.05, yawN);
            put(G.box, poleMat, bx + e.nx * (protrude * 0.9), ly - 0.04, bz + e.nz * (protrude * 0.9), 0.04, 0.28, 0.04, yawN);
            laundryN++;
          }
        }
        if (few) break; /* 寫字樓淨係低層一兩層 */
      }
    }
  }

  const grp = new THREE.Group();
  grp.name = (opts.id || 'dist') + '_building_extras_core27f';
  grp.userData.noMerge = true;
  grp.userData.arcadeColliders = arcadeColliders;
  grp.userData.podiumHeights = podiumHeights;
  const o = new THREE.Object3D();
  let instances = 0;
  for (const { geo, m, list: L } of buckets.values()) {
    const im = new THREE.InstancedMesh(geo, m, L.length);
    L.forEach(([x, y, z, sx, sy, sz, yaw], i) => {
      o.position.set(x, y, z); o.rotation.set(0, yaw, 0); o.scale.set(sx, sy, sz); o.updateMatrix(); im.setMatrixAt(i, o.matrix);
    });
    im.castShadow = !lite; im.receiveShadow = true; im.frustumCulled = false; im.userData.noMerge = true;
    grp.add(im);
    instances += L.length;
  }
  parent.add(grp);
  return {
    group: grp,
    arcadeColliders,
    podiumHeights,
    counts: { arcade: arcadeN, podium: podiumN, ac: acN, laundry: laundryN, instances, drawCalls: buckets.size },
    drawCalls: buckets.size,
  };
}

export function attachAll(THREE, urlMap = DATA_URL) {
  const done = new Set();
  const cache = {};
  let pending = 0, started = false;
  const load = (k) => {
    if (cache[k] !== undefined) return;
    pending++;
    const u = urlMap[k];
    if (!u) { cache[k] = []; pending--; return; }
    fetch(u).then((r) => (r.ok ? r.json() : null)).catch(() => null).then((j) => {
      /* 三個 array 加總（QA／爬蟲：buildings＋buildings_small＋csdi_buildings） */
      const a = (j && j.buildings) || [], b = (j && j.buildings_small) || [], c = (j && j.csdi_buildings) || [];
      cache[k] = a.concat(b, c);
    }).finally(() => { pending--; });
  };
  KEYS.forEach(load);
  started = true;
  const iv = setInterval(() => {
    if (!started || pending > 0) return;
    const NT = window.NT || {};
    for (const k of KEYS) {
      const D = NT[k];
      if (!D || done.has(k) || !D.group) continue;
      const buildings = cache[k];
      if (!buildings) continue;
      done.add(k);
      try {
        const r = buildBuildingExtras(THREE, D.group, buildings, {
          id: k.toLowerCase(),
          lite: !!NT.safariLite,
          seed: hashId(k) ^ 0xc27f,
        });
        D.arcadeColliders = r.arcadeColliders; D.podiumHeights = r.podiumHeights;
        D.stats = Object.assign(D.stats || {}, {
          arcade: r.counts.arcade,
          podiumLedge: r.counts.podium,
          acUnits: r.counts.ac,
          laundry: r.counts.laundry,
          extrasDraws: r.drawCalls,
          extrasInstances: r.counts.instances,
        });
        console.info('[core27f-extras]', k, r.counts);
      } catch (e) { console.warn('[core27f-extras]', k, e && e.message); }
    }
  }, 1500);
  Object.assign(window.NT = window.NT || {}, { C27F_EXTRAS: { buildBuildingExtras, done, DATA_URL } });
}
