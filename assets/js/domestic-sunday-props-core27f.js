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
  };
  const mats = [mat.matBlue, mat.matGreen, mat.matGrey];
  const G = { box: new THREE.BoxGeometry(1, 1, 1) };
  const buckets = new Map();
  const put = (geo, m, x, y, z, sx, sy, sz, yaw = 0) => {
    const k = geo.uuid + m.uuid; if (!buckets.has(k)) buckets.set(k, { geo, m, list: [] });
    buckets.get(k).list.push([x, y, z, sx, sy, sz, yaw]);
  };
  const pts = (gather && gather.spawn_points) || [];
  const cap = lite ? Math.min(pts.length, 4) : pts.length;
  let n = 0;
  for (let i = 0; i < cap; i++) {
    const p = pts[i]; if (!p || p.x == null) continue;
    const yaw = (rnd() - 0.5) * 0.8;
    /* 野餐墊 ~1.2×1.8m，高度 1:1 薄片 */
    put(G.box, mats[(rnd() * mats.length) | 0], p.x, 0.02, p.z, 1.2 + rnd() * 0.4, 0.03, 1.6 + rnd() * 0.4, yaw);
    /* 紙皮箱 1–2 個，普通啡色，唔寫字 */
    const nBox = 1 + ((rnd() * 2) | 0);
    for (let b = 0; b < nBox; b++) {
      const ox = (rnd() - 0.5) * 1.2, oz = (rnd() - 0.5) * 1.2;
      put(G.box, rnd() < 0.5 ? mat.card : mat.cardDark, p.x + ox, 0.2, p.z + oz, 0.45 + rnd() * 0.2, 0.35 + rnd() * 0.15, 0.35 + rnd() * 0.2, yaw + rnd());
    }
    /* 臨時牌：戲仿「休憩用地 · 請保持通道暢通」 */
    if (i === 0 || (i === 2 && !lite)) {
      put(G.box, mat.cardDark, p.x + 0.9, 0.55, p.z - 0.6, 0.06, 1.1, 0.06, yaw);
      put(G.box, mat.matGrey, p.x + 0.9, 1.25, p.z - 0.6, 0.7, 0.45, 0.04, yaw);
      if (!opts._signAt) opts._signAt = { x: p.x + 0.9, z: p.z - 0.6, yaw };
    }
    n++;
  }
  const grp = new THREE.Group(); grp.name = 'cw_domestic_sunday_props_core27f'; grp.userData.noMerge = true;
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
      const plate = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 0.42), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.85 }));
      const s = opts._signAt;
      plate.position.set(s.x, 1.25, s.z); plate.rotation.y = s.yaw + Math.PI;
      plate.userData.noMerge = true; grp.add(plate);
    } catch (e) { /* */ }
  }
  return { group: grp, props: n, drawCalls: buckets.size };
}

export function attachAll(THREE) {
  /* ?fdwsun：等 CW group 起再掛；蓆／紙皮／臨時牌 */
  let tried = false, gather = null;
  const tryFetch = () => {
    const L = (window.NT && window.NT.C27F_LAYERS) || null;
    if (L && L.districts && L.districts.cw && L.districts.cw.domestic_sunday_gather) {
      gather = L.districts.cw.domestic_sunday_gather; tried = true; return;
    }
    fetch(LAYERS_URL).then((r) => (r.ok ? r.json() : null)).catch(() => null).then((j) => {
      gather = j && j.districts && j.districts.cw && j.districts.cw.domestic_sunday_gather;
    }).finally(() => { tried = true; });
  };
  tryFetch();
  const done = new Set();
  const iv = setInterval(() => {
    if (!tried) return;
    const NT = window.NT || {};
    const D = NT.CW; if (!D || done.has('CW') || !D.group || !gather) return;
    done.add('CW');
    try {
      const r = buildDomesticSundayProps(THREE, D.group, gather, { lite: !!NT.safariLite, seed: 0xd07e });
      D.stats = Object.assign(D.stats || {}, { domesticSundayProps: r.props, domesticSundayDraws: r.drawCalls });
      console.info('[core27f-domestic-sunday]', r.props, 'spots /', r.drawCalls, 'draws');
    } catch (e) { console.warn('[core27f-domestic-sunday]', e && e.message); }
    clearInterval(iv);
  }, 1500);
}
