---
id: keyframe-resolved-waypoints
category: motion-system
tags: [motion,keyframes,custom-properties,architecture,choreography]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A `@keyframes` block is document-global and takes no arguments, so a route with
literal coordinates serves exactly one element — the usual escape is generating
a block per instance. Declaration values inside keyframes resolve against the
*animating* element, so write every stop as `calc()` over named waypoint
properties and one block drives every instance, each setting its own
destinations. Fold a scale scalar into the same expression and the route tracks
a resized stage for free.

```css
.node { --x1: 40px; --y1: 12px; --k: 1; animation: hop 10s linear infinite }
@keyframes hop {
  0%,18% { transform: translate(calc(var(--x1) * var(--k)), calc(var(--y1) * var(--k))) }
  20%,38% { transform: translate(calc(var(--x2) * var(--k)), calc(var(--y2) * var(--k))) }
}
```
⚠ The properties are read at each stop, not interpolated — rewriting one
mid-cycle jumps unless it is `@property`-registered. Unregistered, an invalid or
missing waypoint drops the whole declaration and the element sits at its base
transform rather than failing visibly.
