---
id: one-point-room-frame
category: surface
tags: [perspective,hairline,background,svg,depth,decoration]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Five hairlines make a room you are looking into: an inset rectangle as the far
wall, plus one line from each outer corner to the matching inner corner. No
`perspective`, no `preserve-3d`, no compositor layer — the depth is entirely in
where the four diagonals meet. The inset sets apparent distance, and a heading
placed over the back wall sits at the end of the room instead of on top of a
pattern. Inset 22–38% of the shorter side; the vanishing rectangle's centre
need not be the section's.

```svg
<g stroke="#B6B6B6" stroke-opacity=".08" fill="none">
  <rect x="330" y="200" width="640" height="250"/>
  <path d="M0 0 330 200M1300 0 970 200M0 660 330 450M1300 660 970 450"/></g>
```
⚠ Off-centre vanishing points read as a mistake past about 8% of the width.
Decorative — `aria-hidden` and `pointer-events: none`, and let it drop under
`forced-colors` rather than painting four system-coloured diagonals.
