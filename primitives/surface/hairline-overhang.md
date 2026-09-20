---
id: hairline-overhang
category: surface
tags: [surface,detail,precision]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: [emitted-light-not-borders]
---
Negative inset of exactly `1px` with `calc(100% + 2px)` sizing so a stroke sits
*on* the boundary rather than inside it. Sub-pixel detail that reads as
precision at full size and costs nothing.

```css
.edge { position: absolute; inset: -1px; clip-path: inset(0 round calc(var(--r) + 1px)) }
```
Concentric correction — an overhanging stroke needs its own radius, `outer + the
overhang`, or the corner reads thicker than the straight run. The inner fill
takes `outer - 1px` by the same logic. Ranges of 1–2px overhang hold up; beyond
that the mismatch is visible before the radius maths is.
