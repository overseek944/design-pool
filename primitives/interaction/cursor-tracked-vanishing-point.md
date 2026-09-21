---
id: cursor-tracked-vanishing-point
category: interaction
tags: [interaction,pointer,3d,depth,field,transform,hover]
axes: {energy: 3, density: 3, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: [substituted-driver-on-coarse-pointer]
---
Tiles pushed toward the reader on Z all shear toward the container's one fixed
vanishing point, so the lift reads as a sheet tilting rather than a swell under
the hand. Move the vanishing point instead: write `perspective-origin` to the
cursor every frame and each tile splays from where the pointer actually is.
Scale the rise by a squared falloff over the radius so the disturbance has no
boundary, and carry part of the same scalar into `rotateX`/`rotateY`. Radius
100–180px, rise 20–50px, spread 0.15–0.3 of the offset.

```js
field.style.perspectiveOrigin = `${cx}px ${cy}px`      /* perspective: 600-900px */
const k = (1 - Math.hypot(dx, dy) / R) ** 2, z = 34 * k
tile.style.transform = `translate3d(${dx * .22 * k}px, ${dy * .22 * k - z * .45}px, ${z}px)
  rotateX(${-dy * k * .14}deg) rotateY(${dx * k * .14}deg)`
```
⚠ Poses are viewport-relative, so a scroll invalidates them with no
`pointermove` to correct it — reset on `scroll` and window `blur`, not just
`pointerleave`.
