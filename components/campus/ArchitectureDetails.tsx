import type {Location} from '@/data/campus';
import {buildingDetails} from '@/data/buildingDetails';
/** Small facade cues from the official photos; footprints and massing stay unchanged. */
export function ArchitectureDetails({item,active,dusk,muted}:{item:Location;active:boolean;dusk:boolean;muted:boolean}){
 const [w,h,d]=item.size;const detail=buildingDetails[item.id];const trim=active?'#a8cdec':detail.trim;
 const box=(key:string,position:[number,number,number],size:[number,number,number],color:string)=> <mesh key={key} position={position} castShadow><boxGeometry args={size}/><meshStandardMaterial color={color} transparent opacity={muted?.27:1} roughness={.7}/></mesh>;
 return <group>
 {detail.feature==='gable'&&[-1,1].map(k=><mesh key={k} position={[k*w*.25,h+1.1,0]} rotation={[0,0,-k*.3]} castShadow><boxGeometry args={[w*.56,.45,d+1]}/><meshStandardMaterial color={detail.roof}/></mesh>)}
 {item.id==='woochon'&&<group>
   {box('louver-wall',[0,h*.52,d/2+.65],[w,h*.93,.35],active?'#4f78a6':'#525d65')}
   {Array.from({length:Math.floor(w/1.15)},(_,i)=>box(`louver-${i}`,[-w/2+.5+i*1.15,h*.52,d/2+1],[.12,h*.93,.6],active?'#a8cdec':'#8b9598'))}
 </group>}
 {item.id==='engineering-a'&&box('connecting-wing',[12,h*.5,-12],[8,h,12],active?'#5189c6':item.color)}
 {item.id==='cube'&&box('second-module',[-w*.25,h*.34,-d*.8],[w*.65,h*.68,d*.6],active?'#5189c6':item.color)}
 {detail.feature==='glass'&&<group>
 {box('glass',[0,h*.53,d/2+.18],[w*.9,h*.84,.22],dusk?'#b5b5a0':detail.windows)}
 {Array.from({length:Math.floor(w/2.4)},(_,i)=>box(`vertical-${i}`,[-w*.45+i*2.4,h*.53,d/2+.34],[.18,h*.84,.18],trim))}
 {Array.from({length:Math.floor(h/2.8)},(_,i)=>box(`horizontal-${i}`,[0,1.7+i*2.8,d/2+.35],[w*.9,.16,.2],trim))}
 {box('entry',[0,1.6,d/2+.6],[w*.22,3.2,1.1],'#64808c')}
 {box('canopy',[0,3.4,d/2+1.7],[w*.38,.35,3],trim)}
 </group>}
 {item.id==='woochon'&&<group>{[-.34,-.12,.12,.34].map((x,i)=>box(`pier-${i}`,[w*x,h/2,d/2+.35],[.7,h,.6],trim))}{box('entry',[0,1.4,d/2+.2],[w*.17,2.8,.5],'#5d6467')}{box('entry-roof',[0,3,d/2+1.1],[w*.2,.45,2.6],trim)}</group>}
 {item.id==='exploration'&&box('stair-glass',[0,h*.52,d/2+.25],[w*.14,h*.83,.3],detail.windows)}
 {item.id==='imagination'&&<group>{box('podium',[0,h*.15,d/2+1.1],[w+1,h*.3,3.2],active?'#3d648d':'#626b75')}{box('display',[0,h*.17,d/2+2.74],[w*.68,h*.15,.15],'#e8eceb')}</group>}
 {item.id==='village'&&<group>{['#87984d','#926659','#687295'].map((color,i)=>{const x=(-.29+i*.29)*w,y=h*(.35+i*.2);return <group key={color} position={[x,y,d/2+.23]}>{box('top',[0,1.1,0],[2.5,.25,.22],color)}{box('bottom',[0,-1.1,0],[2.5,.25,.22],color)}{box('left',[-1.15,0,0],[.25,2.2,.22],color)}{box('right',[1.15,0,0],[.25,2.2,.22],color)}</group>})}</group>}
 {item.id==='cube'&&<group>{box('division',[0,h*.5,d/2+.18],[w,.22,.2],trim)}{[-.33,0,.33].map((x,i)=>box(`module-${i}`,[x*w,h*.5,d/2+.2],[.2,h,.2],trim))}{Array.from({length:Math.floor(w/.5)},(_,i)=>box(`rib-${i}`,[-w/2+.25+i*.5,h*.5,d/2+.1],[.07,h,.1],active?'#729ed0':'#42678f'))}{box('panel',[w*.15,h*.73,d/2+.31],[w*.18,h*.45,.18],'#e8e3cf')}</group>}
 </group>;
}
