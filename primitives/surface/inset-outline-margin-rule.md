---
id: inset-outline-margin-rule
category: surface
tags: [surface,border,frame,outline,detail,precision]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A second hairline set *in* from a plate's own edge makes it read as a
fabricated part with a keep-out margin rather than as a box — the silkscreen
line, the mat line, the die edge. `border` cannot draw it and `outline-offset`
is usually spent pushing outward, but the property takes negative values and
lands the stroke inside the border box, following the radius, costing no node
and no layout. Margin 6–12px against a 1px rule; tighter reads as a rendering
error, wider as a second panel.

```css
.plate { border: 1px solid var(--edge);
         outline: 1px solid var(--rule); outline-offset: -8px }
```
⚠ One outline per element, so a focusable plate must give the margin rule back
to a pseudo-element or `:focus-visible` has nothing to draw with. The inner
stroke also paints over content — reserve the margin as padding.
