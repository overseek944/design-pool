---
id: drag-scoped-target-states
category: interaction
tags: [drag,drop,affordance,state,feedback,accessibility]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A drag that lights only the target under the pointer makes the reader hunt for
where the thing may go. Mark the whole eligible set the moment the drag starts,
then escalate — faint dash for eligible, full-strength dash for the hovered
one, a warning hue at the same geometry for invalid, solid on commit. Flash the
destination, not the dragged item. Eligible at 15–30% of the hovered alpha.

```css
.t.eligible { outline: 1px dashed rgb(var(--ok) / .25); outline-offset: -1px }
.t.over     { outline: 1.5px dashed rgb(var(--ok) / 1) }
.t.reject   { outline: 1.5px dashed rgb(var(--no) / .5) }
@keyframes land { from { background: rgb(var(--ok) / .2); translate: 4px } }
```
⚠ `outline`, never `border` — no layout cost, and the negative offset keeps it
inside the box so adjacent targets never merge. Hue alone cannot carry accept
versus reject, and the drop must be reachable from the keyboard.
