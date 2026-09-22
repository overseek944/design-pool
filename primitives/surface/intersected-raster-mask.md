---
id: intersected-raster-mask
category: surface
tags: [surface,mask,texture,print,halftone]
axes: {energy: 1, density: 4, weight: 2, finish: 4}
cost: 2
seen: 7
requires: []
conflicts: []
completes: []
tension: []
---
`mask-composite: intersect` turns a mask stack into a boolean AND, so a texture
can be cut by several independent rulings at once rather than by one shaped
fade. Stack two or three `repeating-linear-gradient`s at unrelated angles — say
0°, 24° and 90°, each 0.7–5% period with a partly-transparent second stop — and
the layer survives only where every ruling passes. The result reads as screen
print or engraving: broken by line work rather than dimmed. Add a vignette layer
to the same stack and the falloff comes free.

```css
mask-image:
  radial-gradient(ellipse 58% 60% at 50% 50%, #000, transparent 96%),
  repeating-linear-gradient(24deg, #000 0 2.8%, #0000008c 2.8% 5.6%),
  repeating-linear-gradient(90deg, #000 0 .76%, #0000006b .76% 1.32%);
mask-composite: intersect;
```
⚠ Needs the `-webkit-mask-composite: source-in` pair for Safari; without a
composite mode the layers union and nothing is cut. Periods within about 2× of
each other beat into moiré — separate them, and keep the finest above 2px at
the rendered size.

One `conic-gradient` of hard stops is a whole *checker* in a single layer, which
rulings cannot produce: alternate opaque and transparent quadrants from a corner
and the tile reads as a grid rather than as line work. Intersected with a plain
directional fade it gives a field that is chequered where it is present and gone
where it is not — a dissolve with visible structure instead of a smooth ramp.
Size the conic layer with `mask-size` to set the cell; 8–24px reads as texture,
40px+ as pattern.
```css
mask-image: linear-gradient(#0000, #000),
  conic-gradient(from 90deg, #000 90deg, #0000 90deg 180deg, #000 180deg 270deg, #0000 270deg);
mask-size: 100% 100%, 16px 16px;
```
⚠ Hard stops alias badly at fractional sizes — keep the cell an even integer and
off a transformed ancestor, or the checker shimmers while scrolling.

`add` is the other half of the algebra and produces a *frame* rather than line
work. Two axis gradients, each opaque at both ends and transparent across its
middle, union into a mask solid at all four edges and clear in the centre — so
an expensive layer, a displacement filter or a heavy blur, can be confined to an
element's rim with no distance field to compute and no per-size map to rebuild.
Bands 8–15% on the long axis, 25–35% on the short.
```css
mask-image: linear-gradient(#000, #0000 30% 70%, #000),
            linear-gradient(90deg, #000, #0000 10% 90%, #000);
mask-composite: add;
```
⚠ Union is the default, so that line is documentation rather than effect — the
pairing that actually matters is `-webkit-mask-composite: source-over`, whose
name does not match the one it stands in for.
