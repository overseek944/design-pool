---
id: frame-gap-driver-trail
category: canvas
tags: [canvas,pointer,field,influence,sampling,continuity]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A field tested against the driver's position once per frame is sampling a path at
60Hz. Move faster than the influence radius per frame and the effect stipples —
separate blots where a stroke was intended. Keep the last few poses and take the
**maximum** influence across them, each weighted by recency: the gap fills as one
corridor and the tail decays into a wake after the driver stops. Maximum, not
sum — summing pushes overlapped cells past the effect's ceiling wherever the path
crosses itself. Trail 4–12 poses, weights falling to 0.

```js
trail.unshift(pose); trail.length = N + 1
let u = falloff(cell, trail[0])                  // current pose, full strength
for (let n = 0; n < N; n++)
  u = Math.max(u, falloff(cell, trail[n + 1]) * (1 - n / (N + 1)) * strength)
```
⚠ Cost is N× the per-cell test — break the inner loop once `u` reaches 1, and
reject on squared distance before taking any root.

A buffer of N poses is a wake measured in frames, so the same effect is half as
long at 120Hz as at 60 and shortens again under load. Timestamp each pose and
prune from the front by age instead: the wake is then a duration the designer
picked. Two things follow from the queue being time-ordered rather than
count-bounded — only push a pose once it is some distance from the last, or a
high-rate pointer floods it while standing still, and break the scan at the
first entry past the age limit. Life 0.8–1.5s, gate 10–20px.
```js
while (trail.length && now - trail[0].ts > LIFE) trail.shift()
const last = trail[trail.length - 1]
if (!last || Math.hypot(x - last.x, y - last.y) >= GATE) trail.push({ x, y, ts: now })
```
⚠ Grow the radius as the pose ages — `R * (0.65 + 0.35 * fade)` — or a wake
that only dims reads as a row of separate dents rather than one spreading one.
