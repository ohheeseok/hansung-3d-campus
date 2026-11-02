import fs from 'node:fs';
import sharp from 'sharp';
const images=JSON.parse(fs.readFileSync('artifacts/namu-campus/images.json','utf8'));
const assignments={
  'main-gate':'한성대 정문',woochon:'우촌관','inner-gate':'우촌관야경',veritas:'temp 16158550130...',
  haksong:'학송',exploration:'tamgu',research:'한성대학교연구관',virtue:'jiseongwan',
  'engineering-a':'gonghak','engineering-b':'gonghak',humanities:'한성인성관',creativity:'changui',
  naksan:'낙산관','future-hall':'한성대학교 미래관',imagination:'sangsang',cube:'sangcube',
  village:'sangville','south-gate':'한성대학교남문',rotc:'한성학군단',annex:'한성대학교제1별관',
  'future-plaza':'미래관 야경','imagination-ground':'한성대상상관','futsal-court':'jinrigwan',
};
fs.mkdirSync('public/images/campus-stories',{recursive:true});
const manifest={};
for(const [id,alt] of Object.entries(assignments)) {
  if(!images[alt]) throw Error(`Missing photo for ${id}: ${alt}`);
  await sharp(images[alt].path).resize({width:800,height:600,fit:'inside',withoutEnlargement:true}).webp({quality:82}).toFile(`public/images/campus-stories/${id}.webp`);
  manifest[id]={src:`/images/campus-stories/${id}.webp`,alt};
}
fs.writeFileSync('data/namuPhotos.json',JSON.stringify(manifest,null,2));
console.log(`Prepared ${Object.keys(manifest).length} photos from the user-saved page.`);
