---
id: chord-solved-tile-width
category: canvas
tags: [canvas,3d,geometry,texture,seam,correctness]
axes: none
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Flat quads tiled along a curve — a ribbon of frames, a spiral of panels — get
sized by arc length, which overlaps neighbours, or by chord length, which leaves
a gap. Neither is the width: a tile spans its own tangent, but consecutive
centres are separated along the chord, and the two sit apart by the turn angle.
Divide the chord by the cosine between them and the tiles meet edge to edge at
any radius and pitch. Scale by 1.01–1.03 so antialiasing cannot open a hairline.

```js
const T = tangentAt(a).normalize(), C = centreAt(a + dA).sub(centreAt(a))
const w = SEAM * C.length() / T.dot(C.clone().normalize())   // SEAM 1.01–1.03
```
⚠ Past roughly 1.05 the overlap is real geometry: tiles rotated off the tangent
plane interpenetrate and the depth test cuts visible notches through their
edges. Arc-length sizing looks correct at low curvature and fails as the pitch
tightens, so tune at the tightest turn in the path.
