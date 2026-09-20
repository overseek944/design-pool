---
id: video-as-surface-not-frame
category: media
tags: [media,surface,hero]
axes: {energy: 3, density: 2, weight: 4, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: [aspect-locked-media]
tension: []
---
`autoplay muted loop playsinline preload="auto"` with `object-contain` on a
transparent ground — the video becomes a material in the layout rather than a
framed player. No controls, no chrome, no aspect box.
```html
<video autoplay muted loop playsinline preload="auto"
       class="w-full h-full object-contain select-none pointer-events-none">
```
⚠ `playsinline` is mandatory or iOS fullscreens it. Provide a poster frame.
