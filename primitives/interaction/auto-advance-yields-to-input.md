---
id: auto-advance-yields-to-input
category: interaction
tags: [carousel,autoplay,accessibility,state]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 15
requires: []
conflicts: []
completes: []
tension: []
---
A self-advancing sequence must stop the instant a reader touches it and start
again once they have gone. Stopping permanently strands anyone who grazed it
with the cursor; not stopping yanks the item away mid-read. Suspend on
pointer *or* focus, resume on a quiet timer. Cycle 2.5–4s, quiet window 4–8s.
```js
const pick = i => { setActive(i); setAuto(false)
  clearTimeout(t.current); t.current = setTimeout(() => setAuto(true), 5000) }
// onMouseEnter, onFocus and onClick all call pick
```
⚠ Bind `onFocus` alongside `onMouseEnter` or keyboard users get no pause at
all. Make each item a real button with `aria-pressed`, and clear the resume
timer on unmount.

On a direct-manipulation surface — an orbiting model, a pannable map — hover is
not interaction and focus never arrives, so bind to the control's own drag
`start` and `end` instead and measure the quiet window from release. Suspend on
`start`, arm the resume timer on `end`; a timer armed on `start` expires
mid-drag and the idle motion fights the hand still holding the object.

Graze and choice are not the same input. A cursor crossing the strip should not
suspend anything — there is nothing to read under a pointer that is only passing
— but a reader who *picks* an item has said what they want, and rotation that
resumes over that choice takes it back. Stop permanently on selection, ignore
hover entirely, and gate the timer on an `IntersectionObserver` so a strip
off-screen costs nothing.
```js
const pick = (i, chosen) => { show(i); if (chosen) locked = true; arm() }
const arm = () => { clearTimeout(t)
  if (visible && !locked && !mq.matches) t = setTimeout(next, 5200) }
```
⚠ Re-arm from the `change` event on the reduced-motion query, not only from its
value at startup — a reader who turns motion off mid-page otherwise keeps the
rotation they just asked to stop.

Where the sequence demonstrates a product rather than rotating content, the
handover costs nothing provided the script never had its own code path: let each
beat call the same handler the reader's control calls, so there is one state
machine and the schedule is merely another caller. Abandoning is then a flag the
loop's own re-arm consults — clearing the pending timer is not enough when the
last beat's whole job is to schedule the next pass.
```js
BEATS.forEach(([at, fn]) => t.push(setTimeout(() => { if (!driven) fn() }, at)))
```
⚠ Those handlers must be idempotent: a beat already queued when the reader acts
still fires, and applying the same change twice has to be a no-op rather than a
second increment.

`reduce` is a harder gate than any of the above, and a shorter transition does
not answer it: the objection is content being replaced while somebody is still
reading it, not the movement between states. Do not advance at all. Build the
interval *inside* the `matchMedia` handler rather than guarding the callback,
and bind `change` so a reader reaching for the OS switch mid-session stops the
rotation without a reload.
```js
const mq = matchMedia('(prefers-reduced-motion: reduce)')
const arm = () => { clearInterval(id); id = mq.matches ? 0 : setInterval(next, DWELL) }
mq.addEventListener('change', arm); arm()
```
⚠ A rotation that stops is only acceptable where every item stays reachable by
hand — real buttons beside it, not dots — and where the item it parks on is the
one worth landing on.

A dwell bar beside the rotation is a second clock, and a CSS animation restarts
on element *insertion*, not on a class or a state change — so a shared node
drifts further out of step with the timer on every cycle and a manual pick
leaves it mid-travel. Give the indicator an identity that includes the step and
let it be destroyed and remade with each beat; its animation then starts from
zero at exactly the moment the timer is re-armed, and one shared custom property
keeps the two durations from being written twice.
```jsx
<span className="dwell" key={`${group}-${index}`} />   /* remount is the restart */
```
⚠ Its reduced-motion rest state is *full*, not empty. `animation: none` leaves
the bar at its 0% frame, and an empty progress bar beside a rotation that is
deliberately not rotating reads as stalled rather than still.
