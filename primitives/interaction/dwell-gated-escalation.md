---
id: dwell-gated-escalation
category: interaction
tags: [hover,pointer,delay,restraint,reward]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Hover is a weak signal — a pointer crosses half the page on its way somewhere
else. Treat brief hover and sustained hover as different inputs: the ordinary
response fires at once, and a second, more expensive one is armed by a timer
that completes only if the pointer is still there. Leaving clears it, and
returns the element to rest if the escalation already began. Passers-by get
nothing extra; the reader who actually stopped gets the thing worth building.
Threshold 1.5–3s — under a second it fires on pass-through, past four nobody is
still there.

```js
el.addEventListener('pointerenter', () => { held = setTimeout(escalate, 2000) })
el.addEventListener('pointerleave', () => { clearTimeout(held); if (running) settle() })
```
⚠ Nothing on a touchscreen ever dwells and no affordance advertises the wait,
so the escalation must be pure surplus — never the only route to information.
Clear the timer on `pointercancel` and on tab blur as well.
