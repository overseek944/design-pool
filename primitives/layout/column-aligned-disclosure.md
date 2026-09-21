---
id: column-aligned-disclosure
category: layout
tags: [layout,grid,disclosure,alignment,native]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 5
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

A summary that carries a subtitle as well as a title has no single row to
centre on. `align-items: center` floats the open/close glyph into the middle of
a two-line block, where it reads as belonging to neither line and moves
vertically as the subtitle rewraps; `baseline` locks it to the title's first
baseline and it stops moving at all. Same argument for any enumerator or status
chip in the row. The glyph is decoration on a control that already announces
its own state, so it takes `aria-hidden`.
```css
summary { display: flex; align-items: baseline; justify-content: space-between }
summary > .marker { flex-shrink: 0; transition: rotate .2s }
details[open] > summary > .marker { rotate: 45deg }   /* + becomes × */
```
⚠ `baseline` on a flex item whose own content is a block stack aligns the
*first* line inside it, which is the behaviour wanted here and the wrong one if
the title is ever moved below the subtitle.
