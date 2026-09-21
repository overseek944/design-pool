---
id: argued-column-as-surface
category: layout
tags: [layout,table,comparison,surface,contrast,hierarchy]
axes: {energy: 1, density: 3, weight: 4, finish: 5}
cost: 1
seen: 8
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

The same inversion runs down a stack of peer rows, where it marks the one step
that carries the claim rather than the one column being argued for — the
inverted row reads before the others are read at all, so the set states its
point before anything in it is parsed. The ceiling is exactly one: a second
inverted row turns an emphasis into two groups, and the reader starts looking
for a rule separating them.
```css
.step[data-key] { background: var(--ink); color: var(--paper) }
```
⚠ Inversion is not a state a screen reader can hear, and the row is usually the
one carrying the number the page is selling — say it in the text.

The same treatment on the *label* column makes a different argument: recess the
row headers — their own inset rounded surface, a half-step tint, inside the
table's clip — and the matrix gains a spine rather than a winner. Every data
column then sits on the page ground as an equal, which is the right structure
where the comparison is genuinely open or where one product is not being sold.
Radius one step under the wrapper's; tint 3–6%.
```css
.matrix th[scope="row"] { background: var(--inset); }
.matrix tr:first-child th[scope="row"] { border-start-start-radius: var(--radius-inner) }
```
⚠ A recessed spine and an inverted argued column in one table cancel — the eye
reads two panels and no claim. Pick one.

Where the matrix is built from opaque cells over a rule-coloured ground — the
grid whose `gap` *is* its hairlines — none of the above is available: a lift, a
shadow or a scale breaks the seams the construction depends on, and an inverted
fill closes the gap on both sides of the column. Mark it by receding instead.
Drop the argued cell to the page ground while its peers hold the surface tint,
and replace the two seams it shares with an accent rule of the same width the
gap already reserved. The column changes depth and colour without changing one
dimension, so the field stays seamless. Rule 2–3px against a 1px gap.
```css
.grid   { display:grid; gap:1px; background:var(--rule); overflow:hidden }
.cell   { background: var(--surface) }
.argued { background: var(--page); box-shadow: -2px 0 var(--accent), 2px 0 var(--accent) }
```
⚠ The rails paint outside the cell box, so the first or last column loses one
to the wrapper's `overflow`. Keep the argued column interior, or inset the
wrapper's border by the rail width.
