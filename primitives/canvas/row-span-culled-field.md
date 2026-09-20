---
id: row-span-culled-field
category: canvas
tags: [perf,field,raster,culling,imagedata,architecture]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A field summed from a handful of radial sources costs width × height × sources
written the obvious way, and nearly every sample lands outside every source. Walk
it by scanline instead: drop each source whose vertical distance already exceeds
its radius, solve the circle for that row's half-width, and run the inner loop
over the union span with only the sources still reaching. Worth taking for 2–8
sources; past that the per-row rebuild costs more than it returns.

```js
for (let y = 0; y < h; y++) { let x0 = w, x1 = 0; hit.length = 0
  for (const s of src) { s.dy2 = (y - s.y) ** 2; if (s.dy2 >= s.r2) continue
    const d = Math.sqrt(s.r2 - s.dy2), a = (s.x - d) | 0, b = Math.ceil(s.x + d) + 1
    x0 = Math.min(x0, Math.max(0, a)); x1 = Math.max(x1, Math.min(w, b)); hit.push(s) }
  for (let x = x0; x < x1; x++) { /* sum hit, not src */ } }
```
⚠ The span is one union, so two sources at opposite edges still sweep the empty
middle between them. Reuse the active array across rows — allocating one per row
costs more than the culling saves.
