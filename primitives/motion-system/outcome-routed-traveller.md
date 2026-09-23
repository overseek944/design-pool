---
id: outcome-routed-traveller
category: motion-system
tags: [motion,svg,diagram,connector,feedback,hub,raf]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 2
seen: 2
requires: [resampled-path-travel]
conflicts: []
completes: []
tension: []
---

A marker crossing a checkpoint can carry its verdict in the route.
Allowed: through the hub, then home dimmer. Refused: ease-in to the gate,
back on ease-out. Flash the hub, tinted to the
outcome, at the sample where the marker crosses it — attack 10–20% of a
250–400ms envelope.

```js
const hit = pts.findIndex(p => p.x >= hubX)
setTimeout(() => flash(hub, ok ? GO : STOP), hit / pts.length * dur)
await run(ok ? route : spoke, dur, ok ? inOut : easeIn)
await run(ok ? route : spoke, dur * .7, easeOut, true) 
```
⚠ Hue alone is the verdict — also vary radius or opacity, and label the SVG. Static under reduced motion.
