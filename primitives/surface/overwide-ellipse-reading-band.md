---
id: overwide-ellipse-reading-band
category: surface
tags: [surface,mask,focus,legibility,list]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Hold one line of a moving stack legible and let its neighbours dissolve, using a
single mask layer rather than a stack of edge ramps. Make the ellipse *wider
than the box* — 105–130% — and short, 18–35%: the horizontal falloff is clipped
by the element and never completes, so only the vertical one fully reads, and
each line dims slightly toward its own ends. One number, the vertical radius,
sets how many lines survive.

```css
.band { -webkit-mask: radial-gradient(115% 24% at 50% 50%, #000, transparent);
        mask:         radial-gradient(115% 24% at 50% 50%, #000, transparent) }
```
⚠ Masked text is still in the accessibility tree at full strength — the ghosted
lines are announced as peers of the focused one. Ship the `-webkit-` pair.

Both radii and the centre are fractions of the box, so the falloff sits at a
constant *proportion* of whatever the element happens to measure — resize it
and the soft edge moves relative to everything inside. Where the fade has to
stay registered to a real feature — a card's bottom edge, the last baseline, a
strip of chrome — anchor the centre in `calc(100% - Npx)` and leave the radii
proportional. The curvature still scales with the box; the seam does not.
Offset 48–120px.
```css
.band { -webkit-mask: radial-gradient(160% 46% at 0 calc(100% - 86px), #000 0 58%, transparent);
        mask:         radial-gradient(160% 46% at 0 calc(100% - 86px), #000 0 58%, transparent) }
```
⚠ Mixing units makes the shape aspect-dependent in a way percentages are not —
check it at the narrowest box it will ever occupy, where an offset that was a
tenth of the height is most of it.
