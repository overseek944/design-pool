---
id: ground-indexed-inverting-ramp
category: color
tags: [color,tokens,theming,naming,architecture,contrast]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

Number a neutral ramp by distance from the page ground rather than by
lightness, and give each rung one `light-dark()` whose two branches run in
opposite directions. Rung 50 is always the paper and rung 950 always the ink,
so a component reads a rung and needs no dark variant, no semantic alias layer
and no second selector block. Author the dark branch at several times the
chroma of the light one — a tint that reads at L 95 vanishes at L 10. 9–13
rungs, chroma 2–4 light against 8–12 dark.

```css
--main-050: light-dark(lch(97 2.25 273), lch(10  10 280));
--main-950: light-dark(lch(5  2.25 273), lch(100 10 280));
```
⚠ `light-dark()` resolves against `color-scheme` alone — a `[data-theme]` class
that does not also set `color-scheme` flips nothing.
