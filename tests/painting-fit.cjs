const {chromium}=require('playwright');
const {spawn}=require('node:child_process');
const assert=require('node:assert/strict');
const fs=require('node:fs');

(async()=>{
 const server=spawn(process.execPath,['server.cjs'],{env:{...process.env,PORT:'8094'},stdio:'pipe'});
 const browser=await chromium.launch({channel:'chrome'});
 const dir='test-results/painting-fit';fs.mkdirSync(dir,{recursive:true});
 try{
  const page=await browser.newPage();
  for(const size of [{width:1366,height:768},{width:1920,height:1080}]){
   await page.setViewportSize(size);await page.goto('http://127.0.0.1:8094');await page.waitForSelector('#app main');
   await page.evaluate(()=>{Object.assign(window.MuseumDebug.state,{started:true,screen:'task',station:2,task:0,index:0,mode:'Full',correct:{}});window.MuseumDebug.render();});
   for(let i=0;i<10;i++){
    const value=await page.evaluate(()=>window.MuseumDebug.question.correctId);
    const token=page.locator('[data-token]').filter({has:page.locator(`img[alt="${value}"]`)});
    const ti=await page.locator('[data-token]').evaluateAll((els,v)=>els.findIndex(e=>JSON.parse(e.dataset.token)===v),value);
    const si=await page.locator('[data-slot]').evaluateAll((els,v)=>els.findIndex(e=>JSON.parse(e.dataset.slot)===v),value);
    if(i===0)await page.locator('[data-token]').nth(ti).dragTo(page.locator('[data-slot]').nth(si));
    else{await page.locator('[data-token]').nth(ti).click();await page.locator('[data-slot]').nth(si).click();}
    assert.match(await page.locator('.feedback').textContent(),/That’s right/);
    await page.evaluate(()=>Promise.all([...document.images].map(e=>e.decode())));
    // The visible alpha rectangle must span the target, not the padded PNG canvas.
    const errors=await page.locator('.painting-sprite').evaluateAll(els=>els.flatMap(e=>{
     const [x,y,w,h]=e.dataset.source.split(',').map(Number),r=e.getBoundingClientRect(),im=e.querySelector('img').getBoundingClientRect();
     const visible={left:im.left+x*im.width,top:im.top+y*im.height,width:im.width*w,height:im.height*h};
     return ['left','top','width','height'].filter(k=>Math.abs(visible[k]-r[k])>1).map(k=>k+' does not fit');
    }));assert.deepEqual(errors,[],'Target fit for '+value);
    if(i===4||i===9)await page.screenshot({path:`${dir}/${i===4?'village':'castle'}-${size.width}.png`});
    await page.locator('[data-action="next"]').click();
   }
   assert.equal(await page.evaluate(()=>window.MuseumDebug.points()),100);
   // Reopening the task reconstructs every placement with the same geometry.
   await page.reload();await page.waitForSelector('[data-action="continue"]');await page.locator('[data-action="continue"]').click();
   await page.locator('[data-action="review"]').click();
   assert.equal(await page.locator('.painting-sprite').count(),5);
   await page.evaluate(()=>{window.MuseumDebug.state.index=9;window.MuseumDebug.render();});
   assert.equal(await page.locator('.painting-stars .painting-fragment').count(),3);
   assert.equal(await page.evaluate(()=>window.MuseumDebug.points()),100);
  }
  console.log('PASS: all ten painting placements fill their target rectangles at both projector sizes; three stars occupy three holes; drag/click and reload preserve progress.');
 }finally{await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1;});
