---
id: phase-offset-as-sequence
category: timing
tags: [motion,sequencing,rhythm,ambient,css]
axes: {energy: 3, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: [non-linear-loop-periods]
---
Same period, different phase. Give every looping indicator in a stack one
duration and offset each group by a fixed fraction of it, and four independent
animations read as a single thing travelling through them — a request
descending a pipeline rather than four meters idling. Index the
children of a group with an inline `--i` and step 0.10–0.14s; offset the groups
0.6–1.2s, always well inside the period.
```css
.bar { animation: pulse 3.6s infinite; animation-delay: calc(var(--i) * .12s) }
.row-2 .bar { animation-delay: calc(1s + var(--i) * .12s) }
```
⚠ Once the group offsets sum past the period the sequence wraps and the stack
reads bottom-up. Keep the last offset under roughly two thirds of it.
