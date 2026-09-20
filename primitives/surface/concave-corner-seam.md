---
id: concave-corner-seam
category: surface
tags: [surface,border,detail,chrome,css-only]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A raised element fuses into the sheet below it only where the join curves
*outward* — the one radius `border-radius` cannot draw. Paint it instead: a
square the size of the radius sits just outside each lower corner, filled with
a radial-gradient whose transparent disc is centred on that outer corner, so
the ink left over sweeps from the sheet up into the element's side. Overlap the
sheet by the same amount. Radius 8–20px.

```css
.tab { --r: 14px; border-radius: var(--r) var(--r) 0 0; margin-bottom: calc(var(--r) * -1) }
.tab[aria-selected="true"]::after { content: ""; position: absolute; left: 100%;
  bottom: var(--r); width: var(--r); height: var(--r);
  background: radial-gradient(circle at 100% 0, #0000 calc(var(--r) - .5px), var(--ink) var(--r)) }
```
⚠ The half-pixel band between the stops is load-bearing — one hard stop aliases
into a staircase. Where the run ends, drop that fillet and shrink the sheet's
own corner to near zero instead, or it paints a curve over nothing.
