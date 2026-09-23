---
id: stepped-pixel-corner
category: surface
tags: [surface,ornament,detail,texture,cheap]
axes: {energy: 2, density: 3, weight: 2, finish: 2}
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
Erode a corner into discrete cells rather than rounding or slicing it: one
square the size of the cell pinned at the corner, plus four to six zero-blur
`box-shadow` copies stepped one and two cells along each axis at falling alpha.
The staircase reads as a low-resolution dissolve — the panel quantises instead
of ending — and costs no pseudo-element, no clip and no asset. Cell 8–16px,
alpha from about 0.3 down to 0.08. Give the diagonal copy a value between its
two neighbours or the step reads as a hole.

```css
.px { position: absolute; top: 0; right: 0; width: var(--c, 12px); aspect-ratio: 1;
  --x: calc(var(--c) * -1); --xx: calc(var(--c) * -2); --yy: calc(var(--c) * 2);
  background: var(--ink);
  box-shadow: var(--x) 0 0 #ffffff57, 0 var(--c) 0 #ffffff33, var(--x) var(--c) 0 #ffffff2e,
              var(--xx) 0 0 #ffffff24, 0 var(--yy) 0 #ffffff1a }
```
⚠ Decoration only — it paints outside the element's box, so any ancestor with
`overflow: hidden` erases it.

Cut the staircase into the element itself and it becomes the control's
outline instead of an ornament beside it: a 20-point `clip-path: polygon()` that
notches each corner in two cell steps, stored once as a custom property. Keep a
finer copy at half the cell and the hover can *resolve* — coarse, fine, square —
under `step-end`, so the edge sharpens in frames like a raster loading rather
than easing. Cell 2–6px, 0.1–0.2s for the whole resolve.
```css
.btn { clip-path: var(--steps) }   /* polygon(0 6px, 3px 6px, 3px 3px, 6px 3px, 6px 0, … ×4) */
.btn:hover, .btn:focus-visible { animation: sq .14s step-end forwards }
@keyframes sq { 0% { clip-path: var(--steps) } 50% { clip-path: var(--steps-fine) } to { clip-path: inset(0) } }
```
⚠ `clip-path` clips the focus outline too — draw focus with an inset shadow or
a ring on a wrapper, or keyboard focus vanishes.
