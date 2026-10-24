/**
 * core28 · 立面厚度／厚殼 facade kit
 * docs/hk-facade-thickness-boss-fail-2026-10-24.md
 * docs/art-boss-fail-facade-thickness-container-2026-10-24.md
 * 牆殼 ≥0.45 m；必背臉；禁淨 Plane／facade_d_* 相板當樓。
 * load：g.scene || g
 */
export const FACADE_SHELL_D = 0.5;
export const HK_FACADE_KIT = {
  residential: { file: 'assets/gltf/hk-buildings/hk-facade-residential-bay.glb', w: 8, h: 18, d: 0.55 },
  ph: { file: 'assets/gltf/hk-buildings/hk-facade-ph-panel-bay.glb', w: 10, h: 24, d: 0.6 },
  tonglau: { file: 'assets/gltf/hk-buildings/hk-facade-tonglau-shell.glb', w: 9, h: 16, d: 0.75, arcade: 1.65 },
  industrial: { file: 'assets/gltf/hk-buildings/hk-facade-industrial-shell.glb', w: 12, h: 28, d: 0.85 },
  massing: { file: 'assets/gltf/hk-buildings/hk-massing-block-8x22x10.glb', w: 8, h: 22, d: 10 }
};

/** 外牆＋背臉＋頂 return（CCW footprint；d 向內縮）*/
export function pushThickWall(pos, uv, idx, p0, p1, y0, h, u0, u1, v1, shellD) {
  const L = Math.hypot(p1.x - p0.x, p1.y - p0.y);
  if (L < 0.3) return false;
  const d = shellD == null ? FACADE_SHELL_D : shellD;
  const dx = p1.x - p0.x, dz = p1.y - p0.y;
  const ox = dz / L, oz = -dx / L;
  let vi = pos.length / 3;
  pos.push(p0.x, y0, p0.y, p1.x, y0, p1.y, p1.x, y0 + h, p1.y, p0.x, y0 + h, p0.y);
  uv.push(u0, 0, u1, 0, u1, v1, u0, v1);
  idx.push(vi, vi + 1, vi + 2, vi, vi + 2, vi + 3);
  const b0x = p0.x - ox * d, b0z = p0.y - oz * d, b1x = p1.x - ox * d, b1z = p1.y - oz * d;
  vi = pos.length / 3;
  pos.push(b1x, y0, b1z, b0x, y0, b0z, b0x, y0 + h, b0z, b1x, y0 + h, b1z);
  uv.push(u1, 0, u0, 0, u0, v1, u1, v1);
  idx.push(vi, vi + 1, vi + 2, vi, vi + 2, vi + 3);
  vi = pos.length / 3;
  pos.push(p0.x, y0 + h, p0.y, p1.x, y0 + h, p1.y, b1x, y0 + h, b1z, b0x, y0 + h, b0z);
  uv.push(u0, 0, u1, 0, u1, d / 4.2, u0, d / 4.2);
  idx.push(vi, vi + 1, vi + 2, vi, vi + 2, vi + 3);
  return true;
}

export function ensureFacadeSide(THREE, mat) {
  if (!mat) return mat;
  const apply = (m) => {
    if (!m) return;
    if (m.side !== THREE.DoubleSide) { m.side = THREE.DoubleSide; m.needsUpdate = true; }
    if (m.depthWrite === false && !m.transparent) m.depthWrite = true;
  };
  if (Array.isArray(mat)) mat.forEach(apply); else apply(mat);
  return mat;
}

const _kitCache = {};
export async function loadFacadeKit(loadGLTF) {
  if (!loadGLTF) return _kitCache;
  for (const [k, spec] of Object.entries(HK_FACADE_KIT)) {
    if (_kitCache[k]) continue;
    try {
      const g = await loadGLTF(spec.file, 12000);
      const root = (g && (g.scene || g)) || null;
      if (!root) continue;
      root.traverse((o) => {
        if (!o.isMesh) return;
        o.castShadow = o.receiveShadow = true;
        o.userData.noMerge = true;
        o.userData.hkFacadeThick = true;
        if (o.material) ensureFacadeSide(THREE, o.material);
      });
      _kitCache[k] = { proto: root, spec };
    } catch (e) { console.warn('[hk-facade]', k, e && e.message); }
  }
  return _kitCache;
}

/** 沿 footprint 街面掛 bay／shell（紙片換厚殼）；typeHint: tonglau|ph|residential|industrial|massing */
export function dressFootprintShell(THREE, parent, ring, h, typeHint, kit) {
  if (!ring || ring.length < 3 || !kit) return 0;
  const key = /industrial|廠|warehouse/.test(typeHint || '') ? 'industrial'
    : /public_housing|公屋|ph|estate/.test(typeHint || '') ? 'ph'
    : /tong_lau|tonglau|唐樓/.test(typeHint || '') ? 'tonglau'
    : /massing|fill|block/.test(typeHint || '') ? 'massing'
    : 'residential';
  const entry = kit[key] || kit.residential || kit.massing;
  if (!entry || !entry.proto) return 0;
  const spec = entry.spec;
  let pts = ring.map((p) => new THREE.Vector2(p.dx != null ? p.dx : p.x, p.dz != null ? p.dz : p.y));
  const a0 = pts[0], aN = pts[pts.length - 1];
  if (pts.length > 2 && Math.hypot(a0.x - aN.x, a0.y - aN.y) < 0.05) pts = pts.slice(0, -1);
  if (THREE.ShapeUtils.isClockWise(pts)) pts.reverse();
  let n = 0;
  const maxBay = 8;
  for (let k = 0; k < pts.length && n < maxBay; k++) {
    const p0 = pts[k], p1 = pts[(k + 1) % pts.length];
    const L = p0.distanceTo(p1);
    if (L < spec.w * 0.55) continue;
    const dx = p1.x - p0.x, dz = p1.y - p0.y;
    const yaw = Math.atan2(dx, dz);
    const ox = dz / L, oz = -dx / L;
    const steps = Math.min(4, Math.max(1, Math.floor(L / spec.w)));
    for (let s = 0; s < steps && n < maxBay; s++) {
      const t = (s + 0.5) / steps;
      const mx = p0.x + dx * t, mz = p0.y + dz * t;
      const cl = entry.proto.clone(true);
      const sy = Math.min(1.35, Math.max(0.45, h / spec.h));
      cl.scale.set(1, sy, 1);
      cl.position.set(mx + ox * (spec.d * 0.5), 0, mz + oz * (spec.d * 0.5));
      cl.rotation.y = yaw;
      cl.userData.hkFacadeThick = true;
      cl.userData.noMerge = true;
      parent.add(cl);
      n++;
    }
  }
  return n;
}
