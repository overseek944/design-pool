---
id: ruled-definition-rows
category: layout
tags: [layout,type,metadata,responsive,hairline]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 1
seen: 17
requires: []
conflicts: []
completes: []
tension: []
---
Metadata reads as a datasheet when it is a list of label-to-value rows: label
left in the small mono tier, value hard right, one hairline between. Put the
rule on each item's top edge and close the list with a bottom rule so seams
never double. `space-between` plus wrapping degrades it to stacked pairs when
the row is too narrow — no breakpoint, no second markup.
```css
.spec { border-bottom: var(--hair) solid var(--line) }
.spec li { display:flex; flex-wrap:wrap; justify-content:space-between;
  gap:.5rem; padding-block:var(--row-pad,.75rem);
  border-top: var(--hair) solid var(--line) }
```
⚠ Row padding 8–16px. Values longer than three or four words wrap and the
second column stops reading as a column.

When the value is a figure rather than a phrase, invert it: figure in a fixed
first column of 100–130px, caption second, rows aligned on the baseline. The
numbers start on one vertical line instead of ragging to whatever length each
happens to be, and `white-space: nowrap` keeps a range like `40–50%` from
breaking across its dash.

A metric that reads value-first must still be `dt` then `dd` in the markup — the
content model requires it and the pair is announced in that order.
`flex-direction: column-reverse` inverts only the paint, so the figure sits
above its label with nothing reordered. Below the narrow breakpoint switch to
`row-reverse` on the baseline with a `min-inline-size` in `ch` on the value, and
a stack of three becomes a list whose numbers still start on one line.
```css
.metric { display:flex; flex-direction:column-reverse; border-top:1.5px solid var(--ink) }
@media (width <= 520px) { .metric { flex-direction:row-reverse; align-items:baseline }
  .metric dd { flex:none; min-inline-size:5ch } }
```
⚠ Safe only because neither part is focusable — reversing flow around
interactive children splits tab order from reading order.

`space-between` only resolves a two-part row. Add a third element — a leading
icon tile, a status chip — and the free space is redistributed between all of
them, so the label drifts and no two rows agree on where the middle starts.
Grid with a single elastic track instead: `auto 1fr auto` pins the leading
column to its widest member across every row, holds the figure hard right, and
puts all the slack in one place that carries no content.
```css
.row { display: grid; grid-template-columns: auto 1fr auto;
  align-items: center; column-gap: 20px; padding-block: 18px }
```
⚠ Rows must share a grid — or a fixed width on the lead column — for the icons
to line up. Sized per row, `auto` resolves to each row's own content and the
column reappears ragged.

A three-part row does not survive wrapping the way a two-part one does. Once the
value drops to its own line it returns to the row's left edge, under the marker
rather than under the label, and the list loses the single left edge that made it
read as a table. Give the wrapped part a start margin of exactly the marker's
width plus the gap, so it lands on the label's text — the rows stay a column
even when every one of them is two lines. Marker 6–8px, gap 10–14px.
```css
.row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap }
.row .meta { margin-inline-start: auto }
@media (width <= 26rem) { .row .meta { flex-basis: 100%; margin-inline-start: 19px } }
```
⚠ The indent is the sum of two other declarations — carry it as one custom
property both the gap and the margin read, or a marker resize silently
un-aligns every wrapped row.

Laid on its side, the same list becomes a title block: a fixed row of 4–7 equal
cells, label over value, each cell ruled on its right, the strip ruled top and
bottom — the page states its own specification at the foot of a hero. Below the
width where cells fall under ~14ch, keep it one row and let it scroll sideways
on proximity snap; a stacked title block stops reading as one.
```css
.titleblock { display: flex; overflow-x: auto; scroll-snap-type: x proximity;
  border-block: var(--hair) solid var(--line-strong) }
.titleblock > div { flex: 1 0 max(14ch, 100% / var(--cells, 6)); scroll-snap-align: start;
  border-right: var(--hair) solid var(--line) }
```
⚠ Hiding the scrollbar removes the only overflow cue — size cells so the last
visible one is visibly cut.

Laid out as an `auto-fit` grid of value-over-label cells, the closing trick
inverts: never cap the set with `li:first-child { border-top }` — it rules only
the first column, and the other columns of that row float with no top edge.
The column count is unknown under `auto-fit`, so no `:nth-child` can target the
first row; put the top rule on the list itself. Cell min 160–240px.
```css
.specs { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  border-top: var(--hair) solid var(--line) }
.specs li { border-bottom: var(--hair) solid var(--line) }
```

A leader turns the hairline from a seam between rows into a path within one: a
flex child between label and value, `flex: 1` with a 60–100px `min-width`, its
height equal to the row's line-height so a centred 1px rule sits on the text's
mid-line. The eye travels label → value along it instead of across empty space.
The `min-width` is what decides when to give up: below it the row wraps, and
under ~30rem stack the pair outright and drop the leader.
```css
.row { display:flex; align-items:flex-start; gap:.5rem; line-height:1.5rem }
.row .leader { flex:1; min-width:80px; height:1.5rem; display:flex; align-items:center }
.row .leader::before { content:""; flex:1; border-top:var(--hair) solid var(--line) }
```
⚠ The leader is decoration — `aria-hidden` it, and keep the pair as `dt`/`dd`.
