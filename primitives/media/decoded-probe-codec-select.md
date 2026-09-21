---
id: decoded-probe-codec-select
category: media
tags: [video,codec,transparency,feature-detection,correctness,media]
axes: none
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`canPlayType` answers about the container, not about what survives the decode:
an engine reports `probably` for a clip carrying alpha, then composites the
transparent regions to black. The honest test decodes a purpose-built probe —
a clear corner and a known opaque swatch — into a small canvas and reads the
pixels back. Try formats in preference order, keep the first that passes,
memoise the promise so a page of clips pays once. Probe 8–32px, abandon at 2–5s.

```js
const p = ctx.getImageData(0, 0, 16, 16).data          // after drawImage(video)
ok(p[3] === 0 && p[547] > 250 && p[544] > 200)         // clear corner + swatch
```
⚠ An unpainted frame reads as all zeroes and passes the clear test — require
the swatch too, retrying on rAF. Each probe holds a decoder: run them in
series, and default to the opaque encode until the answer lands.
