---
id: parameterised-path-travel
category: motion-system
tags: [motion,loop,ambient,diagram,css-only]
axes: {energy: 3, density: 3, weight: 1, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
One keyframe animating `offset-distance` from 0% to 100% drives any number of
travellers along any number of *different* routes, because the route is a
custom property rather than part of the animation. Period and delay arrive the
same way, so a schematic with a dozen flows costs one rule plus one declaration
per node — no scheduler, no path arithmetic, no library. Fade in over the first
6–10% and out over the last 15–25% so nothing pops at an endpoint, and shrink
toward the destination to read as distance. Periods 4–9s, linear.

```css
.mote { offset-path: var(--route); offset-rotate: 0deg; offset-anchor: center;
        animation: travel var(--dur, 6.5s) linear var(--delay, 0s) infinite }
@keyframes travel { 0% { offset-distance: 0%; opacity: 0 } 8% { opacity: 1 }
  78% { scale: .8 } to { offset-distance: 100%; opacity: 0; scale: .3 } }
```
⚠ Gate it twice — `@supports (offset-path: path("M0 0 H 1"))` inside
`prefers-reduced-motion: no-preference`. Without the feature query every
traveller stacks at its untransformed origin instead of not appearing.
