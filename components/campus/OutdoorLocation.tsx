'use client';
import {useState} from 'react';
import {Html} from '@react-three/drei';
import type {Location} from '@/data/campus';

export function OutdoorLocation({item,selected,muted,labels,onSelect}:{item:Location;selected:boolean;muted:boolean;labels:boolean;onSelect:(id:string)=>void}) {
  const [hover,setHover]=useState(false);
  const [w,,d]=item.size;
  const gate=item.category==='gate', court=item.kind==='court';
  const lawn=item.id==='imagination-ground';
  const color=selected||hover?'#7fb2d4':lawn?'#9ebc84':gate?'#d4d6c9':item.color;
  return <group position={item.position} onClick={e=>{e.stopPropagation();onSelect(item.id)}} onPointerOver={e=>{e.stopPropagation();setHover(true);document.body.style.cursor='pointer'}} onPointerOut={()=>{setHover(false);document.body.style.cursor='auto'}}>
    <mesh position={[0,-(item.position[1]+7)/2,0]} receiveShadow><boxGeometry args={[w,item.position[1]+7,d]}/><meshStandardMaterial color="#bfc4ac"/></mesh>
    <mesh receiveShadow><boxGeometry args={[w,.35,d]}/><meshStandardMaterial color={color} transparent opacity={muted?.25:1}/></mesh>
    {lawn&&<group>
      {[-1,1].map(k=><mesh key={k} position={[0,.21,k*(d/2-1)]}><boxGeometry args={[w-1,.08,1.2]}/><meshStandardMaterial color="#d7c6ab"/></mesh>)}
      {[-10,0,10].map(x=><group key={x} position={[x,.3,d/2-3.5]}>
        <mesh position={[0,.7,0]}><cylinderGeometry args={[1,1,.25,12]}/><meshStandardMaterial color="#c5ac86"/></mesh>
        <mesh position={[0,1.7,0]}><cylinderGeometry args={[.08,.08,3,6]}/><meshStandardMaterial color="#8c9083"/></mesh>
        <mesh position={[0,3.1,0]}><coneGeometry args={[2,.55,8]}/><meshStandardMaterial color="#eee6cf"/></mesh>
      </group>)}
    </group>}
    {court&&<group>
      {[-1,1].map(k=><group key={k}>
        <mesh position={[k*(w/2-1.5),.23,0]}><boxGeometry args={[.14,.05,d-3]}/><meshBasicMaterial color="#fff6df"/></mesh>
        <mesh position={[0,.23,k*(d/2-1.5)]}><boxGeometry args={[w-3,.05,.14]}/><meshBasicMaterial color="#fff6df"/></mesh>
        <mesh position={[0,.23,k*4.7]}><boxGeometry args={[w-3,.05,.1]}/><meshBasicMaterial color="#fff6df"/></mesh>
        <mesh position={[k*(w/2+.2),1.5,0]}><boxGeometry args={[.12,3,d]}/><meshStandardMaterial color="#53887f" wireframe/></mesh>
      </group>)}
      <mesh position={[0,.23,0]}><boxGeometry args={[.12,.05,9.4]}/><meshBasicMaterial color="#fff6df"/></mesh>
    </group>}
    {gate&&[-1,1].map(k=><mesh key={k} position={[k*w/2,1.2,0]}><cylinderGeometry args={[.3,.3,2.4,8]}/><meshStandardMaterial color="#718aa5"/></mesh>)}
    {(labels||selected)&&!muted&&<Html position={[item.id==='main-gate'?-6:item.id==='future-plaza'?-8:0,item.id==='main-gate'?18:item.id==='future-plaza'?8:gate?7:4,0]} center zIndexRange={[30,0]}><button className={`map-label ${selected?'selected':''} ${gate?'gate-label':''}`} onClick={()=>onSelect(item.id)}><span>{item.number}</span>{item.nameKo}{selected&&<small>{item.nameEn}</small>}</button></Html>}
  </group>;
}
