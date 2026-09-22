---
id: luminance-keyed-alpha-matte
category: media
tags: [media,filter,svg,alpha,image,video,compositing]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 3
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Media shot against a flat light ground can be keyed to transparency in the
browser — no pre-cut PNG, no alpha-channel encode, one file onto any page
colour. Collapse the source to alpha with
`luminanceToAlpha`, hand that channel a steep linear transfer — slope
`-1/softness`, intercept `threshold/softness` — which turns the ramp into a
near-binary matte, then composite the original `in` it. Threshold 0.88–0.97,
softness 0.015–0.05: softer keeps antialiased edges, harder eats them.

```svg
<filter id="key" color-interpolation-filters="sRGB">
  <feColorMatrix type="luminanceToAlpha"/>
  <feComponentTransfer result="m">
    <feFuncA type="linear" slope="-32" intercept="30.9"/></feComponentTransfer>
  <feComposite in="SourceGraphic" in2="m" operator="in"/>
</filter>
```
⚠ It keys on lightness, not a colour — anything near-white *inside* the subject
goes with the ground. `color-interpolation-filters="sRGB"` is not optional; the
linearRGB default moves the threshold off where it was tuned. On video every
frame re-rasterises through the filter.

For flat marks — logos, monochrome glyphs on white — one matrix does it with no
transfer stage: keep RGB, write alpha as `k − (R+G+B)`. White drops to zero,
dark ink stays opaque; `k` 2.6–3.2 sets how much light grey survives. Composite
`in` SourceAlpha so the original cut-out still bounds the result.
```svg
<feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1 -1 -1 0 3"/>
```
⚠ Pale brand colours lose alpha too — yellows and pastels thin out. Check each mark.
