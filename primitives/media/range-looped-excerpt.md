---
id: range-looped-excerpt
category: media
tags: [media,video,loop,preview,excerpt,range]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A preview does not need its own encode. Loop a range of the full-length master:
declare in and out points on the element, seek to the in-point on
`loadedmetadata`, and send the playhead back whenever `timeupdate` passes the
out-point or lands before the in-point. One file serves the full view and every
thumbnail cut from it. Range 3–10s.

```js
v.addEventListener('loadedmetadata', () => v.currentTime = IN)
v.addEventListener('timeupdate', () => {
  if (v.currentTime >= OUT || v.currentTime < IN - .2) v.currentTime = IN })
```
⚠ `timeupdate` fires ~4×/s, so the loop overshoots by up to 250ms and the seam
is a visible cut. The whole master still downloads — use `preload="metadata"`
and pause off-screen.
