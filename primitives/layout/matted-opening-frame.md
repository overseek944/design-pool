---
id: matted-opening-frame
category: layout
tags: [frame,viewport,hero,media,radius,safe-area]
axes: {energy: 1, density: 1, weight: 2, finish: 5}
cost: 1
seen: 2
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

The mat does not have to be a box the content sits inside. Make it a `fixed`
layer at `inset: 8–16px` with the radius, behind everything at `z-index: 0`, and
the page ground shows in the gutter while sections scroll over it — no wrapper,
no clipping, no layout cost, and the rounded corners can never crop a sticky
header or a focus ring. It also becomes paintable: one element to recolour when
the page's register changes, where a padded mat would need every section's
ground rewritten.
```css
.mat { position: fixed; inset: .5rem; z-index: 0; border-radius: 1.5rem;
       background: var(--stage); pointer-events: none }
```
⚠ It is a backdrop, not a container — content is above it and will run into the
gutter unless the layout's own padding matches the inset. Two numbers to keep in
step; publish the inset as one custom property both read.
