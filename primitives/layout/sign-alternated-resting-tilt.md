---
id: sign-alternated-resting-tilt
category: layout
tags: [layout,tilt,rotate,cards,informal,collage]
axes: {energy: 2, density: 2, weight: 2, finish: 2}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Floating cards set dead square read as a grid; a small resting tilt makes the set
read as dropped by hand. Alternate the sign between neighbours so no two adjacent
cards share a lean, vary the magnitude so the pattern has no period, and give the
card carrying the most text the smallest angle. Text cards 1–3°, image or
sticker cards up to 4–6°.

```css
.drop:nth-child(odd)  { rotate: calc(-1deg * var(--lean, 2)) }
.drop:nth-child(even) { rotate: calc( 1deg * var(--lean, 1.5)) }
```
⚠ Rotated text rasterises softer; past ~3° body copy loses crispness. Put the
tilt on `rotate`, not `transform`, so entrance animations don't overwrite it.
