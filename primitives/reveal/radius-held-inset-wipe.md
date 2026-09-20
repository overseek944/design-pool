---
id: radius-held-inset-wipe
category: reveal
tags: [reveal,clip-path,wipe,panel,motion]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A panel widening under `clip-path: inset()` squares its corners off the moment
the clip is tighter than the box, because the clip shape carries no radius of
its own. Put `round` at the element's radius in *both* keyframes and the visible
region stays a rounded rectangle throughout — it reads as one object growing
rather than a mask sliding off one. Start 20–35% inset; under 15% the growth
stops registering. Animate a leading icon's `left` on the same clock so it rides
the opening edge instead of popping in behind it.
```css
@keyframes grow { from { clip-path: inset(0 28% round 8px) } to { clip-path: inset(0 round 8px) } }
@keyframes lead { from { left: calc(28% + 16px) } }
```
⚠ Omit `round` at one end and the radius animates to zero instead of holding.
`clip-path` interpolates only between the same shape function.

Stepped rather than smooth, the same inset is a typewriter: run
`inset(0 100% 0 0)` to `inset(0)` over `steps(n)` with n at the character count.
No monospace face, no `ch` width to measure, and no per-glyph markup — the clip
travels the laid-out text. 12–25 characters per second.
```css
.type { animation: wipe 1.2s steps(26) both }
@keyframes wipe { from { clip-path: inset(0 100% 0 0) } to { clip-path: inset(0) } }
```
⚠ Single line only: a right-side inset clips the whole box, so a wrapped string
reveals every line in parallel. n is per string — one shared value makes short
labels stutter and long ones slide.
