---
id: co-located-pulse-lamp
category: light
tags: [light,3d,webgl,pulse,alert,emissive,glow]
axes: {energy: 3, density: 2, weight: 3, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An alert in a lit 3D scene that only raises its own emissive lights nothing
and reads as a sticker. Park a short-range point light at the same spot and
drive both, plus any halo ring, from one normalised oscillator: neighbours catch
each throb and the fault reads as a physical source. Period 2–3s, range 1–2×
part spacing, ring scale 1–1.5×.

```js
const p = (Math.sin(t * 2.5) + 1) / 2
mat.emissiveIntensity = .2 + p * .5; lamp.intensity = .3 + p * 1.5
ring.scale.setScalar(1 + p * .4)
```
⚠ Each dynamic light costs every lit fragment — budget one or two. Under
reduced motion hold `p` at a fixed mid value.
