"""Register revision 3 art paths while preserving logical IDs and old files."""
import json
import re
from pathlib import Path
from PIL import Image

root=Path(__file__).resolve().parent.parent
report=json.loads((root/'docs/image-repair/revision3.json').read_text(encoding='utf-8'))
mp=root/'src/data/assetManifestV2.json'
tp=root/'src/data/assetManifestV2.ts'
manifest=json.loads(mp.read_text(encoding='utf-8'))
ts=tp.read_text(encoding='utf-8')
replacements={'owners/owner_girl':'repaired/owner_girl_standing.png'}
for record in report:
    if not record.get('patches'): continue
    replacements['differences/'+record['id']+'_B']='repaired/differences/'+record['id']+'_B.png'
    for patch in record['patches']:
        replacements['differences/overlays/'+patch['id']]='repaired/differences/'+patch['id']+'.png'
for key,relative in replacements.items():
    entry=next(e for e in manifest['assets'] if e.get('assetId',e['path'].split('/v2/')[1].rsplit('.',1)[0])==key)
    new_path='/assets/museum/v2/'+relative
    with Image.open(root/('public'+new_path)) as im:
        entry.setdefault('originalPath',entry['path'])
        entry.setdefault('originalSize',entry['size'])
        entry.update(assetId=key,path=new_path,size=list(im.size),mode=im.mode,source='imagegen_art_revision3')
        assert (root/('public'+entry['originalPath'])).is_file()
    ts,n=re.subn(r'("'+re.escape(key)+r'":\s*")[^"]+(\")',lambda m:m[1]+new_path+m[2],ts)
    assert n==1,(key,n)
mp.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
tp.write_text(ts,encoding='utf-8')
print('Registered',len(replacements),'art replacements; original assets and gameplay IDs preserved.')
