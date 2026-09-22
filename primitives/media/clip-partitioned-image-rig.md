---
id: clip-partitioned-image-rig
category: media
tags: [mask,clip-path,illustration,rig,raster,animation]
axes: {energy: 3, density: 2, weight: 3, finish: 4}
cost: 3
seen: 4
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

`transform-origin` on a rigged part is the one number that cannot be eyeballed —
a pivot a few percent off swings the part out of its socket, and the error is
only visible at the extremes of the sweep. Derive it instead: diff the part's
layer against the base, take the centroid of the pixels where the two overlap,
and express that as a percentage of the part's own box. The joint then holds
through the whole range and survives a re-export at another resolution.
```js
const o = px.filter(p => inPart(p) && inBase(p))
el.style.transformOrigin = `${mean(o, 'x') * 100}% ${mean(o, 'y') * 100}%`
```
⚠ Bake the part at the *middle* of its travel, not at rest. A pose rendered at
one extreme has its shading lit for that extreme and reads as wrong through the
other half of the sweep.

Geometric overlap is the wrong fix for a *raster* partition. The strips are
opaque, so an overlap shows as a doubled edge the instant two of them separate.
Feather in alpha instead: bake each band into its own offscreen canvas and
multiply a cross-axis gradient into it with `destination-in` — opaque across the
middle, clear at both cut edges — so neighbours cross-dissolve at rest and
neither has an edge left to open. Feather 15–25% of the band's width, and far
less on the outer two, which meet nothing.
```js
const g = c.createLinearGradient(0, 0, bw, 0)
g.addColorStop(0, '#0000'); g.addColorStop(f, '#000')
g.addColorStop(1 - f, '#000'); g.addColorStop(1, '#0000')
c.globalCompositeOperation = 'destination-in'; c.fillStyle = g; c.fillRect(0, 0, bw, bh)
```
⚠ Two ramps drawn one over the other do not reconstruct to opaque — the seam
stays slightly light. Invisible on a dark ground, visible on a bright one, where
the bands have to overlap by the whole feather rather than be inset to meet.
