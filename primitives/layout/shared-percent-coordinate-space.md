---
id: shared-percent-coordinate-space
category: layout
tags: [diagram,svg,schematic,accessibility,responsive]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 2
seen: 7
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

The stroke problem the aspect ratio causes has its own fix: `vector-effect:
non-scaling-stroke` applies stroke width after the viewBox transform, so a
hairline stays the authored width at every container size and survives
`preserveAspectRatio="none"` without shearing. Dash patterns hold their
proportions with it too. Author the connectors at whatever user-space width
reads well and let the effect, not a `calc()` against the container, keep them
at one weight.
```css
.lines line { stroke-width: 1.5; vector-effect: non-scaling-stroke }
```
⚠ It pins the stroke to *device* pixels, so a deliberately heavy rule stops
growing with the diagram and reads thin at large sizes — use it for hairlines
only, not for strokes that carry weight.

`preserveAspectRatio="none"` shears strokes only along the axis the box
stretches on, so leaders drawn strictly horizontal or vertical are immune: a
horizontal line's visible thickness is scaled by the vertical factor alone,
which is uniform along its whole length. Where the annotation can be routed as
an L — label out to a gutter, then straight in to the subject — the overlay
needs neither `vector-effect` nor a square box, and the layer stays two `<line>`
elements over a picture of any ratio. Author 0.1–0.3 user units and expect
0.5–1.5px once scaled.
