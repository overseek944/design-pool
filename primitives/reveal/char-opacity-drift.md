---
id: char-opacity-drift
category: reveal
tags: [type,motion,reveal,ambient]
axes: {energy: 3, density: 4, weight: 2, finish: 5}
cost: 4
seen: 1
requires: []
conflicts: []
completes: [will-change-on-split-children, revert-split-on-resize]
tension: []
---
Per-character with opacity + small `y`, `will-change:opacity,transform,filter`.
Reads as material settling rather than text animating in. Expensive — one
element per page, and only for a headline under ~40 characters.
