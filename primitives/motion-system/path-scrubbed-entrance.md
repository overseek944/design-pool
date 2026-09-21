---
id: path-scrubbed-entrance
category: motion-system
tags: [motion,scroll,motion-path,choreography,scrub]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 3
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Give each element its own curve instead of a shared translate. Author an
`offset-path`, then scrub `offset-distance` from scroll progress — arrival
becomes a path-authoring problem, so a group can converge on arcs that no
grid-aligned slide-in produces. `offset-rotate: 0deg` is load-bearing: without it
every element tumbles to follow the tangent. Give static elements a one-point
path too, so a single writer drives every element.

```css
.in { offset-path: path("M 30 30 C -48 -38 8 -64 -90 90"); offset-rotate: 0deg }
.hold { offset-path: path("M 236 57") }   /* degenerate — fade only */
```
```js
el.style.offsetDistance = (p * len) + "px";   /* len 60–470px */
```
⚠ `offset-*` is unanimated under `prefers-reduced-motion` only if you branch —
pin every element to its end distance there. Path length is not the straight-line
distance, so travel reads faster on a curve than the endpoints suggest.
