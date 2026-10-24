/* core27f · 中環假日休憩帶 prop（美術）— 普通野餐墊／紙皮箱，禁國籍標籤／口音笑位／相板
 *   import('./assets/js/domestic-sunday-props-core27f.js').then((m) => m.attachAll(THREE));
 * 讀 NT.C27F_LAYERS.districts.cw.domestic_sunday_gather.spawn_points（無則 fetch layers JSON）
 */
const LAYERS_URL = './assets/data/hk-street-reality-layers-core27f.json';

export function buildDomesticSundayProps(THREE, parent, gather, opts = {}) {
  const lite = !!opts.lite, rnd = (() => { let s = (opts.seed || 0xc27f) >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); })();
  const M = (c, r = 0.9, m = 0) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
  const mat = {
    matBlue: M(0x3a6ea5), matGreen: M(0x4a7a4e), matGrey: M(0x8a8c8e),
    card: M(0xc4a574, 0.95, 0), cardDark: M(0x8a6e48, 0.95, 0),
    plaza: M(0xb8b0a0, 0.92, 0), plazaAlt: M(0xa8a498, 0.9, 0),
  };
  const mats = [mat.matBlue, mat.matGreen, mat.matGrey];
  const G = { box: new THREE.BoxGeometry(1, 1, 1) };
  const buckets = new Map();
  const put = (geo, m, x, y, z, sx, sy, sz, yaw = 0) => {
    const k = geo.uuid + m.uuid; if (!buckets.has(k)) buckets.set(k, { geo, m, list: [] });
    buckets.get(k).list.push([x, y, z, sx, sy, sz, yaw]);
  };
  const grp = new THREE.Group(); grp.name = 'cw_domestic_sunday_props_core27f'; grp.userData.noMerge = true;
  /* 廣場鋪面：XZ 三角化（淺石／米色對比瀝青，唔一片死灰） */
  const polys = (gather && gather.polygons) || [];
  for (let pi = 0; pi < polys.length; pi++) {
    const verts = polys[pi].vertices || [];
    if (verts.length < 3) continue;
    try {
      let pts2 = verts.map((v) => new THREE.Vector2(v.x, v.z));
      const a0 = pts2[0], aN = pts2[pts2.length - 1];
      if (Math.hypot(a0.x - aN.x, a0.y - aN.y) < 0.05) pts2 = pts2.slice(0, -1);
      if (pts2.length < 3) continue;
      if (THREE.ShapeUtils.isClockWise(pts2)) pts2.reverse();
      const tris = THREE.ShapeUtils.triangulateShape(pts2, []);
      const pos = [], idx = [];
      const y = 0.09;
      for (const q of pts2) pos.push(q.x, y, q.y);
      for (const t of tris) idx.push(t[0], t[1], t[2]);
      if (idx.length < 3) continue;
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      geo.setIndex(idx); geo.computeVertexNormals();
      const mesh = new THREE.Mesh(geo, pi % 2 ? mat.plazaAlt : mat.plaza);
      mesh.receiveShadow = true; mesh.userData.noMerge = true;
      mesh.name = 'cw_fdw_plaza_' + (polys[pi].name_zh || pi);
      grp.add(mesh);
    } catch (e) { /* */ }
  }
  const pts = (gather && gather.spawn_points) || [];
  const cap = lite ? Math.min(pts.length, 4) : pts.length;
  let n = 0;
  for (let i = 0; i < cap; i++) {
    const p = pts[i]; if (!p || p.x == null) continue;
    const yaw = (rnd() - 0.5) * 0.8;
    /* 野餐墊：y=0.14 高過 c27f 行人路 0.12，禁埋石屎下 */
    put(G.box, mats[(rnd() * mats.length) | 0], p.x, 0.14, p.z, 1.4 + rnd() * 0.5, 0.04, 1.8 + rnd() * 0.5, yaw);
    const nBox = 1 + ((rnd() * 2) | 0);
    for (let b = 0; b < nBox; b++) {
      const ox = (rnd() - 0.5) * 1.2, oz = (rnd() - 0.5) * 1.2;
      put(G.box, rnd() < 0.5 ? mat.card : mat.cardDark, p.x + ox, 0.32, p.z + oz, 0.5 + rnd() * 0.25, 0.4 + rnd() * 0.15, 0.4 + rnd() * 0.25, yaw + rnd());
    }
    /* 臨時牌：加大＋抬高，戲仿「休憩用地 · 請保持通道暢通」 */
    if (i === 0 || (i === 2 && !lite)) {
      put(G.box, mat.cardDark, p.x + 0.9, 0.7, p.z - 0.6, 0.08, 1.3, 0.08, yaw);
      put(G.box, mat.matGrey, p.x + 0.9, 1.45, p.z - 0.6, 0.95, 0.55, 0.05, yaw);
      if (!opts._signAt) opts._signAt = { x: p.x + 0.9, z: p.z - 0.6, yaw };
    }
    n++;
  }
  const o = new THREE.Object3D();
  for (const { geo, m, list } of buckets.values()) {
    const im = new THREE.InstancedMesh(geo, m, list.length);
    list.forEach(([x, y, z, sx, sy, sz, yaw], i) => { o.position.set(x, y, z); o.rotation.set(0, yaw, 0); o.scale.set(sx, sy, sz); o.updateMatrix(); im.setMatrixAt(i, o.matrix); });
    im.castShadow = !lite; im.receiveShadow = true; im.frustumCulled = false; im.userData.noMerge = true;
    grp.add(im);
  }
  parent.add(grp);
  if (opts._signAt && typeof document !== 'undefined') {
    try {
      const c = document.createElement('canvas'); c.width = 512; c.height = 256;
      const g = c.getContext('2d');
      g.fillStyle = '#e8e6e0'; g.fillRect(0, 0, 512, 256);
      g.strokeStyle = '#333'; g.lineWidth = 8; g.strokeRect(8, 8, 496, 240);
      g.fillStyle = '#1a1a1a'; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.font = 'bold 36px "PingFang HK","Noto Sans TC",sans-serif';
      g.fillText('休憩用地', 256, 100);
      g.font = '28px "PingFang HK","Noto Sans TC",sans-serif';
      g.fillText('請保持通道暢通', 256, 160);
      const tex = new THREE.CanvasTexture(c);
      const plate = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.42, 0.08), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.85, side: THREE.DoubleSide }));
      const s = opts._signAt;
      plate.position.set(s.x, 1.45, s.z); plate.rotation.y = s.yaw + Math.PI;
      plate.userData.noMerge = true; grp.add(plate);
    } catch (e) { /* */ }
  }
  return { group: grp, props: n, drawCalls: buckets.size };
}

