---
id: additively-gated-reveal
category: motion-system
tags: [motion,reveal,accessibility,progressive-enhancement,correctness,scroll]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 1
seen: 11
requires: []
conflicts: []
completes: []
tension: []
---
Most machinery around entrances exists because the from-state is invisible:
arming below the fold, watchdogs, no-JS fallbacks. Invert it. The element's
authored state *is* the settled one, the entrance lives entirely inside a
capability-and-preference gate, and its start keyframe is dimmed rather than
absent — 10–35% opacity, 0.5–1.75rem of offset; take the upper end for a
whole section, the lower for a single element. Every failure path then lands on
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

Where the choreography is already declarative — per-item `animation-delay` off
an index — the gate can be the animation's own play state rather than a class
that adds it. Author it `paused` with `both` fill and one attribute on the
container starts every item at once, delays intact: the from-state is the
keyframe's own 0% frame, nothing is hidden by a base rule, and the runtime
surface is a single boolean for a grid of any size.
```css
.tile { animation: rise .72s var(--ease) both calc(var(--i) * 80ms);
        animation-play-state: paused }
[data-in-view=true] .tile { animation-play-state: running }
```
⚠ Paused parks on frame zero, so this variant *does* withhold content — arm it
only below the fold, or a runtime that never starts leaves an empty grid.

Where a hero does take that true `0`, take 0.001 instead. It is visually
identical, and it keeps the element a painted thing: a fully transparent element
is not a largest-contentful-paint candidate at all, so a from-state of exactly
zero moves the page's LCP to wherever the reveal happens to finish. Near-zero
also holds the composited layer rather than letting it be discarded and rebuilt
on the first frame. Any value in 0.001–0.01 works.
```css
@keyframes rise { from { opacity: .001; translate: 0 1rem } }
```
⚠ It reports LCP at first paint for content nobody can read yet — honest only
while the reveal is short. Over ~400ms the metric is measuring the wrong moment.

The gate should carry the enhancement's *layout*, not only its opacity. A
rotator built by stacking its items in one grid cell is a pile the moment the
animation that separates them in time does not run — so put `grid-area: 1/1`
inside the preference query beside the keyframes, and the same markup degrades
to what it already is: a list, in flow, with its gap. Nothing is hidden, nothing
is restored, and there is no second rule to keep in step.
```css
.rotator { display: grid; gap: 1rem }
@media (prefers-reduced-motion: no-preference) {
  .rotator > li { grid-area: 1/1; opacity: 0; animation: flip 4.5s infinite } }
```
⚠ Only where the flow version is genuinely readable — a six-item stack becomes
six paragraphs. Past three or four, the still state wants its own layout, not
the absence of one.
