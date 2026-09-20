---
id: column-aligned-disclosure
category: layout
tags: [layout,grid,disclosure,alignment,native]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Let a `<details>` row sit on the page's column grid: make the `<summary>` a grid
of the same track count, park the enumerator in a gutter column and the
open/close glyph in the last one. The panel is a *sibling* of the summary, so it
cannot inherit those tracks — indent it by one column expressed as a percentage
and it lands under the question with no nested grid and no magic number.

```css
summary { display: grid; grid-template-columns: repeat(var(--cols,12), 1fr);
  gap: 1rem; list-style: none; cursor: pointer }
summary::-webkit-details-marker { display: none }
details > :not(summary) { padding-inline: calc(100% / var(--cols,12)) }
```
⚠ Percentage padding resolves against the `<details>` box, not the page grid —
true only while the row spans the full grid width. Drop the indent to zero
somewhere in 640–768px.
