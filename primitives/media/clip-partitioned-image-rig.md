---
id: clip-partitioned-image-rig
category: media
tags: [mask,clip-path,illustration,rig,raster,animation]
axes: {energy: 3, density: 2, weight: 3, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Flat artwork can be rigged without re-exporting it as parts. Punch the moving
regions out of the base with one `fill-rule: evenodd` SVG mask, then stack
copies of the *same file* on top, each cropped to one region by `clip-path:
inset()` with its own transform origin. Every part moves over a hole rather than
its own twin, so nothing smears, and there is one image to decode. Percentages
throughout, so the rig scales with its box.

```css
.part { position: absolute; inset: 0; background: url(art.png) center/100% 100%;
        clip-path: inset(38.5% 61.8% 30.5% 14.2%); transform-origin: 26% 54% }
```
⚠ Apply shadow or emboss once to the assembled group, never per part, or the
holes show haloed seams the moment anything moves.
