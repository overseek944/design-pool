---
id: screen-composited-understroke
category: canvas
tags: [canvas,light,stroke,effect,depth,cheap]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Canvas 2D has no cheap blur, so a glowing stroke is built from passes rather
than filters. Stroke the same path twice under an additive composite — once wide
and nearly transparent, once thin and full — and the overlap accumulates into a
bright core with a soft falloff for the cost of one extra `stroke()`. `screen`
saturates toward white and cannot blow out; `lighter` adds linearly and clips
sooner but burns hotter. Understroke 4–6× the core at alpha .08–.2.

```js
ctx.globalCompositeOperation = 'screen'
ctx.lineWidth = 5;    ctx.globalAlpha = .14; ctx.stroke(p)
ctx.lineWidth = 1.15; ctx.globalAlpha = 1;   ctx.stroke(p)
ctx.globalCompositeOperation = 'source-over'
```
⚠ Both modes brighten what is already there, so the glow vanishes on a light
ground — dark stages only. Restore `source-over` in the same block: a left-set
mode silently recolours every later draw.
