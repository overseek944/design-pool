---
id: zoom-as-reflowing-scale
category: scale
tags: [unit,scale,architecture,responsive,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: [fixed-canvas-root-scale]
---
`zoom` is the one scale that reflows. `transform: scale()` leaves the original
box behind, so neighbours hold their old positions and the scaled thing either
overlaps them or strands whitespace; `zoom` resizes the layout itself. That
makes it the graft — a subtree authored at one scale dropped into a page built
at another without rewriting a token. Useful range 0.7–1.15, and it nests, so
one child can opt back out.
```css
.section { zoom: .8 }
.section .full-size { zoom: 1 }
```
⚠ Media queries and viewport units still resolve against the real viewport, so
every breakpoint inside a zoomed subtree fires at the wrong content width.
Redefine tokens instead wherever you own them.
