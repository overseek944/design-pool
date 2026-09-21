---
id: duration-zeroed-outcome-state
category: motion-system
tags: [motion,architecture,correctness,scene,reduced-motion]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: [paused-as-authored-rest]
---
A scene built from dozens of delayed one-shots has a still state nobody wrote:
the composition after every beat has landed. Zero `animation-duration` and
`animation-delay` across the subtree and each filled animation resolves to its
last keyframe at once — the outcome paints with no second render path and no
inventory of the scene's contents. Serves a thumbnail, a reduced-motion
branch. Earns its place past 4–12s of beats.

```css
[data-scene=static] * { animation-duration: 0s !important;
                        animation-delay: 0s !important }
```
⚠ It renders *after everything finished* — an element whose last beat is an exit
resolves to gone, and one animating without `both`/`forwards` snaps back to its
unanimated base. Elect a frame for loops.
