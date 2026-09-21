---
id: reserved-state-border
category: interaction
tags: [accessibility,focus,cls,border,correctness]
axes: none
cost: 1
seen: 6
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
