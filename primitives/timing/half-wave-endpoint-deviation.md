---
id: half-wave-endpoint-deviation
category: timing
tags: [motion,easing,interpolation,character]
axes: {energy: 3, density: 1, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
To add a bulge to a scrubbed interpolation — an arc over a straight travel, a
settle bump before a card parks — multiply the deviation by `sin(πp)`. It is
zero at both ends by construction, so the endpoints the layout depends on stay
exact however large the amplitude grows, and the term is tunable without
re-checking where the thing lands. A second half-wave over a narrow slice of
the same progress gives the settle its own beat. Arc 6–14px, settle 1–3px.

```js
const arc    = Math.sin(p * Math.PI) * -10
const settle = Math.sin(window(p, .56, .72) * Math.PI) * 2
y = lerp(a, b, ease(p)) + arc + settle
```
⚠ The crest sits at the midpoint of whatever progress it is handed — feed it
the eased parameter and it drifts with the easing. Shape position and deviation
from the same raw value.
