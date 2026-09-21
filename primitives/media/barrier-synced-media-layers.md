---
id: barrier-synced-media-layers
category: media
tags: [video,media,correctness,layering,loading]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
Two clips composited as layers — a base pass and a treated one crossfading over
it — must sit at the same timestamp, or the dissolve shows two moments and reads
as a glitch, not a grade. Autoplaying each starts it whenever its own buffer
fills, which differs by encode. Count readiness instead: one idempotent
flag per element, set by whichever of `loadeddata` or `canplay` lands first, and
only once the count reaches the layer total reset every `currentTime` and call
`play()` in one tick. Hold the stack at opacity 0 until then.

```js
let ready = 0
const ok = v => { if (v.dataset.ok) return; v.dataset.ok = '1'
  if (++ready === layers.length)
    layers.forEach(l => { l.currentTime = 0; l.play().catch(() => {}) }) }
layers.forEach(v => ['loadeddata', 'canplay'].forEach(e =>
  v.addEventListener(e, () => ok(v), { once: true })))
```
⚠ They still drift — a dropped frame is never made up. Keep layers to 4–10s, or
re-seat the followers off the base's `currentTime` every few seconds.
