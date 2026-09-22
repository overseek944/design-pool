---
id: scroll-driven-frame-atlas
category: canvas
tags: [canvas,scroll,performance]
axes: {energy: 4, density: 3, weight: 3, finish: 4}
cost: 4
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
For scrubbed sequence playback, draw frames from a sprite atlas with a
`uAtlasCells` uniform instead of swapping textures or seeking a video. One
upload, no decode stalls, exact frame control from scroll progress.

Where no shader is wanted, the same one-file packing works as a vector-animation
player's document with each frame an embedded raster layer one frame long,
seeked to `Math.round(p * (n - 1))` from a pinned section's progress. 60–240
frames, encoded at display size rather than source size.
⚠ Base64 inflates every frame by a third and nothing draws until the whole
document parses — 200 full-width frames land near 30MB. Past ~5MB, ship a
low-resolution first pass or fall back to the atlas.
