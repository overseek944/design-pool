---
id: expanding-shadow-beacon
category: timing
tags: [motion,indicator,status,ambient,glow]
axes: {energy: 2, density: 1, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: [stepped-two-frame-blink]
---
A mark that blinks *reports* a state; one that throws a ring outward and lets
it die *emits* one, which is what a live status wants. Animate
`box-shadow` spread alone on a 6–9px disc — 0 out to 8–12px while the alpha
falls to nothing — so the ring costs no pseudo-element, no scaled child and no
box of its own. Park the last 25–35% of the period at zero, or rings tread on
each other and the dot reads as a spinner. Period 2–3s; under 1.5s, an alarm.

```css
.dot { animation: beacon 2.4s ease-out infinite }
@keyframes beacon { 0% { box-shadow: 0 0 0 0 var(--beam) }
  70%, 100% { box-shadow: 0 0 0 9px transparent } }
```
⚠ Spread animates by repaint, never on the compositor — one dot is free, a
column of them is not. Under `reduce` it stops rather than slows.
