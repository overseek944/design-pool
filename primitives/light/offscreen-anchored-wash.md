---
id: offscreen-anchored-wash
category: light
tags: [gradient,ground,atmosphere,ambient,color,cheap]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 7
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

Three anchors hold where two read as a single diagonal, provided the third is
a low-chroma neutral-warm placed between the other two — it fills the seam
without adding a colour the palette has to account for. Past three the hues
average into a flat mud.

Lamps spend contrast; a scrim buys it back. Stack a directional
semi-transparent black *over* the finished wash — heavier at the edges, lightest
through the middle — and light text holds at every corner while the hue drift
survives underneath. This is what lets the wash be bright enough to see at all.
Edge alpha .30–.45, centre .10–.20.
```css
.ground::after { content: ""; position: absolute; inset: 0;
  background: linear-gradient(90deg, #0006, #00000026, #0000004d) }
```
