---
id: edge-anchored-sheet-shadow
category: surface
tags: [surface,shadow,elevation,drawer,sheet,overlay]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A panel attached to an edge — side drawer, bottom sheet — casts its shadow only
away from that edge: offset along the open axis, zero on the other, a wide soft
blur tinted with the page ink. A centred card shadow makes it read as floating
loose rather than pulled in. Offset 12–32px, blur 40–80px, alpha 0.08–0.18.

```css
.drawer { box-shadow: -24px 0 60px rgb(var(--ink-rgb) / .12) }
.sheet  { box-shadow: 0 -16px 50px rgb(var(--ink-rgb) / .16) }
```
⚠ A closed panel left mounted off-canvas must sit past 100% by offset + blur,
or a dim band lingers along the edge.
