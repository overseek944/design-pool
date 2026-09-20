---
id: independent-transform-channels
category: motion-system
tags: [transform,transition,architecture,composition,state]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Two concerns wanting the same element — an entrance offset and a hover lean, a
parallax and a press scale — collide in one `transform` string: the later write
erases the earlier, and they cannot carry different durations. They need not
share it. `translate`, `rotate` and `scale` are separate animatable properties
with their own transitions, so one concern takes a channel and the other keeps
`transform`. Neither has to know the other exists.

```css
.node { translate: 56px 0;
  transition: translate .8s var(--ease), transform .45s var(--spring) }
.in .node { translate: 0 0 }    .node.leans { transform: rotate(3.5deg) }
```
⚠ Order is fixed — translate, rotate, scale, then `transform` — so the channels
cannot be reordered around each other.
