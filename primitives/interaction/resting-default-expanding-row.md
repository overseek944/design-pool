---
id: resting-default-expanding-row
category: interaction
tags: [interaction,state,hover,accessibility,layout]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
A row of panels that expand only on hover says nothing at rest — the reader must
find the interaction before the row has content. Give one member the expanded
state as its resting default and let the row hand it over: while any sibling is
hovered, the default collapses. Exactly one panel is open at every moment, no
script holds the state, and naming `:focus-visible` in the same selector list
gives the keyboard an identical path. Grow 2.5–3 against 1, handed over
across 0.8–1.2s so the row redistributes rather than switches.

```css
.card.is-open, .card:focus-visible { flex-grow: 2.7 }
@media (hover: hover) { .card:hover { flex-grow: 2.7 }
  .row:hover .card.is-open:not(:hover) { flex-grow: 1 } }
```
⚠ The handover rule must stay inside `hover: hover`, or a touch tap leaves the
default collapsed with nothing open. Below the breakpoint, stack and open all.

Where the open panel is *chosen* rather than hovered, the track list is the
better state-holder: publish the whole `grid-template-columns` value as one
custom property and let the row transition that property. One write moves every
column, the ratios stay readable as a set, and touch gets the same path as the
pointer because nothing depends on `:hover`. Expanded 2.4–3fr against 0.5–0.7.
```css
.row { display: grid; grid-template-columns: var(--cols);
  transition: grid-template-columns .55s cubic-bezier(.32,.72,.25,1) }
```
⚠ Either mechanism reflows its children every frame of the change. Whatever is
inside a collapsing column must be laid out at a width that does not depend on
the column — `overflow: clip` plus `nowrap` or a truncating line — or the text
rewraps on every frame, which is both the cost and the visible jitter.

Collapsing every inactive member to the same ratio gives a wide panel beside a
row of identical slats. Decay the ratio by distance from the active index
instead — 0.6–0.7 of the previous step, floored so the far end stays a target —
and the row reads as receding: the immediate neighbours keep enough width to
show what they are, and the tail states how much is left without claiming to be
readable. Active 2.5–3.5, first neighbour 0.5–0.6, floor 0.10–0.14.
```js
const ratio = i => i === active ? 3
  : Math.max(.12, .55 * 0.65 ** Math.abs(i - active))
```
⚠ Only reads as recession if the floor is reached within four or five steps;
past that the tail is uniform again and the decay is invisible. Ratios divide a
fixed width, so every member added narrows the active one — cap the count or
give the row a per-member minimum.
