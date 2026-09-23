---
id: measured-glyph-occluders
category: reveal
tags: [reveal,text,per-character,range,headline,entrance]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Splitting a headline into spans breaks a fill that must run continuously across
it — a clipped texture, a gradient, kerning. Leave the text whole: measure each
glyph with a one-character `Range`, lay a ground-coloured `aria-hidden` span over
each rect, and fade the spans out on a delay curve `(i/(n−1))^1.2–2 × 0.4–0.8s`.
Remeasure on `fonts.ready` and resize; after the run, delete the covers.

```js
const r = document.createRange(); r.setStart(node, i); r.setEnd(node, i + 1)
const b = r.getBoundingClientRect() // skip spaces and widths < .5
cover.style.cssText = `left:${b.left - h.left - 1}px;top:${b.top - h.top - 1}px;
  width:${b.width + 2}px;height:${b.height + 2}px;animation-delay:${d}s`
```
⚠ Only works on a flat ground — covers are opaque. Skip entirely under reduced motion.
