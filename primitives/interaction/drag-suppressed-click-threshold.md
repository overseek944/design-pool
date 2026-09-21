---
id: drag-suppressed-click-threshold
category: interaction
tags: [pointer,drag,interaction,correctness,accessibility]
axes: none
cost: 2
seen: 4
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

Convert pointer coordinates against a rect captured at `pointerdown`, not against
live layout state the drag handler reads back each move. A resize mid-gesture — a
rotation, an address bar collapsing, a sibling growing — updates that state
asynchronously, and the pointer maths spends a few frames in a coordinate space
that no longer exists, which reads as the object jumping out from under the finger.
Refresh the cached rect from the resize handler instead, guarded on the gesture
being live.
```js
onpointerdown = e => { rect = el.getBoundingClientRect() }
onpointermove = e => { x = (e.clientX - rect.left) / rect.width }   // cached, not live
new ResizeObserver(() => { layout(); if (dragging) rect = el.getBoundingClientRect() })
```
⚠ Store the grab offset at `pointerdown` too — recentring on the pointer instead
teleports the object by half its size on the first move of every drag.

A snap container cannot be dragged by writing its scroll offset: every frame of
the gesture the engine pulls back toward the nearest snap position, and the
surface stutters against the hand. Drop `scroll-snap-type` for the duration of
the drag from the same class that carries the grabbing cursor, and let it come
back on release so the rail still settles on an item. `user-select: none`
belongs in that class too — without it the gesture selects the card's text.
```css
.rail            { scroll-snap-type: x mandatory; cursor: grab }
.rail.is-dragging { scroll-snap-type: none; cursor: grabbing; user-select: none }
```
⚠ Restore it in a `pointercancel` handler as well as `pointerup` — a gesture
interrupted by the system leaves the rail unsnappable for the rest of the
session.
