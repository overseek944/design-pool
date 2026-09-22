---
id: zero-signal-idle-floor
category: motion-system
tags: [motion,idle,signal,realtime,feedback,reduced-motion]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A visual driven by a live input has two states that render identically: the
input genuinely at zero, and the pipeline broken. Both draw a flat line, and
nothing tells silence from a dead renderer. Add a small oscillation to the
level, gated on the level itself sitting below a floor — floor 5–8% of range,
amplitude 2–5%, period 300–500ms. Real signal crosses the gate and the idle
stops contributing with no crossfade to author, because the term is simply no
longer added.

```js
const idle = level < 0.06 ? 0.035 * (0.65 + 0.35 * Math.sin(t / 380)) : 0
render(Math.min(1, level + idle))
```
⚠ Keep the amplitude below the smallest meaningful reading or the idle is read
as signal. Drop it under `prefers-reduced-motion` and state "no input" in text
there instead.
