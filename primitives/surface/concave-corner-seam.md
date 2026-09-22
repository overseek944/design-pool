---
id: concave-corner-seam
category: surface
tags: [surface,border,detail,chrome,css-only]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 4
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

Run the fillet on all four corners and the element stops being a tab on a sheet
and becomes a shape *carved out of* it: the panel appears to wrap the card on
every side, which no radius and no clip path produces. Each corner is its own
box painted with a disc centred on the far corner — `0% 0%`, `100% 0%`,
`0% 100%`, `100% 100%` — all four reading the same radius and the same fill.
Stops at 1–2rem; below 0.75rem the sweep is not legible as a curve.
```css
.carve::before { background: radial-gradient(circle at 0 0, #0000 var(--r), var(--card) var(--r)) }
```
⚠ Four boxes painted with the card's colour is four places to update — bind the
fill and the radius to the same two properties the card uses, or a theme change
leaves the fillets on the old ground. Where the card sits over a gradient rather
than a flat panel, this cannot work: the fillet paints a flat colour.

Bind the fillet to a property that moves with the element it seams. A bar that
opens into a card animates its own `border-radius` on the way, and a fillet
frozen at the closed size detaches from the corner halfway through. Let the
pseudo-element's width and height read that property and transition *those* on
the panel's own duration and curve — the seam stays welded for the whole move
with no second timeline. Fillet 3–16px across the range.
```css
.seam::after { width: var(--r); height: var(--r);
  transition: width .3s var(--e), height .3s var(--e) }
.tab { --r: 3px } .tab.is-open { --r: 16px }
```
⚠ Size the disc `farthest-side` rather than repeating the property inside the
gradient — an explicit radius snaps to its new value while the box is still
growing, and the seam flashes mid-transition.
