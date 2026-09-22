---
id: parked-tail-loop-gap
category: timing
tags: [motion,timing,rhythm,detail]
axes: {energy: 3, density: 1, weight: 2, finish: 4}
cost: 1
seen: 19
requires: []
conflicts: []
completes: []
tension: []
---
A sweep that should pass, rest, then pass again cannot get its rest from
`animation-delay` — that delays the first iteration only, so every later pass
runs back-to-back. Put the rest inside the keyframes: finish the travel at
45–75% and repeat the end state at `to`, and the element parks out of frame for
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

The rest can be bought with distance rather than with repeated keyframes. Run a
linear travel that starts and ends far outside the clip — six to twelve times
the element's own width — and it is off-stage for most of the cycle with two
keyframes and one number to tune. On `ease-in-out` the slow ends both fall
outside the frame, so what crosses is the fast middle: a glint rather than a
drift, which a parked tail on a linear curve cannot give you.
```css
@keyframes pass { from { transform: translateX(-200%) skewX(-20deg) }
                  to   { transform: translateX(800%)  skewX(-20deg) } }
```
⚠ Duty cycle is now the overshoot's job, so widening the element shortens the
visible pass — express the travel in the element's own width, not in a percentage
of the container it happens to sit in.

The dwell need not be at an end. A sweep whose subject is the middle of the run
— a highlight crossing a headline, a scanner passing a centred label — earns a
third station there: pair the stops at the centre too and the pass slows, holds
where the eye already is, then completes. Three stations at 12–18% of the cycle
each reads as a deliberate visit rather than a lap.
```css
@keyframes glide { 0%, 16% { background-position: -3% }
  44%, 56% { background-position: 50% }   84%, to { background-position: 103% } }
```
⚠ Stations are bought out of travel, not out of period — a three-station cycle
needs 1.5–2× the duration of the same sweep run straight or every leg darts.

Different periods stop bursts coinciding, which is right for scattered
decoration and wrong for a mock of a working system. Give every animated part of
one illustration the *same* period — the filling bar, the rising row, the drawn
stroke, the pulsing dot — and separate them with delays of 0.1–0.3s only. The
panel then reads as one refresh cycle rather than four decorations sharing a
box. The plateau carries more of that reading than the event does: hold 70–85%
of the period at the authored still. Period 4–6s.
```css
.part { animation: 5.2s cubic-bezier(.32,.72,0,1) infinite both }
.part--stroke { animation-delay: .15s }
```
⚠ One period means one visible restart: every part snaps together at the wrap,
so each keyframe must end on the frame it starts from or the whole panel jumps
at once.

The same parked rest drives a staggered sibling wave — a three-dot pending
indicator — with no script: one keyframe that moves only in its first 25–35%
and holds rest from there to `to`, each dot delayed 0.15–0.25s. The rest window
must be longer than the total stagger span, or the last dot is still rising
when the first starts again and the wave smears into a shimmer. Lift 2–4px,
opacity .4 → 1; period 1.2–1.6s.
```css
@keyframes dot { 0%, 60%, to { opacity: .4; translate: 0 } 30% { opacity: 1; translate: 0 -2px } }
.dot:nth-child(2) { animation-delay: .2s } .dot:nth-child(3) { animation-delay: .4s }
```

The glint need not be an element that travels. Animate a `clip-path: polygon()`
parallelogram from wholly left of the box to wholly right — vertices at −90…−30%
and 95…160% — over a sheen layer that stays put, and the clip is the pass. Fade
opacity in by 15% and out after 75%; 1–1.5s, finite 2–4 iterations to mark
something freshly made.
⚠ `clip-path` animation repaints the layer each frame — one small element only.
