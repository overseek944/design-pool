---
id: bounce-parametrised-spring
category: timing
tags: [motion,spring,rhythm,sequencing]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
Stiffness, mass and damping are three coupled dials, none of which names
anything a reviewer can judge: firm a spring by raising stiffness and it gets
faster too, so every adjustment re-times the sequence. Parametrise by the two
qualities actually being reviewed instead — a duration for how long it takes,
a bounce for how far it overshoots. They move independently, so a whole scene
can hold one duration and vary only bounce by role, and the schedule survives
the feel being re-tuned. Duration .35–.6s for interface motion, 0 bounce for
anything carrying a layout change, .15–.3 where a control should read as sprung.

```js
animate(el, { y: 0 }, { type: "spring", visualDuration: .45, bounce: .2 })
```
⚠ The duration is the visual settle, not the tail — past about .4 bounce the
element is still ringing when the next beat starts. Reduced motion wants the
spring replaced by a fade, not `bounce: 0`.
