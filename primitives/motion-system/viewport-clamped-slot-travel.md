---
id: viewport-clamped-slot-travel
category: motion-system
tags: [motion,travel,scroll,measurement,layout]
axes: {energy: 3, density: 1, weight: 2, finish: 5}
cost: 3
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
An element travelling between two positions read from real layout leaves the
screen whenever the slots are further apart than the viewport is tall, and the
reader watches an empty gap. Clamp each endpoint into the visible band *before*
building the curve rather than clamping the result: the path is then shorter
than the layout distance and the traveller stays readable the whole way. Pad
24–48px; bend the control points by 10–15% of the clamped distance, capped near
16–42px, so a short hop is not a loop.

```js
const band = y => Math.min(Math.max(y, PAD), vh - h - PAD)
const a = band(startRect.top - scrollY), b = band(destRect.top - scrollY)
const bend = Math.min(42, Math.max(16, Math.abs(b - a) * 0.12))
```
⚠ Hand off on geometry, not progress — swap the traveller for the real element
only once the destination is within a few pixels of its resting position.

Pick the *kind* of leg from the pair of endpoints, not one curve for every
trip. Between siblings of equal rank a flat slide (lift 0, 300–400ms) says
nothing changed but position; into or out of a resting home a short landing
(lift 16–28px, 450–600ms) says the traveller has arrived or left; between
unrelated slots an arcing hop (lift 30–45px, 380–460ms) marks a change of
subject. Ease the progress with smoothstep, `t * t * (3 - 2 * t)`.
⚠ Suppress the traveller while a leg is in flight — `tabIndex = -1`, blur it if
focused — or keyboard focus rides a box that has no stable position.