export function attachAll(THREE) {
  /* ?fdwsun／cen：掛 scene（唔靠 CW.group LOD）；蓆／紙皮／臨時牌＋廣場鋪面 */
  let tried = false, gather = null;
  const tryFetch = () => {
    const L = (window.NT && window.NT.C27F_LAYERS) || null;
    if (L && L.districts && L.districts.cw && L.districts.cw.domestic_sunday_gather) {
      gather = L.districts.cw.domestic_sunday_gather; tried = true; return;
    }
    fetch(LAYERS_URL).then((r) => (r.ok ? r.json() : null)).catch(() => null).then((j) => {
      gather = j && j.districts && j.districts.cw && j.districts.cw.domestic_sunday_gather;
      if (j) Object.assign(window.NT = window.NT || {}, { C27F_LAYERS: window.NT.C27F_LAYERS || j });
    }).finally(() => { tried = true; });
  };
  tryFetch();
  const done = new Set();
  const iv = setInterval(() => {
    if (!tried || !gather) return;
    const NT = window.NT || {};
    const sc = (typeof window !== 'undefined' && window.scene) || null;
    const parent = sc || (NT.CW && NT.CW.group) || null;
    if (!parent || done.has('CW')) return;
    done.add('CW');
    try {
      const r = buildDomesticSundayProps(THREE, parent, gather, { lite: !!NT.safariLite, seed: 0xd07e });
      if (NT.CW) NT.CW.stats = Object.assign(NT.CW.stats || {}, { domesticSundayProps: r.props, domesticSundayDraws: r.drawCalls });
      console.info('[core27f-domestic-sunday]', r.props, 'spots /', r.drawCalls, 'draws / plaza');
    } catch (e) { console.warn('[core27f-domestic-sunday]', e && e.message); }
    clearInterval(iv);
  }, 1200);
}
