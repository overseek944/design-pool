---
id: overwide-ellipse-reading-band
category: surface
tags: [surface,mask,focus,legibility,list]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
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
