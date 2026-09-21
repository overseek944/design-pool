---
id: hinged-leaf-value-swap
category: motion-system
tags: [motion,counter,transition,3d,accessibility]
axes: {energy: 3, density: 2, weight: 3, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A value that changes by folding reads as mechanical rather than animated, and
the whole effect lives in one seam. Stack two clipped leaves over the settled
digit: the top half of the old value folds down about its bottom edge, the
bottom half of the new value unfolds from 90° about its top edge, starting
exactly as the first ends. Any overlap shows both values at once and the
illusion collapses. Each half 120–200ms.

```css
.slot   { perspective: 160px }                          /* 120–260px */
.top    { transform-origin: bottom; animation: fold   .16s ease-in  forwards }
.bottom { transform-origin: top;    animation: unfold .16s ease-out .16s forwards }
@keyframes fold   { to   { transform: rotateX(-90deg) } }
@keyframes unfold { from { transform: rotateX(90deg) } }
```
⚠ Under reduced motion remove the leaves rather than cancelling their animation
— one left at `rotateX(90deg)` is edge-on and invisible, so the value renders
with a blank band. Without `perspective` the fold is a vertical squash.
