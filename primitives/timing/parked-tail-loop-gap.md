---
id: parked-tail-loop-gap
category: timing
tags: [motion,timing,rhythm,detail]
axes: {energy: 3, density: 1, weight: 2, finish: 4}
cost: 1
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
A sweep that should pass, rest, then pass again cannot get its rest from
`animation-delay` — that delays the first iteration only, so every later pass
runs back-to-back. Put the rest inside the keyframes: finish the travel at
55–75% and repeat the end state at `to`, and the element parks out of frame for
the remainder of each cycle. Duty cycle and period then tune independently.

```css
.sheen { animation: sweep 6s ease-in-out infinite }   /* 4–9s */
@keyframes sweep { 0% { transform: translateX(0) }
                   60%, to { transform: translateX(400%) } }
```
⚠ The parked frame must be genuinely off-stage — overflow-clipped or past the
container — or the rest reads as a stuck element rather than a pause.

Two dwells rather than one where the element has to be *read* at both ends — a
status line panning a long string needs a beat on the first words and on the
last. Hold the start to 10–18% and the end from 82–90%; the beats come out of
the travel, not off the period, so raise the duration when you add them.
```css
@keyframes pan { 0%, 14% { transform: translate(0) }
                 86%, to { transform: translateX(calc(-1 * var(--run))) } }
```

Push the duty cycle past about 9:1 and the keyframe stops being a loop with a
rest and becomes a *scheduler*: hold the resting state from `0%` to 92–97%, put
the whole event in the tail, and one infinite animation fires a brief,
apparently unprompted burst forever with no timer, no listener and nothing to
tear down. Period is the spacing — 5–12s for something that should feel
occasional. Give two elements different periods and the bursts stop coinciding.
```css
.mark { animation: 8s step-end infinite blip }     /* 5–12s */
@keyframes blip { 0%, 96% { opacity: .15 } 97% { opacity: 1 } to { opacity: .15 } }
```
⚠ The gap is exact, so a burst on a long period is still perfectly regular — it
reads as random only because it is rare. Anything that must not repeat on a
schedule still needs a real random interval.
