---
id: clip-partitioned-image-rig
category: media
tags: [mask,clip-path,illustration,rig,raster,animation]
axes: {energy: 3, density: 2, weight: 3, finish: 4}
cost: 3
seen: 2
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

Partition on a *uniform* lattice rather than into named parts and the rig stops
articulating and starts deforming: N equal strips, each clipped by index, each
taking a transform computed from a function of that index. The artwork becomes a
sheet that can wave, shear or bow with no mesh and no shader. In SVG define the
art once in `<defs>` and give every strip a `<use>` of it, so N strips cost one
definition. Strips 12–24px; wider and the seams read as steps.
```svg
<defs><image id="art" href="art.svg" width="1440" height="313"/>
  <clipPath id="s7"><rect x="139.5" y="-11" width="21" height="335"/></clipPath></defs>
<g clip-path="url(#s7)"><use href="#art" transform="translate(0 -4.2)"/></g>
```
⚠ Overlap each clip rect by half a unit and extend it past the art on the axis
the strips move along, or a displaced strip opens a gap at its own edge.
