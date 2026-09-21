---
id: derivative-width-edge-aa
category: canvas
tags: [shader,canvas,precision,correctness,detail]
axes: none
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A procedural shape in a fragment shader gets no antialiasing for free: `step` on
a distance gives a hard crawling edge, and a hand-picked `smoothstep` band is
mush when the shape is large and still aliased when it is small. Ask the
derivative instead. `fwidth(d)` is how much that distance changes across one
pixel, so blending over ±it is exactly one pixel of softness at every scale,
zoom and device ratio. Floor it — 0.001–0.015 of the distance's own range — or
edges at glancing angles, where the derivative collapses, shimmer or disappear.

```glsl
float aa = max(fwidth(d), 0.012);
float shape = 1.0 - smoothstep(r - aa, r + aa, d);
```
⚠ `fwidth` is a fragment-stage derivative taken across a 2×2 quad and is
undefined inside non-uniform control flow — compute it before any branch that
can differ between neighbouring pixels.

The exception is a mark whose screen size is fixed by construction — a point
sprite at a constant `gl_PointSize`, a blit at one scale. There is one pixel
ratio between the distance field and the screen for the life of the draw, so a
hand-picked band is exactly right, cheaper, and available in stages where the
derivative is not. Discard below the band rather than blending toward zero, so
the fully transparent rim never reaches the blend stage at all.
```glsl
float mask = smoothstep(0.5, 0.16, length(gl_PointCoord - 0.5));
if (mask <= 0.001) discard;
```
⚠ Holds only while the size is genuinely constant — the moment size varies with
depth or zoom the band is back to being mush at one end.

The derivative is also wrong whenever the coordinate being shaded is not the
fragment's own — a pattern re-solved onto a second surface, a value fetched
through an indirection. `fwidth` then measures the wrong quantity and the band
pulses as the camera moves. Compute the footprint from the geometry instead:
distance to the camera over focal length times the smaller resolution axis,
divided by `|N·V|` with a floor so grazing angles stay bounded.
```glsl
float pw = length(pos - camPos) / (FOCAL * min(uRes.x, uRes.y));
pw /= max(abs(dot(n, rd)), 0.3);
```
⚠ The resolution term is whatever target is being written, not the canvas —
supersampling into a larger buffer halves the footprint and nothing warns.
