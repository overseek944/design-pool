---
id: cross-face-instance-coda
category: type
tags: [type,card,hierarchy,register,evidence,cheap]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

Cards that each name a general category read as a list of claims. Close each
with one concrete instance under a hairline, set in the display face's italic at
a muted step, and the row reads as argued: upright sans states the rule, italic
serif is the case. Coda 0.95–1.05× body size, rule 1px at 20–40% ink. Align
codas across the row with `subgrid` so their rules share one line.

```css
.card { display: grid; grid-row: span 3; grid-template-rows: subgrid }
.card .coda { border-top: 1px solid var(--rule); padding-top: 1.25rem;
  font: italic 1em/1.45 var(--serif); color: var(--ink-muted) }
```
⚠ Muted italic at body size still owes 4.5:1 and a true drawn italic.
