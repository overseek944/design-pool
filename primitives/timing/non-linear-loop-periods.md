---
id: non-linear-loop-periods
category: timing
tags: [motion,ambient,rhythm]
axes: {energy: 3, density: 3, weight: 2, finish: 4}
cost: 2
seen: 10
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
