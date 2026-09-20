---
id: container-solved-overlap-stride
category: layout
tags: [layout,overlap,measurement,resize-observer,density,quantity]
axes: {energy: 1, density: 4, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Do not pick how far a row of fixed-width cards overlaps — solve it. Measure the
container, divide the leftover width by n−1, then clamp twice: a maximum stride
below the card width so a small set never separates into a plain row, and a
minimum sliver so the last card still shows a reachable edge. Rake each card by
an angle that falls as the count rises, and two read as a fan where a dozen
reads as a deck. Stride floor 20–45px, tilt ceiling 2–4°.

```js
const stride = Math.max(MIN, Math.min(card - 60, (width - card) / (n - 1)))
const tilt   = Math.min(2.2, 12 / (n - 1))
```
⚠ Later cards cover earlier ones' controls. Reverse paint order by index, and
give focus a rule that lifts the focused card clear of its neighbours.
