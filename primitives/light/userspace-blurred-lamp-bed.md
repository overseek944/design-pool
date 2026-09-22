---
id: userspace-blurred-lamp-bed
category: light
tags: [glow,svg,blur,gradient,decoration,responsive]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`stdDeviation` is in user units, so a gaussian blur inside a `viewBox` scales
with the drawing — a bed of lamps authored once holds its proportions at every
width, which `filter: blur(Npx)` cannot. Lay three or four wide ellipses of
*different* hue along a band, each blurred past its own radius: the overlaps
drift warm to cool across the section rather than ramping one colour out.
Blur 0.35–0.5× the ellipse's long radius, fills at 0.25–0.4 alpha.

```svg
<g opacity=".3" filter="url(#f)"><ellipse cx="600" cy="580" rx="370" ry="115" fill="#FF7C37"/></g>
<filter id="f" filterUnits="userSpaceOnUse" x="-60" y="190" width="1300" height="780">
  <feGaussianBlur stdDeviation="137"/></filter>
```
⚠ Scaling that drawing into a narrow column shrinks the blur with it and the
bed collapses to hard dots — re-author a second `viewBox` for phone widths
rather than letting one stretch. Filter regions clip: size them past the blur.
