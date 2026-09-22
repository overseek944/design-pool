---
id: once-versus-toggle
category: scroll
tags: [scroll,reveal,ux]
axes: none
cost: 1
seen: 23
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

One element can legitimately carry both, on different properties, if each is
keyed to a different question. A step in a scrolled sequence reveals its
artwork once — arriving twice is a glitch — while its marker on the rail tracks
live, filling as the step passes the reading line and emptying on the way back,
because that one answers *where am I*, not *has this arrived*. Two class names,
one add-only and one toggled, keep the policies from being confused later.
```js
if (top < innerHeight * .88) step.classList.add('is-revealed')   // latched
step.classList.toggle('is-reached', top + 32 <= readingLine)     // live
```
⚠ The latched class must also be applied outright under reduced motion, or a
reader with the preference set gets a page of permanently hidden artwork.

A latch swept from rects rather than from an observer is the right choice in a
client-routed document — routes come and go behind `[hidden]`, and a sweep can
be re-run at exactly those moments — but it inherits a trap the observer does
not have. A hidden subtree measures 0×0 at the origin, and `top: 0` passes
`top < innerHeight` for every element on every route that is not on screen: the
whole site latches on first paint, count-ups play to nobody, and each route
arrives already settled. Test the size before the position.
```js
const r = el.getBoundingClientRect()
if (!r.width && !r.height) return false          // on a hidden route
return r.top < innerHeight - 40
```
⚠ Re-sweep when a route is unhidden — a `MutationObserver` on the shell's
`hidden` attribute — or content revealed after the last scroll event never
latches at all.

Between the two policies sits a third worth naming: replay only when the element
is re-approached from the side it was first read on. On exit, reset the machine
only if the box is still *below* the fold line — it left downward, so the reader
scrolled back above it and will meet it again — and leave it finished when it
leaves upward. A demonstration then plays on every genuine approach and never
rewinds behind someone who has already passed it and turned around for an
unrelated reason.
```js
if (!e.isIntersecting) { if (el.getBoundingClientRect().top > 0) reset() }
else if (phase === 'idle') start()          // rootMargin '0px 0px -15% 0px'
```
⚠ The rect read is a forced layout inside the callback — one element, on an
event that fires twice a pass, is fine; a list of forty is not. `top > 0` is
measured against the viewport, not the observer's margined root, so the two
thresholds want to be set together or the reset fires inside the armed band.
