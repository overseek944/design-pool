---
id: clip-carried-fill-traverse
category: surface
tags: [svg,connector,motion,clip-path,diagram,gradient]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
Dash offset gives a stroked connector direction, but a connector drawn as a
filled shape — a taper, a funnel, a bridge across the gap between two panels —
has no dash pattern to move. Clip a plain translating bar to the connector's own
path instead — the same `<path>` serves as the fill and as the `clipPath` — and
the shape carries a front. Blur the bar so it reads as light, not as an edge, and give successive segments offset windows of one shared
duration so one front crosses the whole shape. Travel 20–45% of its width.

```html
<g clip-path="url(#c)"><rect class="wave" x="-3" width="6" height="100"/></g>
```
```css
.wave { opacity: 0; filter: blur(3px); animation: cross 2.5s ease-in-out infinite }
@keyframes cross { 14% { opacity: .13 } 38% { opacity: .13; transform: translateX(38px) } }
```
⚠ Under `preserveAspectRatio="none"` travel and blur live in the stretched user
space, so the front's softness goes elliptical as the box widens — fine for a
glow, wrong beside a measured edge.
