import {buildingDetails} from './buildingDetails';
import {campusStories} from './campusStories';
export type Category = 'academic' | 'research' | 'student-life' | 'residence' | 'sports' | 'gate' | 'information';
export type Vec3 = [number, number, number];
export interface Location { id:string; number:string; nameKo:string; nameEn:string; category:Category; position:Vec3; size:Vec3; color:string; kind?:'tower'|'stepped'|'gym'|'cube'|'gate'|'plaza'|'court'; description:string; nearby:string[]; }
export const categories:Record<Category,string> = {academic:'교육시설',research:'연구시설','student-life':'학생생활',residence:'주거시설',sports:'체육시설',gate:'출입구',information:'안내'};
// Image-space interpretation: +x is reference-right, +z is reference-front. Units are illustrative.
const rows: [string,string,string,string,Category,Vec3,Vec3,string,Location['kind']][] = [
['woochon','02','우촌관','Woochon Hall','academic',[-9,3,43],[43,11,12],'#a28172','stepped'],
['veritas','04','진리관','Veritas Hall','academic',[32,3,30],[37,9,11],'#deded5','stepped'],
['haksong','05','학송관','Haksong Hall','academic',[47,1,48],[11,8,20],'#e0e3df',undefined],
['exploration','06','탐구관','Exploration Hall','academic',[65,0,47],[16,13,17],'#dbddd6',undefined],
['cube','27','상상큐브','Imagination Cube','student-life',[66,0,62],[13,5,7],'#53769b','cube'],
['imagination','20','상상관','Imagination Hall','student-life',[2,6,15],[13,26,18],'#d2d7d9','tower'],
['future-hall','15','미래관','Future Hall','academic',[-25,5,16],[29,16,20],'#d3d4cf','stepped'],
['research','08','연구관','Research Hall','research',[24,10,-17],[34,22,18],'#d9dbd5',undefined],
['virtue','09','지선관','Virtue Hall','academic',[22,12,-35],[26,10,12],'#cacdc7',undefined],
['engineering-a','10','공학관 A','Engineering Building A','academic',[6,17,-57],[34,17,15],'#c4c4bd',undefined],
['engineering-b','11','공학관 B','Engineering Building B','academic',[17,20,-77],[14,11,13],'#c4c4bd',undefined],
['village','23','상상빌리지','Imagination Village','residence',[-7,20,-76],[13,20,14],'#c5b9a6','tower'],
['creativity','13','창의관','Creativity Hall','academic',[-37,10,-15],[25,17,15],'#ccd2ce',undefined],
['humanities','12','인성관','Humanities Hall','student-life',[-37,11,-29],[20,9,11],'#d4d8d1',undefined],
['naksan','14','낙산관','Naksan Hall · Gym','sports',[-61,9,-15],[20,14,26],'#c7d6da','gym'],
['main-gate','01','정문','Main Gate','gate',[-47,3,30],[7,4,3],'#7e9c91','gate'],
['inner-gate','03','중문','Inner Gate','gate',[-8,0,58],[9,4,3],'#7e9c91','gate'],
['south-gate','24','남문','South Gate','gate',[-39,20,-78],[7,4,3],'#7e9c91','gate'],
['information','i','안내실','Information','information',[-49,3,36],[5,4,4],'#d6c9ae',undefined],
['rotc','07','학군단','ROTC','academic',[68,3,23],[10,7,10],'#dbd5c6',undefined],
['annex','19','제1별관','Annex Building 1','student-life',[17,0,64],[8,8,8],'#cab59f',undefined],
['future-plaza','16','미래마당','Future Ground','student-life',[-26,5,32],[28,.3,9],'#bd8b77','plaza'],
['imagination-ground','21','상상마당','Imagination Ground','student-life',[28,5,12],[34,.3,23],'#8eac7f','plaza'],
['futsal-court','22','풋살·테니스장','Futsal / Tennis Court','sports',[55,5,11],[15,.3,24],'#859d88','court'],
];
export const locations:Location[] = rows.map(([id,number,nameKo,nameEn,category,position,size,color,kind])=>({id,number,nameKo,nameEn,category,position,size,color,kind,description:campusStories[id]?.description??buildingDetails[id].description, nearby: rows.filter(r=>r[0]!==id).sort((a,b)=>Math.hypot(a[5][0]-position[0],a[5][2]-position[2])-Math.hypot(b[5][0]-position[0],b[5][2]-position[2])).slice(0,3).map(r=>r[0])}));
export const tour = ['main-gate','future-hall','imagination','woochon','veritas','research','engineering-a','village','south-gate'];
export const terraces = [ {x:0,z:1,w:164,d:153,y:-3}, {x:-7,z:-7,w:140,d:122,y:1}, {x:-10,z:-18,w:132,d:97,y:3}, {x:-13,z:-32,w:118,d:70,y:5}, {x:-9,z:-43,w:95,d:57,y:10}, {x:-8,z:-65,w:76,d:35,y:17}, {x:-10,z:-78,w:69,d:17,y:20} ];
