---
id: displacement-driven-colour-ramp
category: canvas
tags: [shader,gradient,surface,generative,ambient]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 3
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A displaced surface normally needs a light to be legible — normals, a lambert
term, a shadow pass. Skip all of it: pass the scalar that raised the geometry
to the fragment stage and use it as position along a multi-stop colour ramp.
Crests take the late stops, troughs the early ones, and the form reads as
folded material lit from nowhere. Stop positions ride as a uniform, so banding
is redistributed without touching the palette. Height 0.2–0.6 of the plane's
short side.

```glsl
// vertex: float t = field(uv, uTime); position.z += t * uHeight; vPos = t;
float c = smoothstep(0., 1., vPos);
vec3 col = mix(c1, c2, smoothstep(uStops.x, uStops.y, c));
col = mix(col, c3, smoothstep(uStops.y, uStops.z, c));
```
⚠ Stops must stay strictly increasing — one crossed pair reverses a
`smoothstep` and the surface turns inside out with no error raised. Adjacent
stops need real separation or the fold hardens into a contour line.

Hand-placed stops are what makes crossing possible. Derive both windows from
one width knob instead, measured inward from fixed anchors, and add a second
term only to each window's upper bound: the pair can close to a hard edge but
can never invert, and softening an edge no longer moves where it sits. Two
controls then cover the whole range from poster banding to a continuous wash.
Width 0–1, blur 0.01–0.04. Premultiply each colour by its own alpha before
mixing or translucent bands darken at every boundary.
```glsl
float w = 1. - clamp(uSoftness, 0., 1.), b = .01 + .01 * uScale;
float r1 = smoothstep(.0 + .35 * w, .7 - .35 * w + .5 * b, m);
float r2 = smoothstep(.3 + .35 * w, 1. - .35 * w + b,      m);
```
⚠ The anchors set how much of the mixer each band can ever own — at full width
the outer bands are pinched to nothing and only the middle colour shows, which
looks like a broken uniform rather than the end of a range.
