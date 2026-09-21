---
id: split-track-puppet-pointer
category: motion-system
tags: [demo,cursor,choreography,spring,loop]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A synthetic pointer demonstrating an interface is two motions, not one, and
giving them a single transition is what makes it look fake. Put travel on a
slow underdamped spring so the path arcs and overshoots slightly like a hand;
put the press on a short scale keyframe *delayed past the spring's settle*, so
the click lands on arrival instead of halfway there. Hold anchors as
percentages of the frame and the script survives every resize.

```js
animate:    { left: a.x, top: a.y, scale: press ? [1,.75,1.05,1] : 1 }
transition: { left:  { type:'spring', stiffness: 50–80, damping: 12–18 },
              scale: { duration: .4–.6, delay: .8–1.1 } }
```
⚠ Nothing under it is operable: `pointer-events:none` and `aria-hidden`, and a
label pill beside the arrow if a reader must know who is driving. Under reduced
motion park it on a named anchor rather than removing it.
