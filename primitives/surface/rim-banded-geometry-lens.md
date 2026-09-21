---
id: rim-banded-geometry-lens
category: surface
tags: [glass,backdrop-filter,svg-filter,refraction,sdf,canvas,edge]
axes: {energy: 1, density: 3, weight: 3, finish: 5}
cost: 4
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Glass thick enough to refract bends light at its edge, not across the pane — a
whole-pane displacement smears the middle. Compute the signed distance to the
element's rounded rect, keep the gradient only inside a rim band, ramp it by
t², and write it to a map's R/G around 128-neutral; feed that through `feImage`
→ `feDisplacementMap` as a `backdrop-filter`. Band 10–40px, roughly 0.16 × the
short side; displacement scale 2–3× the band.

```js
const d = sd(x, y, w, h, r)                    // band 10–40px
if (d > -band && d < 2) { const k = ((d + band) / band) ** 2
  px[i] = 128 - nx * 127 * k; px[i + 1] = 128 - ny * 127 * k }
// <feImage href={map}/> <feDisplacementMap in="SourceGraphic" scale={2.4 * band}/>
```
⚠ The map is bound to the box — one canvas, filter and `ResizeObserver`
per element, rebuilt on `fonts.ready` too. Cap the set at 4–8 and skip coarse
pointers. A lens stuck to the viewport top samples texels above it, where
browser chrome bleeds in.
