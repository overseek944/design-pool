---
id: fractional-grid-with-fluid-rail
category: layout
tags: [layout,grid,asymmetry]
axes: {energy: 1, density: 3, weight: 3, finish: 4}
cost: 2
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Asymmetric two-column via `minmax()` where the rail is viewport-proportional and
the body absorbs the rest — a sidebar that stays optically constant at any width.
```css
grid-template-columns: minmax(0,14vw) minmax(0,1fr);
```

Detail — alias `minmax(0, 1fr)` to a token and use it in place of bare `1fr`
everywhere. A raw `1fr` track has an `auto` minimum, so one long unbroken string
silently widens the column and blows the grid past its container.
