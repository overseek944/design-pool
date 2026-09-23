---
id: length-thresholded-station-thread
category: scroll
tags: [scroll,svg,path,stroke,thread,rail,connector,progress,scrub]
axes: {energy: 2, density: 2, weight: 1, finish: 5}
cost: 3
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
One hairline can run a page's length and join its sections. Route it in script
as an orthogonal polyline through measured section markers, storing each
marker's cumulative length. Scroll sets the drawn length; a marker lights when
that passes its own length, not on its own observer, so lights and line tip
never drift apart. Reading line 55–70% down; marker flash 0.5–0.7s at 2–3×.
```js
const drawn = Math.min(L, Math.max(0, scrollY + innerHeight * .6 - top))
path.style.strokeDashoffset = L - drawn
for (const s of stations) s.el.classList.toggle('on', drawn >= s.len)
```
⚠ The route is baked from layout — rebuild on resize and font load. Reduced motion: draw it complete.

A straight vertical rail needs no path, but it still belongs between the
*centres* of the first and last node, not the container's edges, or it overshoots
both ends. Measure those two rects into the rail's `top`/`height`, then fill a
child by `scaleY(progress)` from the top. Instead of toggling each node, map
progress through a narrow window around its own `i/(n−1)` — opening a little
before, closing just after — so the node warms as the tip arrives. Window
−3…−5% to +1…+3%.
```js
const on = interpolate(p, [t - .04, t + .02], [ground, accent])
```
⚠ Remeasure on `ResizeObserver` *and* each lazy image's `load` — rows grow
after first paint and the rail ends short of the last node.
