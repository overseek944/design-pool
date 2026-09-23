---
id: half-height-radius-target
category: interaction
tags: [interaction,hover,radius,pill,transition,easing]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A square control that rounds to a pill on hover must tween to exactly half its
height, not to `999px`. Used radius is capped at half the shorter side, so a
huge target reaches the final shape a few percent into the transition and the
rest of the duration changes nothing — the ease reads as a snap. Tie the target
to the height token so it survives a size change. 0.15–0.3s.

```css
.btn { --h: 36px; height: var(--h); border-radius: 0;
       transition: border-radius .2s ease-out }
.btn:hover, .btn:focus-visible { border-radius: calc(var(--h) / 2) }
```
⚠ A multi-line or auto-height control has no fixed half — keep `999px` there and accept the snap, or shorten the transition.
