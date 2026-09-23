---
id: ring-placed-upright-labels
category: layout
tags: [layout,diagram,radial,label,geometry]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Rotating a container to arrange labels around a circle tips every label with it,
and untipping them costs a counter-rotation per node. Resolve each angle into
`left`/`top` offsets from the centre instead: labels stay upright whatever the
ring does, so the drawn ring sits in a sibling layer and spins alone.

```css
.node { position: absolute; transform: translate(-50%, -50%);
  left: calc(50% + cos(var(--a)) * var(--r));  /* 90–220px, inner 0.55–0.75× */
  top:  calc(50% + sin(var(--a)) * var(--r)) }
```
⚠ Angles space centres, but a label occupies arc proportional to its width —
minimum radius is set by the widest label, not the count. Ring position says
nothing to a screen reader; keep a plain list in source order.

Where the nodes must travel *with* a spinning ring, counter-rotate each one on
the ring's exact period and curve — 12–30s linear, reversed — so the two cancel
and the icon stays upright. Any mismatch in duration or easing and the icons
slowly tip.
```css
.orbit { animation: spin 18s linear infinite }
.orbit .node { animation: spin 18s linear infinite reverse }
```
⚠ Two infinite animations per node; pause both under `reduce`.
