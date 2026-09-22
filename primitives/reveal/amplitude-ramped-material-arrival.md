---
id: amplitude-ramped-material-arrival
category: reveal
tags: [reveal,canvas,shader,grain,texture,entrance]
axes: {energy: 2, density: 3, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A generated surface fading in from zero opacity arrives as a rectangle getting
less transparent — the composite gives it an edge the material never had. Ramp
its *ingredients* instead: lerp the field toward the flat value the page already
shows, and multiply every texture term — grain, screen, fibre — by the same
scalar. The surface starts indistinguishable from the ground and accretes
structure in place, with no boundary anywhere. Ramp over 0.8–2s.

```glsl
float v = mix(1.0, field * 0.5 + 0.5, uReveal);   // 1.0 = the page's own ground
vec3 col = ramp(v);
col += (halftone - 0.5) * 0.06 * uReveal;
col += (grain    - 0.5) * 0.16 * uReveal;         // every term takes the scalar
```
⚠ The flat endpoint must be the colour behind the canvas, not white by habit —
mismatched, the reveal opens on a visible plate, which is the failure it exists
to avoid. Under `prefers-reduced-motion` set the scalar to 1 on the first frame.
