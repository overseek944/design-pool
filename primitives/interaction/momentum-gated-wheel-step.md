---
id: momentum-gated-wheel-step
category: interaction
tags: [interaction,wheel,input,gesture,correctness]
axes: none
cost: 2
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
A trackpad flick is one gesture and hundreds of events, so a step per `wheel`
event runs away. Normalise the delta by `deltaMode`, accumulate to a
threshold, emit one step, then hold off until the tail settles — small deltas, a
gap, or a reversal. Threshold 30–60px, gap 120–200ms, calm under ~6px.

```js
const d = e.deltaY * ({1:16, 2:innerHeight}[e.deltaMode] ?? 1)
if (t - last > GAP || Math.sign(d) !== dir || calm > 3) (sum = 0, armed = 1)
if (armed && Math.abs(sum += d) >= STEP) (step(dir=Math.sign(sum)), sum = armed = 0)
```
⚠ Listen non-passively or the page scrolls under the step. Arrow keys and a
visible control owe the same step.

A horizontal rail inside a vertical page should claim only the gesture that is
mostly sideways: take `deltaX` when `|deltaX| > |deltaY|`, otherwise return
without `preventDefault` so the page keeps scrolling. The cheap tail guard is a
flat lockout after each step — 300–400ms — rather than calm detection.
```js
const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0
if (!dx) return; e.preventDefault(); if (Date.now() < until) return
if (Math.abs(sum += dx) > STEP) (go(Math.sign(sum)), sum = 0, until = Date.now() + 350)
```
⚠ A lockout drops a second deliberate flick; keep it under the gesture's tail.

A stepper that also scrubs can let the wheel drive a continuous position and
still move one step per gesture: record the settled step as an anchor when the
gesture starts, clamp the live position to anchor ± 1, and lock once rounding
crosses to the neighbour. Where a step owns an overflowing panel, the panel
spends wheel, touch and arrow keys first and the stepper only takes the input
once the panel sits at the edge in that direction. Gain 0.002–0.005 per px.
```js
if (panel && !(d > 0 ? atBottom(panel) : atTop(panel))) return   // native scroll
pos = clamp(pos + d * GAIN, anchor - 1, anchor + 1)
if (Math.round(pos) !== anchor) locked = true, go(Math.round(pos))
```
⚠ Measure overflow live — a panel that fits must not swallow the edge test.
