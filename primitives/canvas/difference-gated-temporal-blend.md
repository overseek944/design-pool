---
id: difference-gated-temporal-blend
category: canvas
tags: [canvas,shader,texture,performance,correctness,simulation]
axes: none
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Blending each frame into the last kills the per-pixel boil of a noisy shader,
but one fixed weight smears every moving line into a comet. Make the weight
per-pixel: take the largest channel difference against the history and lerp
the weight toward 1 where it is large. Edges take the current frame and stay
sharp; flat regions keep the long average. Base 0.25–0.45, ramp over a
difference of 0.01–0.06.

```glsl
float d = maxComp(abs(cur - prev));
float w = mix(uBlend, 1.0, smoothstep(0.01, 0.06, d));
gl_FragColor = vec4(mix(prev, cur, w), 1.0);
```
⚠ Two targets swapped each frame — sampling the one being written is
undefined. Clear both before the first frame or the history begins as whatever
the driver left.
