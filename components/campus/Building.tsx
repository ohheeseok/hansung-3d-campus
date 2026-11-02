'use client';
import {useState} from 'react';
import {Html} from '@react-three/drei';
import {buildingDetails} from '@/data/buildingDetails';
import {ArchitectureDetails} from './ArchitectureDetails';
import {OutdoorLocation} from './OutdoorLocation';
import type {Location} from '@/data/campus';
export function Building({item,selected,muted,labels,dusk,onSelect}:{item:Location;selected:boolean;muted:boolean;labels:boolean;dusk:boolean;onSelect:(id:string)=>void}){
 const [hover,setHover]=useState(false); const [w,h,d]=item.size; const accent=selected||hover;
 const facade=accent?'#5189c6':item.color;
 const detail=buildingDetails[item.id];
 const glass=detail.feature==='glass';
 const labelLift=({humanities:12,virtue:14,'main-gate':10} as Record<string,number>)[item.id]??0;
 const secondary=['information','humanities','virtue','engineering-b','haksong','cube'].includes(item.id);
 if(item.kind==='plaza'||item.kind==='court'||item.category==='gate') return <OutdoorLocation item={item} selected={selected} muted={muted} labels={labels} onSelect={onSelect}/>;
 return <group position={item.position} onClick={e=>{e.stopPropagation();onSelect(item.id)}} onPointerOver={e=>{e.stopPropagation();setHover(true);document.body.style.cursor='pointer'}} onPointerOut={()=>{setHover(false);document.body.style.cursor='auto'}}>
 <mesh position={[0,-(item.position[1]+7)/2,0]} receiveShadow><boxGeometry args={[w+2,item.position[1]+7,d+2]}/><meshStandardMaterial color="#bbbfa9"/></mesh>
 <mesh position={[0,h/2,0]} castShadow receiveShadow><boxGeometry args={[w,h,d]}/><meshStandardMaterial color={facade} transparent opacity={muted?.27:1} roughness={.78}/></mesh>
 <mesh position={[0,h+.35,0]} castShadow><boxGeometry args={[w+1,.7,d+1]}/><meshStandardMaterial color={accent?'#b7d5ef':detail.roof}/></mesh>
 {item.kind==='stepped'&&<mesh position={[-w*.15,h+1.5,0]} castShadow><boxGeometry args={[w*.58,2.5,d*.7]}/><meshStandardMaterial color={detail.roof}/></mesh>}
 {item.kind==='tower'&&<mesh position={[w*.32,h*.6,0]} castShadow><boxGeometry args={[w*.22,h*.8,d+1]}/><meshStandardMaterial color={detail.trim}/></mesh>}
 {item.kind==='gym'&&<mesh position={[0,h+1,0]} rotation={[0,0,.08]} castShadow><boxGeometry args={[w+2,2,d+2]}/><meshStandardMaterial color={detail.roof}/></mesh>}
 {!glass&&Array.from({length:Math.max(1,Math.floor(h/3))},(_,floor)=><group key={floor}>
 <mesh position={[0,2+floor*2.8,d/2+.04]}><boxGeometry args={[w*.88,1.25,.12]}/><meshStandardMaterial color={dusk?'#eccc89':detail.windows} emissive={dusk?'#d59f45':'#000000'} emissiveIntensity={dusk?.45:0} transparent opacity={muted?.25:.85}/></mesh>
 <mesh position={[w/2+.04,2+floor*2.8,0]}><boxGeometry args={[.12,1.25,d*.8]}/><meshStandardMaterial color={dusk?'#eccc89':detail.windows}/></mesh>
 </group>)}
 {!glass&&Array.from({length:Math.floor(w/3.5)},(_,i)=><mesh key={i} position={[-w/2+2+i*3.5,h/2,d/2+.14]}><boxGeometry args={[detail.feature==='brick'||item.id==='village'?1.65:.35,h,.15]}/><meshStandardMaterial color={accent?'#a8cdec':detail.feature==='brick'||item.id==='village'?facade:detail.trim}/></mesh>)}
 {item.kind==='gate'&&<mesh position={[0,1.5,.2]}><boxGeometry args={[w-2,3,d+.5]}/><meshStandardMaterial color="#526963"/></mesh>}
 <ArchitectureDetails item={item} active={accent} dusk={dusk} muted={muted}/>
 {selected&&<mesh rotation={[-Math.PI/2,0,0]} position={[0,.15,0]}><ringGeometry args={[Math.max(w,d)*.62,Math.max(w,d)*.62+.8,64]}/><meshBasicMaterial color="#048ddb" transparent opacity={.8}/></mesh>}
 {(labels||selected)&&!muted&&<Html position={[item.id==='main-gate'?-5:0,h+3+labelLift,0]} center distanceFactor={undefined} zIndexRange={[30,0]}><button className={`map-label ${selected?'selected':''} ${secondary?'secondary-label':''} `} onClick={e=>{e.stopPropagation();onSelect(item.id)}}><span>{item.number}</span>{item.nameKo}{selected&&<small>{item.nameEn}</small>}</button></Html>}
 </group>
}
