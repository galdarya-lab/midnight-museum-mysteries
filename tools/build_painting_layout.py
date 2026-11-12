"""Measure visible sprite bounds for placement. Source images are never rewritten."""
import json
from collections import deque
from pathlib import Path
from PIL import Image

root=Path(__file__).resolve().parent.parent
manifest=json.loads((root/'src/data/assetManifestV2.json').read_text(encoding='utf-8'))
assets={a.get('assetId',a['path'].split('/v2/')[1].rsplit('.',1)[0]):a for a in manifest['assets']}
rects={
 'sun':('village',[356,108,138,134]),
 'blue_bird':('village',[144,178,114,76]),
 'cat':('village',[173,450,101,87]),
 'flowers_two':('village',[530,381,130,78]),
 'boat':('village',[221,349,139,57]),
 'moon':('castle',[156,106,120,116]),
 'owl':('castle',[305,179,70,85]),
 'red_flag':('castle',[449,104,96,66]),
 'dragon_small':('castle',[505,257,144,119]),
 'stars_three':('castle',[88,165,53,48]),
}
layout={'canvas':[724,565],'pieces':{}}
for name,(scene,target) in rects.items():
 asset=assets['paintings/props/'+name]
 im=Image.open(root/('public'+asset['path'])).convert('RGBA');w,h=im.size
 mask=im.getchannel('A').point(lambda a:255 if a>32 else 0)
 bbox=mask.getbbox()
 assert bbox
 def padded(b):
  x0,y0,x1,y1=b
  return [max(0,x0-3)/w,max(0,y0-3)/h,(min(w,x1+3)-max(0,x0-3))/w,(min(h,y1+3)-max(0,y0-3))/h]
 entry={'scene':scene,'target':target,'source':padded(bbox)}
 if name=='stars_three':
  # Three disconnected star bodies in the supplied group, not three copies of it.
  pixels=bytearray(mask.tobytes());components=[]
  for start in range(w*h):
   if not pixels[start]:continue
   pixels[start]=0;q=deque([start]);count=0;left=right=start%w;top=bottom=start//w
   while q:
    n=q.popleft();x=n%w;y=n//w;count+=1;left=min(left,x);right=max(right,x);top=min(top,y);bottom=max(bottom,y)
    for nxt in ([n-1] if x else [])+([n+1] if x<w-1 else [])+([n-w] if y else [])+([n+w] if y<h-1 else []):
     if pixels[nxt]:pixels[nxt]=0;q.append(nxt)
   if count>5000:components.append((count,(left,top,right+1,bottom+1)))
  stars=[b for _,b in sorted(components,reverse=True)[:3]]
  assert len(stars)==3
  top_star=min(stars,key=lambda b:b[1]);bottom_stars=sorted([b for b in stars if b!=top_star],key=lambda b:b[0])
  # Two left sky stars and one high star beside the owl.
  ordered=[bottom_stars[0],bottom_stars[1],top_star]
  targets=[[88,165,53,48],[136,237,57,49],[358,131,56,50]]
  entry['fragments']=[{'target':target,'source':padded(b)} for b,target in zip(ordered,targets)]
 layout['pieces'][name]=entry
(root/'src/data/paintingLayoutV2.json').write_text(json.dumps(layout,indent=2),encoding='utf-8')
print('Measured 10 painting pieces, including three independent star positions.')
