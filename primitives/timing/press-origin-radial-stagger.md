---
id: press-origin-radial-stagger
category: timing
tags: [stagger,interaction,radial,delay,field,hypot]
axes: {energy: 4, density: 3, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A field of cells that answers to being pressed should propagate from where it was
pressed, not from source order. Publish the pressed cell's coordinates as two
custom properties on the container and let each cell derive its own delay from
`hypot()` — two writes per press instead of one per cell, and a schedule that is
authored nowhere, so the same field never plays the same wave twice. Cap it at a
radius: that bounds both the wave's duration and how many cells hold a live
animation. Rate 30–60ms per cell of distance, radius 6–12 cells.

```css
.cell { animation: pulse .6s ease-out backwards
        calc(hypot(var(--r) - var(--ro), var(--c) - var(--co)) * var(--rate, 45ms)) }
```
⚠ Delay postpones, it does not cancel: every cell carrying the rule eventually
plays, so the radius has to gate membership. Clear the origin when the wave ends
or the same cell cannot fire a second time.
