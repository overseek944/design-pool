---
id: tilted-counter-running-column-wall
category: layout
tags: [marquee, vertical, perspective, background, wall, columns, 3d]
axes: {energy: 3, density: 4, weight: 2, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: [marquee-still-state, gap-compensated-loop-distance]
tension: []
---

A backdrop of many items reads as depth, not a grid, when it runs as 3–6
vertical loops with alternating direction inside an oversized stage tilted a
few degrees. The overshoot hides the tilted edges; the parent clips. Put a
frosted plate over it so foreground copy never sits on moving media.

```css
.frame { position: relative; overflow: clip }
.stage { position: absolute; inset: -40%; perspective: 900px }   /* -25 to -50% */
.cols  { display: flex; height: 100%; transform: rotateX(3deg) rotateZ(1deg) }
.col:nth-child(even) { animation-direction: reverse }            /* 25–60s */
```
⚠ Pointer-events off and `aria-hidden`; pause offscreen. The stage renders
~2× the frame area — cap columns on small screens.
