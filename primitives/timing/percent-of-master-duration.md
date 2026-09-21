---
id: percent-of-master-duration
category: timing
tags: [timing,choreography,keyframes,css-animation,token,sequence]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 2
seen: 11
requires: []
conflicts: []
completes: []
tension: []
---
For a long multi-beat loop, give every participating element the *same* duration
token and express its beats as percentages of the whole rather than as delays.
Nothing accumulates error, because there is no offset to accumulate; the
sequence is one clock read from many places. Retiming the piece is one token
edit and every beat keeps its proportion. Totals 12–30s read as ambient;
under 8s the holds disappear. Keep a beat's hold as a pair of equal stops.
```css
:root { --seq: 24s }                         /* 14.63% = 3.51s */
.lens  { animation: lens  var(--seq) cubic-bezier(.4,0,.2,1) infinite }
.frost { animation: frost var(--seq) linear infinite }
@keyframes frost { 0%,11.5% { filter: none } 14.6%,73.4% { filter: grayscale(1) } }
```
⚠ Percentages are unreadable as intent — leave the authored seconds in a comment
or the next edit is arithmetic. Independently-started animations still begin at
different wall times; see a shared-clock driver if exact phase lock matters.

The same construction runs far shorter than ambient if the beat is a *pulse*:
hold 1.5–3s total, spend the first 20–30% on the move and make every remaining
stop identical so the rest of the cycle is dead air. Read as a heartbeat rather
than a sequence, and a dozen elements sharing that one period stay locked with
no delay to drift.
```css
@keyframes step { 0% { transform: translate(0) } 25%, 100% { transform: translate(4px) } }
```
⚠ Below ~1.2s the hold stops registering and it reads as a twitch.

One element can carry a perpetual loop and a one-shot settle at once: two
entries in the `animation` list, the loop on the shared token and the settle on
its own period with `forwards`. A badge that jitters forever while its fill
drifts once from cold to warm is two short keyframe sets, not one long
compromise.
```css
.mark { animation: jitter 2s linear infinite,
                   warm var(--seq) linear forwards }
```
⚠ Later entries in the list win on any property two of them both touch, and the
loop is usually listed first — so the one-shot must not name the looped
property or it silently freezes the loop.

Split the declaration so the clock has exactly one home: a base class carries
duration, timing function, iteration count and `animation-fill-mode: both`, and
each participant's own class supplies nothing but `animation-name`. Ten
elements then share one timing decision instead of ten copies of it, and adding
an eleventh is one line. `both` matters — without it a participant whose window
opens at 30% paints its unanimated state for the first three-tenths of every
cycle.
```css
.beat     { animation: var(--seq) linear infinite both }
.beat--b  { animation-name: reveal-b }
```
⚠ Shorthand `animation` in the base resets `animation-name` to `none`; the
modifier must come after it in source order or nothing plays.

Inside one continuous track a *discrete* change is a pair of stops a fraction of
a percent apart: `13.6%` then `14%` cuts a panel from one state to the next with
no visible tween, and a 0.6%-wide dip in `scale` reads as a click. A whole
scripted demonstration — pointer travel, presses, panel swaps, a bar stepping
through stages — then lives in one keyframe block per element, with no state
machine and nothing to reset. Cut pairs 0.3–0.8% of the period.
```css
@keyframes panel { 0%,13.6% { opacity: 1 } 14%,94.6% { opacity: 0 } 95%,100% { opacity: 1 } }
@keyframes press { 11.4% { scale: 1 } 12% { scale: .85 } 12.6% { scale: 1 } }
```
⚠ Sub-percent gaps are below the resolution of most animation inspectors —
annotate them in the source or the next edit rounds them back into tweens.

Give every participant the same blackout window at the end of the period —
opacity 1 held to ~96%, 0 by 99% — and the loop restarts from nothing rather
than cutting from each element's end state back to its start. Start and end
states then no longer have to match, which is what usually forces a multi-part
sequence to be authored backwards from its own wrap. Fade window 3–5% of the
period; below 2% it reads as a flicker rather than a reset.
```css
@keyframes step-a { 0%,30% { opacity: 1 } 96% { opacity: 1 } 99%,100% { opacity: 0 } }
```
⚠ The window must be identical everywhere. One element fading a percent late
draws the eye straight to the seam the technique exists to hide.
