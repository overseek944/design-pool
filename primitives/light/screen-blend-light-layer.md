---
id: screen-blend-light-layer
category: light
tags: [effect,blend,compositing,dark]
axes: {energy: 3, density: 3, weight: 3, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`mix-blend-mode: screen` on an overlay makes it add light and drop its own blacks
— glows, grain, and beams composite onto dark grounds with no matte box. Wrap the
group in `isolation: isolate` so the blend can't reach the page background.
```css
.beam { mix-blend-mode: screen } .group { isolation: isolate }
```
