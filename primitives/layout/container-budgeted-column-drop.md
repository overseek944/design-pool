---
id: container-budgeted-column-drop
category: layout
tags: [layout,container-query,table,responsive,accessibility,correctness]
axes: none
cost: 2
seen: 2
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
