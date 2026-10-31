#!/usr/bin/env node
/** Kwai pier densify props — Dock+/D1–D3 stub; vertex-color; no photo/logos */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '../assets/gltf/hk-port');

class MeshBuilder {
  constructor(){this.pos=[];this.nrm=[];this.col=[];this.idx=[];}
  get triCount(){return this.idx.length/3;}
  get vertCount(){return this.pos.length/3;}
  box(a,b,c,d,e,f,rgb){
    const v=[[a,b,c],[d,b,c],[d,e,c],[a,e,c],[a,b,f],[d,b,f],[d,e,f],[a,e,f]];
    const faces=[{i:[0,1,2,3],n:[0,0,-1]},{i:[5,4,7,6],n:[0,0,1]},{i:[4,0,3,7],n:[-1,0,0]},{i:[1,5,6,2],n:[1,0,0]},{i:[3,2,6,7],n:[0,1,0]},{i:[4,5,1,0],n:[0,-1,0]}];
    for(const face of faces){const base=this.vertCount;for(const ii of face.i){const p=v[ii];this.pos.push(p[0],p[1],p[2]);this.nrm.push(face.n[0],face.n[1],face.n[2]);this.col.push(rgb[0],rgb[1],rgb[2]);}this.idx.push(base,base+1,base+2,base,base+2,base+3);}
  }
  /** low-poly cylinder along Y */
  cyl(cx,y0,cz,r,h,seg,rgb){
    const n=Math.max(6,seg|0); const y1=y0+h;
    for(let i=0;i<n;i++){
      const a0=i/n*Math.PI*2, a1=(i+1)/n*Math.PI*2;
      const x0=cx+Math.cos(a0)*r,z0=cz+Math.sin(a0)*r, x1=cx+Math.cos(a1)*r,z1=cz+Math.sin(a1)*r;
      // side as thin boxes approx via two tris as box corners
      const base=this.vertCount;
      const nx=(Math.cos(a0)+Math.cos(a1))/2, nz=(Math.sin(a0)+Math.sin(a1))/2;
      this.pos.push(x0,y0,z0, x1,y0,z1, x1,y1,z1, x0,y1,z0);
      for(let k=0;k<4;k++){this.nrm.push(nx,0,nz);this.col.push(rgb[0],rgb[1],rgb[2]);}
      this.idx.push(base,base+1,base+2,base,base+2,base+3);
    }
    // top/bottom disk as fan-ish boxes
    for(let i=0;i<n;i++){
      const a0=i/n*Math.PI*2, a1=(i+1)/n*Math.PI*2;
      const x0=cx+Math.cos(a0)*r,z0=cz+Math.sin(a0)*r, x1=cx+Math.cos(a1)*r,z1=cz+Math.sin(a1)*r;
      let b=this.vertCount;
      this.pos.push(cx,y1,cz, x0,y1,z0, x1,y1,z1);
      for(let k=0;k<3;k++){this.nrm.push(0,1,0);this.col.push(rgb[0],rgb[1],rgb[2]);}
      this.idx.push(b,b+1,b+2);
      b=this.vertCount;
      this.pos.push(cx,y0,cz, x1,y0,z1, x0,y0,z0);
      for(let k=0;k<3;k++){this.nrm.push(0,-1,0);this.col.push(rgb[0]*0.8,rgb[1]*0.8,rgb[2]*0.8);}
      this.idx.push(b,b+1,b+2);
    }
  }
}
function align4(n){return (n+3)&~3;}
function writeGlb(meshes,outPath){
  const bufferViews=[],accessors=[],gltfMeshes=[],nodes=[];
  const materials=[{name:'vc',pbrMetallicRoughness:{baseColorFactor:[1,1,1,1],metallicFactor:0.15,roughnessFactor:0.72}}];
  let bin=Buffer.alloc(0);
  const append=(buf)=>{const pad=align4(bin.length)-bin.length;if(pad)bin=Buffer.concat([bin,Buffer.alloc(pad)]);const o=bin.length;bin=Buffer.concat([bin,buf]);return o;};
  for(const {name,builder} of meshes){
    const nV=builder.vertCount,nI=builder.idx.length;
    const posBuf=Buffer.alloc(nV*12),nrmBuf=Buffer.alloc(nV*12),colBuf=Buffer.alloc(nV*16),idxBuf=Buffer.alloc(nI*4);
    let minP=[Infinity,Infinity,Infinity],maxP=[-Infinity,-Infinity,-Infinity];
    for(let i=0;i<nV;i++){const x=builder.pos[i*3],y=builder.pos[i*3+1],z=builder.pos[i*3+2];
      posBuf.writeFloatLE(x,i*12);posBuf.writeFloatLE(y,i*12+4);posBuf.writeFloatLE(z,i*12+8);
      nrmBuf.writeFloatLE(builder.nrm[i*3],i*12);nrmBuf.writeFloatLE(builder.nrm[i*3+1],i*12+4);nrmBuf.writeFloatLE(builder.nrm[i*3+2],i*12+8);
      colBuf.writeFloatLE(builder.col[i*3],i*16);colBuf.writeFloatLE(builder.col[i*3+1],i*16+4);colBuf.writeFloatLE(builder.col[i*3+2],i*16+8);colBuf.writeFloatLE(1,i*16+12);
      minP=[Math.min(minP[0],x),Math.min(minP[1],y),Math.min(minP[2],z)];maxP=[Math.max(maxP[0],x),Math.max(maxP[1],y),Math.max(maxP[2],z)];}
    for(let i=0;i<nI;i++)idxBuf.writeUInt32LE(builder.idx[i],i*4);
    const pb=bufferViews.length;bufferViews.push({buffer:0,byteOffset:append(posBuf),byteLength:posBuf.length,target:34962});const pa=accessors.length;accessors.push({bufferView:pb,componentType:5126,count:nV,type:'VEC3',min:minP,max:maxP});
    const nb=bufferViews.length;bufferViews.push({buffer:0,byteOffset:append(nrmBuf),byteLength:nrmBuf.length,target:34962});const na=accessors.length;accessors.push({bufferView:nb,componentType:5126,count:nV,type:'VEC3'});
    const cb=bufferViews.length;bufferViews.push({buffer:0,byteOffset:append(colBuf),byteLength:colBuf.length,target:34962});const ca=accessors.length;accessors.push({bufferView:cb,componentType:5126,count:nV,type:'VEC4'});
    const ib=bufferViews.length;bufferViews.push({buffer:0,byteOffset:append(idxBuf),byteLength:idxBuf.length,target:34963});const ia=accessors.length;accessors.push({bufferView:ib,componentType:5125,count:nI,type:'SCALAR'});
    const mi=gltfMeshes.length;gltfMeshes.push({name,primitives:[{attributes:{POSITION:pa,NORMAL:na,COLOR_0:ca},indices:ia,material:0,mode:4}]});nodes.push({name,mesh:mi});
  }
  const pad=align4(bin.length)-bin.length;if(pad)bin=Buffer.concat([bin,Buffer.alloc(pad)]);
  const gltf={asset:{version:'2.0',generator:'hk-kwai-densify'},scene:0,scenes:[{nodes:nodes.map((_,i)=>i)}],nodes,meshes:gltfMeshes,materials,accessors,bufferViews,buffers:[{byteLength:bin.length}]};
  let json=Buffer.from(JSON.stringify(gltf));const jp=align4(json.length)-json.length;if(jp)json=Buffer.concat([json,Buffer.alloc(jp,0x20)]);
  const total=12+8+json.length+8+bin.length;const out=Buffer.alloc(total);
  out.writeUInt32LE(0x46546c67,0);out.writeUInt32LE(2,4);out.writeUInt32LE(total,8);
  out.writeUInt32LE(json.length,12);out.writeUInt32LE(0x4e4f534a,16);json.copy(out,20);
  const bc=20+json.length;out.writeUInt32LE(bin.length,bc);out.writeUInt32LE(0x004e4942,bc+4);bin.copy(out,bc+8);
  fs.mkdirSync(path.dirname(outPath),{recursive:true});fs.writeFileSync(outPath,out);
  return {bytes:out.length,tris:meshes.reduce((s,m)=>s+m.builder.triCount,0)};
}

