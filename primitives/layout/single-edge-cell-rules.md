---
id: single-edge-cell-rules
category: layout
tags: [layout,grid,hairline,rules,precision]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 1
seen: 35
requires: []
conflicts: []
completes: []
tension: []
---
In a ruled grid every interior line is drawn by both neighbours and reads at
double weight. Give each cell only its right and bottom edge, then let the
container supply the missing top and left from a pseudo-element pulled out by
exactly one line width. Every rule in the field is then the same hairline,
frame included, and the cells still tile with no gap.

```css
.cell   { border-right: var(--hair) solid var(--rule);
          border-bottom: var(--hair) solid var(--rule) }
.field  { position: relative }
.field::before { content: ""; position: absolute; inset: 0; pointer-events: none;
  top: calc(-1 * var(--hair)); left: calc(-1 * var(--hair));
  border: var(--hair) solid var(--rule) }
```
⚠ `--hair` 1px for a ruled field; `.5px` drops out on non-retina, 2px stops
reading as a rule and starts reading as a box.

Inverse solution — paint the field background in the rule colour and open a
`gap` of one hairline between opaque cells. The gaps *are* the rules: no
doubling, no pseudo-element. Costs a frame border; fails on a transparent cell.

A single strip needs neither trick: `.col + .col { border-left }` rules every
pair and nothing outside. Flip the axis to `border-top` wherever the strip
stacks, or every separator collapses onto one edge.

The `+` form survives stacking but not *reflow*. A four-across strip dropped to
two columns still matches `+` on the item starting each new row, so a rule
appears down the middle of the grid's left edge. Clear it by row width —
`:nth-child(2n+1) { border-inline-start: 0 }` at that breakpoint — or the trick
that was exact at one width is wrong at every other.

The gap form's frame cost disappears where the field was going to be a plate
anyway: give the container `overflow: hidden`, one hairline border and a
radius, and the interior rules terminate on the curve instead of running into a
corner already cut away. The border owed is the plate's own. Radius 1–2rem
against a 1px gap — tighter and the corner cells lose more area to the clip
than the rule saves.
```css
.field { display: grid; gap: var(--hair); background: var(--rule);
  border: var(--hair) solid var(--rule); border-radius: 1.5rem; overflow: hidden }
.field > * { background: var(--cell) }
```
⚠ The clip cuts what a cell paints outward as well — a focus ring or a hover
lift on an edge cell is sliced by the frame. Inset the ring with a negative
`outline-offset` rather than dropping the clip.

Rules selected by `nth-child` do not survive a column-count change. `:nth-child(odd)`
means "left column" at two up and nothing at all at one, so a field that ruled
correctly on a desktop grows a stray interior line down the side of a stacked
list and loses its closing edge. Derive the edges from the count instead — one
custom property the media query rewrites, `nth-child(<count>n)` for the trailing
column and `nth-last-child(-n + <count>)` for the final row — or accept that
every collapse needs a full reset block, which is where the rule that was
forgotten always is.
```css
.field { --cols: 2 }
@media (width <= 48rem) { .field { --cols: 1 } }
.cell:nth-child(2n) { border-right: 0 }     /* restated per breakpoint */
```
⚠ `nth-child` takes no `var()`, so the count cannot actually be read from the
property — it is a label for the breakpoint, and the selectors still have to be
written twice. Where the field is a real grid, `grid-column: <last>` or `:has()`
on the row is the version that genuinely tracks the count.

Open the gap past a hairline — 8–16px — and the same inversion stops being a
rule system and becomes mortar: the field's fill is seen only through its own
negative space, so a gradient laid on the container arrives as a frame plus a
set of gutters whose colour drifts across the field, with no border drawn
anywhere. The container's padding has to equal the gap exactly or the frame is a
different width from the interior and the whole thing reads as a mistake. One
cell left transparent then becomes a window onto the fill rather than a hole in
the field — the cheapest way to let a grid of otherwise plain cards carry
colour.
```css
.field { display: grid; gap: var(--mortar); padding: var(--mortar);
  background: linear-gradient(240deg, var(--a), var(--b)); border-radius: 1rem }
.field > * { background: var(--cell);
  border-radius: calc(1rem - var(--mortar)) }
```
⚠ At mortar width the fill is judged entirely by what shows in a 12px band, so a
gradient whose stops are close in value reads as a flat frame and the effect is
paid for and not seen. Cells take the outer radius less the mortar or the
corners disagree.
