---
id: live-dimension-callout
category: layout
tags: [layout,chrome,annotation,measurement,technical]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
Annotate the frame with its own measurements and a page reads as a drawing
rather than a document. A hairline inset from the edge, interrupted at its
midpoint by a figure and closed by short witness ticks at both ends — the
dimension-line convention — recomputed on resize from `innerWidth * 25.4 / 96`.
Ease the number toward its target and stop the loop once it arrives, so a drag
reads as an instrument rather than a strobe. Inset 0.5–1.5rem, figure
0.6–0.7rem.

```css
.dim    { position: fixed; inset-inline: 1.5rem; bottom: .5rem; display: flex;
          align-items: center; gap: .75rem; pointer-events: none }
.dim i  { inline-size: 1px; block-size: .5rem; background: var(--tick) }
.dim hr { flex: 1; block-size: 1px; border: 0; background: var(--hair) }
```
⚠ The figure is nominal, not physical — no browser knows the panel's real size
— so it is a register, not a measurement. `tabular-nums` with a fixed decimal,
`aria-hidden`, and drop the layer entirely below the width where it crosses
content.

The same convention on geometry that turns is three more decisions. Offset the
dimension along the projected edge's 2D normal, flipping the sign so it always
falls away from the scene's centre rather than across the form. Rotate the
figure to the line's angle, folded back through 180° so it never reads upside
down. And drop the whole dimension once the projected length falls under
roughly 24px — a foreshortened edge collapses its ticks, its line and its
number into one illegible knot, and a dimension that is wrong is worse than one
that is absent. Offset 20–40px.
```js
let nx = -dy / L, ny = dx / L                        // projected edge normal
if (nx * (mx - CX) + ny * (my - CY) < 0) { nx = -nx; ny = -ny }
g.setAttribute('opacity', L < 24 ? 0 : 1)
```
⚠ Fade the collapse rather than switching it — an edge sitting at the threshold
flickers through it on every frame of a slow turn.
