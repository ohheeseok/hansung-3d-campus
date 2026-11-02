import {chromium} from '@playwright/test';
const browser=await chromium.launch({executablePath:'/Users/heeseokoh/.cache/puppeteer/chrome/mac_arm-131.0.6778.204/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
page.on('pageerror',e=>console.log('PAGEERROR',e.message));
if(process.argv[2]==='video'){
 await page.goto('file:///Users/heeseokoh/Projects/hansung_3d_campus/user_preparation/reference.mp4');
 await page.waitForTimeout(2000);
 console.log(await page.locator('video').evaluate(v=>({duration:v.duration,width:v.videoWidth,error:v.error?.message})));
 for(const t of [1,4,10]){await page.locator('video').evaluate((v,t)=>{v.pause();v.currentTime=t},t);await page.waitForTimeout(800);await page.screenshot({path:`artifacts/reference-${t}.png`})}
}else{await page.goto('http://localhost:3100');await page.waitForTimeout(10000);await page.screenshot({path:'artifacts/desktop.png'});console.log(await page.title());console.log('Labels',await page.locator('.map-label').count());}
await browser.close();
