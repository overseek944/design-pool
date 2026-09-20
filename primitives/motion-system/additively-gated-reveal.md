---
id: additively-gated-reveal
category: motion-system
tags: [motion,reveal,accessibility,progressive-enhancement,correctness,scroll]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 1
seen: 2
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
