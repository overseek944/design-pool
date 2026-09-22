---
id: submission-summoned-orbit
category: canvas
tags: [canvas,interaction,ambient,agents,orbit,feedback,state-machine]
axes: {energy: 4, density: 2, weight: 2, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An ambient field of wanderers can acknowledge what a user just submitted. Give
each mark a mode — wander, converge, orbit, disperse — and when the input
becomes an object in the scene, switch them to converge on it, then orbit once
inside a capture radius. Tie orbit radius and speed to each mark's depth so near
ones circle tight and fast and the swarm reads as volume. Release to wander when
the object resolves. Radius 40–110px; speed 1.5–2.2 rad/s; squash y 0.7–0.9.

```js
if (mode === 'converge' && dist < 1.25 * m.orbitR) mode = 'orbit'
m.angle += m.orbitSpeed * m.dir * dt
```
⚠ Under reduced motion, show the acknowledgement as a static state, not a swarm.
