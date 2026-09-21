---
id: alpha-threshold-fuse-filter
category: media
tags: [svg,filter,mark,liquid,state]
axes: {energy: 3, density: 2, weight: 3, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: [instance-scoped-filter-id]
tension: []
---
Separate shapes read as one substance when a blur is pushed back through an
alpha ramp: blur the group, then multiply alpha hard and subtract, so each halo
snaps to an edge and two overlapping halos resolve as one silhouette. Members
drifting apart then stretch and part like a liquid. Blur 2–5% of a member's
radius, multiplier 15–25 against an offset near half of it — softer and the
edge never re-forms, harder and they separate before touching.

```svg
<filter id="fuse"><feGaussianBlur stdDeviation="3.2" result="b"/>
<feColorMatrix in="b" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -9"/></filter>
```
⚠ The group re-rasterises every frame — a small mark, never a field.
Antialiasing is discarded, so hairlines inside the group vanish.
