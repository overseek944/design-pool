---
id: antipodal-mark-pass
category: motion-system
tags: [motion-system,hover,icon,affordance]
axes: {energy: 3, density: 1, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Send a mark out of one corner and back in from the opposite one, landing where
it started. The path is a closed loop, so the hover needs no reverse and no
exit state: it fires on every entry, and a sticky `:hover` leaves the mark at
rest, not stranded at the far edge. Send it the way it already points
and the gesture restates the mark rather than decorating it. The corner jump
must land on one frame with nothing interpolated across it — two keyframes one
percent apart. Travel 0.6–1× the box, 350–500ms.

```css
@keyframes pass { 0% { translate: 0 } 45% { translate: 26px -26px }
                  46% { translate: -26px 26px } 100% { translate: 0 } }
.cta:hover .badge svg { animation: pass .44s cubic-bezier(.25,1,.5,1) }
```
⚠ The badge needs `overflow: clip` and a travel over half its width, or the
mark reads outside the control for most of the crossing.
