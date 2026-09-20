---
id: interleaved-ground-dissolve
category: surface
tags: [surface,color,pattern,section,boundary,texture]
axes: {energy: 2, density: 3, weight: 3, finish: 2}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Carry one ground into another by interleaving their pixels at a ratio that
ramps across a band — no third colour is ever painted, so the transition needs
no mixing space, survives a two-colour register, and reads as a raster artifact
rather than a blur. It is what makes a page that inverts wholesale per section
survivable. The ratio must reach a true 0 and 1 inside the band, not at its
edges: feather the last 15–25% quadratically or a line of stray cells marks the
seam. Band `clamp(5rem, 8vh, 8rem)`.

```css
.band { height: clamp(5rem, 8vh, 8rem); margin-bottom: -1px;
  background: linear-gradient(var(--from) 50%, var(--to) 50%) }
```
⚠ Give the band that hard two-stop background as its own fallback — it already
reads as both grounds meeting, so nothing flashes before the pattern paints.
