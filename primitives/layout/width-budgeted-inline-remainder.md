---
id: width-budgeted-inline-remainder
category: layout
tags: [layout,responsive,overflow,navigation,measurement,observer,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A row of peers that must hold one line — filter chips, tool tabs — should not be
cut by a breakpoint, which guesses a count the content decides. Measure each
item's natural width once, accumulate width plus a gap, and stop at the first
overrun: the index reached is how many stay inline, the rest become a `+N` menu.
Re-run it from a `ResizeObserver` on the container so a translated label or a
zoomed reader moves the split instead of overflowing it.

```js
let used = 0, fit = 0
for (const w of widths) { const n = used + (fit ? gap : 0) + w
  if (n > port.clientWidth) break; used = n; fit++ }
```
⚠ Measure at natural width, never inside the already-shrunken row, or each pass
reads the last one's result and the count ratchets to zero. The remainder must
be keyboard-reachable and named by count.
