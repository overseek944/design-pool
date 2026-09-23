---
id: stepped-outline-zoom-open
category: reveal
tags: [reveal,dialog,window,outline,steps,retro,open]
axes: {energy: 2, density: 2, weight: 2, finish: 2}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A panel can open the way a desktop system once did: a bare 1px outline races
from the invoking control out to the panel's bounds in a few hard frames, then
the real panel appears whole. No content scales, so nothing blurs or reflows.
Scale from 0.08–0.15, 3–5 steps, 100–180ms; reverse it toward the source on close.

```css
.zoom { border: 1px solid var(--frame); opacity: 0; transform-origin: var(--from, 50% 50%) }
.opening .zoom { animation: zoom .13s steps(4, end) }
@keyframes zoom { from { opacity: 1; scale: .12 } to { opacity: 1; scale: 1 } }
```
⚠ Show the panel on `animationend`, not a timer. Under reduced motion skip the outline and open the panel directly.
