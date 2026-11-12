"""Measure PNG content for CSS display; never rewrite or crop source image files."""
import json
from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parent.parent
manifest=json.loads((root/'src/data/assetManifestV2.json').read_text(encoding='utf-8'))
layout={}
for entry in manifest['assets']:
    path=root/('public'+entry['path'])
    with Image.open(path) as img:
        if img.mode!='RGBA':continue
        bbox=img.getchannel('A').point(lambda a:255 if a>32 else 0).getbbox()
        if not bbox:continue
        x0,y0,x1,y1=bbox;w,h=img.size
        padding=max(x1-x0,y1-y0)*.035
        x0=max(0,x0-padding);y0=max(0,y0-padding);x1=min(w,x1+padding);y1=min(h,y1+padding)
        key=entry['path'].split('/v2/')[1].rsplit('.',1)[0]
        layout[key]=f'inset({y0/h*100:.2f}% {(w-x1)/w*100:.2f}% {(h-y1)/h*100:.2f}% {x0/w*100:.2f}%)'
(root/'src/data/assetLayoutV2.json').write_text(json.dumps(layout,indent=2),encoding='utf-8')
print('Measured content bounds for',len(layout),'PNG assets (source pixels unchanged).')
