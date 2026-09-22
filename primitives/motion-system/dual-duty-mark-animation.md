---
id: dual-duty-mark-animation
category: motion-system
tags: [motion,svg,identity,loading,state,reduced-motion]
axes: {energy: 3, density: 1, weight: 2, finish: 5}
cost: 2
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Build a mark from parts that fold about their own seams and one keyframe pair
serves two states. Played once with `both`, the parts swing in from ±90° and
settle: that is the entrance. Looped between zero and a partial extreme, the
same rotation is the indeterminate wait — unmistakably this product's, with no
spinner asset and no second definition to keep in step. `transform-box:
fill-box` plus a per-part `transform-origin` puts each seam where the drawing
says it is. Entrance 0.5–0.9s with slight overshoot; loop 1.2–2s, extreme
60–80°.

```css
.mark__half { transform-box: fill-box; transform-origin: 100% }
.mark--enter .mark__half { animation: fold .7s cubic-bezier(.4,1.4,.4,1) both }
.mark--busy  .mark__half { animation: fold-loop 1.6s ease-in-out infinite }
@keyframes fold      { from { opacity: 0; transform: rotateY(-90deg) } }
@keyframes fold-loop { 0%,100% { transform: rotateY(0) } 50% { transform: rotateY(-75deg) } }
```
⚠ Reduced motion may cancel the entrance outright; it may not cancel the wait.
Stop the rotation and substitute a still busy state, or the only sign that
anything is pending disappears.

The seam need not be a hinge. A mark whose parts are a row of bars does the
same double duty on `scaleY` — still at rest, breathing while something is
listening or working — and `transform-box: fill-box` is required there for the
same reason: without it each bar scales about the viewBox origin and the row
flies apart instead of pulsing in place. Anchor the origin to the row's centre
line so bars grow both ways. Extremes 0.4–0.6 to 1.0–1.1, period 0.8–1.6s.
```css
.bar { transform-box: fill-box; transform-origin: 50% 50%;
       animation: pulse 1.5s ease-in-out infinite }
```
⚠ `fill-box` resolves against the element's own bounding box, so a bar drawn as
a zero-width line has nothing to scale about. Give it a real stroke box or use
a rect.

A third duty is acknowledgement. When something completes elsewhere on the page
— a form accepted, a value copied, a setting saved — one short beat on the mark
confirms it with no toast, no new node and no layer: the identity is the one
element guaranteed to be on screen at every scroll position, and the reader
already knows where it is. Keep it a single beat returning exactly to rest so it
cannot be confused with the wait loop it shares an element with. 1.1–1.25×,
400–700ms.
```js
if (!reduce) mark.animate([{ transform: 'scale(1)' },
  { transform: 'scale(1.18)' }, { transform: 'scale(1)' }], { duration: 600 })
```
⚠ It announces nothing — the outcome still needs a live region and a focus move,
and the beat sits on top of those. Never fire it on failure: the same gesture
read as celebration is worse than staying still.

A fourth duty is ambient presence: the mark moving on its own, on no signal at
all, with nothing pending. It is the one licence the identity has that no other
element does, because it is the element every reader has already learnt — a
deviation is read against a form they know, so it costs no attention to parse.
The constraint is that it must always return, and rest must dominate: seconds
of stillness to a fraction of a second of motion, or the mark stops being a
mark and becomes a decoration that happens to sit in the corner.
⚠ Rest is also the state the page ships in and screenshots in — never start the
loop before first paint, and never let a stopped loop strand a pose that is not
the rest pose. Skip the loop entirely under `reduce`; suppressing it after the
fact still costs a frame of motion.
