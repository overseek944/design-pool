---
id: conic-sector-window
category: surface
tags: [mask, conic, sector, radial, ring, wedge, hover, media, intersect]
axes: {energy: 2, density: 3, weight: 3, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A ring index can open a window onto media shaped like the segment being pointed
at. Intersect a hard-stop conic sector with a radial cut and the layer shows
only that wedge, sharing the ring's centre, so choosing a segment lights its own
slice of the field. Rest 0.2–0.4 opacity, active 0.8–0.9; feather the sector
edges 0.3–0.6deg against aliasing.
```css
.wedge { mask-composite: intersect; -webkit-mask-composite: source-in;
  mask-image: conic-gradient(from calc(var(--i) * var(--sweep) - var(--sweep) / 2),
      #0000, #000 .4deg, #000 calc(var(--sweep) - .4deg), #0000 var(--sweep)),
    radial-gradient(#0000 var(--inner), #000 calc(var(--inner) + 1px)) }
```
⚠ Pointer-only reveal: mirror it from keyboard focus on the segment, and
`aria-hidden` the decorative media.
