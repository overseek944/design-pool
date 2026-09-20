---
id: radius-inset-connector-rail
category: surface
tags: [diagram,hairline,precision,detail,schematic]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Connectors in a node diagram are hairlines on pseudo-elements, not SVG. Inset
the rail at both ends by exactly the node radius and it lands on the nodes
instead of poking past the row; hang the vertical link off `top: 100%` of every
row but the last and nothing dangles under the final one. Nodes keep an opaque
fill so the rail passes behind them.
```css
.rail::before { content:''; position:absolute; height:1px; top:var(--r);
  left:var(--r); right:var(--r) }
.row:not(:last-child)::after { content:''; position:absolute; top:100%;
  left:var(--r); width:1px; height:var(--gap,24px) }
```
⚠ Gaps 18–32px. Tighter and the link reads as a seam in the node rather than a
path between two.
