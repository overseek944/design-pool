---
id: phase-offset-as-sequence
category: timing
tags: [motion,sequencing,rhythm,ambient,css]
axes: {energy: 3, density: 2, weight: 2, finish: 4}
cost: 1
seen: 21
requires: []
conflicts: []
completes: []
tension: [non-linear-loop-periods]
---
Same period, different phase. Give every looping indicator in a stack one
duration and offset each group by a fixed fraction of it, and four independent
animations read as a single thing travelling through them — a request
descending a pipeline rather than four meters idling. Index the
children of a group with an inline `--i` and step 0.10–0.14s; offset the groups
0.6–1.2s, always well inside the period.
```css
.bar { animation: pulse 3.6s infinite; animation-delay: calc(var(--i) * .12s) }
.row-2 .bar { animation-delay: calc(1s + var(--i) * .12s) }
```
⚠ Once the group offsets sum past the period the sequence wraps and the stack
reads bottom-up. Keep the last offset under roughly two thirds of it.

Make the offset *negative* where the group must read on arrival. A positive
delay holds every member at its 0% frame until its turn, so a row seeded across
a full period opens dead and fills in; a negative one starts each member already
that far in. Same steady state, no build-up — and mandatory when the 0% frame is
the empty one, as in a stepped flipbook.
```css
.cell { animation-delay: calc(var(--i) * -.16s) }   /* -period/n */
```

Given hold plateaus, the same offset gives a crossfade with no script and no
state: stack N layers on one keyframe that rises, holds, falls and stays at
zero, then delay each by `period / N`. The plateau widths are the composition —
overlap the fades by 3–5% of the period or the stack flashes through the ground
between layers.
```css
.layer { opacity: 0; animation: xfade 25s linear infinite }
@keyframes xfade { 0% { opacity: 0 } 4%, 24% { opacity: 1 } 28%, 100% { opacity: 0 } }
```

⚠ The offset must be `animation-delay`. `transition-delay` is a different
property and silently does nothing to a keyframe animation — utility frameworks
map a bare `delay-*` class to the transition one, so a stack authored this way
renders perfectly in review and runs dead in phase, every member peaking on the
same frame. The tell is that the group reads as one blinking object rather than
as travel; check the computed `animation-delay`, not the class list.

A round-robin needs one member that is *not* offset. Where N peers share the
period and each lights for roughly `100/N` percent of it, an element showing
overall progress — a rail that fills, a counter — must run its own keyframe on
the same duration with N stepped holds, not the shared one at a delay. Give it
the delay treatment and it restarts inside every stage, reporting the stage's
progress instead of the cycle's.
```css
.rail { animation: fill 8s linear infinite }   /* peers: delay n*2s */
@keyframes fill { 0%,19% { transform: scaleX(0) } 31%,44% { transform: scaleX(.25) }
                  56%,69% { transform: scaleX(.5) } 81%,100% { transform: scaleX(.75) } }
```
⚠ Duty cycle and peer count are one number: widen a peer's lit plateau past
`period/N` and two stages are lit at once, which reads as a fault.

Size the visible window to the count and one keyframe becomes an N-item
rotator. Every item shares the period; each is on screen for only its 1/N
slice — in, hold, out inside 6–10% of the cycle for ten items — and its delay is
`i × period / N`. Adding an item means retuning the window, not the timers.
```css
.item { grid-area: 1/1; opacity: 0; animation: swap var(--T) ease-in-out infinite;
        animation-delay: calc(var(--i) * var(--T) / var(--n)) }
```
