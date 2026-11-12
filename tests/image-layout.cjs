const {chromium}=require('playwright');
const {spawn}=require('node:child_process');
const assert=require('node:assert/strict');
const fs=require('node:fs');

(async()=>{
 const server=spawn(process.execPath,['server.cjs'],{env:{...process.env,PORT:'8091'},stdio:'pipe'});
 const browser=await chromium.launch({channel:'chrome'});
 const folder='test-results/image-repair';fs.mkdirSync(folder,{recursive:true});
 try{
  const page=await browser.newPage();
  for(const size of [{width:1366,height:768},{width:1920,height:1080}]){
   await page.setViewportSize(size);await page.goto('http://127.0.0.1:8091');await page.waitForSelector('#app main');
   for(const [name,station,task,index,expected] of [['moving-dinosaurs',1,2,0,10],['dinosaur-characters',1,1,0,3],['wardrobe',3,1,0,14],['owners-first',4,1,0,2],['owners-second',4,1,5,4],['body-parts',1,0,0,1],['castle-props',2,0,5,2]]){
    await page.evaluate(({station,task,index})=>{const s=window.MuseumDebug.state;s.screen='task';s.station=station;s.task=task;s.index=index;window.MuseumDebug.render();},{station,task,index});
    await page.evaluate(()=>Promise.all([...document.images].map(e=>e.decode())));
    const issues=await page.locator('.card img').evaluateAll(images=>images.flatMap(e=>{const r=e.getBoundingClientRect(),p=e.closest('.card').getBoundingClientRect(),style=getComputedStyle(e);const errors=[];if(style.objectFit!=='contain'||style.getPropertyValue('object-view-box')!=='none')errors.push('cropping: '+e.src);if(r.left<p.left-1||r.right>p.right+1||r.top<p.top-1||r.bottom>p.bottom+1)errors.push('outside card: '+e.src);return errors;}));
    assert.deepEqual(issues,[],name+' image bounds');
    if(expected!==null)assert.equal(await page.locator('.card img[src*="/repaired/"]').count(),expected,name+' uses repaired images');
    if(name==='owners-first')assert.equal(await page.locator('img[src$="/repaired/owner_king.png"]').count(),1);
    if(name==='owners-second'){
     assert.equal(await page.locator('img[src$="/repaired/owner_cook.png"]').count(),1);
     assert.equal(await page.locator('img[src$="/repaired/owner_girl_standing.png"]').count(),1);
     assert.equal(await page.locator('img[src$="/owners/owner_girl.png"]').count(),0);
    }
    if(name==='wardrobe')for(const id of ['clothes_gloves','clothes_socks'])assert.equal(await page.locator(`img[src$="/repaired/${id}.png"]`).count(),1);
    assert.ok(await page.locator('.footer').evaluate(e=>e.getBoundingClientRect().bottom<=innerHeight+1));
    await page.screenshot({path:`${folder}/${name}-${size.width}.png`});
   }
  }
  console.log('PASS: whole-image contain rendering, card bounds and repaired URLs at 1366 and 1920.');
 }finally{await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1;});
