---
id: drag-suppressed-click-threshold
category: interaction
tags: [pointer,drag,interaction,correctness,accessibility]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A surface that answers to drag and also holds links fires a click at the end of
every gesture: the reader turns the thing, lets go, and is navigated away.
Capture the pointer on down so the gesture survives leaving the element,
accumulate the distance travelled, and cancel the click in the *capture* phase
once that distance clears a threshold. 4–8px — under it a shaky tap stops
counting as a tap, over it a slow drag starts navigating. Reset the accumulator
after each cancellation, not on the next press.

```js
onpointerdown = e => { el.setPointerCapture(e.pointerId); d = 0 }
onpointermove = e => { d += Math.hypot(e.movementX, e.movementY) }
el.addEventListener('click', e => { if (d > 6) {
  e.preventDefault(); e.stopPropagation(); d = 0 } }, true)   // capture
```
⚠ Capture redirects every later event to the captor, so nested controls lose
hover for the duration. Neither capture nor the threshold gives a keyboard user
any way in — the surface still needs its own key handling.
