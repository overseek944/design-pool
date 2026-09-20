---
id: matted-opening-frame
category: layout
tags: [frame,viewport,hero,media,radius,safe-area]
axes: {energy: 1, density: 1, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Inset the opening frame from every viewport edge and the page background becomes
a mat: the media reads as a mounted print rather than an immersive bleed, and
the gutter is a safe zone no rounded display corner or browser chrome can eat.
Scale the inset with the viewport, 2–3% a side, and hold the radius constant at
12–20px — a radius that grows with the box changes the shape's character at
every width.

```css
.mat  { padding: 2.5vw; background: var(--page) }
.card { block-size: calc(100svh - 5vw); border-radius: 16px; overflow: clip }
```
⚠ Size against `svh`, never `vh`: the mobile toolbar eats the bottom gutter and
the mat stops being a frame. Rubber-band scroll reveals the canvas colour, so
`html` must carry the mat's colour rather than the last section's.
