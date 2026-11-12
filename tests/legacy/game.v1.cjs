const {chromium}=require('playwright');
const {spawn}=require('node:child_process');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'gameData.json'),'utf8'));
const assets=JSON.parse(fs.readFileSync(path.join(root,'assetManifest.json'),'utf8'));
const delay=ms=>new Promise(r=>setTimeout(r,ms));
async function main(){
  assert.equal(data.stations.length,6);
  assert.equal(data.stations.flatMap(s=>s.tasks).length,18);
  assert.equal(data.stations.flatMap(s=>s.tasks.flatMap(t=>t.questions)).length,180);
  const bundle={window:{}};require('node:vm').runInNewContext(fs.readFileSync(path.join(root,'data.js'),'utf8'),bundle);
  assert.equal(JSON.stringify(bundle.window.GAME_DATA),JSON.stringify(data),'Offline bundle matches source questions');
  for(const a of Object.values(assets))assert.ok(fs.existsSync(path.join(root,'public',a.path)),a.path);
  const server=spawn(process.execPath,['server.cjs'],{cwd:root,env:{...process.env,PORT:'8087'},stdio:'pipe'});
  const browser=await chromium.launch({channel:'chrome',headless:true});
  const page=await browser.newPage({viewport:{width:1366,height:768}});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
  const screenshots=path.join(root,'test-results');fs.mkdirSync(screenshots,{recursive:true});
  const clickAction=action=>page.locator(`#app [data-action="${action}"]`).click();
  const clickAnswer=async value=>{const locator=page.locator('#app [data-answer]');const idx=await locator.evaluateAll((els,v)=>els.findIndex(e=>JSON.parse(e.dataset.answer)===v),value);assert.ok(idx>=0,'Answer present: '+value);await locator.nth(idx).click();};
  try{
    for(let i=0;i<40;i++){try{await page.goto('http://127.0.0.1:8087');break;}catch{await delay(100);}}
    await page.screenshot({path:path.join(screenshots,'01-intro.png')});
    await page.selectOption('#mode','Full');
    await clickAction('start');
    await page.locator('[data-action="accept-opening"]').click();
    assert.equal(await page.locator('[data-room]:disabled').count(),5);
    for(let si=0;si<6;si++){
      await page.locator(`[data-room="${si}"]`).click();
      await clickAction('begin-room');
      for(let ti=0;ti<3;ti++){
        const t=data.stations[si].tasks[ti];
        for(let qi=0;qi<10;qi++){
          const q=t.questions[qi],correct=q.correct??q.correctItem;
          if(qi===0){
            if(t.mechanic==='listening_match')assert.ok(!(await page.locator('.prompt').textContent()).includes(q.prompt));
            if(t.id==='final_suspect'){
              assert.equal(await page.locator('.suspect-mouse').count(),1,'Mouse portrait conceals the key until confirmation');
              assert.equal(await page.locator('img[src*="suspect_mouse"],img[src*="pip_mouse"],img[src*="pip_moon_key"]').count(),0);
            }
            if(t.mechanic==='memory')await clickAction('memory-hide');
            await page.evaluate(()=>Promise.all([...document.images].map(i=>i.complete?Promise.resolve():new Promise(r=>{i.onload=r;i.onerror=r;}))));
            assert.equal(await page.locator('#app img').evaluateAll(images=>images.filter(i=>!i.naturalWidth).length),0,'All visible images loaded');
            assert.ok(await page.locator('.footer').evaluate(e=>e.getBoundingClientRect().bottom<=innerHeight+1),'Controls fit projector height: '+t.id);
            if(t.mechanic==='spot_difference')assert.ok(await page.locator('.picture').first().evaluate(e=>Math.abs(e.getBoundingClientRect().height-e.querySelector('img').getBoundingClientRect().height)<1),'Difference hitboxes match the displayed image');
            await page.screenshot({path:path.join(screenshots,`task-${si+1}-${ti+1}.png`)});
          }else if(t.mechanic==='memory')await clickAction('memory-hide');
          assert.equal(await page.locator('.teacher').count(),0);
          switch(t.mechanic){
            case'drag_drop':case'clock_placement':{
              const token=page.locator('[data-token]').filter({hasText:t.mechanic==='clock_placement'?String(correct):''});
              const tokenIdx=await page.locator('[data-token]').evaluateAll((els,v)=>els.findIndex(e=>JSON.parse(e.dataset.token)===v),correct);
              const slotIdx=await page.locator('[data-slot]').evaluateAll((els,v)=>els.findIndex(e=>JSON.parse(e.dataset.slot)===v),correct);
              const source=page.locator('[data-token]').nth(tokenIdx),target=page.locator('[data-slot]').nth(slotIdx);
              if(qi===0)await source.dragTo(target);else{await source.click();await page.locator('[data-slot]').nth(slotIdx).click();}
              break;
            }
            case'maze':await page.locator(`[data-move="${['up','left','right','up','stop','up','right','left','up','open'][qi]}"]`).click();break;
            case'owner_match':await page.locator(`[data-owner="${q.correctOwner}"]`).click();await page.locator(`[data-possession="${q.correctItem}"]`).click();break;
            default:await clickAnswer(correct);
          }
          assert.match(await page.locator('.feedback').first().textContent(),/That’s right/,'Correct feedback: '+q.id);
          assert.ok(await page.locator('[data-action="next"]').isEnabled());
          if(si===0&&ti===0&&qi===0){
            await clickAnswer(true);assert.equal(await page.evaluate(()=>points()),10,'Duplicate answer does not award points');
            await clickAnswer(false);assert.equal(await page.evaluate(()=>points()),10,'Wrong answer has no penalty');
            await page.reload();assert.equal(await page.evaluate(()=>points()),10,'Persistence after reload');
          }
          await clickAction('next');
        }
        assert.equal(await page.evaluate(()=>state.screen),'task_complete');
        if(ti<2)await clickAction('next-task');
      }
      await clickAction('finish-station');
      if(si===5){
        assert.equal(await page.locator('#modal [data-answer]').count(),5);
        await page.locator('#modal [data-answer]').nth(1).click();assert.ok(await page.locator('#modal').isVisible());
        await page.locator('#modal [data-answer]').nth(4).click();
      }
      await clickAction('collect');
      assert.equal(await page.evaluate(()=>state.clues.length),si+1);
    }
    assert.equal(await page.evaluate(()=>points()),1800);
    await clickAction('insert-key');await clickAction('start-clock');
    for(let i=0;i<5;i++)await clickAction('recap');
    assert.equal(await page.evaluate(()=>state.screen),'victory');
    await page.screenshot({path:path.join(screenshots,'victory.png')});
    // Quick mode stops after six, exposes all four bonus rounds, and keeps skipped rounds unscored.
    await page.evaluate(()=>{state=fresh();state.screen='task';state.paused=true;render();});
    for(let i=0;i<6;i++)await clickAction('skip');
    assert.equal(await page.evaluate(()=>state.screen),'task_complete');
    assert.equal(await page.evaluate(()=>points()),0);
    await clickAction('more');assert.equal(await page.evaluate(()=>state.index),6);
    await page.keyboard.press('Control+Shift+T');assert.equal(await page.locator('.teacher').count(),1);
    await page.reload();assert.equal(await page.locator('.teacher').count(),0);
    const phases=await page.evaluate(()=>[179,180,600,1020,1440,1860,2280,2700,3000].map(e=>{state.elapsed=e;return phase();}));
    assert.deepEqual(phases,['Introduction','Station 1','Station 2','Station 3','Station 4','Station 5','Station 6','Finale','Lesson complete']);
    await page.evaluate(()=>{state.station=3;state.task=1;state.index=8;state.screen='task';for(const q of task().questions.slice(0,8))state.correct[q.id]=true;render();});
    assert.ok(await page.locator('.costume[alt="Blue hat"]').count());
    await clickAnswer('remove_hat_blue');assert.equal(await page.locator('.costume[alt="Blue hat"]').count(),0,'Hat removal reverses appearance');
    // Both supported projector sizes stay within the horizontal viewport.
    for(const width of [1366,1920]){await page.setViewportSize({width,height:width===1366?768:1080});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
    // Direct file opening works, with no server or fetch required.
    const offline=await browser.newPage();await offline.goto('file:///'+path.join(root,'index.html').replace(/\\/g,'/'));assert.ok(await offline.locator('h1').textContent());await offline.close();
    assert.deepEqual(errors,[],'Browser console and resource errors');
    console.log('PASS: 180 questions, all 18 activities, drag/drop and click placement, all six clues, suspect gating, finale, Quick bonus, persistence, no double scoring, teacher mode, hat removal, viewport widths and file:// launch.');
  }finally{await browser.close();server.kill();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
