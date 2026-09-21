---
id: datum-carrying-render-coordinate
category: media
tags: [figure,svg,authoring,correctness,data,provenance]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A figure derived from real values — points on a projection, marks on a measured
scale, nodes at surveyed positions — ships as baked coordinates, and the script
that produced them is gone by the next release. Re-centring it, adding one more
point, or checking whether a mark is even right then happens by eye. Carry the
pre-projection value on the node beside the rendered one and the artefact
becomes its own source: re-derivable and auditable for two attributes per mark.

```html
<g data-projection="orthographic" data-center="18,12">
  <circle cx="415.9" cy="177.6" r="6" data-lon="9.96" data-lat="53.54"/>
```
⚠ The datum is a record, not a second source of truth — nothing should read it
at runtime and quietly disagree with the baked value. Without the projection's
own parameters on the container the pair reproduces nothing.
