---
id: latitude-derived-wire-sphere
category: surface
tags: [surface,hairline,geometry,globe,figure,decoration]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Nested ellipse outlines read as a sphere only when their proportions come from
the projection rather than from the eye. A latitude ring at φ projects to an
ellipse of half-width `cos φ` and half-height `cos φ · sin(tilt)`, centred at
`sin φ` — so rings flatten *and* crowd together toward the poles. Hoops of equal
height evenly spaced read as a stack instead. Seven to eleven rings at a tilt of
15–30°; meridians are the same construction rotated. No canvas, no asset, no
request.

```css
.globe   { border-radius: 50%; overflow: hidden }          /* ring at φ = 22° */
.globe i { position: absolute; inset: 13.9% 3.6% 51.4%;
           border: 1px solid rgb(10 10 10 / .14); border-radius: 50% }
```
⚠ Past about ±70° an inset goes negative and the ring escapes the silhouette —
the clip is load-bearing. Hairlines this fine vanish below ~200px: drop to three
rings and raise the alpha rather than scaling down.
