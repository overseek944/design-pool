---
id: integer-scaled-pixel-raster
category: media
tags: [media,raster,pixel-art,image-rendering,scale]
axes: {energy: 1, density: 2, weight: 3, finish: 2}
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Low-resolution raster art — pixel sprites, 1-bit marks, dithered plates — is
destroyed by the default bilinear resample the moment it is drawn at anything
but its authored size. `image-rendering: pixelated` turns the resample off; the
remaining requirement is that the displayed size be an *integer* multiple of the
source, or blocks land at uneven widths and the grid visibly wobbles. Derive
every length from one cell property and a single number moves the whole thing:
the same sheet serves a 24px list mark and a 192px feature at equal crispness.
Multiples 1×–8×.

```css
.art { --cell: 48px;                        /* 12px source → 4× */
  width: var(--cell); height: var(--cell);
  background: url(sheet.png) 0 0 / auto var(--cell) no-repeat;
  image-rendering: pixelated }
```
⚠ Pixelated at a fractional factor is worse than smoothing — some rows come out
a device pixel wider than their neighbours. It is also a loud stylistic claim:
over photographic or antialiased source it reads as a rendering fault.

The build pipeline destroys the raster before `image-rendering` is ever
consulted. A responsive-image transform resamples the source into a ladder of
widths and re-encodes each at a quality setting tuned for photographs, so a
1-bit dither arrives already smeared into grey and moiréd — and the page that
asked for `pixelated` is faithfully sharpening an artifact. Opt the asset out:
one intrinsic-size file, no `srcset`, lossless encoding, and a `width` that is
an integer multiple of it.
```html
<img src="/plate.png" width="1120" height="590" decoding="async"
     style="image-rendering:pixelated" unoptimized>
```
⚠ Check the bytes actually served, not the source in the repo — most frameworks
transform by default and the ladder is invisible in the markup you wrote.
