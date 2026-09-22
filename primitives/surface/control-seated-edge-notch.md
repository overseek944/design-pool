---
id: control-seated-edge-notch
category: surface
tags: [clip-path, shape, notch, card, controls, edge, radius]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Cut a rectangular bay out of a plate's edge, sized to a control group, and seat
the controls in it: they stand on the page ground yet read as part of the plate,
neither floating over its content nor boxed inside it. `shape()` rounds the bay's
corners to the plate's own radius; a square-cornered `polygon()` is the
fallback. Bay depth = control height + 8–16px, width in px, radii 6–12px.

```css
.plate { --x: 6%; --w: 136px; --h: 44px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, calc(100% - var(--x)) 100%,
    calc(100% - var(--x)) calc(100% - var(--h)), calc(100% - var(--x) - var(--w))
    calc(100% - var(--h)), calc(100% - var(--x) - var(--w)) 100%, 0 100%) }
@supports (clip-path: shape(from 0 0, line to 1px 1px)) { /* same path, curve to … with … at each knee */ }
```
⚠ The controls must be siblings outside the clipped plate, or the clip cuts
them and their focus rings with it.
