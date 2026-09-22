---
id: edge-perched-pacing-sprite
category: interaction
tags: [mascot, sprite, character, perch, raf, delight]
axes: {energy: 3, density: 1, weight: 2, finish: 3}
cost: 2
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---

A small fixed-position sprite that paces along the top edge of a marked
element gives a page a resident without occupying layout. Read the
perch's rect each frame, walk between its insets, dwell and flip at the ends.
When the perch leaves the viewport, hop in an arc to a fallback perch.

```js
const r = perch.getBoundingClientRect()
p += speed / (r.width - 2 * inset) * dt * dir     // 20–40 px/s
if (p >= 1 || p <= 0) { dir *= -1; dwell = .7 }  // dwell 0.4–1s
y = lerp(y0, y1, e) - hop * Math.sin(t * Math.PI) // hop 30–60px, 0.4–0.7s
```
⚠ `aria-hidden`, `pointer-events: none`. Under reduced motion park it centred.
