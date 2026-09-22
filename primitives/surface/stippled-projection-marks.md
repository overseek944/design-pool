---
id: stippled-projection-marks
category: surface
tags: [dataviz, chart, forecast, uncertainty, dot-pattern, series, texture]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

Marks that are projected rather than observed should change texture, not
alpha. Keep each mark's geometry and hue but fill it with a dot lattice instead
of solid colour: the forecast reads as the same series in a provisional state,
and a faded mark is never mistaken for a gridline. On a live series, recompute
which trailing 10–30% is projected each tick so the boundary walks with the
data. Dot 1px, pitch 3–5px.

```css
.mark.projected { background: radial-gradient(circle, var(--c) 1px, #0000 1.2px)
                  0 0 / 4px 4px }
```
⚠ Below ~6px wide a stipple fill reads as noise — widen the pitch or outline
it. Say "projected" in the accessible text; texture alone carries no meaning.
