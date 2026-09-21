---
id: stateless-phase-pair-field
category: canvas
tags: [canvas,architecture,morph,scrub,points,field,correctness]
axes: none
cost: 3
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A scrubbed field of marks usually keeps a live position per mark, which makes it
one-way: reverse the driver and the field has to re-converge. Write each state as
a pure function of `(mark, index, clock) → pose` instead, and render by
evaluating the current state and the next one each frame and interpolating
between the results. Nothing is stored, so any scalar addresses any point of the
sequence directly, and each state keeps its own ambient motion running through
the crossing. Per-mark hold 0–0.3 so the field arrives as a ripple; cross over
the last 30–60% of a state's span.

```js
const a = phase[k](mark, i, clock), b = phase[k + 1](mark, i, clock)
const u = ease(clamp((cross - mark.hold) / (1 - mark.hold), 0, 1))
draw(lerp(a, b, u))
```
⚠ Both states are evaluated for every mark mid-crossing, so those frames cost
2N — budget each state function at half a single-pose field's allowance.

Statelessness and pointer interaction are not exclusive, provided what persists
is an *offset* and never a position. Keep a small velocity per mark, integrate
the driver's push into it, damp it toward zero each frame, and add the result to
the pose the phase functions just returned. The field stays addressable —
reverse the scalar and it re-derives exactly — while a disturbance still lags
and recovers. Integrating into the pose itself is what breaks scrubbing: the
driver's history is then baked into the value the scalar is supposed to own.
Damping 0.88–0.95.
```js
const pose = lerp(phase[k](m, i, t), phase[k + 1](m, i, t), u)
o.vx = (o.vx + push.x) * DAMP; o.vy = (o.vy + push.y) * DAMP
draw(pose.x + o.vx, pose.y + o.vy)        // the offset persists, the pose never does
```
⚠ Clamp the offset as well as the velocity — damping alone lets a held pointer
accumulate a drift the scrub cannot undo.
