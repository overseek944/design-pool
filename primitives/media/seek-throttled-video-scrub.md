---
id: seek-throttled-video-scrub
category: media
tags: [media,video,scroll,scrub,timeline,performance]
axes: {energy: 3, density: 2, weight: 3, finish: 5}
cost: 4
seen: 1
requires: []
conflicts: []
completes: [scrub-lag-band]
tension: [approach-loaded-video, scroll-driven-frame-atlas]
---
A video can be the scrubbed property: write `currentTime` from scroll progress
and the footage *is* the timeline. The decoder is the constraint, not the maths.
Seeking while a seek is pending saturates the queue, so write only when
`seeking` is false and the gap exceeds half a frame, and clamp one or two frames
short of `duration` — landing on the end shows black. Smooth the target first:
a raw offset is one seek per wheel step.
```js
const t = Math.min(p * v.duration, v.duration - 1 / 30)
if (!v.seeking && Math.abs(v.currentTime - t) > 1 / 60) v.currentTime = t
```
⚠ Seek accuracy is keyframe-bound — encode at a 0.1–0.5s GOP or the scrub steps.
