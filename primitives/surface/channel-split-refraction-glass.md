---
id: channel-split-refraction-glass
category: surface
tags: [glass,backdrop-filter,svg-filter,refraction,chromatic,depth]
axes: {energy: 1, density: 3, weight: 3, finish: 5}
cost: 4
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A blur says *frosted*; a displacement says *solid and thick*. Reference an SVG
filter from `backdrop-filter` and bend the backdrop through a map instead of
softening it. Run the displacement three times at slightly different scales,
isolate one channel from each with `feColorMatrix`, and screen them back
together — the offset is dispersion, the glass gets a coloured rim. Scales
40–60 with 2–8 between channels; more reads as a broken screen.

```html
<feImage result="map"/><feDisplacementMap in="SourceGraphic" in2="map" scale="52"
  xChannelSelector="R" yChannelSelector="B" result="r"/>
```
⚠ Without `color-interpolation-filters="sRGB"` the whole pane shifts. Blur the
result 0.5–1px to hide displacement stair-steps, and ship a plain `blur()` tier —
several engines parse `url()` here and render nothing.
