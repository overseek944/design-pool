---
id: deadline-bounded-animated-close
category: motion-system
tags: [motion,correctness,state,architecture]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A state change that waits on an animation never happens when the animation
never runs. A backgrounded tab stops ticking, a cancelled animation rejects, a
reduced-motion branch skips it — and the panel stays open forever. Race
`finished` against a timer slightly longer than the duration, and skip the
animation outright when the document is not focused. One re-entrancy flag keeps
a second dismiss from interleaving with the first. Slack 1.1–1.3× the duration.

```js
if (closing) return; closing = true
const a = el.animate(frames, { duration: 340, fill: 'both' })
await Promise.race([a.finished.catch(() => {}),
                    new Promise(r => setTimeout(r, 420))])
a.cancel(); el.close(); closing = false
```
⚠ `finished` rejects on cancel — swallow it inside the race or the close leaves
an unhandled rejection. Cancel after the race, never before the state changes.

Where the exit is declared in CSS rather than created in script, do not retype
its duration — ask the element what is running. `getAnimations()` after the
state flip returns the transitions and animations the flip actually started,
and awaiting `allSettled` over their `finished` promises releases the teardown
whether they completed or were cancelled. Query inside a `requestAnimationFrame`
so the new rules have been applied, and treat an empty set as *nothing to wait
for* — run the callback immediately rather than waiting out a deadline for an
animation that was never going to exist, which is also the reduced-motion path
for free.
```js
requestAnimationFrame(() => { const as = el.getAnimations()
  if (!as.length) return done()
  Promise.allSettled(as.map(a => a.finished)).then(done) })
```
⚠ `allSettled`, never `all` — one cancelled animation rejects and a teardown
behind `all` never runs. Guard re-entry: a second state flip while the first is
still awaiting queues a second `done()` against a node that may be gone.
