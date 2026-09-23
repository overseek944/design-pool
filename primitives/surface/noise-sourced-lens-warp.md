---
id: noise-sourced-lens-warp
category: surface
tags: [surface,glass,refraction,svg-filter,displacement,noise]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 3
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A displacement map need not be drawn geometry. `feTurbulence` at a frequency far
below the element's own size makes blobs wider than the box, so the warp is one
slow bulge rather than texture. Blur the noise before it drives the map or its
high frequencies survive as sizzle instead of glass. Vary `seed` per instance.
Frequency 0.005–0.012, blur 1.5–3, scale 80–160.

```html
<feTurbulence type="fractalNoise" baseFrequency=".008" numOctaves="2" seed="92" result="n"/>
<feGaussianBlur in="n" stdDeviation="2" result="b"/>
<feDisplacementMap in="SourceGraphic" in2="b" scale="120"
  xChannelSelector="R" yChannelSelector="G"/>
```
⚠ Scale is in user units, not a proportion of the box — one filter mangles a
chip and barely moves a panel.

Scale per instance rather than per filter: clone one template filter for each
element, give the clone a fresh id, and set its `scale` to a base times a
strength read from the element — a chip at 0.5×, a bar at 1–1.5×. Unequal x/y
`baseFrequency` (1:2–1:4) stretches the bulges along the long axis of a pill.
```js
const f = tpl.cloneNode(true); f.id = `g${i}`; tpl.after(f)
f.querySelector('feDisplacementMap').setAttribute('scale', 40 * el.dataset.glass)
```
⚠ Every clone is its own filter pass — cap the count on a page.
