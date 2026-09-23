---
id: cell-resolved-screen-pass
category: canvas
tags: [shader,webgl,halftone,texture,render-pass,generative]
axes: {energy: 2, density: 4, weight: 2, finish: 4}
cost: 4
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
Screening a render into dots need not change whatever drew it. Add a second
full-screen pass over the first pass's target, and have each fragment sample
that texture at its *cell's centre* rather than at its own coordinate: every
fragment in a cell then reads one value, so the cell resolves to a flat disc
instead of a smeared gradient. Drive both the radius and the position along a
short palette from that one scalar and tone can never disagree with hue. Cell
6–60px, gamma 0.5–8 on the luminance, radius ceiling 0.5–0.7 of the cell.

```glsl
vec2  idx = floor(gl_FragCoord.xy / cell);
float g   = pow(luma(texture(uSrc, (idx + 0.5) * cell / uRes).rgb), uGamma);
float d   = length(fract(gl_FragCoord.xy / cell) - 0.5), r = g * 0.5 * uScale;
float aa  = fwidth(d) + 1e-4;
fragColor = vec4(ramp(g), 1.0 - smoothstep(r - aa, r + aa, d));
```
⚠ The pass is full-resolution whatever the cell size — a 60px cell costs
exactly what a 6px one does. Nothing upstream is quantised either, so an
animating source still needs its own rate cap.

An axis-aligned cell grid beats against the pixel grid it is drawn on, and the
interference is a moiré that crawls whenever the source moves. Rotate the
coordinate before flooring — the screen angle every print process uses for the
same reason — and the lattice no longer shares an axis with anything. The dots
are unchanged; only what they can resonate with is. 15–30° (0.26–0.52 rad);
avoid 0 and 45°, where the diagonals realign.
```glsl
float s = sin(uAngle), c = cos(uAngle);
vec2  rot = vec2(p.x * c - p.y * s, p.x * s + p.y * c);   // then floor rot, not p
```
⚠ Rotation puts cell centres outside the source at the corners — sample with
clamped coordinates, or oversize the pass by the cell diagonal.

A still photograph needs no shader for the same screen. In Canvas 2D, draw the
image into a canvas one third of the target's CSS size, read `getImageData`
once, and for each pixel fill a *square* of side 0–3 on a 3px lattice over a
flat ground — side from luma through a window (`(l - lo) / span`) rather than
raw luma, so only the highlights print and the ground keeps its colour. Two
tokens read from computed style give a duotone that follows the theme. Window
`lo` 0.3–0.6, `span` 0.3–0.5.
```js
const a = Math.min(1, Math.max(0, (l - lo) / span)), s = Math.round(a * 3)
if (s) ctx.fillRect(x * 3 + ((3 - s) >> 1), y * 3 + ((3 - s) >> 1), s, s)
```
⚠ One-shot: re-run on a debounced resize, and the source must be same-origin.
