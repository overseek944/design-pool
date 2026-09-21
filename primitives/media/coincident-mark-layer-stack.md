---
id: coincident-mark-layer-stack
category: media
tags: [svg,animation,units,architecture,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A CSS length on an SVG child is read as user units and then scaled by the viewBox
mapping, so `translateX(50vw)` on a path in a 720-unit box drawn at 100px travels
500 user units × 100/720 — 69px on a 1000px window, not 500. It fails silently.
Any part of a mark that must move a *page* distance therefore cannot live in a
group. Give each moving part its own full-size `<svg>` at `inset: 0` carrying the
identical viewBox: registration is exact and free, and every layer is an ordinary
box that transforms, filters and composites in page units.

```css
.layer { position: absolute; inset: 0; overflow: visible }   /* one part per svg */
```
⚠ N layers is N composited surfaces and N nodes in the tree — `aria-hidden` the
stack and split only the parts that actually move; everything static stays one
`<svg>`. Percentage `transform-origin` inside a layer still needs `transform-box`.
