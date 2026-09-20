---
id: single-hue-lit-bead
category: surface
tags: [surface,gradient,identity,marker,presence,contrast]
axes: {energy: 2, density: 2, weight: 3, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
At 8–24px a flat disc is a dot; three stops make it a bead. Take one identity
colour and place an off-centre radial ramp through it — lifted toward white at
the lit pole, the hue itself at the terminator, dropped toward black at the far
edge — so a marker whose only input is a per-instance hue reads as a small solid
object. Light from one corner for the whole set, or they stop being a family.

```css
.bead { --c: #0a84ff; inline-size: 18px; aspect-ratio: 1; border-radius: 50%;
  background: radial-gradient(circle at 30% 30%,
    color-mix(in oklab, var(--c) 70%, white) 0,
    var(--c) 45%, color-mix(in oklab, var(--c) 70%, black) 100%);
  box-shadow: 0 0 0 1.5px #fff, 0 2px 4px #0000002e }
```
⚠ The 1–2px contact ring is the accessibility part, not the polish: it holds the
bead visible when an assigned hue lands on a ground of the same lightness. Never
carry meaning in the hue alone.
