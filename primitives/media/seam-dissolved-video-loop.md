---
id: seam-dissolved-video-loop
category: media
tags: [media,video,loop,crossfade,seam,ambient]
axes: {energy: 2, density: 1, weight: 3, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`loop` cuts from the last frame to the first, and unless the clip was shot to
match, that cut reads as a jump once a cycle. Stack two copies of the same file
and cross-fade between them: when the live copy comes within a fade of its end,
restart the idle one and hand the class over. The dissolve hides a seam no
re-encode can remove. Fade 0.6–1.3s.

```js
if (live.duration - live.currentTime > FADE) return
idle.currentTime = 0; idle.play(); idle.classList.add('is-live')
live.classList.remove('is-live')                 // pause it after the fade
```
⚠ Two elements is two decoders — gate on intersection and `visibilitychange`.
`timeupdate` fires ~4×/s, so a fade shorter than a tick misses its handoff.
