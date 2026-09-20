---
id: nine-slice-control-chrome
category: surface
tags: [surface,border,chrome,svg,detail]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A control whose shape is not a rounded rectangle — a tapered edge, a clipped
corner, a stroke and inner shadow baked together — usually becomes a background
image that distorts with the label, or an absolutely positioned drawing that
has to be re-measured. `border-image` with a `fill` slice and `stretch` puts
the shape in the border box: the corner slices keep their authored size and
only the flat edges stretch, so one inline data URI serves every label length
at every density. Slices 6–16px.

```css
.btn { border: solid #0000; border-width: 8px 14px 8px 8px;
       border-image: url("data:image/svg+xml,…") 8 14 8 8 fill stretch;
       border-radius: 0; background: none }
```
⚠ Border width must equal the slice or the corners scale with it, and that
width is real layout — subtract it from the padding. The image cannot read
`currentColor`, so a themed control needs one URI per theme.
