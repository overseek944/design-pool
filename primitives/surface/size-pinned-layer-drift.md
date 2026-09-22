---
id: size-pinned-layer-drift
category: surface
tags: [gradient,animated,background,layering,ambient]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A percentage `background-position` moves a layer by (box − layer) × percent, so
a layer sized to exactly 100% cannot move at all. Stack a colour band at 100%
under a repeating stripe of transparent gaps at 200–300% and animate one
position pair: only the stripe slides, sweeping windows across a pinned field
with one keyframe. Angle 90–110°, cycle 30–60s linear, `soft-light` blend.

```css
.sheen::after { content: ""; position: absolute; inset: 0; mix-blend-mode: soft-light;
  background: var(--stripes), var(--bands); background-size: 200%, 100%;
  animation: drift 40s linear infinite }
@keyframes drift { to { background-position: 350%, 350% } }
```
⚠ `background-position` repaints the box every frame; keep it off large areas
and stop it under `prefers-reduced-motion`.
