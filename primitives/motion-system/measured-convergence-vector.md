---
id: measured-convergence-vector
category: motion-system
tags: [motion,measurement,responsive,choreography,diagram]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch, dead-banded-resize-rebuild]
tension: []
---
Where elements must travel to or from another element the layout places — a hub
in a diagram, a row that wraps, a set whose count varies — an authored translate
is only right at the width it was authored at. Read both centres against the
shared container's box and write the keyframes as *fractions* of that delta, so
one animation holds at every breakpoint. Ramp scale on the same fraction and
the travel reads as distance rather than slide; 0.5–0.65 at arrival.

```js
const b = wrap.getBoundingClientRect()
const mid = el => { const r = el.getBoundingClientRect()
  return [r.left-b.left+r.width/2, r.top-b.top+r.height/2] }
const [hx,hy] = mid(hub), [x,y] = mid(el)
const at = f => `translate(${(hx-x)*f}px,${(hy-y)*f}px) scale(${1-.4*f})`
el.animate([{transform:at(0)}, {transform:at(.62), offset:.72}], 2600)
```
⚠ Read every rect before any write, and refuse to start on a zero-sized box — a
hidden ancestor or a pending webfont returns zeros and the set converges on one
point.
