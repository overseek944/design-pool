---
id: luminance-hole-spotlight
category: surface
tags: [spotlight,onboarding,mask,svg,overlay,focus-guide]
axes: {energy: 2, density: 1, weight: 3, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A guided step dims the page and leaves one control lit. Mask an SVG scrim
with a white field and a rounded rect over the target; open the cutout by
animating that rect's `fill` white → black, so the hole brightens in place
rather than scaling from a point. Scrim 40–65% black, radius 8–16px, open
0.25–0.9s.

```html
<mask id="m"><rect width="100%" height="100%" fill="#fff"/>
  <rect class="hole" x="…" y="…" rx="12" style="animation: open .3s both"/></mask>
<rect width="100%" height="100%" fill="#000a" mask="url(#m)"/>
<!-- @keyframes open { from { fill: #fff } to { fill: #000 } } -->
```
⚠ The scrim blocks nothing itself — scope focus to the step or keyboard users
tour a dark page blind.
