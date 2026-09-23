---
id: sparse-sequence-nearest-frame
category: media
tags: [scrub,scroll,images,loading,canvas,progressive,perf]
axes: {energy: 3, density: 2, weight: 3, finish: 5}
cost: 4
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
A scroll-scrubbed image sequence does not need every frame to exist. Resolve
each draw by walking outward from the requested index to the nearest frame that
has actually decoded — the scrub is usable from the first arrival rather than
blank until the set completes. That resolver then lets the set be sparse on
purpose: fetch every second or third frame on narrow or weak devices and the
gaps fill themselves, reading as a coarser scrub, not a fault. 48–90 frames
full, stride 2–3 reduced.

```js
const at = i => { for (let k = 0; k < N; k++) {
  const a = f[i - k], b = f[i + k]
  if (a?.complete && a.naturalWidth) return a
  if (b?.complete && b.naturalWidth) return b } }
```
⚠ `complete` is true for a failed request too — test `naturalWidth` beside it
or a 404 draws nothing. Decode every frame `async`; a synchronous decode inside
a scroll handler stalls the gesture.

The sparse set need not be evenly spaced, and scroll need not map to frames
linearly. Author the stills as a sorted list of frame numbers and resolve by
binary search; author the timeline as chapters, each a weight (its share of the
scroll) and a `from`–`to` frame range. A chapter with eight frames can then hold
as long as one with eighty — dwell is decided by the weight, not by how much
was rendered. Weights 0.5–2 per chapter.
```js
let t = clamp01(p) * total; for (const c of chapters) { if (t <= c.weight) return
  c.from + (c.to - c.from) * t / c.weight; t -= c.weight }
```
⚠ Return the chapter index and local progress with the frame — captions and a
jump-to-chapter control need them, and re-deriving them from the frame is lossy.
