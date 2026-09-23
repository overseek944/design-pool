---
id: idle-docking-pointer-companion
category: interaction
tags: [pointer, spring, sprite, idle, trail, velocity, tilt, follow]
axes: {energy: 4, density: 1, weight: 2, finish: 3}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A small fixed sprite that trails the pointer at an offset on a damped spring,
then retires to a corner dock after a few idle seconds, reads as a companion
rather than a cursor. Velocity drives the character: tilt from horizontal
speed, facing flips past a small threshold, scroll delta kicks it opposite the
page, and decaying dots spawn only above a speed floor.

```js
v.x = (v.x + (tx - x) * k) * d                     // k .02–.06 (idle .01–.02), d .85–.92
v.y = (v.y + (ty - y) * k - scrollDelta * .3) * d  // coupling .2–.4
el.style.rotate = clamp(v.x * .8, -15, 15) + 'deg' // idle dock after 2–4s
if (speed > 3 && now - last > 80) dot(x, y)        // trail 60–120ms
```
⚠ `aria-hidden`, `pointer-events: none`. Per-frame constants run fast at
120Hz — scale by dt. Under reduced motion keep it docked.
