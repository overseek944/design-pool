---
id: percent-of-master-duration
category: timing
tags: [timing,choreography,keyframes,css-animation,token,sequence]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 2
seen: 1
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
