---
id: named-completed-motion-state
category: motion-system
tags: [motion,state,correctness,accessibility,reveal,progressive-enhancement]
axes: none
cost: 1
seen: 9
requires: []
conflicts: []
completes: []
tension: []
---
Give a choreographed scene three named states — `waiting`, `playing`, `complete`
— and style `complete` as a real authored state rather than as whatever the
animation happened to leave behind. Every route that cannot animate then lands
somewhere deliberate: no observer support, reduced motion, or the tab hidden
mid-run all set `complete` directly and the content is simply there. Latch it,
so returning to the section does not replay a scene already read.
```js
const play = () => { if (!canAnimate) return set('complete')
  el.dataset.motion = done ? 'complete' : 'playing' }
```
```css
[data-motion="waiting"] [data-beat] { opacity: 0 }
[data-motion="complete"] [data-beat] { opacity: 1 }
```
⚠ Without the third state the reduced-motion path inherits the `waiting` styles
and the section stays blank for the readers least able to debug it.

A continuously-rendered surface has no discrete state to name, and nothing in
the DOM for a test to assert on. Publish the numbers instead — a frame counter,
a mark count, the progress scalar — on the same attribute namespace, and a test
can wait for real advancement rather than sleeping and hoping.
```js
el.dataset.frames = ++n; el.dataset.progress = p.toFixed(3)
```
⚠ An attribute write per frame is a style invalidation per frame; keep it on
the container only, and behind a flag if anything selects on it.

The latch can outlive the session. Where `complete` records something the reader
*did* — a form finished, a tour taken, a figure solved — persist the flag and
resolve the state before the first paint, so a return visit opens on the outcome
instead of replaying the pitch at someone who already answered it. One key, one
boolean, read inside the same initialiser that picks the state; anything reading
it a tick later has already rendered `waiting`.
```js
const done = store.get(KEY) === '1'                 // before first paint
el.dataset.motion = done || !canAnimate ? 'complete' : 'playing'
```
⚠ Storage throws in private modes and partitioned frames, and a throw has to
mean *not done* — replaying a scene is a far smaller failure than hiding an
action from a reader who never took it. Leave a route back into the flow: a
persisted terminal state that cannot be exited is a dead end.
