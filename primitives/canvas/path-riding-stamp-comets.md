---
id: path-riding-stamp-comets
category: canvas
tags: [canvas,field,generative,ambient,trail,glyph,loop]
axes: {energy: 3, density: 4, weight: 2, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A cell field gains purpose when 4–10 travellers ride precomputed paths across
it, lighting cells instead of being drawn. Each frame reset every target to a
floor; each traveller stamps a soft disc along its last 30–50% of path, head
bright, tail tapering, `max`ed into target. Cells ease toward target (k
0.1–0.25), so fading needs no bookkeeping. Fade life over the final 20–30% of
progress, then respawn.

```js
for (const c of cells) c.target = FLOOR
for (let i = tail; i <= head; i++) stamp(pts[i], life * (1 - .6 * (head - i) / len))
c.v += (c.target - c.v) * .18
```
⚠ Cost is travellers × trail × radius² — brush 2–4 cells.
