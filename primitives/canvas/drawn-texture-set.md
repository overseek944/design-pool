---
id: drawn-texture-set
category: canvas
tags: [canvas,texture,procedural,weight,architecture,scene]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Every map a scene needs — worn floor, printed label, belt tread, a gradient for
an alpha mask — can be a 2D-canvas draw instead of a file. No bytes on the wire,
no decode stall, and a variant is an argument rather than a second asset. Put
one helper between the draw and the texture so colour space and sampling are set
once for all of them. Sizes 64–256px for a pattern, up to 1024 read close up.

```js
const tex = (w, h, draw) => { const c = Object.assign(document.createElement('canvas'), { width: w, height: h })
  draw(c.getContext('2d')); return new CanvasTexture(c) }
const belt = tex(128, 64, g => { g.fillStyle = '#1b1e1c'; g.fillRect(0, 0, 128, 64)
  g.strokeStyle = '#4a544d'; g.lineWidth = 7; g.beginPath(); g.moveTo(12, 32); g.lineTo(74, 32); g.stroke() })
```
⚠ Draw grain from a seeded generator, never `Math.random()`, or the surface
differs on every load and no screenshot reproduces. Each draw is main-thread
work at startup — a handful is free, thirty at 1024px is a visible stall.
