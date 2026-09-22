---
id: step-anchored-layer-dissolve
category: scroll
tags: [scroll,scrub,crossfade,image,steps,opacity,reading]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Art beside a column of steps should change when the text does, not at fixed
fractions of the section. Stack the images, fix a reading line (header +
40–55% of the remaining viewport), and for each pair of adjacent steps map the
line's travel between their measured centres to the next image's opacity —
held at zero for the first 35–50%, then eased in. Steps may differ
in height.

```js
const f = (line - c[i]) / Math.max(1, c[i + 1] - c[i])
img[i + 1].style.opacity = ease(clamp01((f - .45) / .55))
```
⚠ Run only when all layers are decoded, the viewport is wide and motion is
allowed; otherwise drop the live flag and show one static image.
