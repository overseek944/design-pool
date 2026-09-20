---
id: stepped-two-frame-blink
category: timing
tags: [motion,easing,indicator,status,ambient]
axes: {energy: 2, density: 1, weight: 2, finish: 3}
cost: 1
seen: 12
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

`step-end` over a three-stop keyframe is the same instrument written the other
way round — `0%,100% {opacity:1} 50% {opacity:0}` — and puts the off state in
the keyframe rather than the duration, so period and duty cycle tune apart.

Duty cycle is not free to set at 50%. A text caret off for half its period reads
as a field that has lost focus; the same caret off for a quarter reads as
waiting for input. Put three or four stops in the keyframe so the on and off
phases are independently tunable — off 25–35% of the period for a caret, up to
50% for an alarm, where the gap *is* the signal.
```css
@keyframes caret { 0%, 70%, 100% { opacity: 1 } 20%, 50% { opacity: 0 } }
```
