---
id: packed-generation-state-texture
category: canvas
tags: [canvas,shader,simulation,texture,architecture,performance]
axes: none
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A discrete simulation — cells, agents, a lattice — wants to step slowly and draw
fast. Run the rule on the CPU at 30–70 cells a side, pack four facets of each
cell into one RGBA texel, and upload a nearest-filtered texture the fragment
shader reads. Holding *current* and *next* generation in two channels lets the
shader tween between them on an eased 0→1 mix, so a step every 0.8–2s never
lands as a jump; the remaining channels carry history the step would otherwise
discard.

```js
d[i*4]   = cur[i] * 255                        // tween endpoints
d[i*4+1] = next[i] * 255
d[i*4+2] = Math.min(age[i], 12) / 12 * 255     // how long it has survived
d[i*4+3] = changed ? 255 : trail[i] * 0.56     // decaying memory of activity
```
⚠ Nearest filter and no mipmaps, or neighbours bleed and the lattice stops being
discrete. Channels are 8-bit — quantise any counter against a declared ceiling
rather than letting it wrap.
