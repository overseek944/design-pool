---
id: curvature-parametrised-sheet-wrap
category: canvas
tags: [canvas,geometry,projection,morph,points,3d]
axes: {energy: 3, density: 3, weight: 2, finish: 5}
cost: 4
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A flat sheet and a sphere are one surface at two curvatures, so a map that rolls
into a globe needs no second geometry and no per-mark scatter. Read each flat
coordinate as arc length on a sphere whose radius is the flat scale over the wrap
parameter: near zero the radius diverges and the surface is a plane, at one it is
the finished ball. Every mark takes the same bend, so the sheet folds rather than
dissolves. Freeze rotation until the parameter settles, or the paper spins while
it folds.

```js
const w = Math.max(0.005, wrap), R = lerp(flatScale, sphereR, w) / w
const lo = lon * w, la = lat * w
o.x = R * Math.sin(lo) * (1 + (Math.cos(la) - 1) * w)
o.y = -R * Math.sin(la)
o.z = w * sphereR * Math.cos(lat) * Math.cos(lo)
```
⚠ Fade back-face marks in as the parameter rises; a flat sheet has no back, so
culling from the start punches a hole in the map.