const RUB=[0.12,0.12,0.12], STEEL=[0.35,0.37,0.4], STEEL2=[0.55,0.57,0.6];
const CONC=[0.55,0.54,0.5], YB=[0.9,0.75,0.1], YB2=[0.08,0.08,0.08];
const GRAY=[0.42,0.44,0.46], RED=[0.75,0.12,0.1], BLUE=[0.15,0.35,0.65];
const GREEN=[0.12,0.45,0.28], ORANGE=[0.85,0.45,0.1], WHITE=[0.85,0.86,0.88];

function fender(){ // quay rubber ~1.2m high, +X seaward face
  const m=new MeshBuilder();
  m.cyl(0,0.15,0,0.45,1.1,8,RUB);
  m.box(-0.35,0,-0.25,0.35,0.2,0.55,STEEL); // mount
  return m;
}
function bollard(){
  const m=new MeshBuilder();
  m.cyl(0,0,0,0.22,0.55,8,STEEL);
  m.box(-0.35,0.5,-0.12,0.35,0.72,0.12,STEEL2); // horn
  m.box(-0.4,0,-0.4,0.4,0.08,0.4,CONC);
  return m;
}
function highMast(){ // ~28–32m high mast, sparse yard lighting
  const m=new MeshBuilder();
  const H=30;
  m.cyl(0,0,0,0.35,H,6,STEEL);
  m.box(-0.6,0,-0.6,0.6,0.4,0.6,CONC);
  // head cross
  m.box(-3.5,H-0.4,-0.2,3.5,H,0.2,STEEL2);
  m.box(-0.2,H-0.4,-3.5,0.2,H,3.5,STEEL2);
  for(const x of [-3,3]) for(const z of [-3,3]){
    m.box(x-0.4,H-0.55,z-0.4,x+0.4,H-0.15,z+0.4,WHITE);
  }
  return m;
}
function craneRail(){ // ~12m rail module + sleepers
  const m=new MeshBuilder();
  const L=12;
  for(const z of [-0.75,0.75]){
    m.box(-L/2,0.12,z-0.08,L/2,0.28,z+0.08,STEEL);
  }
  for(let i=0;i<8;i++){
    const x=-L/2+0.8+i*1.4;
    m.box(x-0.15,0,-1.2,x+0.15,0.14,1.2,CONC);
  }
  return m;
}
function weighbridge(){
  const m=new MeshBuilder();
  // platform 18×3.5×0.35
  m.box(-9,0,-1.75,9,0.35,1.75,STEEL);
  m.box(-9,0.35,-1.75,9,0.42,1.75,YB); // edge paint strip
  m.box(-8.5,0.05,-1.5,8.5,0.32,1.5,STEEL2);
  return m;
}
function gateHut(){
  const m=new MeshBuilder();
  m.box(-1.6,0,-1.4,1.6,2.8,1.4,GRAY); // shell thick
  m.box(-1.5,0.9,-1.45,1.5,2.2,-1.25,[0.1,0.15,0.2]); // window glass front
  m.box(-1.7,2.7,-1.5,1.7,3.1,1.5,STEEL); // roof
  m.box(-0.4,0,-1.45,0.4,2.1,-1.35,STEEL2); // door
  return m;
}
function barrierYb(){ // 2m yellow-black segment
  const m=new MeshBuilder();
  for(let i=0;i<4;i++){
    const x=-1+i*0.5;
    m.box(x,0.15,-0.08,x+0.45,0.95,0.08,i%2?YB:YB2);
  }
  m.box(-1.05,0,-0.12,1.05,0.18,0.12,STEEL);
  return m;
}
function lampPost(){ // municipal ~9m
  const m=new MeshBuilder();
  m.cyl(0,0,0,0.12,8.2,6,STEEL);
  m.box(-0.25,0,-0.25,0.25,0.15,0.25,CONC);
  m.box(0,7.8,-0.15,1.4,8.0,0.15,STEEL2); // arm
  m.box(1.1,7.55,-0.25,1.55,7.85,0.25,WHITE);
  return m;
}
function trashBin(){
  const m=new MeshBuilder();
  m.box(-0.28,0,-0.28,0.28,0.95,0.28,GREEN);
  m.box(-0.3,0.9,-0.3,0.3,1.05,0.3,STEEL);
  return m;
}
function manhole(){
  const m=new MeshBuilder();
  m.cyl(0,0.01,0,0.4,0.06,10,STEEL);
  m.box(-0.45,0,-0.45,0.45,0.02,0.45,CONC);
  return m;
}
function signHeight(){ // gantry-ish post + panel 限高 silhouette (no text tex — code can overlay)
  const m=new MeshBuilder();
  m.box(-0.08,0,-0.08,0.08,3.6,0.08,STEEL);
  m.box(-0.55,2.8,-0.05,0.55,3.5,0.08,WHITE);
  m.cyl(0,2.95,0.06,0.38,0.08,10,RED); // red circle ring approx as flat disk+rim
  m.box(-0.35,3.05,0.05,0.35,3.2,0.1,RED); // bar
  return m;
}
function alleyBlocker(){ // short dead-end container wall feel — 2×20ft stacked visual, thick
  const m=new MeshBuilder();
  // two ISO-ish boxes
  m.box(-3.05,0,-1.22,3.05,2.59,1.22,BLUE);
  m.box(-3.05,2.59,-1.22,3.05,5.18,1.22,ORANGE);
  // door end ribs
  m.box(-3.05,0,1.15,-2.7,5.18,1.28,STEEL);
  m.box(2.7,0,1.15,3.05,5.18,1.28,STEEL);
  return m;
}
function palletStack(){
  const m=new MeshBuilder();
  for(let i=0;i<4;i++){
    const y=i*0.28;
    m.box(-0.6,y,-0.5,0.6,y+0.12,0.5,[0.55,0.4,0.22]);
    m.box(-0.55,y+0.12,-0.45,0.55,y+0.26,0.45,GRAY);
  }
  return m;
}
function loadingCanopy(){ // industrial loading bay shelter
  const m=new MeshBuilder();
  m.box(-4,0,-0.15,-3.7,4.2,0.15,STEEL);
  m.box(3.7,0,-0.15,4,4.2,0.15,STEEL);
  m.box(-4.2,4.0,-2.5,4.2,4.35,0.8,STEEL2); // roof slope-ish
  m.box(-4,0,-0.2,4,0.15,0.2,CONC);
  return m;
}
function indMassing(){ // denser industrial block for D1 wall continuity
  const m=new MeshBuilder();
  const W=14,H=22,D=10;
  m.box(-W/2,0,-D/2,W/2,H,D/2,GRAY);
  m.box(-W/2-0.1,H,-D/2-0.1,W/2+0.1,H+1.2,D/2+0.1,STEEL);
  // loading recess with thickness
  m.box(-3,0,D/2-1.2,3,4.5,D/2, [0.3,0.3,0.32]);
  for(let f=0;f<6;f++){
    const y=5+f*2.6;
    for(const x of [-4,0,4]) m.box(x-1.2,y,D/2-0.15,x+1.2,y+1.4,D/2+0.05,[0.12,0.15,0.18]);
  }
  return m;
}
function flyoverRamp(){ // approach ramp bay to undercroft
  const m=new MeshBuilder();
  // rising slab 18m long, 0→5.2 clear
  for(let i=0;i<6;i++){
    const z0=-9+i*3, z1=z0+3;
    const y0=i*0.85, y1=(i+1)*0.85;
    m.box(-5,y0+0.9,z0,5,y0+1.5,z1,CONC);
  }
  m.box(-1.0,0,-8,1.0,5.2,-6,CONC); // pier
  return m;
}
function acSplit(){ // D3 outdoor unit
  const m=new MeshBuilder();
  m.box(-0.4,0,-0.2,0.4,0.7,0.25,WHITE);
  m.box(-0.35,0.15,-0.22,0.35,0.55,-0.18,[0.2,0.2,0.22]);
  return m;
}
function lightbox(){ // sparse industrial lightbox shell (code overlays text)
  const m=new MeshBuilder();
  m.box(-1.2,0,-0.08,1.2,0.55,0.08,YB);
  m.box(-1.15,0.05,-0.1,1.15,0.5,-0.05,WHITE);
  return m;
}

