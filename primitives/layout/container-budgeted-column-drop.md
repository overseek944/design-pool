---
id: container-budgeted-column-drop
category: layout
tags: [layout,container-query,table,responsive,accessibility,correctness]
axes: none
cost: 2
seen: 1
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
