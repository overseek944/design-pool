---
id: overflow-visible-for-glow-bleed
category: surface
tags: [surface,effect,svg,gotcha]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
SVG clips to its viewBox by default, which decapitates any `drop-shadow` on its
contents. `overflow-visible` on the `<svg>` lets bloom bleed past the box. The
single most common reason a glow "isn't working".
