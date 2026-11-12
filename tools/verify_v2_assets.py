"""Verify physical paths and pixel-exact controlled difference regions."""
import json
import math
import re
from pathlib import Path
from PIL import Image, ImageChops, ImageDraw
root=Path(__file__).resolve().parent.parent
manifest=json.loads((root/'src/data/assetManifestV2.json').read_text(encoding='utf-8'))
ts=(root/'src/data/assetManifestV2.ts').read_text(encoding='utf-8')
imported_paths=set(re.findall(r':\s*"(/assets/[^\"]+)"',ts))
assert imported_paths=={entry['path'] for entry in manifest['assets']},'TS imports and JSON manifest disagree'
for entry in manifest['assets']:
    file=root/('public'+entry['path'])
    assert file.is_file(),file
    with Image.open(file) as image:
        assert list(image.size)==entry['size'],str(file)+' size differs from manifest'
        image.verify()
hot=json.loads((root/'src/data/differenceHotspotsV2.json').read_text(encoding='utf-8'))
assets={entry.get('assetId',entry['path'].split('/v2/')[1].rsplit('.',1)[0]):entry for entry in manifest['assets']}
def asset_file(key):
    return root/('public'+assets[key.rsplit('.',1)[0]]['path'])
results={}
for name,pair in hot.items():
    a=Image.open(asset_file(pair['a'])).convert('RGBA')
    b=Image.open(asset_file(pair['b'])).convert('RGBA')
    built=a.copy()
    allowed=Image.new('L',a.size,0);draw=ImageDraw.Draw(allowed)
    assert len(pair['changes'])==5
    for change in pair['changes']:
        layer=Image.open(asset_file(change['asset'])).convert('RGBA')
        assert layer.size==a.size
        built=Image.alpha_composite(built,layer)
        x,y,w,h=change['rect'];W,H=a.size
        box=(math.floor(x*W)-1,math.floor(y*H)-1,math.ceil((x+w)*W)+1,math.ceil((y+h)*H)+1)
        draw.rectangle(box,fill=255)
        assert ImageChops.difference(a.convert('RGB'),b.convert('RGB')).crop(box).getbbox(),change['id']+' has no visible change'
    diff=ImageChops.difference(a.convert('RGB'),b.convert('RGB'))
    outside=ImageChops.multiply(diff,ImageChops.invert(allowed).convert('RGB'))
    assert outside.getbbox() is None,name+' differs outside declared rectangles'
    # Canvas uses premultiplied alpha; Pillow may round a feathered edge by one.
    delta=ImageChops.difference(built.convert('RGB'),b.convert('RGB'))
    maximum=max(hi for lo,hi in delta.getextrema())
    assert maximum<=1,name+' runtime overlays differ from supplied B'
    results[name]={'changes':5,'outsideHotspots':0,'runtimeMatchesB':True,'maximumAlphaRounding':maximum}
print(json.dumps({'assetsVerified':len(manifest['assets']),'differences':results},indent=2))
