---
id: flush-separated-transition-arming
category: motion-system
tags: [motion,correctness,transition,observer,reveal]
axes: none
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---

A one-shot reveal whose transitions are generated in script — delays computed
from an index or a distance — cannot be armed and played in one tick.
Write the from-state with no `transition` attached, force a style commit, then
attach the declarations and the end state. Set both together and the
element transitions *into* hiding before fighting its way back. The flush also
covers a race that only appears in the field: an observer whose target is
already in view fires in the same task as `observe()`, so a figure
reached by deep link or restored scroll snaps to finished.

```js
el.style.transition = ''; el.style.opacity = 0            // from-state
void el.getBoundingClientRect()                           // commit it — once, for the batch
el.style.transition = `opacity 600ms ${EASE} ${i * 45}ms` // step 30–90ms
el.style.opacity = 1
```
⚠ Only a style-dependent read flushes; `performance.now()` or a cached width
does not, and forcing it per element costs a reflow each.

A frame is the cheaper separator where the batch is small or the change is a
`display` flip. Write the from-state, then apply the transition and the end
state inside `requestAnimationFrame` — no forced reflow, no per-element layout
read. A box that was `display: none` needs two nested frames, not one: the
first is what establishes the box, and a transition attached in it has nothing
to start from.
```js
el.style.display = 'block'                       // no box until the next frame
requestAnimationFrame(() => requestAnimationFrame(() => {
  el.style.transition = 'opacity .3s, transform .3s'; el.style.opacity = 1 }))
```
⚠ A frame is not a guarantee the way a style read is — a background tab may not
paint at all, so anything that must be armed before the reader can see it keeps
the forced read. Restarting a transition in place is the same shape: clear it,
reset in the same tick, re-attach on the next frame.

A frame separator on a *one-shot* reveal is a liveness bet. A tab backgrounded
or throttled before its first paint never runs the callback, and the content
sits at its from-state until the reader comes back to a blank screen. Race the
frames against a short timer, guarded so whichever loses is a no-op: the reveal
then degrades to arriving already settled, which is the correct failure.
150–300ms — past a normal frame pair, under a reader's notice.
```js
let shown = false
const show = () => { if (shown) return; shown = true; els.forEach(e => e.classList.add('in')) }
requestAnimationFrame(() => requestAnimationFrame(show))
setTimeout(show, 200)
```
⚠ Only where the reveal has somewhere safe to land. A sequence whose delays were
computed per element collapses into one step when the timer wins.
