---
id: mpath-bound-traveller
category: motion-system
tags: [motion,svg,path,marker,loop,diagram]
axes: {energy: 3, density: 1, weight: 1, finish: 5}
cost: 1
seen: 3
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

On ruled geometry the route is a straight run the artwork already implies, and
there is nothing to bind to: put the two endpoints in `path` directly and the
traveller needs no `<path>` of its own. Fill it with a `radialGradient` falling
to `stop-opacity: 0` rather than a flat colour and it reads as a pulse *in* the
line instead of a bead sliding along it — no silhouette, so it survives crossing
marks of any weight. SMIL has no `animation-delay`; `begin` is how a set of them
is spread. Radius 3–6px, opacity peak .6–.9.
```html
<radialGradient id="pulse"><stop offset="0%" stop-color="currentColor" stop-opacity=".9"/>
  <stop offset="100%" stop-color="currentColor" stop-opacity="0"/></radialGradient>
<circle r="5" fill="url(#pulse)"><animateMotion dur="11s" begin="3s"
  repeatCount="indefinite" path="M240,800 L240,0"/></circle>
```
⚠ Inline `path` is in viewBox units and does not follow a `slice` crop the way
`<mpath>` does — with `preserveAspectRatio` slicing, run travellers only where
the crop cannot reach.
