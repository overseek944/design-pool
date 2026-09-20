---
id: stepped-two-frame-blink
category: timing
tags: [motion,easing,indicator,status,ambient]
axes: {energy: 2, density: 1, weight: 2, finish: 3}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
An indicator that fades reads as decoration; one that snaps between two
opacities reads as an instrument reporting a state. `steps(2, start)` across a
single keyframe pair deletes every intermediate frame, so the mark is on or
off and nothing is in transit. Period carries the meaning — 1.2–1.8s for live
or recording, 3–4s for nominal — and an off state at 0.25–0.45 rather than 0
keeps its position legible.

```css
.dot { animation: blink 1.6s steps(2, start) infinite }
@keyframes blink { 50% { opacity: .3 } }
```
⚠ Hard blinking is seizure-adjacent above ~3Hz and visually loud well below
it. Under `prefers-reduced-motion` it must stop, not slow.
