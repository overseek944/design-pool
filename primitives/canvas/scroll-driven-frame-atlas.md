---
id: scroll-driven-frame-atlas
category: canvas
tags: [canvas,scroll,performance]
axes: {energy: 4, density: 3, weight: 3, finish: 4}
cost: 4
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
For scrubbed sequence playback, draw frames from a sprite atlas with a
`uAtlasCells` uniform instead of swapping textures or seeking a video. One
upload, no decode stalls, exact frame control from scroll progress.
