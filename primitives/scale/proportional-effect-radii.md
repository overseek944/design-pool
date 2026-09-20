---
id: proportional-effect-radii
category: scale
tags: [unit,effect,polish,coherence]
axes: none
cost: 1
seen: 1
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
