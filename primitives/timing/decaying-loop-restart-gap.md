---
id: decaying-loop-restart-gap
category: timing
tags: [loop,timing,sequence,restraint,demo,attention]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A self-restarting demonstration does not want one restart gap. A reader
arriving part-way through the first pass needs to see the beginning soon, so
hold the finished frame briefly and run again; by the second restart they have
watched it, and a short gap now reads as nagging. Lengthen the hold on every
pass after the first and the piece decays from demonstration into ambient
without ever stopping. First gap 0.8–1.5s, later gaps 3–5s, or park it
permanently after three passes.
```js
const gap = firstPass ? FIRST : REST   // 1200 : 3400
firstPass = false
timer = setTimeout(restart, gap)
```
⚠ The held frame is the *last* one, so it has to be a legible end state on its
own — a sequence that finishes mid-transition parks on a half-drawn frame for
seconds at a time.

The same asymmetry belongs *inside* one pass, not only at its restart. Give the
opening beat a short dwell so a reader arriving mid-scroll sees the thing move
almost immediately, the middle beats an even one, and the closing beat two to
three times the middle so the resolved composition is legible before the wrap.
A flat delay per step makes the entrance feel dead and the ending feel snatched
at once. Opening 0.5–0.8×, closing 1.5–2× the middle step.
```js
const dwell = i === 0 ? 700 : i >= steps.length ? 3400 : 2100
```
⚠ Read the index, not a counter that survives the wrap — on the second pass the
opening beat must be short again, or the loop accelerates away from the reader.
