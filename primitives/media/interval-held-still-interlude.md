---
id: interval-held-still-interlude
category: media
tags: [media,video,ambient,cycle,hero,css-animation]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A short loop is wallpaper by its second pass. Break it on a period far longer
than the clip's own: hold a still over the footage at zero opacity, bring it up
for a fifth of a long cycle, and let it drift in scale while it is visible. The
stage carries two subjects with no carousel, no second decode and no script —
the clip underneath never stops. Cycle 15–25s against a 6–10s loop, visible
window 15–25% of it, scale 1.01 to 1.045.

```css
.still { position: absolute; inset: 0; object-fit: cover; opacity: 0;
         animation: interlude 18s ease-in-out 6s infinite }
@keyframes interlude { 0%, 26%, 72%, to { opacity: 0; scale: 1.015 }
                       38%, 58%         { opacity: 1; scale: 1.045 } }
```
⚠ Rest at opacity 1 under `prefers-reduced-motion` — pausing the animation
leaves the hero on whichever frame it stopped on. Match the still's crop to the
footage or the interlude reads as a cut.
