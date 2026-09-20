---
id: stacked-chromatic-bloom
category: light
tags: [effect,glow,filter,svg,depth]
axes: {energy: 3, density: 2, weight: 4, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: [overflow-visible-for-glow-bleed]
tension: []
---
`filter: drop-shadow()` chains, and follows the alpha channel — so unlike
`box-shadow` it glows the actual silhouette, not its bounding box. Stack two at
different radii and opposing hues (one warm, one cool) for a bloom with colour
separation instead of a flat halo.
```css
filter: drop-shadow(0 0 1.5vh rgba(255,147,103,.40))
        drop-shadow(0 0 2.5vh rgba(177,159,255,.30));
```
⚠ compositor-heavy on large or animated elements. Promote deliberately.
