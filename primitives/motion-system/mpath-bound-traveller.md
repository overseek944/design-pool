---
id: mpath-bound-traveller
category: motion-system
tags: [motion,svg,path,marker,loop,diagram]
axes: {energy: 3, density: 1, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A marker crossing a drawn route drifts off it the moment the drawing scales:
`offset-path` holds a *copy* of the geometry resolved in CSS pixels, while the
route lives in viewBox units. `<mpath>` points at the rendered `<path>` instead,
so track and traveller are one element and cannot disagree at any crop or
breakpoint, and `rotate="auto"` gives tangent heading free. Periods 10–24s read
as traffic; under 6s it reads as a demo loop.

```html
<path id="route" d="M-120 708 C 126 662 322 640 516 676"/>
<animateMotion dur="16s" repeatCount="indefinite" rotate="auto">
  <mpath href="#route"/></animateMotion>
```
⚠ No media query reaches SMIL. Read `prefers-reduced-motion` in script and
answer with `svg.pauseAnimations()`, or the motion ships to everyone.
