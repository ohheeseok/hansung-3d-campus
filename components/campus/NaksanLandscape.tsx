'use client';

import {useLayoutEffect,useMemo,useRef} from 'react';
import {Html} from '@react-three/drei';
import * as THREE from 'three';
import {terraces} from '@/data/campus';

// Diagram orientation, not geographic bearings: inner gate = 6 o'clock (+z),
// ROTC = 3 o'clock (+x), behind Engineering = 12 o'clock (-z).
const ridge = new THREE.CatmullRomCurve3([
  new THREE.Vector3(84,1,58), new THREE.Vector3(88,2,26),
  new THREE.Vector3(89,4,-10), new THREE.Vector3(86,7,-48),
  new THREE.Vector3(64,12,-78), new THREE.Vector3(28,20,-89),
  new THREE.Vector3(0,21,-91), new THREE.Vector3(-28,20,-89),
  new THREE.Vector3(-53,17,-86),
],false,'catmullrom',.35);

type Box = {position:THREE.Vector3;scale:THREE.Vector3;rotation?:THREE.Quaternion;color:string};
function outward(p:THREE.Vector3) {return new THREE.Vector3(p.x,0,p.z+10).normalize();}
function innerEdge(_t:number) {return -8;}
const outerEdge=5.5;
function surface(t:number,offset:number) {
  const p=ridge.getPointAt(t),inner=innerEdge(t),r=(offset-inner)/(outerEdge-inner);
  const crest=(2.5-inner)/(outerEdge-inner);
  const profile=r<=crest?r/(2*crest):.5+(r-crest)/(2*(1-crest));
  const innerPoint=p.clone().addScaledVector(outward(p),inner);
  const platform=[...terraces].reverse().find(s=>Math.abs(innerPoint.x-s.x)<=s.w/2&&Math.abs(innerPoint.z-s.z)<=s.d/2);
  const innerHeight=Math.min(p.y-.5,platform?.y??p.y-1.5);
  const foot=THREE.MathUtils.lerp(innerHeight,innerHeight-1,r);
  const centerFoot=THREE.MathUtils.lerp(innerHeight,innerHeight-1,crest);
  p.addScaledVector(outward(p),offset);
  const crestHeight=ridge.getPointAt(t).y;
  p.y=foot+(crestHeight-centerFoot)*Math.pow(Math.max(0,Math.sin(Math.PI*profile)),1.2);
  return p;
}
function connection(a:THREE.Vector3,b:THREE.Vector3,width:number,height:number,color:string):Box {
  const direction=b.clone().sub(a);
  return {position:a.clone().add(b).multiplyScalar(.5),scale:new THREE.Vector3(width,height,direction.length()+.08),rotation:new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,0,1),direction.normalize()),color};
}

function Boxes({items,emissive=false,warmth=0}:{items:Box[];emissive?:boolean;warmth?:number}) {
  const ref=useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(()=>{
    const matrix=new THREE.Matrix4(),q=new THREE.Quaternion();
    items.forEach((b,i)=>{
      matrix.compose(b.position,b.rotation??q,b.scale);
      ref.current!.setMatrixAt(i,matrix);
      ref.current!.setColorAt(i,new THREE.Color(b.color));
    });
    ref.current!.instanceMatrix.needsUpdate=true;
    if(ref.current!.instanceColor)ref.current!.instanceColor.needsUpdate=true;
    ref.current!.computeBoundingSphere();
  },[items]);
  return <instancedMesh ref={ref} args={[undefined,undefined,items.length]} castShadow={!emissive} receiveShadow>
    <boxGeometry args={[1,1,1]}/>
    <meshStandardMaterial roughness={.94} emissive={emissive?'#ffc56d':warmth?'#edab60':'#000000'} emissiveIntensity={emissive?3.8:warmth} toneMapped={!emissive}/>
  </instancedMesh>;
}

