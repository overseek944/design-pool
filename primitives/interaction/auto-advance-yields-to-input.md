---
id: auto-advance-yields-to-input
category: interaction
tags: [carousel,autoplay,accessibility,state]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 6
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
