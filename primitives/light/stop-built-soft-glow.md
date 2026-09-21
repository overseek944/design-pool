---
id: stop-built-soft-glow
category: light
tags: [gradient,glow,decoration,performance,cheap,banding]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A blurred lamp holds a composited buffer the size of its box plus the blur on
every side. Put the falloff in the stops instead: four or five hand-placed
positions on one radial gradient paint as an ordinary background and size past
the viewport freely. Shift hue between the two inner stops rather than ramping
one colour to transparent — the drift across the band breaks up the 8-bit steps
a single-hue ramp shows as rings. Clearing the core turns the blob into a ring
of light. Core clear 25–35%, full 55–65%, second hue 75–85%.

```css
.glow { inline-size: clamp(300px, 28vw, 460px); aspect-ratio: 1;
  background: radial-gradient(circle, #f5dfbc00 30%, #f5dfbc 60%,
                              #f0d0a1 82%, #f0d0a100 100%) }
```
⚠ Stops interpolate linearly: three give a hard shoulder where a blur gives a
gaussian. Needs `pointer-events: none` and `aria-hidden` at this size.
