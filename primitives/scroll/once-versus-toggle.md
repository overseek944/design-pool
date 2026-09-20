---
id: once-versus-toggle
category: scroll
tags: [scroll,reveal,ux]
axes: none
cost: 1
seen: 7
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
