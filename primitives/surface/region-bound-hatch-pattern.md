---
id: region-bound-hatch-pattern
category: surface
tags: [svg,pattern,texture,hatch,diagram,schematic]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [instance-scoped-filter-id]
tension: []
---
CSS gradients hatch boxes; a schematic needs the hatch inside an arbitrary
closed region — a sector, a climb profile, an excluded zone. An SVG `<pattern>`
in `userSpaceOnUse` fills any `d`, and `patternTransform="rotate()"` turns the
lattice without turning the tile or oversizing a clipped wrapper. The drawn
segment is shorter than the tile, so angle and density stay separate
parameters. Tile 60–120 units, segment 30–50% of it, alpha .10–.20.

```html
<pattern id="hatch" width="84" height="44" patternUnits="userSpaceOnUse"
         patternTransform="rotate(-28)">
  <path d="M0 20 H34" stroke="currentColor" stroke-opacity=".16"/></pattern>
<path d="M112 828 L234 560 H1440 V828 Z" fill="url(#hatch)"/>
```
⚠ `vector-effect` has no effect inside a pattern, so the hatch thickens with
the art. Keep the rendered pitch above 8px or it moirés on the pixel grid.
