---
id: control-cleared-decoration-band
category: surface
tags: [surface,decoration,contrast,accessibility,header]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Artwork sharing a box with a control — a band behind a header, a plate behind a
toolbar — is cropped by `cover`, so which passage lands under the label is
decided by the viewport, not the author. Paint a flat wedge of page ground over
the control end and anchor the image to the far edge: the crop still travels,
never across anything that must be read. Wedge 18–30ch, or 30–45% of the band.

```css
.band { background:
  linear-gradient(to left, var(--ground) 0 var(--clear,22ch), #0000 var(--clear,22ch)),
  url(art.svg) left center / cover, var(--ground) }
```
⚠ A translucent control over the raw band fails 4.5:1 at some width — test the
narrowest, where `cover` crops hardest. Mark the band decorative.
