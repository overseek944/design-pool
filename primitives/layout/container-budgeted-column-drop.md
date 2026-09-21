---
id: container-budgeted-column-drop
category: layout
tags: [layout,container-query,table,responsive,accessibility,correctness]
axes: none
cost: 2
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
A dense row carries more columns than a narrow container can hold, and sliding
it sideways is not always the right answer. Name every cell with a `data-col`
attribute, let a container query drop the ones that are *context* rather than
identity, and restate the dropped fact inside the surviving primary cell from an
element that is clip-hidden above the same threshold. One markup, no second
row, and the fact is never both hidden and lost. Budget roughly two columns out
at ~52rem, down to one column plus a trailing action at ~32rem.

```css
.rows { container-type: inline-size }
@container (width <= 52rem) {
  .row { grid-template-columns: minmax(0,1fr) auto }
  [data-col=tier], [data-col=protocol] { display: none }
  .row-restated { position: static; clip: auto; width: auto; height: auto }
}
```
⚠ Hidden and visible must be exclusive at every width — the same threshold in
both rules — or a screen reader announces the value twice.

Where the row is a step indicator rather than data, the threshold can be
measured instead of chosen. Restore every cell, ask the track whether it still
overflows — `scrollWidth > clientWidth + 2` — and only then reduce, keeping the
current step and dropping its neighbours. The gate is the real content at the
real width, so a long label in one language collapses a row that a breakpoint
would have let overflow.
```js
cells.forEach(c => c.style.display = '')
if (track.scrollWidth > track.clientWidth + 2)
  cells.forEach((c, i) => { if (i !== current) c.style.display = 'none' })
```
⚠ Restore before measuring or the second pass reads the collapsed width and the
row never expands again. It forces layout — run it from the same debounced
relayout as every other measurement, not per frame.

Where every cell is identity rather than context — a log line's clock, actor,
hook, verdict and object — there is no column to drop and the budget has to be
paid in width. Narrow the fixed tracks, step the row's type down one notch, and
keep the tail on `minmax(0,1fr)` with an ellipsis so truncation lands on the one
field that survives it. Roughly a fifth off the tracks and .05–.08rem off the
type carries a five-column row to 390px.
```css
@media (width <= 35rem) { .row { font-size: .62rem;
  grid-template-columns: 60px 80px 80px 52px minmax(0, 1fr) } }
```
⚠ Every cell needs `min-width: 0` and the tail needs `overflow: hidden`. One
unbreakable path in the last column otherwise widens the whole grid past its
container instead of clipping inside it.

Fold rather than drop where every cell is wanted and the row has a natural
primary/secondary pairing. Keep the grid, take the template to two columns and
two rows, and place each cell explicitly: identity and headline value on line
one, qualifier and secondary value on line two, right edges still aligned. No
cell is lost, so nothing has to be restated — but the header row now labels
only two of four, and a dropped column's unit has to travel with its value.
```css
@media (width <= 35rem) {
  .row { grid-template-columns: minmax(0,1fr) auto; grid-template-rows: auto auto }
  .row > .route { grid-column: 1; grid-row: 2 }
  .row > .count { grid-column: 2; grid-row: 2 }
  .row > .count::after { content: " tokens" }
}
```
⚠ Generated content is not findable, not translatable and unevenly announced —
fine for a unit the number already implies, wrong for the value itself.
