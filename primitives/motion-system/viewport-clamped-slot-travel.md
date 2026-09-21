---
id: viewport-clamped-slot-travel
category: motion-system
tags: [motion,travel,scroll,measurement,layout]
axes: {energy: 3, density: 1, weight: 2, finish: 5}
cost: 3
seen: 1
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
