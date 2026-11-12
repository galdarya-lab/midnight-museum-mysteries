const {chromium}=require('playwright');
const {spawn}=require('node:child_process');
const fs=require('node:fs'),assert=require('node:assert/strict');
(async()=>{
 const server=spawn(process.execPath,['server.cjs'],{env:{...process.env,PORT:'8095'},stdio:'pipe'});
 const browser=await chromium.launch({channel:'chrome'});
 const dir='test-results/difference-view';fs.mkdirSync(dir,{recursive:true});
 try{
  const page=await browser.newPage();
  for(const size of [{width:1366,height:768},{width:1920,height:1080}]){
   await page.setViewportSize(size);await page.goto('http://127.0.0.1:8095');await page.waitForSelector('#app main');
   for(const index of [0,5]){
    await page.evaluate(index=>{Object.assign(window.MuseumDebug.state,{started:true,screen:'task',station:2,task:2,index,correct:{}});window.MuseumDebug.render();},index);
    await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode())));
    await page.waitForFunction(()=>document.querySelector('.picture').getBoundingClientRect().height>innerHeight*.48);
    const id=await page.evaluate(()=>window.MuseumDebug.question.correctId);
    const hotspot=page.locator('.picture').first().locator('[data-answer]').filter({hasText:''});
    const at=await hotspot.evaluateAll((els,id)=>els.findIndex(e=>JSON.parse(e.dataset.answer)===id),id);
    await hotspot.nth(at).click();
    assert.equal(await page.locator('.difference-check').count(),2);
    assert.deepEqual(await page.locator('.difference-check').allTextContents(),['\u2713','\u2713']);
    assert.equal(await page.locator('.hotspot.marked').evaluateAll(els=>els.filter(e=>getComputedStyle(e).borderTopWidth!=='0px').length),0);
    assert.equal(await page.evaluate(()=>window.MuseumDebug.points()),10);
    await page.locator('.hotspot.marked').first().click();assert.equal(await page.evaluate(()=>window.MuseumDebug.points()),10);
    const geometry=await page.locator('.picture').first().evaluate(e=>{const p=e.getBoundingClientRect(),im=e.querySelector('img').getBoundingClientRect();return {width:p.width,height:p.height,imageWidth:im.width,imageHeight:im.height,viewport:innerHeight};});
    assert.ok(Math.abs(geometry.width-geometry.imageWidth)<1&&Math.abs(geometry.height-geometry.imageHeight)<1,'Hotspots cover the actual image');
    assert.ok(await page.locator('.footer').evaluate(e=>e.getBoundingClientRect().bottom<=innerHeight+1));
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    await page.screenshot({path:`${dir}/gallery-${index===0?1:2}-${size.width}.png`});
   }
  }
  console.log('PASS: large full images, checkmarks without boxes, correct hotspot geometry and no duplicate XP at both viewport sizes.');
 }finally{await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1;});
