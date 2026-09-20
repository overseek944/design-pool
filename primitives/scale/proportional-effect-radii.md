---
id: proportional-effect-radii
category: scale
tags: [unit,effect,polish,coherence]
axes: none
cost: 1
seen: 2
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
