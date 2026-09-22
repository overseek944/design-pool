---
id: breakpoint-published-as-tokens
category: scale
tags: [responsive,breakpoint,tokens,container-query,custom-properties,architecture,css-only]
axes: none
cost: 2
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
A breakpoint is usually a place rules are written, so every component that cares
restates the query. Publish it instead: one query sets inherited tokens on `*` —
0/1 flags for what arithmetic reaches, named keyword tokens read as a `var()`
fallback for what it cannot. Each property's whole responsive story then fits one
declaration, and under `@container` a component answers to its own box without
naming it. Two to four steps, each smaller flag defaulting to the next larger so
only differences are stated.

```css
:root { --lg: 1; --md: 0 }
@container (width < 50em) { * { --lg: 0; --md: 1; --flex-md: flex } }
.row { display: var(--flex-md, grid);
       gap: calc(2.5rem * var(--lg) + .75rem * var(--md)) }
```
⚠ A zero-weighted term still has to parse, and one unresolvable `var()` voids the
whole declaration — give every flag a root default. Setting tokens on `*` inside
a query is a cheap match but a wide invalidation; keep it to the token block.

What a query publishes need not be a flag — publish the *operands of a motion*
and one transform serves every width. Name a distance per axis, zero the one
that is not in play, and the breakpoint decides whether a block rises into place
or slides in from the side without a second keyframe block or a duplicated
transition to drift. The declaration reads as the move; the query reads as the
geometry. Travel 80–140px on the stacked axis, 180–320px on the wide one.
```css
:root            { --rise: -110px; --slide: 0px }
@media (min-width: 64rem) { :root { --rise: 0px; --slide: -250px } }
.panel { translate: var(--slide) var(--rise) }
```
⚠ Both operands must carry a unit even at zero — a bare `0` is fine in
`translate` but voids a `calc()` downstream. Swapping axis mid-transition
interpolates through the diagonal, so switch at a width no reader is dragging.

The same inversion saves a scripted interpolation from its resize handler. Where
a scroll-driven value's *output range* depends on the viewport — a bar
contracting to 1080px wide on desktop and to `viewport − 32px` on a handset —
the reflex is to rebuild the interpolation when the width changes, which throws
away whatever state the smoother had accumulated and snaps the value mid-drag.
Hold the endpoints as live inputs instead and recompute only them.
```js
const lo = live(320), hi = live(1080)                 // updated on resize
const out = combine([p, lo, hi], ([p, a, b]) => a + (b - a) * p)
```
⚠ The endpoints must be seeded before the first frame, not on the first resize
event — one that never fires leaves the interpolation at a default no layout
chose.
