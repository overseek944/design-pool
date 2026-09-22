---
id: row-borne-quantity-fill
category: surface
tags: [surface, data, list, density, ground, accessibility]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---

A ranked list and its bar chart need not be two columns. Make the row its own
track: a pale fill against the row's inset, width from the value, under a
`position: relative` content layer. `overflow: clip` hands the fill the row's
radius, so quantity reads as the row's ground and not as a mark beside the
label. Fix every right-hand column's width and set `tabular-nums` or the figures
shuffle as fills differ. Fill 8–18% of the accent, widest at 60–75%.

```css
.row  { position: relative; overflow: clip; border-radius: .75rem }
.fill { position: absolute; inset-block: 0; inset-inline-start: 0; width: calc(var(--v) * 1%) }
```
⚠ The fill is a second ground under the label — score the ink against it, not
against the row. It states a quantity in colour alone: print the figure in the
row as well, or give the row `role="meter"` with `aria-valuenow`/`-min`/`-max`.
