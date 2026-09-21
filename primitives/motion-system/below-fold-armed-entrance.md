---
id: below-fold-armed-entrance
category: motion-system
tags: [motion,correctness,progressive-enhancement,observer,reveal]
axes: none
cost: 1
seen: 10
requires: []
conflicts: []
completes: []
tension: []
---
An entrance system that hides content in CSS and un-hides it from script must be
defended against script that never arrives. Invert it: ship nothing hidden, and
at setup add the hidden class only to elements whose top already sits past the
fold — one `getBoundingClientRect` read, armed at 85–95% of viewport height — the low
end where entrances are short and the fold is soft, the high end where an
arming mistake would be visible.
Everything already visible renders settled, so a dead runtime costs the
entrances rather than the page, and the observer gets a smaller set to watch.

```js
els.forEach(el => {
  if (el.getBoundingClientRect().top <= innerHeight * .92) return
  el.classList.add('pre'); io.observe(el) })
```
⚠ Read positions before any layout the entrance itself causes, and in one pass —
arming element by element reflows per element. Content that starts below the
fold is still hidden, so a runtime that dies *after* setup needs a watchdog.

The two halves can take different runtimes. Content above the fold needs no
observer at all and no script either — give it a plain CSS `animation` with its
delay inline, and it plays from the stylesheet before hydration, on a dead
bundle, and on the first paint rather than a frame after it. Script then owns
only the below-fold set, which is the half that genuinely needs to watch for an
intersection.
```jsx
eager ? <div className="reveal-eager" style={{ animationDelay: `${d}s` }}>…</div>
      : <Observed delay={d}>…</Observed>
```
⚠ The CSS path must carry its own `reduce` branch — it is not reached by the
runtime's check. Collapse its duration rather than cancelling the animation, or
`both` fill leaves the element at its 0% frame.

Order decides it when the gate is a single class on the root rather than a class
per element. Mark the eager set settled *first*, then add the flag that arms the
transition rules: the stylesheet cannot hide anything until everything already on
screen is holding its finished state, so no paint catches an above-fold element
mid-transition even if the two writes land in different frames.
```js
eager.forEach(el => el.classList.add('is-visible'))
document.documentElement.classList.add('reveal-ready')   // arms the rules
```
⚠ Reversing the two lines reviews identically and flashes in the field.
