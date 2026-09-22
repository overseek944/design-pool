---
id: chroma-cycled-subject-mark
category: color
tags: [color,saturation,filter,emphasis,figure,contrast,loop]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Where each part of a figure takes a turn being the subject, dimming the rest by
opacity says *unavailable* and drains their text contrast with it. Move chroma
instead: the live part at `saturate(1.1–1.25)` against a resting
`saturate(.85–.95)`, plus a 2–6% scale swell. Dormant parts stay legible and
read as not-now rather than disabled, and lightness barely moves, so labels keep
the ratio they were scored at.
```css
.part { filter: saturate(.9); transition: filter .4s, scale .4s }
.part[data-live] { filter: saturate(1.18); scale: 1.04 }
```
⚠ Saturation is invisible to many colour-blind readers and to greyscale print —
the swell is the carrier, not the chroma. Animating `filter` promotes and
repaints the subtree; keep it off large regions.
