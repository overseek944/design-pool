---
id: coverage-stepped-mask-dissolve
category: reveal
tags: [reveal,mask,dither,raster,keyframes,entrance,halftone]
axes: {energy: 2, density: 3, weight: 2, finish: 3}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An arrival can resolve like a raster filling in rather than a fade. Make a
ladder of tiny repeating 1-bit mask tiles at rising coverage — 25, 50, 75% —
and let keyframes swap `mask-image` up the ladder to `none`. Held as a single
rung the same tile is a static halftone tint: a solid numeral or wordmark at a
tonal value without a third colour. Tiles 10–24px, 3–5 rungs, 350–700ms.

```css
.in { mask: var(--d25) 0 0/16px; animation: rez .5s both steps(1, end) }
@keyframes rez { 40% { mask-image: var(--d50) } 75% { mask-image: var(--d75) }
  to { mask-image: none } }
```
⚠ Without `steps(1)` some engines crossfade image keyframes and the rungs smear.
