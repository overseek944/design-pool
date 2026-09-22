---
id: dot-module-code-render
category: media
tags: [media, svg, qr, brand, correctness]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A stock QR code is the one square-pixel object on a composed page. Encode to the
module matrix and draw the SVG yourself: data modules as circles, finders as
concentric rounded squares. Scanners key on the finders; error correction
absorbs the dots. Dot radius 0.35–0.45 module; finder radius 0.1–0.25; ECC M+.

```js
if (dark[r][c] && type[r][c] !== FINDER)
  dots += `<circle cx="${c + .5}" cy="${r + .5}" r=".42"/>`
// finders: rect 7×7 rx 1.7 → white 5×5 → dark 3×3
```
⚠ Keep dark-on-light with a 2–4 module quiet zone, test on several phone
cameras, and put a plain link beside it.
