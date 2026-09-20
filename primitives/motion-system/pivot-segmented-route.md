---
id: pivot-segmented-route
category: motion-system
tags: [motion,path,diagram,keyframes]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Interpolating position and heading together makes a marker cut diagonals across
its own route. Write the route as alternating keyframe pairs: translation moves
while rotation holds, then rotation moves inside a 1–3% window while
translation holds. The mover runs a leg, stops, pivots, runs the next. Keep it
`linear`; easing a leg turns a machine into a pendulum. Stop percentages
proportional to leg length hold speed constant.

```css
@keyframes route {              /* run, pivot, run */
  0%  { transform: translate3d(0,0,0) rotate(-90deg) }
  23% { transform: translate3d(0,-286px,0) rotate(-90deg) }
  25% { transform: translate3d(0,-286px,0) rotate(0deg) }
}
```
⚠ Restate the whole transform at every stop — an omitted component
interpolates from the base value and the mover leaves the route.
