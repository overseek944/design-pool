---
id: dash-phase-flow
category: surface
tags: [svg,dash,motion,connector,diagram,precision]
axes: {energy: 2, density: 2, weight: 1, finish: 5}
cost: 1
seen: 9
requires: []
conflicts: []
completes: []
tension: []
---
Animating `stroke-dashoffset` on a dashed connector makes a static schematic
read as carrying something, and in a direction. The precision that makes it work
is arithmetic: the offset travelled per cycle must be an exact integer multiple
of the dash period (`dash + gap`), or the pattern snaps back at every repeat and
the line visibly stutters.

```css
.thread { stroke-dasharray: 6 10 }                  /* period 16 */
@keyframes flow { to { stroke-dashoffset: -160px } } /* 10 periods */
.thread { animation: flow 6s linear infinite }
```
⚠ Perpetual peripheral motion is a vestibular trigger and an attention sink — a
`prefers-reduced-motion` branch is required. Hold 20–40px/s; faster and the
dashes strobe rather than flow.

A flowing connector that runs off the edge of its frame needs no hard terminal:
paint the stroke with a `linearGradient` transparent at both ends. In the
default `objectBoundingBox` units the stops span the path's own box, so the
fade tracks the geometry through any edit — which neither a mask nor a CSS
`linear-gradient` manages on a curve. Hold zero alpha to 12–20% and from 78–88%.
```html
<linearGradient id="fade" x1="0" x2="1">
  <stop offset="0" stop-opacity="0"/><stop offset=".18" stop-opacity=".34"/>
  <stop offset=".78" stop-opacity=".36"/><stop offset="1" stop-opacity="0"/>
</linearGradient>
<path d="…" stroke="url(#fade)" stroke-dasharray="10 18"/>
```
⚠ A bounding box has no direction — a route that doubles back fades mid-line.
Straight-ish runs only, else `gradientUnits="userSpaceOnUse"` and place the
stops in viewBox coordinates.

Off SVG the same flow is a `repeating-linear-gradient` on a pseudo-element, and
the arithmetic reappears as one number: animate `background-position` by exactly
one dash period and the tile lands back on itself, so the loop is seamless with
no measured length and no `<path>`. A 2px-tall rule then joins DOM nodes that
were never in a drawing. Period 8–14px, cycle 0.6–0.9s.
```css
.link { background-image: repeating-linear-gradient(to right,
          var(--rule) 0 4px, transparent 4px 9px); height: 2px;
        animation: march .7s linear infinite }
@keyframes march { to { background-position: 9px 0 } }
```
⚠ The period lives in two places — the gradient stops and the keyframe — and
nothing catches them drifting apart. Hold both in one custom property.
