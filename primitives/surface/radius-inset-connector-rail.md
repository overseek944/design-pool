---
id: radius-inset-connector-rail
category: surface
tags: [diagram,hairline,precision,detail,schematic]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 1
seen: 2
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

Where connectors are SVG and cannot be inset per node, carve the gap at the
node: a 4–10px ring in the *page background* colour knocks the lines out
behind it without touching their geometry.
`box-shadow: 0 0 0 6px var(--bg)`, before any glow in the same declaration.
Over an image or a gradient the ring becomes a visible disc.
