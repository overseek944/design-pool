---
id: char-opacity-drift
category: reveal
tags: [type,motion,reveal,ambient]
axes: {energy: 3, density: 4, weight: 2, finish: 5}
cost: 4
seen: 3
requires: []
conflicts: []
completes: [will-change-on-split-children, revert-split-on-resize]
tension: []
---
Per-character with opacity + small `y`, `will-change:opacity,transform,filter`.
Reads as material settling rather than text animating in. Expensive — one
element per page, and only for a headline under ~40 characters.

Tokenise to **words** where the line is longer than a few. Per-character on a
sentence is hundreds of animated nodes for a cue the eye reads as one wave
anyway; per-word is an order fewer, survives resize far better, and reads as
language arriving rather than letters assembling. Step 20–50ms per token —
well below the sibling band, because tokens are adjacent, not separate objects.

Add `filter: blur(2–4px)` to the from-state and the tokens resolve out of focus
rather than fading, which is what makes the settle read as material. Start the
opacity at `.001`, not `0`: a true zero lets the compositor discard the layer,
so the first frame arrives unblurred and pops.
```css
.tok { opacity: .001; filter: blur(3px); translate: 0 5px }
```
