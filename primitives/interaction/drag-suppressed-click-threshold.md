---
id: drag-suppressed-click-threshold
category: interaction
tags: [pointer,drag,interaction,correctness,accessibility]
axes: none
cost: 2
seen: 2
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

`pointerup` is not the only way a captured gesture ends. `pointercancel` fires
when the browser takes the gesture over — a scroll wins, a system gesture starts
— and `lostpointercapture` fires whenever capture goes away for any reason at
all, including the node being removed. Point all three at one release function
and guard it so running twice is harmless. A handler that listens only for
`pointerup` leaves its flag set, and the surface stays stuck mid-drag until the
next press.
```js
const release = e => { if (!dragging) return; dragging = false
  if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId) }
el.onpointerup = el.onpointercancel = el.onlostpointercapture = release
```
⚠ `lostpointercapture` fires after an explicit release too, so idempotence is
not defensive here — it is the ordinary path.
