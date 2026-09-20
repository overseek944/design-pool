---
id: fire-on-arrival-propagation
category: motion-system
tags: [entrance,propagation,graph,canvas,emergent]
axes: {energy: 3, density: 3, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An entrance authored as a list of delays must be rewritten whenever the
geometry changes. Give each element one local rule instead: a connector that
finishes arriving wakes its far endpoint, and waking spawns that endpoint's own
connectors toward its nearest unlinked neighbours. Order falls out of the
layout, so moving a node re-choreographs the sequence for free and the structure
reads as spreading rather than as played. Wake delay 0.1–0.4s jittered, travel
500–900px/s, fan-out 2–3.

```js
if (e.progress >= e.len) { e.done = true
  if (!e.b.awake) queue.push({ at: now + .1 + rnd() * .3, fn: () => wake(e.b) }) }
```
⚠ Gate `wake` on its own flag — a node reached twice fans out twice. A node no
edge reaches never wakes, so test completion on the queue draining and every
node awake, never on a timer.
