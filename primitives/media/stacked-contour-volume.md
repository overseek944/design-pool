---
id: stacked-contour-volume
category: media
tags: [svg,mark,depth,stroke,currentcolor]
axes: {energy: 1, density: 4, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Describe a solid as a stack of cross-sections instead of as a shape: 12–20
concentric ellipses sharing a centre, radii following the profile, stroke only.
The volume is carried by contour spacing, so nothing needs a fill, a gradient or
a raster. Bind every stroke to `currentColor` and sort them into three
weight-and-opacity tiers — silhouette, near mesh, far mesh — and the form still
reads as a 24px mark as well as at full size.

```css
svg [class^="tier"] { stroke: currentColor; fill: none;
  vector-effect: non-scaling-stroke }
.tier-1 { stroke-width: 3.8; opacity: .86 }   /* widths across a ~2:1 span,   */
.tier-2 { stroke-width: 2.5; opacity: .58 }   /* opacity .35–.9, on a 350u    */
.tier-3 { stroke-width: 1.8; opacity: .36 }   /* viewBox                      */
```
⚠ A `<style>` inside an inline `<svg>` is not scoped — its rules apply to the
whole document. Namespace the classes or set the tiers as attributes.
