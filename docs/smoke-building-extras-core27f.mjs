import { readFileSync } from 'fs';
import { buildBuildingExtras } from '/workspace/neon-triangle-pages/assets/js/building-extras-core27f.js';

const id = () => Math.random().toString(36).slice(2);
class Mat { constructor(o) { Object.assign(this, o); this.uuid = id(); } }
class Geo { constructor() { this.uuid = id(); } }
const THREE = {
  MeshStandardMaterial: Mat,
  BoxGeometry: Geo, CylinderGeometry: Geo,
  Group: class { constructor() { this.children = []; this.userData = {}; this.name = ''; } add(c) { this.children.push(c); } },
  Object3D: class {
    constructor() { this.position = { set() {} }; this.rotation = { set() {} }; this.scale = { set() {} }; this.matrix = {}; }
    updateMatrix() {}
  },
  InstancedMesh: class {
    constructor(g, m, n) { this.count = n; this.userData = {}; }
    setMatrixAt() {}
  },
};

function run(path, label, lite) {
  const j = JSON.parse(readFileSync(path, 'utf8'));
  const parent = new THREE.Group();
  const r = buildBuildingExtras(THREE, parent, j.buildings, { id: label, lite, seed: 27 });
  return {
    district: label, lite,
    arcade: r.counts.arcade, podium: r.counts.podium,
    ac: r.counts.ac, laundry: r.counts.laundry,
    instances: r.counts.instances, drawCalls: r.drawCalls,
    colliders: r.arcadeColliders.length,
    y1: r.arcadeColliders[0] && r.arcadeColliders[0].y1,
    podiumH: (r.podiumHeights || [])[0] && r.podiumHeights[0].height,
  };
}

const base = '/workspace/neon-triangle-pages/assets/data/';
const out = {};
for (const lite of [false, true]) {
  out['ytm_' + (lite?'lite':'full')] = run(base + 'osm-ytm-drive-extrude-core24.json', 'ytm', lite);
  out['ssp_' + (lite?'lite':'full')] = run(base + 'osm-ssp-drive-extrude-core27.json', 'ssp', lite);
}
console.log(JSON.stringify(out, null, 2));
