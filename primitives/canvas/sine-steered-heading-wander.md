---
id: sine-steered-heading-wander
category: canvas
tags: [canvas,ambient,motion,agents,steering,noise-free]
axes: {energy: 3, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Ambient marks that should read as purposeful rather than jittering need their
turning smooth, not their position random. Give each a heading and perturb its
turn rate with two sines of random frequency and phase, plus a slow sine on
speed; paths curve, never repeat, and need no noise function. At the margins,
steer the heading toward the inward normal with strength rising with depth of
intrusion — soft walls instead of bounces. Turn sines 0.25–0.5 and 0.8–1.4
rad/s; speed swing ±20–40%; wall band 60–180px.

```js
m.heading += (m.a1*Math.sin(m.w1*t+m.p1) + m.a2*Math.sin(m.w2*t+m.p2)) * dt
m.speed = m.base * (.72 + .38*Math.sin(m.ws*t + m.ps))
```
⚠ Scale every term by dt, or motion speeds up on 120Hz displays.
