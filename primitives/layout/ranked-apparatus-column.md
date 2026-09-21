---
id: ranked-apparatus-column
category: layout
tags: [layout,grid,metadata,responsive,editorial,hierarchy]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
Section apparatus — an ordinal, a two-word gloss, a mark — belongs beside the
reading column rather than inside it: give it a third track of 12–18% so the
measure never widens to carry annotation. Degrade it by rank, not by
visibility. The mark goes first; then the track reflows under the copy, at its
own breakpoint rather than the layout's; the words never go at all. Hiding the
track instead costs a fact the copy does not restate.

```css
.row  { display: grid; grid-template-columns: 36% minmax(0,1fr) 16%; gap: 3rem }
@media (width <= 60rem) {
  .row  { grid-template-columns: 38% minmax(0,1fr) }
  .meta { grid-column: 2 }  .meta svg { display: none } }
```
⚠ Only the mark is decoration a reader can lose — `aria-hidden` that alone and
leave the ordinal and gloss in the flow. A track narrower than ~11% wraps a
two-word gloss to three lines and starts reading as a failure rather than as
apparatus.

Re-placing the track's children is one answer; authoring the apparatus twice is
the other, and it is the right one where the two positions are not the same
element in two places but two different treatments — a bare ordinal hanging in a
gutter, a labelled ordinal sitting above the heading with its own spacing. No
`grid-column` to restate, no auto-placement to fall foul of, and each copy is
styled for the width it serves. The cost is a fact written in two files' worth
of markup: they drift, and the page then disagrees with itself about what
section this is. Worth it for a glyph, never for a gloss.
```css
.ord--gutter { display: none }
@media (width >= 48rem) { .ord--inline { display: none }
                          .ord--gutter { display: block; grid-column: 1 } }
```
⚠ Both copies exist at every width — only `display: none` keeps the hidden one
out of the accessibility tree and out of the text a reader copies. Generate the
pair from one value rather than typing the number twice.
