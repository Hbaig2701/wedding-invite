import sys
from PIL import Image, ImageDraw, ImageFilter
import numpy as np
S=sys.argv[1]
src=Image.open(S+'/florals.png').convert('RGBA')
boxes={
 'orange_sprig':(596,36,700,200), 'orange_small':(642,1176,742,1282), 'poppy':(138,368,232,474),
 'lavender':(28,650,112,860), 'fern':(108,486,252,654), 'carnation':(876,752,1012,874),
 'pink_flower':(830,905,930,992), 'rose':(192,1060,318,1180), 'buds':(912,362,972,466),
 'leaf_a':(378,22,484,100), 'leaf_b':(470,78,552,140), 'leaf_c':(374,1344,436,1464),
 'lavender_tr':(812,180,930,290), 'dark_sprig':(732,1170,918,1290), 'roses_tr':(782,270,888,390),
 'branch_tl':(58,78,204,224), 'lavender_bl':(122,1010,198,1170),
}
out={}
for k,(x0,y0,x1,y1) in boxes.items():
    c=src.crop((x0,y0,x1,y1)); w,h=c.size
    from scipy import ndimage as nd
    a=np.asarray(c).astype(float)
    solid=a[...,3]>40
    lab,n=nd.label(nd.binary_dilation(solid,iterations=1))
    if n:
        sz=nd.sum(solid,lab,range(1,n+1)); big=sz.max()
        keep=np.isin(lab,[i+1 for i in range(n) if sz[i]>=0.2*big and sz[i]>40])
        keep=nd.binary_dilation(keep,iterations=2)
        soft=np.asarray(Image.fromarray((keep*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))).astype(float)/255
        a[...,3]*=soft
    # gentle edge fade so cut stems trail off
    m=Image.new('L',(w,h),0); d=ImageDraw.Draw(m)
    d.rectangle([3,3,w-3,h-3],fill=255); m=m.filter(ImageFilter.GaussianBlur(3))
    a[...,3]*=np.asarray(m)/255
    im=Image.fromarray(a.round().astype(np.uint8))
    bb=im.getchannel('A').point(lambda v:255 if v>12 else 0).getbbox()
    out[k]=im.crop(bb); out[k].save(f'{S}/motif-{k}.png')
# contact sheet
W=sum(i.width+10 for i in out.values()); H=max(i.height for i in out.values())
sheet=Image.new('RGBA',(W,H),(252,247,232,255)); x=0
for i in out.values(): sheet.alpha_composite(i,(x,0)); x+=i.width+10
sheet.convert('RGB').save(S+'/motifs.jpg'); print({k:v.size for k,v in out.items()})
