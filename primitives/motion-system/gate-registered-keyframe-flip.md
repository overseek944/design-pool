---
id: gate-registered-keyframe-flip
category: motion-system
tags: [motion,diagram,pipeline,state,keyframes,css]
axes: {energy: 2, density: 2, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
A token crossing a track reads as *processed* when its state flips exactly
where it passes a drawn checkpoint. Keyframe selectors cannot read `var()`, so
derive the stop: gate at g, travel a→b gives `(g − a) / (b − a)`. Flip over
3–8% of the cycle; the hard change, not the travel, carries the meaning.

```css
.track { container-type: inline-size }            /* gate at 58% */
@keyframes run { from { translate: -22cqi }        /* flip at 63% */
  0%, 61% { color: var(--raw) } 65%, to { color: var(--done) }
  to { translate: 104cqi } }
```
⚠ Move the gate and the flip silently drifts — keep both numbers adjacent.
Reduced motion: place tokens statically either side of the gate.
