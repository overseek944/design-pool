---
id: step-held-cycle-schedule
category: timing
tags: [motion,keyframes,loop,sequence,cycle]
axes: {energy: 2, density: 2, weight: 2, finish: 3}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
`step-end` on the shorthand turns a keyframe list into a discrete schedule:
nothing interpolates, so a pair of stops holding one value becomes a *dwell* and
every change between pairs is a hard cut. An N-state rotator is then one
animation over one strip — no clock, no `transitionend` wrap, no duplicated
track, and the holds are readable as percentages instead of tuned timers. Use
where the states are alternatives rather than a continuum. Dwell 15–25% of the
cycle each, four to six states.

```css
@keyframes slots {                        /* hold, cut, hold, cut … */
  0%,20%  { translate: 0 0 }
  25%,45% { translate: 0 -100% }
  50%,70% { translate: 0 -200% }
}
.strip { animation: slots 12s step-end infinite }
```
⚠ A hard cut mid-word is unreadable at speed — under about 2s per dwell use a
crossfade instead. Live text swapping under a clock needs `aria-live` or it is
announced on every cut; mark it decorative otherwise.
