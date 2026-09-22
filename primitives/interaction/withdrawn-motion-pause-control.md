---
id: withdrawn-motion-pause-control
category: interaction
tags: [accessibility,motion,control,state,chrome,cheap]
axes: none
cost: 1
seen: 6
requires: []
conflicts: []
completes: []
tension: []
---

Perpetual decorative motion owes the reader a stop, and an OS preference is not
one — it is a setting elsewhere, not a mechanism on the page. Ship a visible
button that flips one flag on the root and let CSS pause the whole subtree.
Label it by the action, not the state, with `aria-pressed` carrying the state.
Then withdraw it under `prefers-reduced-motion`, where the motion is already
gone and a stop that stops nothing is a lie. Caption tier, 9–13px.

```css
.paused .drift { animation-play-state: paused }
@media (prefers-reduced-motion: reduce) { .motion-toggle { display: none } }
```
⚠ Only where that branch truly removes the motion; if `reduce` merely slows it,
the stop is still owed.

Withdrawing it silently is one reading; the other is to leave it in place,
disabled, and say why in its label — the page then states that it honoured the
preference instead of merely showing one control fewer. Worth it where the
figure is the argument rather than decoration, and the reader might otherwise
think the demonstration failed to start.
```jsx
<button aria-pressed={paused} disabled={reduce}
  aria-label={reduce ? 'Animation off — reduced motion preference'
    : paused ? 'Play animation' : 'Pause animation'} />
```
⚠ `disabled` takes the button out of the tab order, so the explanation is
attached to something a keyboard reader cannot reach. Use `aria-disabled` with a
no-op handler, or put the sentence in the figure's description instead.

Variant — the stop can also report the playhead. Wrap the button in a thin
ring whose `stroke-dashoffset` follows the loop's current frame over its total,
and the control says how far through the demonstration is and that it will
restart, not only that it moves. Track 1.5–2.5px, ring 28–44px, drawn at 15–25%
alpha under a 70–90% arc. Read the position only while it plays.
```js
ring.style.strokeDashoffset = C - C * anim.currentFrame / anim.totalFrames
```
⚠ Polling every 16ms repaints the ring even when the loop is paused offscreen —
stop the timer on the same predicate that pauses the animation.
