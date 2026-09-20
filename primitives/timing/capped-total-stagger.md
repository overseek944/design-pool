---
id: capped-total-stagger
category: timing
tags: [motion,sequencing,scale]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
For unknown-length collections use `stagger:{amount}` not `stagger:<per-item>`.
Total choreography time stays fixed whether there are 6 items or 60.

A list that never ends — infinite scroll, a stream, anything appending after
first paint — cannot cap the *total*, because there is no total. Cap the
*index* instead: `delay = min(i, 6) * step`, so the seventh item and the
seven-hundredth arrive together and no reader ever waits on a queue that grew
behind them. Ceiling 5–8 slots, step inside the sibling band.
```css
.item { animation-delay: var(--arrive-delay, 0s); animation-fill-mode: backwards }
```
The delay belongs on a custom property with a `0s` default, so one class serves
both the staggered grid and the single item rendered on its own.

Where no index reaches the markup — server-rendered rows, a static list, a
collection the stylesheet sees but the script never touches — the same cap is
pure CSS: a short ladder of `:nth-child()` delays closed by an
`:nth-child(n+N)` rule that catches every remaining sibling at the ceiling.
`backwards` is what holds the pre-delay frame; without it every row paints
settled first and then jumps back to start.
```css
.row              { animation: in .24s var(--ease) backwards }
.row:nth-child(2) { animation-delay: 30ms }   /* … through the ceiling … */
.row:nth-child(n+8) { animation-delay: .21s }
```
