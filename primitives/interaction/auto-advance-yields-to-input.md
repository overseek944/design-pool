---
id: auto-advance-yields-to-input
category: interaction
tags: [carousel,autoplay,accessibility,state]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 26
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

Suspending is not restarting, and a re-armed `setTimeout` is a restart: a cursor
crossing at 4.9s of a 5s dwell buys a fresh five. Keep the remainder — stamp the
arm time, subtract the elapsed on each pause, re-arm on what is left — and let
the indicator pause with it rather than remount, so one clock drives both.
Publish the reason as a state on the root and CSS owns the rest.
```js
const pause  = () => { clearTimeout(t); left -= performance.now() - at; t = 0 }
const resume = () => { if (!t && live) { at = performance.now(); t = setTimeout(beat, left) } }
```
```css
[data-auto="running"] .ring { animation: fill var(--dwell) linear forwards }
[data-auto="paused"]  .ring { animation-play-state: paused }
[data-auto="stopped"] .ring { animation: none; --fill: 1 }   /* full, not empty */
```
⚠ Restore `left` to the full dwell inside the beat, not on resume — a beat that
fires from a resumed remainder otherwise keeps that short remainder forever.

Scope the rotation to the viewport mode in which the content is actually a
sequence. A four-up grid that collapses to a one-per-screen snap strip on a
phone only has a "next" below the breakpoint; above it every item is already on
screen and an interval is motion with nothing to reveal. Build and tear the
timer down from the breakpoint query's `change` handler rather than reading it
once, so a rotation cannot survive a resize into the layout that does not need
it — and pair it with the reduced-motion query, both consulted in the same arm.
```js
const wide = matchMedia('(width > 48rem)')
const arm = () => { clearInterval(id); id = (wide.matches || rm.matches) ? 0 : setInterval(next, 3200) }
wide.addEventListener('change', arm); rm.addEventListener('change', arm); arm()
```
⚠ Deriving the next index from `scrollLeft / clientWidth` reads zero on a strip
that is `display: none` at the current width and rotates it back to the first
item — check the measurement before acting on it, not just the query.

Where each step carries timed media, delete the clock entirely: the clip's own
`ended` is the advance and `currentTime / duration` is the indicator. No timer
to drift against playback, no dwell to guess per step, and a step that buffers
simply takes longer instead of advancing over a frozen frame. Read the fraction
on `requestAnimationFrame` rather than `timeupdate` — the latter fires at
4–15Hz and a bar stepping at that rate reads as stalled.
```js
const tick = () => { if (!v.duration) return raf = requestAnimationFrame(tick)
  bar.style.width = `${100 * Math.min(1, v.currentTime / v.duration)}%`
  if (v.currentTime < v.duration) raf = requestAnimationFrame(tick) }
v.addEventListener('ended', next, { once: true })
```
⚠ `duration` is `NaN` until metadata lands, so the loop must re-request rather
than divide. Cancel the frame *and* detach the `ended` handler when the step
changes, or an abandoned clip advances the sequence from behind.

Lengthening the dwell is a gentler answer than suspending it. Keep one timer and
give it two intervals — the cycle, and a longer one used for the single step
after a reader picks something — then clear the flag on advance so the sequence
returns to its own cadence by itself. Nothing is stranded if the pointer never
leaves, because it never stopped; the reader who chose a step simply gets time
to read it. Cycle 2.5–4s, held step 2–3× that.
```js
useEffect(() => { const t = setTimeout(() => { setHeld(false)
  setIndex(i => (i + 1) % count) }, held ? 8000 : 3400); return () => clearTimeout(t)
}, [index, held, count])
```
⚠ Suits a demonstration that loops past its reader, not a gallery they are
working through — anyone reading slowly is still overtaken, just later. Where
the content must not move unbidden, suspend instead.
