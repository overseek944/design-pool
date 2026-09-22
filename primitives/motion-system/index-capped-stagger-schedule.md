---
id: index-capped-stagger-schedule
category: motion-system
tags: [stagger,entrance,reveal,performance,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A delay of `index × step` is linear in a list whose length the design does not
control: at 40ms a step the twentieth card waits 800ms and the fortieth is
still blank when the reader arrives at it. Cap the index inside the `calc` —
the opening few land in order, everything past the cap arrives together, and a
reader below the fold sees the same thing either way. Pair it with a prefix
selector so the tail carries no animation at all. Cap 4–8, step 30–60ms.

```css
.cell:nth-child(-n+8) { animation: rise var(--dur) var(--ease) both;
  animation-delay: calc(min(var(--i, 0), 5) * 40ms) }
```
⚠ The cap must clear the count visible in one row at the widest breakpoint, or
a full first row arrives as a single block and the sweep disappears at exactly
the width it was tuned for.
