---
id: aperture-registered-content-layer
category: media
tags: [media, mockup, responsive, layout, correctness]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

Live content shown inside supplied frame artwork registers to an aperture the
*image* defines, not to the frame's box. Measure the opening once and
spend it as four asymmetric percentages; it then holds at every size.
Make the frame an inline-size container so the interior radius is `cqw` and
tracks the artwork's corner. Openings are rarely symmetric: 2–3% on the
short axis, 5–7% on the long.

```css
.frame  { container-type: inline-size; position: relative }
.screen { position: absolute; inset: 2.5% 5.85% 2.5% 5.75%;
          border-radius: 6.5cqw; overflow: hidden }
```
⚠ Percentages resolve against the frame's own box, so the artwork must fill it
exactly: a row of transparent margin in the export throws the registration off
at every size.
