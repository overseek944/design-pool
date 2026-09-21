---
id: additively-gated-reveal
category: motion-system
tags: [motion,reveal,accessibility,progressive-enhancement,correctness,scroll]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Most machinery around entrances exists because the from-state is invisible:
arming below the fold, watchdogs, no-JS fallbacks. Invert it. The element's
authored state *is* the settled one, the entrance lives entirely inside a
capability-and-preference gate, and its start keyframe is dimmed rather than
absent — 10–20% opacity, 0.5–1.5rem of offset. Every failure path then lands on
readable content by construction, and the reveal still reads as arrival because
the eye registers the settle, not the first frame.

```css
@supports (animation-timeline: view()) { @media (prefers-reduced-motion: no-preference) {
  .reveal { animation: rise linear both; animation-timeline: view();
            animation-range: entry 15% entry 55% } } }
@keyframes rise { from { opacity: .15; translate: 0 1rem } }
```
⚠ Dim the container, not the copy — body text at 15% sits near 1.5:1 for anyone
whose reveal never runs. Reserve a true `0` for one deliberate hero per page.

Where the from-state cannot be written as a keyframe — a per-node fill across
forty SVG paths, a stagger carried on inline properties — get the same
guarantee from the other side: serve the settled markup, and have script add a
pre-state class on mount and drop it when the element arrives. No-JS, a bundle
error and a slow parse all land on finished content.
```js
el.classList.add('pre')
new IntersectionObserver(([e], o) => e.isIntersecting &&
  (el.classList.remove('pre'), o.disconnect()), { threshold: .35 }).observe(el)
```
⚠ Applied to something already on screen this un-paints settled content and
re-paints it — a visible blink, worst above the fold. Measure first and skip
the class entirely for anything already inside the viewport.

Where the gate is a blanket `* { animation: none !important }` under reduced
motion, this stops being a preference and becomes the contract: a from-state
written into a base rule is what the reader is left staring at, because nothing
now runs to undo it. Every hidden initial state has to live inside the
`@keyframes` block with `both` fill, so cancelling the animation returns the
element to authored markup rather than to frame zero. One grep — a bare
`opacity: 0` outside a keyframe — audits the whole stylesheet.
