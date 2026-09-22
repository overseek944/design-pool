---
id: non-linear-loop-periods
category: timing
tags: [motion,ambient,rhythm]
axes: {energy: 3, density: 3, weight: 2, finish: 4}
cost: 2
seen: 23
requires: []
conflicts: []
completes: []
tension: []
---
Give concurrent ambient loops coprime-ish periods (4s / 5s / 7s) and alternate
directions. They drift out of phase and never visibly resync, so a small set of
loops reads as continuous life rather than a repeating pattern.
```css
animation: spin 5s linear infinite;
animation: spin 7s linear infinite reverse;
```

The same rule governs parallel *tracks*, where the period is content width ÷
speed rather than a declared duration. Two lanes at different speeds still
resync if their content is the same length — vary both, and run them in opposite
directions. 55–75px/s reads as drift rather than transport.

The rule also rescues its opposite. A scene deliberately phase-locked to one
master duration is rigorous and slightly dead, because every part restarts on
the same frame forever. Give exactly one ornamental part — a sweep, a pulse, a
flicker — its own short period that does not divide the master, and the
composite stops announcing its loop point while the meaningful parts stay
locked. One such part, not two; a second turns the discipline back into noise.
```css
.scene > * { animation-duration: 10s }   /* locked */
.beam      { animation: sweep 2.4s ease-in-out infinite }
```

A period expressed as a percentage does not survive a breakpoint. A slow pan
across a cover-fitted image translating 30% of its own width covers a different
number of device pixels at every viewport, so one duration reads as drift on a
desktop and as a swipe on a phone — and the travel is also bounded by the crop
headroom, which a narrow box may not have. Author the narrow branch as its own
keyframe: scale up first to buy overflow, then spend less of it, and set the
duration from the same px/s target.
```css
.pan { animation: wide 45s linear infinite }            /* 30% travel */
@media (max-width: 640px) { .pan { animation: narrow 15s linear infinite } }
@keyframes narrow { to { transform: scale(1.2) translateX(15%) } }
```
⚠ Scale before translate or the travel is scaled too, and the edge arrives
early.

Hand-picked coprime periods do not scale to a set whose size is data. Derive the
ladder from the index instead — a base plus a step per member — and pair it with
a negative delay off the same index, so an arbitrary number of members are both
spread through the cycle and drifting apart from the first frame. Step 10–20% of
the base; below that they beat, above it the slowest member reads as a different
effect.
```css
g { animation: shimmer calc(2.75s + var(--i) * .4s) ease-in-out infinite;
    animation-delay: calc(var(--i) * -1.05s) }
```
⚠ The ladder is only coprime-ish — members whose periods land in a small integer
ratio still resync visibly. An irrational step, or a step that does not divide
the base, is what keeps the whole set apart.

`reverse` runs the same path backwards in time, which two adjacent members read
as one thing rewinding. To split a drift into two populations, mirror it in
*space* instead: put a ±1 token inside the keyframe on every signed term, and
alternate it by index. One keyframe, two mirrored paths, both travelling
forward, and the pair no longer looks copied. Worth it on any signed axis —
translation, rotation, skew.
```css
.drift { animation: float var(--dur) ease-in-out infinite }
@keyframes float { 50% { translate: calc(var(--turn, 1) * 3px) -8px;
                         rotate: calc(var(--turn, 1) * .9deg) } }
```
⚠ Mirror the signed terms only. Flipping a vertical rise as well gives half the
set a path that sinks, and a field where some members fall reads as a fault.

Period, phase and direction all vary the *schedule* of one shape — two drifters
sharing a keyframe still trace the same figure, and on a slow loop a reader
reads that as one thing copied even though the pair never resync. Give each its
own **waypoint count** too: stops at 25/50/75% against stops at 33/66%, so the
paths differ in kind rather than in timing. Two to four interior stops; past
that the excursions shrink into jitter. Slow ambient drift, 8–20s, is where the
difference has time to register.
```css
@keyframes drift-a { 25%{translate:-8px -10px} 50%{translate:4px -6px}
                     75%{translate:-3px -12px} }
@keyframes drift-b { 33%{translate:6px -8px}   66%{translate:-4px -5px} }
```
⚠ Hold every path to one travel budget. A drifter given more stops that also
ranges further stops reading as a peer and starts reading as the broken one.

Two counter-running lanes stacked in one band need more than different speeds.
At the same size and weight they read as one text cut in half and re-glued the
wrong way round, and the eye keeps trying to join them. Split the typographic
register too: the fast lane wide-tracked mono uppercase at 0.7–0.8rem, the slow
one a serif italic at 1.3–1.6× that size. The band then reads as two channels
rather than one broken line — and it is the register contrast, not the speed
difference, that stops the eye locking onto either.
⚠ Two registers, never three, and neither lane may carry anything the reader
needs: both are unreadable at the ends of the band.