fs.mkdirSync(OUT,{recursive:true});
const files={
  'hk-quay-fender.glb':fender,
  'hk-quay-bollard.glb':bollard,
  'hk-yard-high-mast.glb':highMast,
  'hk-sts-crane-rail-12m.glb':craneRail,
  'hk-gate-weighbridge.glb':weighbridge,
  'hk-gate-hut.glb':gateHut,
  'hk-barrier-yb-2m.glb':barrierYb,
  'hk-street-lamp-9m.glb':lampPost,
  'hk-street-bin.glb':trashBin,
  'hk-street-manhole.glb':manhole,
  'hk-sign-height.glb':signHeight,
  'hk-alley-cont-blocker.glb':alleyBlocker,
  'hk-pallet-stack.glb':palletStack,
  'hk-loading-canopy.glb':loadingCanopy,
  'hk-industrial-massing-14x22.glb':indMassing,
  'hk-flyover-ramp-bay.glb':flyoverRamp,
  'hk-prop-ac-split.glb':acSplit,
  'hk-prop-lightbox.glb':lightbox,
};
const report={};
for(const [name,fn] of Object.entries(files)){
  report[name]=writeGlb([{name:name.replace(/\.glb$/,''),builder:fn()}], path.join(OUT,name));
}

const densify={
  updated:'2026-10-25T10:57+08',
  boss:'碼頭其他設施加密——工廈／STS／高架／隧／櫃巷／街設；禁相板',
  stubs:['kwai-dock-plus-stub','kwai-street-density-d1','d2a','d2b','d3','kwai-infra-gltf-hang'],
  already_have:['hk-sts-quay-crane.glb(~70m)','hk-flyover-undercroft-bay.glb','hk-tunnel-portal.glb','hk-industrial-wall-bay.glb','ISO/yard/quay/ship'],
  new_props:Object.keys(files),
  instance_hints:{
    fender:'沿泊位 ~12–14 m（lite ~18）',
    bollard:'沿泊位 ~12–16 m',
    high_mast:'堆場疏 4–6',
    crane_rail:'吊機腳下 ×4–6 modules',
    weighbridge:'閘口 1',
    gate_hut:'閘／地磅旁 1–2',
    barrier_yb:'閘角／肘／迴旋稀疏',
    lamp:'泊位→肘→輔路 ~28–32 m',
    bin:'~5',
    manhole:'~5',
    sign_height:'閘 4.5／橋底 4.2（文案代碼 overlay）',
    alley_blocker:'櫃巷死巷封口',
    pallet_canopy:'工廈側疏',
    ind_massing:'肘臂兩側連牆加密（跟 D1 ~18 感）',
    flyover_ramp:'接 undercroft',
    ac_lightbox:'D3 疏'
  },
  forbid:['photo boards','HIT/MTL/shipping logos','旺角霓虹密度'],
  hang:'KWAI_GEO hub；唔 origin；未升 ?v= 除非主房'
};
fs.writeFileSync(path.join(OUT,'hk-kwai-densify-props.json'), JSON.stringify(densify,null,2));

