---
id: projected-lattice-ground
category: surface
tags: [surface,grid,texture,ambient,depth,geometry]
axes: {energy: 2, density: 3, weight: 1, finish: 4}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A flat hairline lattice reads as a sheet behind the page. Tilt the same
generator on a perspective and it becomes a plane the page stands on: cells
compress toward a horizon and the layout gains a floor with no geometry at all.
One fixed pseudo-element does it — still two `linear-gradient`s, only the box is
rotated. Mask the far end or the pitch collapses into moiré where cells
converge. Perspective 800–1600px, rotation 55–75°, scale 1.2–2 to refill the
corners the rotation empties.

```css
.ground::before { content: ""; position: fixed; inset: 0; pointer-events: none;
  background: linear-gradient(90deg, var(--rule) 1px, transparent 1px) 0 0 / 70px 70px,
              linear-gradient(  0deg, var(--rule) 1px, transparent 1px) 0 0 / 70px 70px;
  transform-origin: top; transform: perspective(1200px) rotateX(65deg) scale(1.5);
  mask-image: linear-gradient(transparent 0, #000 15% 60%, transparent 95%) }
```
⚠ A fixed perspective layer is a compositor layer for the whole session — one
per page, never animated. Rule alpha 2–5%: projection stacks cells near the
horizon and doubles apparent density there.
