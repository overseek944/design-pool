---
id: subject-gated-glint-stream
category: canvas
tags: [shader,webgl,image,texture,glow,ambient,warp]
axes: {energy: 2, density: 2, weight: 3, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A still illustration can move, unedited. Sample it as a texture
zoomed 10–20% so warping never reaches an edge; nudge coordinates by two
or three crossed low-frequency sines at 1–3% amplitude. Add a diagonal
highlight band raised to a power of 5–8, multiplied by a smoothstep of the
image's own brightness: only the subject glints, the ground stays dark.

```glsl
q += vec2(sin(r.x*4.2 - r.y*2.4 - t), sin(r.x*5.1 - t*.86)) * .025 * amp;
vec3 c = texture2D(art, q).rgb;
float band = pow(.5 + .5*sin((r.x*.8 + (1.-r.y)*.6)*9. - time), 5.);
c += glow * smoothstep(.15, .7, luma(c)) * band * .18; // .1–.3
```
⚠ Keep the still in the DOM until the first frame draws, never a black box.
