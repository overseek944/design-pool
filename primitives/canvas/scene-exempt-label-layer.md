---
id: scene-exempt-label-layer
category: canvas
tags: [canvas,label,type,scene,legibility,layer]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An annotation inside a 3D scene should move and occlude like the geometry it
names, but it is type, and every shading cue applied to it is damage: fog greys
it out at the depth it is needed, a light dims one side. Put labels on their own camera layer with an unlit material, and size the
texture canvas from the measured advance so the sprite's aspect matches the
text instead of stretching it. Sprite height 0.1–0.16 world units.

```js
const g = document.createElement('canvas').getContext('2d')
g.font = FONT; const w = Math.ceil(g.measureText(s).width) + 16, h = Math.ceil(size * 1.55)
const sp = new Sprite(new SpriteMaterial({ map: tex(w, h, drawText), depthWrite: false }))
sp.scale.set(w / h * H, H, 1); sp.layers.set(LABELS)   // camera.layers.enable(LABELS)
```
⚠ Canvas text is not text: it cannot be selected, found or translated, and a
screen reader gets nothing — restate anything load-bearing in markup. Re-measure after the webfont loads or every label is sized to the fallback.
