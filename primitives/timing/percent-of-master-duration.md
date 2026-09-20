---
id: percent-of-master-duration
category: timing
tags: [timing,choreography,keyframes,css-animation,token,sequence]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 2
seen: 3
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
