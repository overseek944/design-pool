---
id: distance-phased-driver-ripple
category: canvas
tags: [canvas,pointer,field,wave,falloff]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: [velocity-paired-field-step]
---
A proximity falloff gives a driver one well: a dent following the cursor.
Put a clock term inside the distance and it becomes rings leaving it:
`cos(k·d − ωt)`, bounded by `exp(−d/λ)`, clipped at zero so only crests
survive. No grid, no state, no simulation: one evaluation per mark, so any
point set works. Feed the same scalar to offset, size and brightness. k 0.03–0.08/px, λ 60–140px.

```js
const p = act * Math.exp(-d / LAM) * Math.max(0, Math.cos(K * d - W * t))
```
⚠ Rings never reflect, interfere or die out — cheap as decoration, wrong where
it should read as disturbed material. Multiply by an eased activation or they
snap on at full amplitude.
