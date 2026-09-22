---
id: outset-active-entry
category: interaction
tags: [steps, active-state, list, scroll, emphasis]
axes: {energy: 2, density: 2, weight: 3, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
In a column of entries where one is current — a scroll-spied feature list, a
step index — dimming the rest says *which* but not *where*. Also pull the
current entry out of the shared edge, toward the art it governs, and grow its
icon. The aligned column becomes the resting state and the one break in
it is the readout, legible even peripherally. Outset 16–40px, icon scale
1.1–1.35, inactive opacity 0.45–0.65, 300–450ms.

```css
.entry { opacity: .55; transition: translate .4s, opacity .4s }
.entry[aria-current="step"] { opacity: 1; translate: -28px 0 }
.entry[aria-current="step"] .icon { scale: 1.25 }
```
⚠ Reserve the outset in the column's padding or it clips at 390px. Dimmed
entries must still clear 4.5:1.