let readme=fs.readFileSync(path.join(OUT,'README.md'),'utf8');
if(!readme.includes('densify')){
  readme+='\n\n## Densify props（Dock+／D1–D3）\n見 `hk-kwai-densify-props.json`：護舷／纜樁／高桅／軌／地磅／閘亭／黃黑欄／燈柱／桶／渠蓋／限高／櫃巷封／卡板／貨台棚／工廈塊／高架匝道／冷氣／燈箱。\n禁相板。\n';
  fs.writeFileSync(path.join(OUT,'README.md'),readme);
}
fs.writeFileSync(path.resolve(__dirname,'../docs/hk-kwai-densify-props-2026-10-25.md'),
`# 葵涌碼頭設施加密 glTF（2026-10-25）\n\n老闆：碼頭其他設施加密——工廈／STS／高架／隧／櫃巷／街設；**禁相板**。\n\n跟 stub：Dock+、D1、D2a/b、D3、infra hang。\n\n資產目錄：\`assets/gltf/hk-port/\` · 清單 \`hk-kwai-densify-props.json\`。\n\n已有 STS~70／橋底／隧口／工廈牆／ISO——今批補 **可 instance 街設＋閘區＋櫃巷封＋工廈塊＋匝道**。\n\n代碼：跟 \`KWAI_GEO\` 掛；instance_hints 見 JSON。**未升 ?v=**。\n`);

console.log(JSON.stringify(report,null,2));
