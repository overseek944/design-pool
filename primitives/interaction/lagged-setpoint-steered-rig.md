---
id: lagged-setpoint-steered-rig
category: interaction
tags: [pointer,playable,manipulation,lerp,cursor,demo]
axes: {energy: 3, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: [substituted-driver-on-coarse-pointer]
tension: []
---
A figure the reader can operate — a gantry, a gripper, a stylus — explains a
mechanism faster than footage of it. The pointer writes only a clamped setpoint
in a fixed logical space; a frame loop eases the rig toward it, so the machine
visibly carries mass. Hide the cursor over the stage so the rig *is* the
cursor, and let one caption line rewrite itself per state. Lerp 0.08–0.2 per
frame, logical box ~800×500 mapped to percentages.

```js
target = { x: clamp(px * W / r.width, 40, W - 40), y: clamp(py * H / r.height, 70, H - 60) }
pos.x += (target.x - pos.x) * k    // k .08–.2, per rAF
```
⚠ Pointer-only is a locked door: add arrow keys on the setpoint and Space to
grab, stop the loop off-screen, and snap `k` to 1 under reduced motion.