export default function NaksanLandscape({dusk,trees,paths,labels}:{dusk:boolean;trees:boolean;paths:boolean;labels:boolean}) {
  const terrain=useMemo(()=>{
    const positions:number[]=[],colors:number[]=[],indices:number[]=[];
    const cols=96,rows=10;
    for(let i=0;i<=cols;i++)for(let j=0;j<=rows;j++){
      const t=i/cols,offset=j<=5?THREE.MathUtils.lerp(innerEdge(t),2.5,j/5):THREE.MathUtils.lerp(2.5,outerEdge,(j-5)/5),p=surface(t,offset);
      // Gentle facets on the flanks, leaving the ridge and foot unbroken.
      const variation=(j===0||j===rows||j===5)?0:Math.sin(i*1.7+j*2.1)*.15;
      positions.push(p.x,p.y+variation,p.z);
      const color=new THREE.Color(['#9cad80','#93a575','#8c9e70','#a5b68a'][(i+j*3)%4]);
      colors.push(color.r,color.g,color.b);
      if(i<cols&&j<rows){const a=i*(rows+1)+j,b=a+rows+1;indices.push(a,b,a+1,b,b+1,a+1);}
    }
    // Close both tips and outside edge down to the diorama floor.
    const edges=[Array.from({length:rows+1},(_,j)=>j),Array.from({length:rows+1},(_,j)=>cols*(rows+1)+j),Array.from({length:cols+1},(_,i)=>i*(rows+1)+rows)];
    for(const edge of edges)for(let k=0;k<edge.length-1;k++){
      const a=edge[k],b=edge[k+1],n=positions.length/3;
      positions.push(positions[a*3],-7,positions[a*3+2],positions[b*3],-7,positions[b*3+2]);
      colors.push(.55,.61,.44,.55,.61,.44);indices.push(a,b,n,b,n+1,n);
    }
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));g.setIndex(indices);g.computeVertexNormals();return g;
  },[]);
  useLayoutEffect(()=>()=>terrain.dispose(),[terrain]);
  const elements=useMemo(()=>{
    const body:Box[]=[],stones:Box[]=[],caps:Box[]=[],merlons:Box[]=[],walk:Box[]=[],lamps:Box[]=[],bulbs:Box[]=[],washes:Box[]=[],pools:Box[]=[];
    const stoneColors=dusk?['#c8af8b','#dbc39e','#d0b28a','#b9a68c']:['#c1bfae','#d4d0be','#cac6b6','#b3b5a9'];
    for(let i=0;i<112;i++){
      const t=(i+.5)/112,a=surface(i/112,2.5),b=surface((i+1)/112,2.5);
      const segment=connection(a,b,1.8,5.4,'#7f847a');segment.position.y+=2.7;body.push(segment);
      const cap={...segment,position:segment.position.clone(),scale:segment.scale.clone(),color:dusk?'#d5bd96':'#ddd9c8'};cap.position.y+=2.83;cap.scale.set(2.1,.3,segment.scale.z);caps.push(cap);
      const q=segment.rotation!,center=a.clone().add(b).multiplyScalar(.5);
      const cross=new THREE.Vector3(1,0,0).applyQuaternion(q).normalize();
      for(let row=0;row<5;row++)for(const side of [-1,1])for(let block=0;block<2;block++){
        const p=center.clone().addScaledVector(cross,side*.94).add(new THREE.Vector3(0,.6+row*1.02,0));
        p.addScaledVector(b.clone().sub(a).normalize(),(block-.5)*segment.scale.z*.48+(row%2?.13:-.13));
        stones.push({position:p,scale:new THREE.Vector3(.12,.94,segment.scale.z*.47),rotation:q,color:stoneColors[(i+row+block)%4]});
      }
      if(i%2===0){const p=center.clone();p.y+=6.12;merlons.push({position:p,scale:new THREE.Vector3(2,1.05,1.4),rotation:q,color:stoneColors[i%4]});}
      const pa=surface(i/112,-3.5),pb=surface((i+1)/112,-3.5);pa.y+=.17;pb.y+=.17;
      walk.push(connection(pa,pb,1.2,.09,dusk?'#9d927c':'#d5c7af'));
      if(i%4===0){
        const lp=surface(t,-5.2);lp.y+=.7;
        lamps.push({position:lp,scale:new THREE.Vector3(.12,1.4,.12),color:'#536057'});
        const light=lp.clone();light.y+=.8;
        bulbs.push({position:light,scale:new THREE.Vector3(.32,.45,.32),color:dusk?'#ffe6ad':'#e9ddbf'});
        if(dusk){
          const inward=new THREE.Vector3().crossVectors(new THREE.Vector3(0,1,0),b.clone().sub(a)).normalize();
          if(inward.dot(outward(center))>0)inward.negate();
          for(const side of [-1,1]) {
            const normal=inward.clone().multiplyScalar(side);
            const wp=center.clone().addScaledVector(normal,1.05);wp.y+=2.7;
            washes.push({position:wp,scale:new THREE.Vector3(6.8,5.4,1),rotation:new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,0,1),normal),color:'#ffb758'});
          }
          const pool=surface(t,-3.5);pool.y+=.08;
          pools.push({position:pool,scale:new THREE.Vector3(4,5.5,1),rotation:new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),-Math.PI/2),color:'#ffc578'});
        }
      }
    }
    return {body,stones,caps,merlons,walk,lamps,bulbs,washes,pools};
  },[dusk]);
  const vegetation=useMemo(()=>Array.from({length:36},(_,i)=>{
    const t=.015+i/37,offset=i%2?-4:-6;
    const p=surface(t,offset);p.y+=1;return {position:p,scale:new THREE.Vector3(.85+(i%3)*.2,1.25+(i%4)*.15,.85+(i%3)*.2),color:['#668769','#789264','#577f65'][i%3]};
  }),[]);
  return <group name="naksan-landscape">
    <mesh geometry={terrain} receiveShadow><meshStandardMaterial vertexColors flatShading side={THREE.DoubleSide} roughness={1}/></mesh>
    <Boxes items={elements.body} warmth={dusk?.1:0}/><Boxes items={elements.stones} warmth={dusk?.24:0}/><Boxes items={elements.caps} warmth={dusk?.16:0}/><Boxes items={elements.merlons} warmth={dusk?.16:0}/>
    {paths&&<Boxes items={elements.walk}/>}
    <Boxes items={elements.lamps}/><Boxes items={elements.bulbs} emissive={dusk}/>
    {dusk&&<><WallWashes items={elements.washes}/><WallWashes items={elements.pools} ground/>{[.08,.3,.52,.74,.94].map(t=><pointLight key={t} position={surface(t,-1).add(new THREE.Vector3(0,1.8,0))} color="#ffc47a" intensity={35} distance={18} decay={2}/>)}</>}
    {trees&&<RidgeTrees items={vegetation}/>}
    {labels&&<Html position={surface(.58,2.5).add(new THREE.Vector3(0,9,0))} center zIndexRange={[25,0]}><span className="landmark-label">낙산성곽<small>NAKSAN FORTRESS WALL</small></span></Html>}
  </group>;
}

