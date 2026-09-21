---
id: metric-free-weight-transition
category: type
tags: [type,emphasis,weight,layout-shift,transition,text-shadow]
axes: {energy: 2, density: 2, weight: 3, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Weight is the obvious way to bring a word forward as it is read or hovered, and
the worst: `font-weight` does not interpolate on a static family, and the
variable-font equivalent relays out the line around it mid-transition. Thicken
the glyph with a symmetric horizontal `text-shadow` in `currentColor` instead —
the layout box never changes, the property animates, and it composites. 0.2–0.6px
each side; past that letterforms smear rather than thicken.

```css
.em    { text-shadow: none; transition: text-shadow .3s var(--ease) }
.em.on { text-shadow: .4px 0 0 currentColor, -.4px 0 0 currentColor }
```
⚠ Synthetic weight only: it widens horizontally and never reaches a real bold's
stroke contrast, and it is dropped entirely where the text is painted through
`background-clip: text` or `color: transparent`. Nothing semantic changes — keep
the meaning in the markup and let this carry only the appearance.
