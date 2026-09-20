---
id: arc-length-colour-ramp-stroke
category: surface
tags: [svg,stroke,gradient,color,dash,effect]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An SVG gradient paints in the element's box, so a stroke that curves or doubles
back takes its colour from where it *is* rather than from how far along it has
run. Stack copies of the same path instead, each carrying one short dash at its
own phase, and give each copy a colour and an opacity sampled at its position
along the run. The ramp then follows arc length exactly, on any geometry, and
survives an edit to the shape. 36–128 segments: fewer bands visibly, more costs
more than the smoothness buys.

```html
<rect pathLength="100" fill="none" stroke-dasharray="0.3 99.7" stroke-opacity=".62"
      stroke="color-mix(in srgb, #54d7ff 40%, #2f6eff 60%)"
      style="stroke-dashoffset: calc(var(--head) + var(--phase))"/>
```
⚠ Every copy is a separate paint each frame. Keep the ramp off anything already
compositing a blur, and cut the count with viewport width.
