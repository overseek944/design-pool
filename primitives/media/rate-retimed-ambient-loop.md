---
id: rate-retimed-ambient-loop
category: media
tags: [media,video,timing,ambient,loop,perf]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Background footage cut at natural speed reads as busy behind copy. Slow it at
playback instead of re-encoding: the loop lengthens, its seam comes round less
often, and the bytes stay the same. Set `defaultPlaybackRate` as well as
`playbackRate`, on `loadedmetadata`, or a reload or source switch quietly
resets it to 1. Rate 0.4–0.75.

```js
v.addEventListener('loadedmetadata', () => {
  v.defaultPlaybackRate = v.playbackRate = 0.5   // 0.4–0.75
})
```
⚠ Frame rate falls with the rate: a 24–30fps source at 0.5 shows 12–15 new
frames a second and stutters on any pan. Encode the ambient clip at 50–60fps, or
keep camera motion out of it.
