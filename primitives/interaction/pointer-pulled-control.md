---
id: pointer-pulled-control
category: interaction
tags: [interaction,pointer,hover,spring,overshoot,cta,affordance]
axes: {energy: 3, density: 1, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A control that leans toward the pointer while hovered, then springs home on
leave. Translate by the pointer's offset from centre times a gain; return on an
underdamped ease so release reads elastic. Primary actions 0.2–0.3 gain, dense
controls 0.08–0.15.

```js
const r = el.getBoundingClientRect(), k = .25            // .08–.3
el.onpointermove  = e => to(el, { x: (e.clientX - r.left - r.width / 2) * k,
                                  y: (e.clientY - r.top - r.height / 2) * k, dur: .3 })
el.onpointerleave = () => to(el, { x: 0, y: 0, dur: .5, ease: 'elastic.out(1, .4)' })  // .3–.5
```
⚠ Move a child, not the hit box, or the target flees the pointer. Fine
pointers only; skip under reduced motion.
