import sys, glob, random, math
from PIL import Image, ImageOps
S=sys.argv[1]; T=int(sys.argv[2]) if len(sys.argv)>2 else 1000
rng=random.Random(27)
mot=[Image.open(f) for f in sorted(glob.glob(S+'/motif-*.png'))]
# place points with wrap-around minimum spacing (Poisson-ish)
pts=[]; MIN=150; tries=0
while tries<20000 and len(pts)<34:
    tries+=1; x,y=rng.uniform(0,T),rng.uniform(0,T)
    ok=all(min(abs(x-px),T-abs(x-px))**2+min(abs(y-py),T-abs(y-py))**2>=MIN*MIN for px,py in pts)
    if ok: pts.append((x,y))
order=list(range(len(mot)))*3; rng.shuffle(order)
tile=Image.new('RGBA',(T,T),(252,247,232,255))
layer=Image.new('RGBA',(T,T),(0,0,0,0))
for i,(x,y) in enumerate(pts):
    m=mot[order[i%len(order)]]
    s=rng.uniform(0.62,0.92)
    im=m.resize((max(1,int(m.width*s)),max(1,int(m.height*s))),Image.LANCZOS)
    if rng.random()<0.5: im=ImageOps.mirror(im)
    im=im.rotate(rng.uniform(-32,32),resample=Image.BICUBIC,expand=True)
    for dx in (-T,0,T):
        for dy in (-T,0,T):
            layer.alpha_composite(im,(int(x-im.width/2+dx),int(y-im.height/2+dy))) if 0 else None
            px,py=int(x-im.width/2+dx),int(y-im.height/2+dy)
            if px<T and py<T and px+im.width>0 and py+im.height>0:
                # alpha_composite needs in-bounds dest; paste via temp canvas
                tmp=Image.new('RGBA',(T,T),(0,0,0,0)); tmp.paste(im,(px,py)); layer=Image.alpha_composite(layer,tmp)
tile=Image.alpha_composite(tile,layer).convert('RGB')
tile.save(S+'/pattern-tile.jpg',quality=88)
big=Image.new('RGB',(T*2,T*2))
for a in (0,T):
    for b in (0,T): big.paste(tile,(a,b))
big.resize((T,T)).save(S+'/pattern-2x2.jpg',quality=85)
print(len(pts))
