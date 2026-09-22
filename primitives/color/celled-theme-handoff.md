---
id: celled-theme-handoff
category: color
tags: [theme, dark-mode, transition, mask, svg, grid, stagger]
axes: {energy: 3, density: 3, weight: 2, finish: 4}
cost: 4
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A theme switch can resolve as a lattice rather than a fade. Clone the page into
a fixed overlay pinned to the old tokens, flip the root underneath, and mask the
overlay with an SVG grid whose cells open from their centres, timed by distance
from the toggle. Cells 40–120px, delay 0.2–0.6ms per px, each opening over
250–500ms ease-out.

```js
cells.forEach(c => c.at = Math.hypot(c.cx - x, c.cy - y) * k)
// per frame: side = cell * (1 - (1 - p) ** 4), centred, fill black
overlay.style.mask = 'url(#cells)'; root.classList.toggle('dark')
```
⚠ The clone duplicates ids and live media — strip ids, `aria-hidden`,
`pointer-events: none`. Reduced motion swaps instantly.
