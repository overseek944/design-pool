---
id: seek-throttled-video-scrub
category: media
tags: [media,video,scroll,scrub,timeline,performance]
axes: {energy: 3, density: 2, weight: 3, finish: 5}
cost: 4
seen: 2
requires: []
conflicts: []
completes: [scrub-lag-band, reduce-restored-media-transport]
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

Scroll position is state that has already happened, so the driver has to be
re-run when the asset becomes seekable — not only when the scroll next moves.
`duration` is `NaN` until metadata lands and every target computed from it is
discarded, which strands a reader who arrived mid-section on frame zero until
they scroll again. Guard on `readyState` and a finite duration, then call the
same update from `loadedmetadata` and once from `canplay`.
```js
const drive = () => { if (v.readyState < 1 || !Number.isFinite(v.duration)) return
  /* … map progress to currentTime … */ }
v.addEventListener('loadedmetadata', drive)
v.addEventListener('canplay', drive, { once: true })
```
⚠ A deep link and a back/forward restore land the same way — both arrive at a
scroll position without dispatching a scroll event.
