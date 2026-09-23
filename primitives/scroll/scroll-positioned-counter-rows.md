---
id: scroll-positioned-counter-rows
category: scroll
tags: [scroll, rows, marquee, horizontal, parallax, wall]
axes: {energy: 2, density: 4, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A wall of logo or chip rows need not autoplay. Make each row's horizontal offset
a function of the section's progress through the viewport, with alternating
direction and a per-row ratio, so the rows slide against each other only while
the reader scrolls and hold still otherwise. Scale the travel by clamped
viewport width and give each row its own ratio (0.5–0.7× width, 10–25% apart).
```js
const p = clamp((innerHeight - r.top) / (innerHeight + r.height), 0, 1)
rows.forEach((row, i) => row.style.setProperty('--shift',
  `${Math.round((reduce ? .5 : p) * clamp(vw, 360, 1440) * ratio[i])}px`))
```
⚠ Reduced motion parks every row at mid-travel rather than at zero, or the reverse rows show blank track. Batch in one rAF.
