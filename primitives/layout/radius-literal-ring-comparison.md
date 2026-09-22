---
id: radius-literal-ring-comparison
category: layout
tags: [chart, dataviz, comparison, radius, svg, concentric]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Nest one ring per series on a shared centre with radius equal to the value. It
is honest only when the quantity is itself a distance — range, reach, span —
so the ring draws the thing measured. Hairline strokes 1.5–3px, the lead series
heavier; a value list beneath carries the exact figures. Rings enter scaled from
the centre, outermost first, 60–120ms apart.

```svg
<circle cx="150" cy="150" r="129" fill="none" stroke-width="3"
  style="transform-origin:150px 150px; transition:transform .65s var(--pop)"/>
```
⚠ For counts, money or mass, radius squares the difference in perceived area —
use bars. Rings closer than ~4px merge; label the list, not the rings.
