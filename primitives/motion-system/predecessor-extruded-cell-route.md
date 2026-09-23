---
id: predecessor-extruded-cell-route
category: motion-system
tags: [grid,cell,path,svg,sequence,diagram]
axes: {energy: 3, density: 3, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A route across a coarse grid reads as cells fading on in order — a loading
pattern. Start each new cell at its predecessor's position and slide it one
cell into place while it fades up, and the line extrudes like a pipe being
laid, showing direction and continuity. List the route as grid coordinates.
Step 0.15–0.35s, overlap 40–70%, 8–16 columns.

```js
route.slice(1).forEach((c, i) => { const p = route[i]
  tl.fromTo(cell(c), { opacity: 0, x: (p.x - c.x) * size, y: (p.y - c.y) * size },
    { opacity: 1, x: 0, y: 0, duration: STEP, ease: 'power3.out' }, `<${STEP * .5}`) })
```
⚠ Recompute `size` when the grid resizes. Under reduced motion, show the finished route.
