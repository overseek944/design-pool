---
id: length-timed-leg-relay
category: motion-system
tags: [motion,loop,diagram,offset-path,connector,timing]
axes: {energy: 3, density: 2, weight: 1, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A trip across a hub — out along one wire, a pause, back along another — is two travellers sharing one period, each visible only inside its own window. Measure each leg with `getTotalLength()` and derive its duration from one speed, so short and long wires move at the same pace; generate a keyframe per leg holding it hidden outside its window. Speed 60–140px/s, dwell 150–600ms, a per-lane idle and negative delay so lanes never fire together.

```js
const s = start / period * 100, e = (start + len / speed) / period * 100
css += `@keyframes ${n}{0%,${s}%{offset-distance:0%;opacity:0}
  ${e}%,100%{offset-distance:100%;opacity:0}}`   // plus fade stops
```
⚠ Gate on `CSS.supports('offset-path','path("M0 0L1 1")')` and reduced motion before generating anything; ship static markers otherwise.
