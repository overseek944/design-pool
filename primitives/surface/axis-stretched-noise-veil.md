---
id: axis-stretched-noise-veil
category: surface
tags: [surface,noise,svg-filter,gradient,atmosphere,blend-mode]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 3
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
Evenly blurred noise reads as grain. Blur turbulence anisotropically — a small
deviation on one axis, a large one on the other — and it stretches into
soft directional veils, so a flat wash gains the structure of light through a
window, with no gradient stop describing it. Convert luminance to alpha first,
then a linear transfer sets how much survives. Ratio 1:10–1:20, slope 1.3–1.8
against an intercept of −0.1 to −0.2; recolour per section from the gradient
beneath.

```html
<filter id="v"><feTurbulence type="fractalNoise" baseFrequency=".014 .005" numOctaves="4"/>
  <feColorMatrix type="luminanceToAlpha"/><feGaussianBlur stdDeviation="2 34"/>
  <feComponentTransfer><feFuncA type="linear" slope="1.5" intercept="-.15"/></feComponentTransfer>
</filter>
```
⚠ A large deviation samples outside the box: oversize the filtered layer 8–12%
a side inside a clipping parent or the veils fade before the edge.
Full-viewport filter rasterisation is the page's most expensive paint — one
layer, never per card.

Push the frequency ratio far past the veil range and drop the blur entirely and
the same anisotropy hardens into machined grain: at 10:1–15:1 with the fine axis
around 0.3–0.5, `fractalNoise` becomes the drawn streak of brushed metal or
anodised stock rather than light. Desaturate through `feColorMatrix` and
composite `soft-light` at 40–55% over a gradient so the streaks pick up its
ramp; unlike the blurred form this one is cheap enough to run per card.
```html
<filter id="b"><feTurbulence type="fractalNoise" baseFrequency=".035 .42"
  numOctaves="3-4" seed="17"/><feColorMatrix type="saturate" values="0"/></filter>
```
⚠ The streaks run perpendicular to the high-frequency axis, so a layout that
rotates the card rotates the material's grain direction with it — set the pair
from the card's own orientation, not once globally.

One ratio gives one direction, which is a weave or a brushed face. Sum three or
four octaves whose ratios point *different* ways — strongly vertical, strongly
horizontal, one nearly square — at descending weights, and the directions cancel
into fibre: paper stock rather than machined stock, with no axis a reader can
name. Weight the octaves 0.35/0.25/0.2/0.2 and keep the total amplitude tiny.
```glsl
float p = snoise(vec3(uv.x * 120., uv.y * 400., 1.)) * .35    // ratios 1:3.3,
        + snoise(vec3(uv.x * 200., uv.y * 600., 2.)) * .25    // 1:3, and
        + snoise(vec3(uv.x * 350., uv.y * 150., 3.)) * .20;   // 3.3:1
col += p * 0.045;                                              // 0.03–0.06
```
⚠ Frequencies are in pixels, so the fibre coarsens on a 2× display unless the
coordinate is divided by the device pixel ratio.
