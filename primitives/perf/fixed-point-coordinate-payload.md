---
id: fixed-point-coordinate-payload
category: perf
tags: [perf,payload,data,points,precision]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A large coordinate set shipped as JSON floats spends most of its bytes on
precision nobody can see. Every coordinate has a known range, so store it as an
unsigned integer fraction of that range and expand on load: two bytes per
component, no parser, no per-value string. Pick the width from the display
error you can accept — 16 bits over 360° lands near 0.006°, far below one pixel
on any globe or map. Typically 5–10× smaller than the equivalent JSON.

```js
const raw = new Uint16Array(await res.arrayBuffer())          // lon, lat, lon, lat…
const lon = raw[i * 2]     / 65535 * 360 - 180
const lat = raw[i * 2 + 1] / 65535 * 180 -  90
```
⚠ Fixed-width binary carries no schema — a changed component order or count
decodes to plausible garbage rather than failing. Send the count and validate
`byteLength` against it before use, and fall back rather than throw.
