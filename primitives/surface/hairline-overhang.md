---
id: hairline-overhang
category: surface
tags: [surface,detail,precision]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: [emitted-light-not-borders]
---
Negative inset of exactly `1px` with `calc(100% + 2px)` sizing so a stroke sits
*on* the boundary rather than inside it. Sub-pixel detail that reads as
precision at full size and costs nothing.
