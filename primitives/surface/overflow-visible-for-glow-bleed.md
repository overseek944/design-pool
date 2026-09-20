---
id: overflow-visible-for-glow-bleed
category: surface
tags: [surface,effect,svg,gotcha]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
SVG clips to its viewBox by default, which decapitates any `drop-shadow` on its
contents. `overflow-visible` on the `<svg>` lets bloom bleed past the box. The
single most common reason a glow "isn't working".

Bleed that escapes the box also overlaps whatever sits beside it. Where the
overflow is a stroke rather than a glow, one variable can own both halves:
declare the stroke width, use it on the path, and reserve half of it as margin —
the icon keeps its full outline and its neighbours keep their spacing, and
retuning the weight moves the reservation with it.
```css
.icon { --stroke: 5; overflow: visible; margin: calc(var(--stroke) * .5px) }
.icon path { stroke-width: var(--stroke) }
```
⚠ Half the stroke, not the whole — SVG centres a stroke on its path, so a full
reservation leaves a visible extra gap on every side.
