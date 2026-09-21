---
id: video-as-surface-not-frame
category: media
tags: [media,surface,hero]
axes: {energy: 3, density: 2, weight: 4, finish: 4}
cost: 3
seen: 10
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

Footage graded to a two-tone or dithered treatment cannot be re-toned for a dark
theme by CSS — a filter that flips its lightness flips its hue as well, and the
posterised edges break. Ship the pair as separate files, mount both, and swap
with `visibility` rather than `display` or a `src` change: both decode once and
stay in step, so the theme toggle is instantaneous with no black frame.
```css
.clip-dark, [data-theme="dark"] .clip-light { visibility: hidden }
[data-theme="dark"] .clip-dark { visibility: visible }
```
⚠ Two files is two downloads and two decoders running forever. Only worth it
for a short loop under a few hundred KB; past that, load the second on the
first toggle and accept one beat of delay.
