---
id: broadcast-light-source
category: light
tags: [light,gradient,custom-property,ambient,architecture]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A panel lit at the pointer has one lamp, and only while a pointer exists. Publish
the light instead: whatever owns the motion — a drifting field, a scroll offset, a
clock — writes one to three positions to a named channel, and each subscriber
converts them into its own box coordinates. Panels, buttons and rules across the
page then catch the same moving source and read as one lit scene.

```js
for (const el of subs) { const r = el.getBoundingClientRect()
  if (r.bottom <= 0 || r.top >= innerHeight) continue            // skip offscreen
  lights.forEach((l, i) => { el.style.setProperty(`--l${i}x`, `${l.x - r.left}px`)
    el.style.setProperty(`--l${i}y`, `${l.y - r.top}px`) }) }
```
⚠ Default the properties far outside the box, never to its centre, or everything
lights at its own middle until the first publish. Clear them when the publisher
stops; otherwise a stale lamp is frozen into every subscriber.
