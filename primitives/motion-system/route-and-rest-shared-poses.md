---
id: route-and-rest-shared-poses
category: motion-system
tags: [motion,keyframes,transition,custom-properties,state,choreography]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An arrangement whose members swap places needs two kinds of change: stepping one
position deserves an authored route — overshoot, a mid-path waypoint, a stacking
swap at the crossing — while a multi-step jump, a resize or first paint should
simply arrive. Declare each resting pose as a whole `transform` in a custom
property; the resting rules transition to it, the route's keyframes begin and end
on the same properties, and an attribute held only for the route's duration
selects between them. Route 0.6–0.9s, resting transition 0.5–0.7s.

```css
.item[data-at=lead] { transform: var(--p-lead); transition: transform .62s var(--e) }
[data-move=fwd] .item[data-at=lead] { animation: lead-in .76s var(--e) both }
@keyframes lead-in { 0% { transform: var(--p-next) }
  40% { transform: var(--p-entry) } 41%,to { z-index: 3 }
  to { transform: var(--p-lead) } }
```
⚠ Clear the attribute on `animationend`, not a timer — a route left selected
strands the element on its last keyframe and the next resting change does not
animate.
