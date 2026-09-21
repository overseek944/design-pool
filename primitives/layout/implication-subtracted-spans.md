---
id: implication-subtracted-spans
category: layout
tags: [intervals,annotation,data,correctness,architecture]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Independent detectors flag overlapping ranges, and drawn as they arrive the
same moment is inked two or three times — the reader cannot tell which cause is
the specific one. Rank the kinds by specificity and subtract every higher-ranked
range out of those below it, so each moment is claimed by its narrowest true
cause. Subtraction splits ranges; drop fragments under the display's own floor,
0.3–1% of the axis or roughly two pixels, or the result is a row of specks
nothing can point at.

```js
let parts = [[lo, hi]]
for (const m of masks) parts = parts.flatMap(([a, b]) =>
  m.hi <= a || m.lo >= b ? [[a, b]]
  : [[a, m.lo], [m.hi, b]].filter(([x, y]) => y - x > FLOOR))
```
⚠ Counts and totals must be taken after the subtraction, not from the raw set,
or the key and the picture disagree about how much of the axis a kind covers.
