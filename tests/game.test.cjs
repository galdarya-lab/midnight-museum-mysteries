const {chromium}=require('playwright');
const {spawn}=require('node:child_process');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'src/data/museumGameV2.json'),'utf8'));
const manifest=JSON.parse(fs.readFileSync(path.join(root,'src/data/assetManifestV2.json'),'utf8'));
const SAVE='midnightMuseum:v2:save';
async function main(){
 assert.deepEqual(data.stations.map(s=>s.tasks.length),[3,3,3,2,3,3]);
 assert.equal(data.stations.flatMap(s=>s.tasks.flatMap(t=>t.questions)).length,170);
 assert.equal(new Set(data.stations.flatMap(s=>s.tasks.flatMap(t=>t.questions.map(q=>q.id)))).size,170);
 for(const item of manifest.assets)assert.ok(fs.existsSync(path.join(root,'public',item.path)),item.path);
 const server=spawn(process.execPath,['server.cjs'],{cwd:root,env:{...process.env,PORT:'8087'},stdio:'pipe'});
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const context=await browser.newContext({viewport:{width:1366,height:768}}),page=await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
 const dir=path.join(root,'test-results/v2');fs.mkdirSync(dir,{recursive:true});
 const state=()=>page.evaluate(()=>window.MuseumDebug.state);
 const action=n=>page.locator(`#app [data-action="${n}"]`).first().click();
 async function ready(){await page.waitForSelector('#app main');}
 async function images(){await page.evaluate(()=>Promise.all([...document.images].map(i=>i.complete?Promise.resolve():new Promise(r=>{i.onload=r;i.onerror=r;}))));assert.equal(await page.locator('img').evaluateAll(els=>els.filter(e=>!e.naturalWidth).length),0);}
 async function choose(value,scope='#app'){const all=page.locator(scope+' [data-answer]');const i=await all.evaluateAll((els,v)=>els.findIndex(e=>JSON.parse(e.dataset.answer)===v),value);assert.ok(i>=0,'Choice visible: '+value);await all.nth(i).click();}
 async function answerQuestion(t,q){
  switch(t.mechanic){
   case'drag_drop':case'clock_placement':{
    const tokens=page.locator('[data-token]'),slots=page.locator('[data-slot]');
    const ti=await tokens.evaluateAll((els,v)=>els.findIndex(e=>JSON.parse(e.dataset.token)===v),q.correctId);
    const si=await slots.evaluateAll((els,v)=>els.findIndex(e=>JSON.parse(e.dataset.slot)===v),q.correctId);
    assert.ok(ti>=0&&si>=0,q.id+' placement token and target');
    if(q.index===1)await tokens.nth(ti).dragTo(slots.nth(si));
    else{await tokens.nth(ti).click();await page.locator('[data-slot]').nth(si).click();}break;
   }
   case'profession_match':await page.locator(`[data-skill="${q.skillId}"]`).click();await page.locator(`[data-profession="${q.correctId}"]`).click();break;
   case'owner_match':await page.locator(`[data-owner="${q.correctOwner}"]`).click();await page.locator(`[data-possession="${q.correctId}"]`).click();break;
   case'symbol_choice':await action('symbol-open');await choose(q.correctId);break;
   case'memory':if((await state()).memory.phase==='study')await action('memory-hide');await choose(q.correctId);break;
   default:await choose(q.correctId);
  }
  assert.match(await page.locator('.feedback').first().textContent(),/That’s right/,q.id);
 }
 try{
  await page.goto('http://127.0.0.1:8087');await ready();
  await page.evaluate(()=>localStorage.setItem('midnight-museum-v1','V1-save-sentinel'));
  await page.reload();await ready();assert.ok(await page.getByText('A V1 lesson is saved.',{exact:false}).count());
  await images();await page.screenshot({path:path.join(dir,'menu.png')});
  for(const asset of manifest.assets){const response=await context.request.get('http://127.0.0.1:8087'+asset.path);assert.equal(response.status(),200,asset.path);}
  await page.selectOption('#mode','Full');await action('start');await page.locator('#modal [data-action="accept-opening"]').click();
  for(let si=0;si<6;si++){
   await page.locator(`[data-room="${si}"]`).click();await action('begin-room');
   for(let ti=0;ti<data.stations[si].tasks.length;ti++){
    const t=data.stations[si].tasks[ti];
    for(let qi=0;qi<10;qi++){
     const q=t.questions[qi];
     if(qi===0){
      await images();assert.equal(await page.locator('.teacher').count(),0);
      assert.ok(await page.locator('.card img').evaluateAll(els=>els.every(e=>getComputedStyle(e).objectFit==='contain' && getComputedStyle(e).getPropertyValue('object-view-box')==='none')),'Picture cards show whole images without display cropping: '+t.id);
      assert.ok(await page.locator('.footer').evaluate(e=>e.getBoundingClientRect().bottom<=innerHeight+1),'Controls fit 1366×768: '+t.id);
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No horizontal overflow: '+t.id);
      await page.screenshot({path:path.join(dir,t.id+'.png')});
      if(t.id==='S1_T3'){const tiles=(await state()).tileOrders[t.id+'/tiles'];assert.notDeepEqual(tiles,t.questions.map(q=>q.correctId));}
      if(t.id==='S2_T1'){const tiles=(await state()).tileOrders[t.id+'/tiles'];assert.ok(tiles.every((v,i)=>v!==t.questions[i].correctId));assert.equal(await page.locator('[draggable="true"]').count(),0);}
      if(t.id==='S4_T2'){assert.equal(await page.locator('.clothes-grid .card').count(),14);assert.equal(await page.locator('[draggable="true"]').count(),0);}
      if(t.id==='S5_T2'){assert.equal(await page.locator('[data-owner]').count(),5);assert.equal(await page.locator('[data-possession]').count(),5);}
      if(t.id==='S6_T3'){assert.equal(await page.locator('.five img').count(),5);assert.equal(await page.locator('img[src*="pip_mouse_v2"],img[src*="pip_with_key"],img[src$="/suspect_grey_mouse_3d.png"]').count(),0);assert.equal(await page.locator('img[src$="/suspect_grey_mouse_neutral_3d.png"]').count(),1);}
     }
     if(t.id==='S1_T1'&&qi===0){await choose(false);assert.equal(await page.locator('[data-action="next"]').isEnabled(),false);assert.equal(await page.evaluate(()=>window.MuseumDebug.points()),0);}
     if(t.id==='S5_T1'&&qi===0){
      assert.equal(await page.locator('.memory-empty').count(),0);
      const order=await page.locator('[data-memory-id]').evaluateAll(els=>els.map(e=>e.dataset.memoryId));
      await page.waitForSelector('.memory-empty',{timeout:14000,state:'attached'});
      assert.equal(await page.locator('.memory-empty').count(),1);
      assert.deepEqual(await page.locator('[data-memory-id]').evaluateAll(els=>els.map(e=>e.dataset.memoryId)),order);
     }
     await answerQuestion(t,q);
     if(t.id==='S6_T2'){
      assert.equal((await state()).clockAssemblyStage,qi+1);
      if(qi>=7)assert.equal(await page.locator('.assembly-digit').count(),12,'Stage 8 restores all twelve glowing numerals');
     }
     if(qi===2&&['S1_T3','S3_T1','S3_T2','S5_T1','S6_T1','S6_T2'].includes(t.id)){
      const before=await state(),xp=await page.evaluate(()=>window.MuseumDebug.points());
      await action('exit');await page.reload();await ready();assert.ok(await page.locator('[data-action="continue"]').count());await action('continue');
      const after=await state();assert.equal(after.station,before.station);assert.equal(after.task,before.task);assert.equal(after.index,before.index);
      assert.deepEqual(after.tileOrders,before.tileOrders);assert.deepEqual(after.placedItems,before.placedItems);assert.equal(after.clockAssemblyStage,before.clockAssemblyStage);assert.equal(await page.evaluate(()=>window.MuseumDebug.points()),xp);
     }
     if(t.id==='S1_T1'&&qi===0){await choose(true);assert.equal(await page.evaluate(()=>window.MuseumDebug.points()),10);}
     await action('next');
    }
    assert.equal((await state()).screen,'task_complete');if(ti<data.stations[si].tasks.length-1)await action('next-task');
   }
   await action('finish-station');
   if(si===5){assert.equal(await page.locator('#modal [data-answer]').count(),5);await choose('fox','#modal');assert.ok(await page.locator('#modal').isVisible());assert.equal((await state()).suspect,false);await choose('grey_mouse','#modal');}
   await action('collect');assert.equal((await state()).clues.length,si+1);
  }
  assert.equal(await page.evaluate(()=>window.MuseumDebug.points()),1700);
  await action('insert-key');await action('start-clock');for(let i=0;i<5;i++)await action('recap');
  assert.equal((await state()).screen,'victory');await images();await page.screenshot({path:path.join(dir,'victory.png')});
  await action('home');const old=await state();await action('new-lesson');await page.locator('#modal [data-action="close"]').first().click();assert.equal((await state()).sessionId,old.sessionId);assert.equal((await state()).clues.length,6);
  await action('new-lesson');await page.locator('#modal [data-action="confirm-new"]').click();await page.locator('#modal [data-action="accept-opening"]').click();
  assert.notEqual((await state()).sessionId,old.sessionId);assert.equal((await state()).clues.length,0);assert.equal(await page.evaluate(()=>localStorage.getItem('midnight-museum-v1')),'V1-save-sentinel');
  // Quick journey: all core IDs, both painting scenes and difference pairs, no XP for skips or auto-finish.
  for(let si=0;si<6;si++){
   await page.locator(`[data-room="${si}"]`).click();await action('begin-room');
   for(let ti=0;ti<data.stations[si].tasks.length;ti++){
    const t=data.stations[si].tasks[ti],seen=[];
    for(const index of t.coreQuestionIds){assert.equal((await state()).index,index-1);seen.push(index);await action('skip');}
    assert.equal((await state()).screen,'task_complete');assert.deepEqual(seen,t.coreQuestionIds);
    if(t.id==='S6_T2'){await action('finish-clock');assert.equal((await state()).clockAssemblyStage,10);assert.equal(await page.evaluate(()=>window.MuseumDebug.points()),0);}
    if(ti<data.stations[si].tasks.length-1)await action('next-task');
   }
   await action('finish-station');if(si===5)await choose('grey_mouse','#modal');await action('collect');
  }
  assert.equal((await state()).clues.length,6);assert.equal(await page.evaluate(()=>window.MuseumDebug.points()),0);
  // Bonus follows the explicit core order and visits each remaining round once.
  await page.evaluate(()=>{const s=window.MuseumDebug.state;s.screen='task_complete';s.station=2;s.task=0;s.index=6;s.correct={};s.skipped={};for(const n of [1,2,3,6,7])s.skipped[`S3_T1_Q${String(n).padStart(2,'0')}`]=true;window.MuseumDebug.render();});
  await action('more');const bonuses=[];for(let i=0;i<5;i++){bonuses.push((await state()).index+1);await action('skip');}assert.deepEqual(bonuses,[4,5,8,9,10]);
  // Save validation rejects out-of-range routes and unknown tasks.
  assert.equal(await page.evaluate(()=>window.MuseumDebug.validateSession({...window.MuseumDebug.state,index:99})),false);
  assert.equal(await page.evaluate(()=>window.MuseumDebug.validateSession({...window.MuseumDebug.state,route:{taskId:'removed_maze'}})),false);
  await page.keyboard.press('Control+Shift+T');await action('review');assert.ok(await page.locator('.teacher').count());await page.reload();await ready();await action('continue');assert.equal(await page.locator('.teacher').count(),0);
  await action('notebook');await page.keyboard.press('Escape');await page.waitForFunction(()=>!window.MuseumDebug.state.evidenceNotebookOpen);assert.equal((await state()).evidenceNotebookOpen,false);
  for(const size of [{width:1366,height:768},{width:1920,height:1080}]){await page.setViewportSize(size);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
  for(let si=0;si<6;si++)for(let ti=0;ti<data.stations[si].tasks.length;ti++){
   await page.evaluate(({si,ti})=>{const s=window.MuseumDebug.state;s.station=si;s.task=ti;s.index=0;s.screen='task';window.MuseumDebug.render();},{si,ti});
   await images();assert.ok(await page.locator('.footer').evaluate(e=>e.getBoundingClientRect().bottom<=innerHeight+1),'Controls fit Full HD: '+data.stations[si].tasks[ti].id);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   await page.screenshot({path:path.join(dir,data.stations[si].tasks[ti].id+'-HD.png')});
  }
  assert.deepEqual(errors,[]);
  fs.writeFileSync(path.join(dir,'results.json'),JSON.stringify({fullQuestions:170,quickCoreQuestions:100,activities:17,clues:6,assetUrls:manifest.assets.length,errors,passed:true},null,2));
  console.log('PASS: V2 Full 170 + Quick 100 rounds; all 17 tasks; assets; 6 clues; exact Quick/bonus order; saved layouts/placements/clock; Home/Continue/Start Again/Cancel; legacy save untouched; no browser errors.');
 }finally{await browser.close();server.kill();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
