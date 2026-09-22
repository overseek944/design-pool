---
id: residual-length-trail-lock
category: motion-system
tags: [motion,svg,stroke,path,diagram]
axes: {energy: 2, density: 2, weight: 1, finish: 5}
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A trail and the mover drawing it are two animations; time alone will not hold
them together, and the head slides ahead on any leg of a different speed. Lock
them by geometry: same percentage stops on both, each `stroke-dashoffset` stop
set to the length still undrawn when the mover reaches that waypoint. Correct
at every corner whatever the leg lengths. `pathLength="1"` makes the stops
fractions.

```css
@keyframes trail {        /* 1228 total; 942 left at the 23% waypoint */
  0%  { stroke-dashoffset: 1228px; opacity: 0 }
  14% { opacity: .86 }
  23% { stroke-dashoffset: 942px }
}
```
⚠ Edit the path and nothing warns — the head silently detaches. Recompute
stops from the geometry, never by eye.

Or remove the second animation entirely: sample the path. `getPointAtLength` at
the drawn fraction gives the head's position, and a second sample a couple of
units behind it gives the heading — so an arrowhead riding a stroke that is
being drawn cannot desync, because both read the same geometry at the same
instant. Edit the path and nothing needs recomputing. The cost is a layout-
thrashing DOM call per head per frame; fine for a handful, not for a field.
```js
const L = path.getTotalLength(), a = path.getPointAtLength(p * L)
const b = path.getPointAtLength(Math.max(0, p * L - 2))
head.setAttribute('transform',
  `translate(${a.x} ${a.y}) rotate(${Math.atan2(a.y-b.y, a.x-b.x) * 57.3})`)
```
⚠ Sample back, never forward — a lookahead past the end flips the head around
at the final frame.
