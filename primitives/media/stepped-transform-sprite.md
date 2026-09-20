---
id: stepped-transform-sprite
category: media
tags: [media,sprite,animation,svg,performance]
axes: {energy: 3, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Play a short looping illustration as a filmstrip: frames in one wide row, slid
by whole frames with `steps()`. Because the only animated
property is `transform`, it stays on the compositor — cheaper than swapping
`background-position`, and unlike a video it works inside an SVG. Start paused and let a viewport
observer release it, so idle sequences cost nothing. 8–16 frames over 0.6–2s.

```css
@keyframes strip { to { transform: translateX(-100%) } }
.sprite {
  transform-box: fill-box; will-change: transform;
  animation: strip var(--dur, 1.2s) steps(var(--frames, 12), end) infinite;
  animation-play-state: paused;
}
```
⚠ `steps(n)` must match the frame count exactly or the loop drifts; one wide strip is also one large decode, so cap the row width.
