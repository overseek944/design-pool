---
id: shared-percent-coordinate-space
category: layout
tags: [diagram,svg,schematic,accessibility,responsive]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A node diagram wants SVG lines and real DOM nodes: strokes that scale, nodes
that are focusable buttons with text. Give both the same coordinate space —
`viewBox="0 0 100 100"` on an absolutely-positioned overlay, DOM nodes at
`left/top` in matching percentages inside a square-ratio box. Connectors and
nodes then track each other at every width with nothing measured in script.
```jsx
<svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" />
<button style={{ left: `${x}%`, top: `${y}%`,
                 transform: 'translate(-50%,-50%)' }} />
```
⚠ Only holds while the box keeps its aspect ratio; a non-square container needs
`preserveAspectRatio="none"`, which shears strokes. Give the SVG
`pointer-events: none` so it cannot swallow clicks on the nodes beneath it.

Percentages place node *centres*, but a connector stops at a node's edge, and
that edge moves when the node is sized fluidly. Derive the inset as a token —
`--node-half: calc(var(--node-size) / 2)` against a `clamp()` size — and every
endpoint, halo radius and label offset tracks one declaration across the whole
range with nothing measured in script.
