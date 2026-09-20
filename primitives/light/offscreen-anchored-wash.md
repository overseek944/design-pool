---
id: offscreen-anchored-wash
category: light
tags: [gradient,ground,atmosphere,ambient,color,cheap]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [eased-fade-stop-ramp]
tension: []
---
A radial gradient centred inside its box shows its hot core and reads as a
spotlight aimed at the page. Put the centre *past* the frame and oversize the
ellipse, so only the shoulder of the falloff is ever visible: the same gradient
now reads as light arriving from somewhere off-screen. Two anchors of opposed
temperature, pushed toward opposite corners, give a hue that drifts across the
width instead of one flat tint. Ellipse 120–200% of the box, centre 85–110%
down, peak alpha .15–.35.

```css
.ground { background:
  radial-gradient(ellipse 140% 120% at 25% 102%, var(--warm) 0, transparent 100%),
  radial-gradient(ellipse 130% 110% at 75% 102%, var(--cool) 0, transparent 100%),
  var(--page) }
```
⚠ Wide low-alpha ramps band on 8-bit panels — hand-place the stops rather than
letting two interpolate. Nothing here may carry meaning: at these alphas the
whole wash disappears under `forced-colors`.
