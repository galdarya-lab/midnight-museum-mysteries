/* Package imagegen edits into the game's existing five-layer difference format.
 * Only the declared rectangles are taken from the edited illustration. The
 * original picture supplies every other pixel, so there are no extra answers.
 * Canvas feathering softens the joins; it does not draw replacement artwork.
 */
const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const url=file=>'data:image/png;base64,'+fs.readFileSync(path.join(root,file)).toString('base64');
(async()=>{
 const report=JSON.parse(fs.readFileSync(path.join(root,'docs/image-repair/revision3.json'),'utf8'));
 const hot=JSON.parse(fs.readFileSync(path.join(root,'src/data/differenceHotspotsV2.json'),'utf8'));
 const browser=await chromium.launch({channel:'chrome'});
 try{
  const page=await browser.newPage();
  for(const record of report.filter(r=>r.patches)){
   const pair=hot[record.id];
   const output=await page.evaluate(async({base,edited,patches})=>{
    const load=src=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=reject;im.src=src;});
    const [a,b]=await Promise.all([load(base),load(edited)]);
    const canvas=()=>{const c=document.createElement('canvas');c.width=a.width;c.height=a.height;return c;};
    const composed=canvas(),ctx=composed.getContext('2d');ctx.drawImage(a,0,0);
    const layers=patches.map(p=>{
     const layer=canvas(),c=layer.getContext('2d'),[x,y,w,h]=p.box;
     c.drawImage(b,0,0,a.width,a.height);
     const pixels=c.getImageData(0,0,a.width,a.height);
     for(let py=0;py<a.height;py++)for(let px=0;px<a.width;px++){
      const edge=Math.min(px-x,py-y,x+w-1-px,y+h-1-py);
      pixels.data[(py*a.width+px)*4+3]=Math.round(255*Math.max(0,Math.min(1,edge/(p.feather||5))));
     }
     c.putImageData(pixels,0,0);ctx.drawImage(layer,0,0);
     return {id:p.id,png:layer.toDataURL('image/png').split(',')[1]};
    });
    return {size:[a.width,a.height],layers,b:composed.toDataURL('image/png').split(',')[1]};
   },{base:url('public/assets/museum/v2/'+pair.a),edited:url(record.savedPath),patches:record.patches});
   const folder='public/assets/museum/v2/repaired/differences';fs.mkdirSync(path.join(root,folder),{recursive:true});
   for(const layer of output.layers){
    fs.writeFileSync(path.join(root,folder,layer.id+'.png'),Buffer.from(layer.png,'base64'));
    const change=pair.changes.find(c=>c.id===layer.id),patch=record.patches.find(p=>p.id===layer.id);
    const [x,y,w,h]=patch.box;
    change.rect=[x/output.size[0],y/output.size[1],w/output.size[0],h/output.size[1]];
   }
   fs.writeFileSync(path.join(root,folder,record.id+'_B.png'),Buffer.from(output.b,'base64'));
   console.log(record.id+': packaged five edited regions; original pixels elsewhere.');
  }
  fs.writeFileSync(path.join(root,'src/data/differenceHotspotsV2.json'),JSON.stringify(hot,null,2)+'\n');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
