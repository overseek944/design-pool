---
id: target-aimed-travelling-beam
category: light
tags: [light,beam,rotation,scroll,decoration,custom-properties]
axes: {energy: 3, density: 2, weight: 3, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A directional light that moves — a beam, a shaft, a cone — keeps whatever
rotation it was authored with, so it sweeps past its subject instead of holding
on it. Aim it from its own position each frame: `atan2` to the focal point,
written to a rotation custom property the transform already reads. Travel and
aim stay independent, so the path can be re-tuned without re-authoring a single
angle, and the light reads as pointed at something rather than pointed at a
number.

```js
const a = Math.atan2(ty - (by + dy), tx - (bx + dx))          // dx,dy = travel
el.style.setProperty('--aim', `${(a * 180 / Math.PI).toFixed(2)}deg`)
```
```css
.beam { transform: translate(-50%, -50%) rotate(var(--aim, 0deg)) }
```
⚠ A mirrored pair needs its second angle folded into the same half-turn as the
first (`+= 2π` below `-π`) or one flips crossing the axis. Cache both centres:
`atan2` per frame is free, `getBoundingClientRect()` per frame is a forced layout.
