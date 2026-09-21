---
id: restated-route-overlay
category: surface
tags: [svg,diagram,path,emphasis,stroke,gradient]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Marking one route through a branching diagram by restyling the segments it
crosses breaks every effect that runs along arc length: a stroke gradient
restarts its ramp inside each segment's own box, a dash draw restarts at every
joint, a travelling pulse halts at each node. Restate the route as one
continuous path laid over the faint complete structure instead. The ghost layer
holds a uniform hairline and carries the alternatives; the overlay carries
weight, colour and the whole draw as a single run. Ghost stroke 25–45% of the
route's opacity, 0.6–1× its width.

```svg
<g stroke="var(--line)" stroke-width="1" fill="none">
  <path d="M30 180H120"/><path d="M120 180C150 180 150 132 180 132H300"/></g>
<path d="M30 180H120C150 180 150 132 180 132H352" stroke="url(#ramp)" stroke-width="1.5"/>
```
⚠ The overlay duplicates geometry. Emit both from one edge list — a hand-copied
`d` leaves the lit route floating beside a branch somebody moved.
