---
id: projected-lattice-ground
category: surface
tags: [surface,grid,texture,ambient,depth,geometry]
axes: {energy: 2, density: 3, weight: 1, finish: 4}
cost: 2
seen: 3
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

Where the lattice should read as *off-axis* rather than as a floor, `skewY` is
the cheaper transform and a different effect: no 3D context, no compositor
layer held for the session, and cells that stay uniform, so there is no horizon
for them to converge into and no moiré to mask. It buys only a few degrees
before the tilt reads as a mistake, and it empties the same corners — a small
overscale refills them. Pair it with a focal mask and the ground has no edge to
terminate.
```css
.lattice { transform: skewY(4deg) scale(1.08);       /* 2–6deg, scale 1.05–1.15 */
  mask-image: radial-gradient(70% 72% at 50% 48%, #fff, #0000) }
```
⚠ Skew shears the strokes too, so a hairline is thinner on one axis than the
other — draw it in SVG where stroke width is yours to set, or accept the
difference at alphas this low.
