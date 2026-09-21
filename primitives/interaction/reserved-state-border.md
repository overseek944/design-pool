---
id: reserved-state-border
category: interaction
tags: [accessibility,focus,cls,border,correctness]
axes: none
cost: 1
seen: 11
requires: []
conflicts: []
completes: []
tension: []
---
A control that gains a border on focus or selection must carry that border
transparent at rest. Added on the state alone it grows the box the instant it is
touched — the label shifts and the whole row moves with it. `background-clip`
then decides what the reserved band shows: `border-box` paints the fill under it
and the swap is seamless, `padding-box` leaves a hairline of the ground and the
control reads as inset. Reserve 1–2px.

```css
.btn { border: 1px solid transparent; background-clip: padding-box }
.btn:focus-visible { border-color: var(--ring); outline: 3px solid var(--halo) }
```
⚠ Forced-colors mode repaints every border, so the reserved one becomes visible
there. Check it before shipping a `padding-box` reservation.

The other way to keep a border out of the layout is to not put it in the box.
An `::after` at `inset: 0` with `border-radius: inherit` draws the same rule
from outside flow entirely — nothing to reserve, nothing to compensate — and
per-side widths collapse to four custom properties, so one rule serves every
combination. It is what a border that animates, or covers two sides only, or
sits on a grid item whose track is sized from its content actually needs. The
box takes `position: relative`; widths 1–3px.
```css
.box::after { content: ""; position: absolute; inset: 0; pointer-events: none;
  border: 0 solid var(--rule); border-radius: inherit; corner-shape: inherit;
  border-width: var(--bt, 0) var(--br, 0) var(--bb, 0) var(--bl, 0) }
```
⚠ `border-radius: inherit` matches only at `inset: 0` — pull the overlay out by
n and every corner needs radius + n. Inherit `corner-shape` as well, or a
squircle parent gets a circular-arc rule that is visibly wrong at the corners.

A marker on *one* edge — the rail saying which row is selected — needs neither
reservation nor an overlay. `box-shadow: inset` paints inside the padding box,
so it costs no layout, no pseudo-element and no `position: relative` on the
row. It is also the form that survives `border-collapse`, which arbitrates a
`border-inline-start` against the neighbouring cell's own border and can drop
it. Rail 2–4px.
```css
.row[aria-selected="true"] { box-shadow: inset 2px 0 0 var(--ink) }
```
⚠ The rail paints *over* the padding rather than beside it, so give the leading
cell at least its width of inline-start padding or the text sits on the mark.

The same clip decision governs a border that is permanently *translucent*
rather than transparent: `border-box` blends it against the control's own fill,
`padding-box` against the ground behind it. Which one is right flips with the
theme — a pale fill on a pale page wants the ground blend to stay visible, a
dark fill on a dark page wants the fill blend or the edge reads as a gap.
```css
.btn      { border: 1px solid #ffffff14 }
:root:not(.dark) .btn { background-clip: padding-box }
```
⚠ `padding-box` with a rounded corner leaves the fill short of the border's
inner curve — a hairline of ground appears at each corner before it does along
the sides. Check the corners, not the edges.
