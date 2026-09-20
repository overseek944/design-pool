---
id: intersected-raster-mask
category: surface
tags: [surface,mask,texture,print,halftone]
axes: {energy: 1, density: 4, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`mask-composite: intersect` turns a mask stack into a boolean AND, so a texture
can be cut by several independent rulings at once rather than by one shaped
fade. Stack two or three `repeating-linear-gradient`s at unrelated angles — say
0°, 24° and 90°, each 0.7–5% period with a partly-transparent second stop — and
the layer survives only where every ruling passes. The result reads as screen
print or engraving: broken by line work rather than dimmed. Add a vignette layer
to the same stack and the falloff comes free.

```css
mask-image:
  radial-gradient(ellipse 58% 60% at 50% 50%, #000, transparent 96%),
  repeating-linear-gradient(24deg, #000 0 2.8%, #0000008c 2.8% 5.6%),
  repeating-linear-gradient(90deg, #000 0 .76%, #0000006b .76% 1.32%);
mask-composite: intersect;
```
⚠ Needs the `-webkit-mask-composite: source-in` pair for Safari; without a
composite mode the layers union and nothing is cut. Periods within about 2× of
each other beat into moiré — separate them, and keep the finest above 2px at
the rendered size.
