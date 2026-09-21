---
id: opacity-held-glass-entrance
category: motion-system
tags: [motion-system,reveal,glass,backdrop-filter,entrance,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An entrance that fades a container in silently breaks any `backdrop-filter`
inside it: an ancestor below opacity 1 becomes the backdrop root, so for the
length of the fade the plate has nothing to sample and renders nearly flat, then
snaps to full frost the instant opacity reaches 1. Reveal frosted surfaces with
transform alone and pin them at opacity 1 — the rise carries the arrival.
Travel 16–28px over 0.6–1s.

```css
[data-rv]:has(.glass), [data-rv].glass { opacity: 1 }
.glass { transform: translateY(22px); transition: transform .85s var(--ease) }
```
⚠ `filter` and `mix-blend-mode` on an ancestor set the same trap. `:has()` spots
a frosted descendant cheaply but is not a guarantee — without it the pop returns.
