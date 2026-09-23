---
id: seek-throttled-video-scrub
category: media
tags: [media,video,scroll,scrub,timeline,performance]
axes: {energy: 3, density: 2, weight: 3, finish: 5}
cost: 4
seen: 5
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

A gap threshold in seconds still writes a seek that decodes the same frame the
element is already showing. Quantise the target to the source's frame grid
instead — progress to an integer frame index — and write only when the index
changes, aiming at the frame's *centre* so rounding never lands on the boundary
between two. The scrub then costs exactly one decode per visible frame, and the
frame rate is a stated number rather than a tolerance guessed in seconds.
```js
const last = Math.round(v.duration * FPS) - 1, i = Math.round(p * last)
if (i !== Math.floor(v.currentTime * FPS) && !v.seeking)
  v.currentTime = Math.min((i + .5) / FPS, v.duration - .001)
```
⚠ `FPS` must be the encode's real rate. Guess high and every index maps to a
frame already shown, so the guard never fires and the scrub freezes.

A decoder that cannot keep up does not error — it lands somewhere near the
target and the scrub stutters with nothing to catch. Compare `currentTime`
against the requested time in `seeked`; count consecutive misses beyond
0.1–0.15s and, after 2–4, stop scrubbing and swap to the still. Fetching the
clip whole into a `blob:` URL first removes range-request latency from every
seek, which is most of what the watchdog would otherwise catch.
```js
v.addEventListener('seeked', () => { misses = Math.abs(v.currentTime - want) > .12 ? misses + 1 : 0
  if (misses >= 3) fallBackToStill() })
```
⚠ A blob holds the entire file in memory — keep the clip under 5–10MB and revoke the URL on teardown.
