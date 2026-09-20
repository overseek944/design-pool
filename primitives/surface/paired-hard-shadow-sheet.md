---
id: paired-hard-shadow-sheet
category: surface
tags: [surface,depth,border,detail,editorial]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
To imply a second sheet under a panel, two zero-blur shadows do it with no extra
element: the first offset down in the *page* colour and inset by one pixel of
negative spread to open a gap, the second at the same offset in the rule colour
to draw the sheet's edge. Reads as a stack of paper rather than as elevation —
right where a card should feel filed, not floating. Offset 3–6px.

```css
.panel { border: 1px solid var(--rule);
  box-shadow: 0 4px 0 -1px var(--paper), 0 4px 0 0 var(--rule) }
```
⚠ The gap layer must match whatever is actually behind the panel — over a
banded background it paints a visible false edge.

Mix the two families and the object stops being filed and starts being *stuck
on*. One zero-blur layer at 1–3px, alpha 4–8%, is the die-cut edge — the
thickness of the thing — and a second wide layer with negative spread equal to
its blur is the lift, contacting nowhere and darkening only under the middle.
Neither alone reads as a sticker: the hard layer without the soft is printed
flat, the soft without the hard is any card on any page.
```css
--pop: 0 2px 0 #14131a0f, 0 20px 40px -20px #14131a40;
```
⚠ Keep the hard layer's offset under the radius or it shows as a crescent at the
corners. Both layers must survive a colour change — tint toward the ink, not black.
