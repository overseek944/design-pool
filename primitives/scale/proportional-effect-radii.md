---
id: proportional-effect-radii
category: scale
tags: [unit,effect,polish,coherence]
axes: none
cost: 1
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
Express blur, glow and shadow radii in `vh`/`vw` rather than px, so effects scale
with the page instead of going thin on large screens and heavy on small ones.
```css
filter: drop-shadow(0 0 1.5vh rgba(255,147,103,.4));
```

`cqw` where the effect belongs to a *component* reused at several sizes rather
than to the page: a translucent chip inside a diagram that appears both as a
thumbnail and at full width needs its `backdrop-filter: blur(1.5–3cqw)` to
shrink with the drawing, or the miniature is a smear and the full-size version
is barely frosted. Same argument as `vw`, one scope down, and it survives being
placed in a narrow column where the viewport units do not.

A generated texture wants the same treatment taken further: derive one unit
from the container and let every number in the pattern be a multiple of it —
dot radius, tile size, layer offsets and the keyframe positions of any drift.
The texture then keeps its apparent tooth as the element resizes, and there is
exactly one value to tune instead of nine that must be kept in proportion by
hand. Clamp both ends so the grain never falls below a device pixel or grows
into spots.
```css
.band { container-type: inline-size; --sp: clamp(3.5px, .36cqw, 8px) }
.grain { background-size: var(--sp) var(--sp), calc(var(--sp) * 1.4) calc(var(--sp) * 1.4) }
```
⚠ `cqw` resolves against the nearest container ancestor — without
`container-type` on one it silently falls back and the whole pattern collapses
to the clamp floor.
