---
id: fire-on-arrival-propagation
category: motion-system
tags: [entrance,propagation,graph,canvas,emergent]
axes: {energy: 3, density: 3, weight: 2, finish: 5}
cost: 3
seen: 2
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

Where the geometry is fixed — a hero schematic, an explainer that never
re-lays-out — the same reading costs no runtime at all. Give each edge a class
and two inline custom properties, and set each child edge's delay to the moment
its parent's duration expires; siblings share a delay and leave their fork
together. The stylesheet owns the curve and the element owns its place in the
topology, so the sequence is retunable in one rule and re-orderable per edge.
Six to twelve edges is the ceiling before the numbers stop being readable.
```html
<path class="draw" style="--dur:.6s; --delay:.35s" d="…"/>
```
```css
.draw { animation: draw var(--dur) ease var(--delay) both }
```
⚠ This pins the schedule to the drawing. It is the cheap form precisely because
it cannot survive a re-route, so emit both the `d` and the delay from the same
edge list, or accept that the figure is now a fixed asset.
