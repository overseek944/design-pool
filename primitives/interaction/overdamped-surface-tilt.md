---
id: overdamped-surface-tilt
category: interaction
tags: [interaction,pointer,transform,motion,restraint,custom-property]
axes: {energy: 2, density: 1, weight: 3, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Most pointer-reactive surfaces try to keep up, and keeping up reads as a sticker
chasing a cursor. Make the transition far longer than the gesture — 0.9–1.4s —
and the surface never arrives while the pointer is still there: it drifts toward
a pose, and drifts back on the same curve when the pointer leaves. Amplitude is
what turns lag into mass: 2–5° against 800–1200px of perspective, no more.
Write each term to its own custom property and a scroll driver can add to the
same transform without either handler knowing about the other.

```css
.surface { transform: perspective(1000px) rotateX(var(--rx,0deg))
             rotateY(var(--ry,0deg)) translateY(var(--y,0px));
           transition: transform 1.1s cubic-bezier(.2,.7,.2,1) }
```
⚠ Gate the writes on `(hover: hover) and (pointer: fine)`. A touch device fires
one `pointermove` and no `pointerleave`, leaving the surface stuck off-axis with
nothing to reset it.
