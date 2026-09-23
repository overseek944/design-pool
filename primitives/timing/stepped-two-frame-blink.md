---
id: stepped-two-frame-blink
category: timing
tags: [motion,easing,indicator,status,ambient]
axes: {energy: 2, density: 1, weight: 2, finish: 3}
cost: 1
seen: 35
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

Push the duty cycle to its extreme and phase-offset a row of them and the
instrument changes meaning: at 10–15% on, what the eye tracks is the *travelling*
lit mark, so a step list reads as a playhead moving down it rather than as N
independent indicators. The period is shared and the offsets are a fraction of
it; a `linear` clock keeps the hand-off between neighbours even.
```css
.step { animation: pulse 3.3s linear infinite }
.step:nth-child(n) { animation-delay: calc(var(--i) * .55s) }   /* period / count */
@keyframes pulse { 0%, 13% { background: var(--on) } 22%, 100% { background: var(--off) } }
```
⚠ This encodes sequence position in motion alone. It stops existing under
`reduce` and for anyone not watching — the real position still has to live in
an `<ol>` or `aria-current`.

`visibility` gives the square wave for free. It does not interpolate, so a
single `to { visibility: hidden }` under `steps(2, start)` is an exact 50% duty
cycle with no second stop to keep in sync, and the mark holds its box
throughout, so nothing around it reflows as it goes. 0.9–1.2s reads as a text
caret; the same trick at 2–4s reads as a status lamp.
```css
.caret { animation: blink 1.05s steps(2, start) infinite }
@keyframes blink { to { visibility: hidden } }
```
⚠ `visibility: hidden` also drops the element from the accessibility tree and
from hit-testing, so this belongs on decorative marks only — a blinking node
that carries a name or a target flickers both fifty times a minute. The moment
the mark means something, blink opacity instead.

A hard stop pair — `0%,60% {opacity:.9} 60.01%,to {opacity:.15}` — sets any duty
cycle without a timing function; 55–70% on reads as a crosshair or reticle.

Replace the on/off pair with a ramp of 8–12 descending stops under `steps(1)`
and the travelling mark grows a quantised tail: each dot jumps to full, then
drops one level per step, so a phase-offset row reads as a comet moving along
it. Offset each dot by period ÷ count; a floor of 0.05–0.15 keeps the track visible.
```css
.dot { animation: trail 1s steps(1) infinite; animation-delay: calc(var(--i) * -.1s) }
@keyframes trail { 0%,100% { opacity: .1 } 10% { opacity: 1 } 50% { opacity: .6 } 90% { opacity: .2 } }
```
