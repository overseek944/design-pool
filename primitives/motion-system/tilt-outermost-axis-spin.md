---
id: tilt-outermost-axis-spin
category: motion-system
tags: [transform,3d,rotation,loop,correctness]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A body spinning on a tilted axis needs the tilt written *before* the spin.
Transforms apply right to left, so `rotateY(a) rotateX(t)` tilts first, then
swings the tilted body round the vertical — the pole traces a cone and it
wobbles. Put the fixed tilt outermost and only the spin in the keyframes: the
axis holds and the surface turns about it. Tilt 10–30°; 20–60s per turn reads
as ambient, under 8s as a loader.

```css
.globe { transform: rotateZ(var(--tilt, 23deg)) rotateY(var(--spin)) }
@keyframes turn { to { --spin: 1turn } } /* register --spin as <angle> */
```
⚠ Unregistered, `--spin` snaps. Under `reduce`, stop the turn.
