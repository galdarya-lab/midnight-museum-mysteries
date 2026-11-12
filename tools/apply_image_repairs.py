"""Register separately generated replacement files without changing any answer IDs."""
import json
import re
from pathlib import Path
from PIL import Image

root=Path(__file__).resolve().parent.parent
report=json.loads((root/'docs/image-repair/generated-assets.json').read_text(encoding='utf-8'))
mp=root/'src/data/assetManifestV2.json'
manifest=json.loads(mp.read_text(encoding='utf-8'))
tp=root/'src/data/assetManifestV2.ts'
ts=tp.read_text(encoding='utf-8')
for repair in report:
    id=repair['id']
    matches=[e for e in manifest['assets'] if Path(e['path']).stem==id]
    assert len(matches)==1,(id,matches)
    entry=matches[0]
    key=entry.get('assetId',entry['path'].split('/v2/')[1].rsplit('.',1)[0])
    original=entry.get('originalPath',entry['path'])
    file=root/'public/assets/museum/v2/repaired'/f'{id}.png'
    assert file.is_file(),file
    with Image.open(file) as image:
        assert image.mode=='RGBA',id+' missing transparency'
        alpha=image.getchannel('A')
        assert alpha.getextrema()==(0,255),id+' missing real alpha'
        bbox=alpha.point(lambda a:255 if a>32 else 0).getbbox()
        assert bbox,id+' blank image'
        x0,y0,x1,y1=bbox;w,h=image.size
        margins=[x0/w,y0/h,(w-x1)/w,(h-y1)/h]
        assert min(x0,y0,w-x1,h-y1)>=2,(id,'opaque subject touches image boundary',margins)
        repair['size']=list(image.size)
        repair['minimumMargin']=round(min(margins),4)
        entry.update(originalPath=original,originalSize=entry.get('originalSize',entry['size']),assetId=key,path='/assets/museum/v2/repaired/'+id+'.png',size=list(image.size),mode='RGBA',source='imagegen_individual_repair')
    pattern=r'("'+re.escape(key)+r'":\s*")[^"]+(\")'
    ts,count=re.subn(pattern,lambda m:m[1]+entry['path']+m[2],ts)
    assert count==1,(key,count)
    repair['assetId']=key
    repair['savedPath']=str(file.relative_to(root)).replace('\\','/')
    assert (root/('public'+original)).is_file(),'Original must be kept: '+original
mp.write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
tp.write_text(ts,encoding='utf-8')
(root/'docs/image-repair/generated-assets.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print('Registered',len(report),'individual repairs; original files and gameplay IDs retained.')
