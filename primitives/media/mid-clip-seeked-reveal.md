---
id: mid-clip-seeked-reveal
category: media
tags: [media, video, hover, seek, poster, still, reveal, loop]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A clip mounted on hover over its own still usually opens on a fade-in or a
black frame, so the swap reads as a blink. Seek to 30–60% of the duration on
`loadedmetadata`, keep the video at opacity 0, and reveal it only on `seeked`
with a 0.25–0.4s fade: the first painted frame is already mid-motion and the
still hands over to moving picture instead of cutting through black.
```js
v.onloadedmetadata = () => Number.isFinite(v.duration) && v.duration > 0
  ? (v.currentTime = v.duration * 0.5) : setReady(true)
v.onseeked = () => setReady(true)   /* [data-ready=false] { opacity: 0 } */
```
⚠ Grade the still to match the seek point. Skip mounting the video at all under
reduced motion.
