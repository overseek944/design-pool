---
id: cross-card-band-alignment
category: layout
tags: [layout,grid,subgrid,cards,hairline,datasheet,alignment]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 2
seen: 10
requires: []
conflicts: []
completes: []
tension: []
---
A row of cards aligns at its outer edges and nowhere else: each card's internal
rules — under the header, above the footer — land at a different height, and the
set reads as three cards rather than one datasheet. Make the row a grid with
named rows and give every card `grid-row: span N` plus `grid-template-rows:
subgrid`. Each band then sizes to the tallest content across the row, so the
hairlines run straight through. 3–5 bands; past that the shortest card is mostly
air.

```css
.row  { display: grid; grid-template-columns: repeat(3, 1fr);
        grid-template-rows: auto auto 1fr auto }
.card { grid-row: span 4; display: grid; grid-template-rows: subgrid }
```
⚠ Subgrid needs the card to be a direct grid child — any wrapper between row and
card breaks it silently. The no-support fallback is one fixed band height,
140–200px, which aligns but starves the shortest content.

Write the no-subgrid fallback band in `em` of the heading's own leading rather
than in pixels: `2.6em` against `line-height: 1.3` is exactly two lines, so the
reservation re-solves when the type scale moves and never clips a third. Then
release it at the breakpoint where the row stacks to one column — there is
nothing left to align against, and the reserved space becomes a visible hole
under every short title. 2–3 lines.
```css
.card h3 { line-height: 1.3; min-height: 2.6em }
@media (width <= 48rem) { .card h3 { min-height: 0 } }
```
⚠ An em floor is a floor, not a clamp: a title running to three lines still
pushes its own card's band down, and only subgrid drags the others with it.

`lh` states the reservation exactly where `em` states it arithmetically:
`min-height: calc(2lh + 16px)` is two lines plus the box's own padding, and it
re-solves when leading changes without anyone recomputing `2 × 1.3`. Declare a px
value first and the `calc` second so engines without the unit keep the old floor.
The padding term is not optional under a global `border-box`.
```css
figcaption { padding: 8px 10px; min-height: 50px; min-height: calc(2lh + 16px) }
```
⚠ Worth the reservation only where the element is *bottom*-anchored in its card —
`margin-top: auto` — because there a caption wrapping to one more line lifts its
own figure and breaks the row's shared edge. Top-anchored captions just run longer
and align fine.

A ruled *list* inverts the release above. When a row of cards stacks there is
nothing left to align against, but a column of hairline-separated rows is still
aligning: its rhythm is the run of rules down the page, and entries of unequal
length make that ragged at every width. The count therefore rises as the column
narrows rather than going to zero — copy setting two lines at a full measure
sets four at 390px.
```css
.row p { min-height: 2lh }
@media (width <= 38rem) { .row p { min-height: 4lh } }
```
⚠ Take the count from the longest entry at each width, not the average: a floor
set by the mean leaves the one long row still pushing its own rule down, which
is the only ragged edge anyone notices.

The 3–5 ceiling is about *optional* bands. Where every card in the set carries
every field — a price row, a spec sheet, a comparison — the shortest card has
no air to gain and the count runs to 8–9 without a hole in it, each band one
named field rather than a slot that may be empty. Audit it from the other end:
a band left blank on any single card is a band to merge or drop, whatever the
total.
```css
.row  { grid-template-rows: repeat(8, auto) }
.card { grid-row: span 8; display: grid; grid-template-rows: subgrid; row-gap: 0 }
```
⚠ One `1fr` in the parent's row list hands all the slack to that band and the
others sit hard against each other; with every band `auto`, the card's own end
padding is the only thing keeping the last row off the edge.

Where only the *last* band must line up — a resolution line under copy of
varying length — the fallback is cheaper than a reserved height: make the card
a column flex box and give that band `margin-top: auto`. It bottom-aligns
exactly, starves nothing, and needs no number to retune. The catch is that it
is only ever a fix for the multi-column case; once the row stacks, every card
is its own column and `auto` pushes the line to the bottom of a box that no
longer has a sibling to match. Scope both branches to the same min-width the
grid uses.
```css
@supports not (grid-template-rows: subgrid) {
  @media (width > 47.5rem) { .card { display: flex; flex-direction: column }
                             .card .last { margin-top: auto } } }
```
⚠ Two branches now share one breakpoint — publish it as a token, or a change to
the stacking width silently leaves one of them aligning against nothing.
