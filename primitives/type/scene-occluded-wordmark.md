---
id: scene-occluded-wordmark
category: type
tags: [type,canvas,mask,composite,depth,wordmark,occlusion]
axes: {energy: 2, density: 2, weight: 4, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A word meant to stand *behind* a rendered scene cannot sit under it: a
translucent layer washes over the letters evenly, a panel behind a texture. Occlude instead. Render the scene with a zero-alpha
clear so its silhouette is its alpha, draw the word once into its own layer,
and each frame composite the scene over it with `destination-out` — the letters
lose exactly the pixels the geometry covers, hard-edged. Fade the word to alpha
zero toward its baseline, never to the ground colour. Fade over 40–75% of cap height.

```js
ctx.clearRect(0, 0, w, h); ctx.drawImage(wordLayer, 0, 0)
ctx.globalCompositeOperation = 'destination-out'
ctx.drawImage(sceneCanvas, 0, 0, w, h)   // sky transparent, geometry opaque
ctx.globalCompositeOperation = 'source-over'
```
⚠ A WebGL source needs `preserveDrawingBuffer: true` or it reads back blank.
Keep the real word in the DOM; the canvas is `aria-hidden`.
