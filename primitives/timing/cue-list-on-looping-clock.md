---
id: cue-list-on-looping-clock
category: timing
tags: [motion,timing,loop,architecture,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A multi-beat scripted sequence built from chained timers cannot be paused,
seeked or restarted without bookkeeping, and every pause leaks a handle. Hold
the beats as data instead — `{at, fn}` in time order — and run one cursor
against a single accumulating clock: fire while the next cue is due, reset
cursor and clock together at the period. Pausing is then simply not requesting
frames, with nothing to clear; retiming is one number. Periods 8–30s read as a
demonstration, under 5s as a blink.
```js
for (; i < cues.length && cues[i].at <= t; i++) cues[i].fn()
if ((t += Math.min(dt, .05)) >= PERIOD) { t = 0; i = 0; reset() }
```
⚠ The reset must return every element a cue touched to its start state — a cue
list is a schedule, not a state machine, and it will not undo itself.
