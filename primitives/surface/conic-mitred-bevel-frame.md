---
id: conic-mitred-bevel-frame
category: surface
tags: [conic, bevel, frame, bezel, skeuomorphic, facet, housing, depth]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A moulded frame — a device housing, a recessed screen surround — needs four flat
facets lit differently, not a gradient. One `conic-gradient` centred on the box
does it: each side owns an angular band of one tone, and the corners switch
over a 0.25–1% stop window so the diagonals read as crisp mitres. Order the
bands top lightest, bottom darkest; spread 15–30% lightness between them.

```css
.bezel { padding: 6%; background: conic-gradient(from 90deg,
  var(--side) 0 10%, var(--lo) 10.5% 40%, var(--side) 41% 60%,
  var(--hi) 60.5% 90%, var(--side) 91%) }
```
⚠ Mitres land at the centre's diagonals only on a square box; on a rectangle
move the stops to `atan2(h, w)` or the corners skew off-true.
