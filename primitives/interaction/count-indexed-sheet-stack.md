---
id: count-indexed-sheet-stack
category: interaction
tags: [sheet,overlay,stack,gesture,depth,transform]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 3
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A stack of sheets needs one number, not a state machine: how many sit in front.
Scale back and peek out a fixed step per level, then subtract the
front sheet's live dismiss progress from that count, so the stack unwinds under
the gesture and not at its end. Scale and offset are coupled — a layer scaled
about a pinned edge moves its far edge by `(1 − scale) × height`, and the offset
must carry that term or the layers bunch as the stack deepens.
Step 0.03–0.07 scale, 8–20px peek per level.

```css
.sheet { --d: calc(var(--depth) - clamp(0, var(--swipe), 1));
         --s: max(0, calc(1 - var(--d) * .05));
  transform-origin: bottom;
  transform: translateY(calc(var(--d) * -12px - (1 - var(--s)) * var(--h)))
             scale(var(--s)) }
```
⚠ Only the front sheet may be interactive — `inert` the rest, or a scaled-back
layer keeps taking focus behind the one in use.
