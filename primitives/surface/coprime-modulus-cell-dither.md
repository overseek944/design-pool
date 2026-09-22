---
id: coprime-modulus-cell-dither
category: surface
tags: [pattern, texture, grid, nth-child, dots]
axes: {energy: 1, density: 4, weight: 2, finish: 4}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---

A grid of real elements reads as machine-made when every variation lands on the
same column. Modulate it with `nth-child(an+b)` and pick `a` coprime with the
column count: matched cells walk one step per row and never stack, so a couple
of rules scatter opacity and weight with no per-cell markup and no seed. Against
12 columns, 5, 7 and 11 scatter; 4 and 6 stripe. Let the rules overlap — a cell
matching two is the rarest.

```css
.field i:nth-child(5n+1), .field i:nth-child(7n+3) { opacity: .38 }
.field i:nth-child(11n+2) { background: var(--accent) }
```
⚠ Coprimacy is against the *rendered* count: a grid dropping 12 → 6 makes 6 a
divisor again and stripes. Restate the moduli there.

The same coprimacy argument runs on the time axis. A looping set desynchronised
by one modulus re-phases every N members and reads as a repeating block; take
the delay from one modulus and the *duration* from another coprime with it, and
the assignment pattern only repeats every `a · b` members — while the differing
periods mean the members drift apart permanently instead of re-converging on a
common beat. It stays deterministic, so it survives server rendering where a
random seed does not. Delay index 6–10, duration index 4–6, durations spread
±15–25% around the base.
```js
`animation-delay:${(i % 8) * .08}s; animation-duration:${1.2 + (i % 5) * .12}s`
```
⚠ Spreading the duration spreads the *end* too — a set meant to stop together
never will. Use it on an endless idle, and drive anything that must resolve
from one clock. Keep the member count off the product of the two moduli, or the
pattern lines up with the set exactly once and the trick is visible.
