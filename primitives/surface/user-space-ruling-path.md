---
id: user-space-ruling-path
category: surface
tags: [surface,svg,texture,blueprint,diagram,cheap]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Rule a drawing inside its own `viewBox`, not behind it. A single `<path>` whose
`d` chains `M…H…` and `M…V…` subpaths carries the entire grid as one node, in
the coordinates the drawing is authored in — so marks land on lines exactly, and
the ruling crops, scales and retints with the figure. A CSS background grid sits
in device pixels under all of that and can do none of it. Pitch 8–12% of the
short side.

```svg
<path d="M0 40H400M0 80H400M0 120H400M40 0V200M80 0V200M120 0V200"
      fill="none" stroke="currentColor" opacity=".06"/>
```
⚠ Opacity .04–.10 — above it the ruling competes with the drawing's own
hairlines, below it vanishes on a tinted plate. The stroke scales with the
viewBox, so a plate rendered small loses its grid before it loses its subject.
