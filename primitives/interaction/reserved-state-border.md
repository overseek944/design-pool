---
id: reserved-state-border
category: interaction
tags: [accessibility,focus,cls,border,correctness]
axes: none
cost: 1
seen: 3
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