function WallWashes({items,ground=false}:{items:Box[];ground?:boolean}) {
  const ref=useRef<THREE.InstancedMesh>(null);
  const texture=useMemo(()=>{
    const pixels=new Uint8Array(64*64*4);
    for(let y=0;y<64;y++)for(let x=0;x<64;x++){
      const u=(x/63-.5)*2,v=y/63;
      const edge=Math.sin(Math.PI*x/63);
      const alpha=ground?Math.exp(-4*(u*u+(v*2-1)**2)):Math.exp(-u*u*3)*Math.pow(1-v,.8)*edge;
      const i=(y*64+x)*4;pixels[i]=255;pixels[i+1]=185;pixels[i+2]=91;pixels[i+3]=Math.round(alpha*220);
    }
    const t=new THREE.DataTexture(pixels,64,64,THREE.RGBAFormat);t.needsUpdate=true;return t;
  },[ground]);
  useLayoutEffect(()=>{
    const matrix=new THREE.Matrix4();
    items.forEach((p,i)=>{matrix.compose(p.position,p.rotation!,p.scale);ref.current!.setMatrixAt(i,matrix);});
    ref.current!.instanceMatrix.needsUpdate=true;ref.current!.computeBoundingSphere();
    return ()=>texture.dispose();
  },[items,texture]);
  return <instancedMesh ref={ref} args={[undefined,undefined,items.length]} renderOrder={2}>
    <planeGeometry args={[1,1]}/><meshBasicMaterial map={texture} transparent opacity={ground?.5:.95} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} toneMapped={false}/>
  </instancedMesh>;
}

function RidgeTrees({items}:{items:Box[]}) {
  const ref=useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(()=>{const matrix=new THREE.Matrix4();items.forEach((b,i)=>{matrix.compose(b.position,new THREE.Quaternion(),b.scale);ref.current!.setMatrixAt(i,matrix);ref.current!.setColorAt(i,new THREE.Color(b.color));});ref.current!.instanceMatrix.needsUpdate=true;ref.current!.computeBoundingSphere();},[items]);
  return <instancedMesh ref={ref} args={[undefined,undefined,items.length]} castShadow><icosahedronGeometry args={[1,0]}/><meshStandardMaterial roughness={1}/></instancedMesh>;
}
