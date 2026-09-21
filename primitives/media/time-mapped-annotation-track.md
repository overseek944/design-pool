---
id: time-mapped-annotation-track
category: media
tags: [media,video,timeline,annotation,seek,evidence]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Findings about a recording belong on the recording's own axis. Place each
flagged span as a percentage of `duration`, one lane per kind, and the figure
stops being a list to cross-reference and becomes a map of where to look. Every
band is a button that seeks to its start; the playhead is written from
`timeupdate`. Percentages need no re-measure on resize. Lanes 6–10px with a
2–3px gap, bands at .7–.9 alpha lifting to 1 while the head is inside them.

```js
b.style.left  = `${100 * s / dur}%`
b.style.width = `${Math.max(.4, 100 * (e - s) / dur)}%`   // floor 0.3–0.6%
b.onclick = () => { v.currentTime = s; v.play() }
v.ontimeupdate = () => head.style.left = `${100 * v.currentTime / dur}%`
```
⚠ `duration` is `NaN` before `loadedmetadata` — build the track from that event.
Without a per-band label naming its kind and its time range, the lane is a row
of unnamed buttons.
