---
id: counter-rotated-specular-layer
category: light
tags: [light,gradient,rotation,material,3d]
axes: {energy: 2, density: 2, weight: 3, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An object with its highlight painted into its own background spins the highlight
with it, and the lamp appears to orbit the room. Split them: the body carries
tint and shadow, a child layer carries the specular and rim gradients, and that
child is rotated by the negative of the body's angle each frame. The light stays
where the page's light lives while the object turns under it — the difference
between a rolling solid and a spinning decal.

```js
body.style.transform  = `rotate(${a}deg)`
sheen.style.transform = `rotate(${-a}deg)`   /* same origin, or it precesses */
```
⚠ Oversize the sheen (`inset: -15 to -25%`) or its corners sweep into view.
Only rotation inverts; translation and scale stay on the body.
