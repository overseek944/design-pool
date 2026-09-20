---
id: argued-column-as-surface
category: layout
tags: [layout,table,comparison,surface,contrast,hierarchy]
axes: {energy: 1, density: 3, weight: 4, finish: 5}
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
In a comparison matrix the column you are arguing for should be a surface, not
a run of highlighted cells: give every cell in it — header included — the
inverted ground, and let the wrapper's radius and `overflow: hidden` clip it,
so it runs edge to edge as a panel the eye reads before any single row. Then
give the marks three tonal registers rather than two: absent at 25–35% ink,
present-elsewhere at mid, present-here at full on the panel.

```css
.matrix :is(th, td):nth-child(4) { background: var(--ink); color: var(--paper) }
.matrix { border-collapse: collapse }        /* wrapper: overflow:hidden; radius */
```
⚠ A tinted column is not a claim a screen reader can hear — the header still
has to say which product it is. `border-collapse: separate` leaves gaps that
break the panel into stripes.

A full inversion forces a second ink, a second link colour and a second focus
ring inside one table. Where the matrix is long enough that an inverted panel
would own the page, wash instead: the accent at 6–10% over the page ground,
carried through the header cell, with only that header set in the accent's
darkened text value. The column still reads as one surface because the wash is
continuous down it, and every cell keeps the ink it already had — one contrast
pair to verify rather than two.
```css
.matrix :is(th, td).argued { background: color-mix(in srgb, var(--accent) 7%, var(--ground)) }
.matrix thead th.argued    { color: var(--accent-text) }   /* ≥4.5:1 on ground */
```
⚠ A wash that faint is easy to leave unchecked. Body text over the tinted cell
is a different pair from body text over the ground — verify both, and keep the
tint under 12% or the ink on it has to change after all.

The panel does not have to be made of cells at all. Let one custom property own
the column width, set `table-layout: fixed`, then place a single absolutely
positioned overlay across the full height at `right: calc(var(--col) * n)` —
wash, border, corner marks and all — with `pointer-events: none`. The surface is
now one element rather than a cell in every row, so `border-collapse: separate`
and per-row rules no longer stripe it, re-ordering columns is one number, and
the decoration never has to be kept in sync with the markup that carries the
data.
```css
table { table-layout: fixed }  .col { width: var(--col) }
.sheet { position: absolute; inset-block: 0; right: calc(var(--col) * 3);
         width: var(--col); pointer-events: none; background: var(--wash) }
```
⚠ It is decoration outside the table's semantics — the header still has to name
the column. An overlay indexed from the right breaks the moment a column drops
at a breakpoint; recompute the multiplier with the column count, or hide it.
