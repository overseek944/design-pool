---
id: canvas-relayed-video-playback
category: media
tags: [media,video,canvas,chrome,performance]
axes: none
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: [video-as-surface-not-frame]
---
A `<video>` carries chrome no attribute removes — a long-press save menu, a PiP
button, controls a platform shows when it likes. Demote it to a decoder: 1×1,
clipped, `opacity: 0`, and relay its frames into a sibling canvas, an ordinary
surface to grade, mask or composite. Drive from `requestVideoFrameCallback`,
`requestAnimationFrame` where absent, backing store at
`min(devicePixelRatio, 1.5–2)`.

```js
const k = Math.max(c.width / v.videoWidth, c.height / v.videoHeight)   // cover
ctx.drawImage(v, (c.width - v.videoWidth*k)/2, (c.height - v.videoHeight*k)/2,
                 v.videoWidth*k, v.videoHeight*k)
v.requestVideoFrameCallback ? v.requestVideoFrameCallback(tick) : requestAnimationFrame(tick)
```
⚠ Decorative footage only — a canvas has no captions, no transport, nothing to
save. Paint the poster until the first frame decodes; stop the loop with the clip.
