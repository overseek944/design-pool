---
id: change-tint-decay
category: motion-system
tags: [data,update,feedback,table,realtime,highlight,keyframes]
axes: {energy: 2, density: 3, weight: 2, finish: 3}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A value changing in place is easy to miss in a dense table. Tint the changed
row or cell and let it decay to transparent once: the eye lands on what moved,
then the table rests. A keyframe with no fill leaves nothing behind; to replay
it per update, remount the element or re-add the class across a reflow. Tint
alpha 0.3–0.6, decay 0.6–1.5s ease-out.

```css
@keyframes changed { from { background: var(--tint) } to { background: transparent } }
.changed { animation: changed .9s ease-out }
```
⚠ Up/down hue alone fails colour-blind readers — pair it with a sign.
Under reduced motion, hold a brief static tint instead.
