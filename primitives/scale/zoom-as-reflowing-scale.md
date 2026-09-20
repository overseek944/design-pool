---
id: zoom-as-reflowing-scale
category: scale
tags: [unit,scale,architecture,responsive,correctness]
axes: none
cost: 1
seen: 2
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

Answer that warning rather than avoiding it: put the factor on `:root` as a
custom property *and* as the `zoom` value, then divide every viewport unit by
it at the point of use. The token is the single density dial for the whole
document — one edit retunes type, spacing, hairlines and radii together without
a token rewrite — and `calc(100svh / var(--zoom))` is again a real full-height
section. 0.78–0.9 reads as denser, above 1.05 as an accessibility setting.
```css
:root { --zoom: .81; zoom: var(--zoom) }
.full { min-height: calc(100svh / var(--zoom, 1)) }
```
⚠ Pointer coordinates arrive in the zoomed space, so any canvas or hit test
under it is wrong by the factor. Recover it from the element itself —
`offsetWidth / getBoundingClientRect().width` — rather than reading the token,
which misses browser zoom and any nested opt-out.
