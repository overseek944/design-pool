---
id: sequence-value-ramp
category: color
tags: [color,hierarchy,surface,sequence,contrast]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Tint a row of peer surfaces along one lightness ramp so sequence position is
carried by ground, not by a number. Three equal panels read as interchangeable
options; the same three on a descending ramp read as a progression with a
destination. Derive every step from one mix so the ramp cannot drift.

```css
.step { --i: 0; background: color-mix(in oklab,
        var(--ink) calc(var(--i) * 8%), var(--paper)) }
```
⚠ Travel is bounded by the ink on it: 6–14% per step across 3–5 steps. Once the
darkest drops under 4.5:1 the ink must flip, and the flip shows as a seam
mid-row. Back-load the ramp when the last item is an arrival, not an end.
