---
id: paired-hard-shadow-sheet
category: surface
tags: [surface,depth,border,detail,editorial]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 4
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

The two-layer form implies one sheet under the panel. Offset on *both* axes and
repeat it and the object becomes a countable deck — three or four sheets
cascading down-right, each pair of layers stepping 1.5–2× the last and the
sheet colour dropping 25% alpha a step, so the stack reads as depth by count
rather than by elevation. Right where a card stands for a set of records, a
queue, a batch.
```css
.deck { box-shadow: 6px 6px 0 -1px var(--paper), 6px 6px 0 0 rgb(var(--rule)/.75),
                   14px 14px 0 -1px var(--paper), 14px 14px 0 0 rgb(var(--rule)/.5) }
```
⚠ The cascade eats real estate no layout knows about — reserve the deepest
offset as end margin, or the bottom sheet is clipped by the next section on
exactly the breakpoint where the grid gets tight.

The same zero blur reads as *thickness* rather than as a second sheet when the
two offsets oppose each other: a dark one down-right for the side wall, a light
one up-left for the lit top edge. The element stops looking raised and starts
looking extruded — a key, a tab, a physical switch — and a press is then one
transition that shortens the offset and translates the face by the difference,
so the cap travels down its own wall. Wall 2–3px, light edge 1px.
```css
.key { box-shadow: 2px 2.5px 0 -.5px rgb(0 0 0 / .45), -1px -1px 0 rgb(255 255 255 / .25) }
.key:active { box-shadow: 1px 1px 0 -.5px rgb(0 0 0 / .45); translate: 1px 1.5px }
```
⚠ The wall has a direction, so the whole set must agree on one light source —
one control extruded the other way reads as a hole. Past about 4px it stops
being a bevel and becomes an isometric solid that the layout has to reserve
space for.
