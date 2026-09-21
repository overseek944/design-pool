---
id: once-versus-toggle
category: scroll
tags: [scroll,reveal,ux]
axes: none
cost: 1
seen: 14
requires: []
conflicts: []
completes: []
tension: []
---
Two reveal policies, chosen per intent, never mixed arbitrarily:
- `once: true` — content reveals. Fires once; scrolling back shows a settled page.
- `toggleActions: "play none none reverse"` — decorative motion. Replays on
  return, so the page stays alive on a second pass.

Content that re-animates every time reads as unstable.

With an IntersectionObserver rather than a scroll library, `once` is
`unobserve(entry.target)` inside the callback — not a boolean guard around the
state write. The guard leaves the observer computing intersections for every
settled element on the page for the rest of the session; unobserving retires
each target as it fires, so a long page's observer cost falls to zero by the
time the reader reaches the bottom. The toggle policy is the same handler
without the unobserve, writing `false` on exit.
```js
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return once ? 0 : set(false)
  set(true); once && io.unobserve(e.target)
}), { threshold: .15 })          // .1–.25 for a block-sized target
```

For a scripted *sequence* rather than one reveal, writing `false` on exit is not
the toggle policy — it is a half-played demonstration. Every timer still in
flight fires against a hidden element, and re-entry resumes from whatever phase
it reached, with the tail of the DOM already in its finished state. Exit has to
clear the pending handle and return the machine to its idle phase, so re-entry
starts the sequence rather than joining it.
```js
const reset = () => { clearTimeout(h); setPhase('idle'); setTyped('') }
!e.isIntersecting ? reset() : phase === 'idle' && setPhase('typing')
```
⚠ Threshold high enough that the reset cannot fire while any of it is still
visible — 0.3–0.5 for a panel-sized demo, or it restarts under the reader.
