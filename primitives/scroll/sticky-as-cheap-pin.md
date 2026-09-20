---
id: sticky-as-cheap-pin
category: scroll
tags: [scroll,layout,performance]
axes: {energy: 1, density: 2, weight: 2, finish: 3}
cost: 1
seen: 12
requires: []
conflicts: []
completes: []
tension: []
---
`position: sticky` for anything that only needs to hold position — no JS, no
layout recalculation, no pin-spacer. Reserve library pinning for cases that
genuinely need a scrubbed timeline.

Write the offset against the chrome, never as a literal: `top: calc(var(--chrome)
+ var(--gap))` where `--chrome` is the same token the fixed header is sized
from. A banner appearing above the header then moves every sticky element with
it instead of sliding half of them underneath. Gap 16–64px.

A run of siblings that each stick will all pin to the same line and hide each
other. Step the offset by index and they fan into a visible deck instead —
`top: calc(var(--chrome) + var(--i) * var(--step))`, the index written inline
per card, `transform-origin: top` so any scale reads as depth. No observer, no
measurement, and the deck's total travel is the section's own height. Step
16–32px across 3–5 cards; past that the last card parks below the fold.
```css
.card { position: sticky; top: calc(var(--chrome) + var(--i, 0) * 24px) }
```
⚠ Release it below the breakpoint where the deck outgrows the viewport —
`position: relative` and `top: auto` together, or the cards pin at their offsets
inside a column too short to scroll them apart.

The other resolution of that collision is to let them collide. Give every
sibling the *same* offset, an opaque ground and an ascending `z-index`, and each
one covers the one before it: the section reads as a single frame whose contents
are replaced, and it costs no viewport height, so the count is unbounded where a
fanned deck stops at four or five. Bottom padding on each row, not a gap on the
track, is what sets the dwell.
```css
.row { position: sticky; top: var(--chrome); z-index: var(--i); background: var(--ground);
       padding-bottom: 64px }   /* dwell 48–128px */
```
⚠ A transparent ground shows every earlier row through the current one. The
stack is also invisible to anyone not scrolling — give the rows a document order
that still reads as a list with the stickiness released.
