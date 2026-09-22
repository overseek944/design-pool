---
id: co-terminal-offset-stagger
category: timing
tags: [stagger,entrance,morph,scheduling,arrival]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A stagger built from delays lengthens the whole move by the last element's
delay, so a 600ms change across nine items takes a second. Absorb the offsets
into the window instead: give each element a start fraction and remap global
progress to `(p − dᵢ) / (1 − dᵢ)`. Every element still lands exactly at the end
— only the departures are ragged. The arrival stays one event the rest of the
page can be scheduled against, and the looseness reads as material rather than
as a queue. Offsets 0–0.05 of the window for a whisper, 0–0.2 for a visible
cascade.

```js
const off = marks.map(() => Math.random() * 0.05)     // or (i / n) * SPREAD
const p = Math.min((now - t0) / DURATION, 1)
const local = Math.max(0, Math.min((p - off[i]) / (1 - off[i]), 1))
pos[i] = lerp(from[i], to[i], ease(local))
```
⚠ Past ~0.35 the late starters have so little window left that their easing is
effectively gone — they snap while the early ones glide.
