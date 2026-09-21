---
id: radius-inset-connector-rail
category: surface
tags: [diagram,hairline,precision,detail,schematic]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 1
seen: 5
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

A pseudo-element connector can change direction at a breakpoint for the price of
one rotation, which an SVG overlay cannot. Draw the arrowhead as two borders on
a small square turned 45°; re-anchor it from the row's right edge to below its
centre and turn it to 135°, and a horizontal flow becomes a vertical one along
with the grid — no second element, nothing measured.
```css
.step:not(:last-child)::after { content:""; width:8px; height:8px; position:absolute;
  border-top:1.5px solid var(--line); border-right:1.5px solid var(--line);
  top:50%; right:-22px; transform:translateY(-50%) rotate(45deg) }
@media (width <= 900px) { .step:not(:last-child)::after {
  inset:auto auto -16px 50%; transform:translateX(-50%) rotate(135deg) } }
```

Inverted for a timeline, where the rail must read as continuous *through* the
gaps between items: give every item the same over-long rail instead of linking
neighbours. Pull it past the item by more than half the gap at both ends, so
consecutive rails overlap into one line, and paint it with a gradient that
fades to transparent at both tips — the first and last items then have no hard
terminal and no `:first-child`/`:last-child` rule exists. Reach 2.5–4em against
gaps of 4–6em; fade 2–3em.
```css
.item::before { content:''; position:absolute; width:1px;
  top: calc(-1 * var(--reach)); bottom: calc(-1 * var(--reach));
  left: calc(-1 * var(--gutter));
  background: linear-gradient(transparent, var(--ink) var(--fade),
    var(--ink) calc(100% - var(--fade)), transparent) }
```
⚠ Reach under half the gap leaves a visible break; far over it doubles the ink
in the overlap unless the fade covers the join.
