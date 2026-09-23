---
id: length-thresholded-station-thread
category: scroll
tags: [scroll,svg,path,stroke,thread,rail,connector,progress,scrub]
axes: {energy: 2, density: 2, weight: 1, finish: 5}
cost: 3
seen: 1
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
