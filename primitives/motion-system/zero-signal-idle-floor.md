---
id: zero-signal-idle-floor
category: motion-system
tags: [motion,idle,signal,realtime,feedback,reduced-motion]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 1
seen: 2
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

The same floor applies to a *held* frame, where the input is a script rather
than a sensor. A scripted sequence pausing on the thing it just did goes
perfectly static, and a static frame in a piece that has been moving reads as
crashed, not as composed. Keep two cheap residuals alive through every hold: a
blinking caret or ticking clock inside the frame, and a slow linear drift of
the frame itself — 10–20px over 3–4s, `linear` so it never announces a start
or an end.
```css
.stage.hold { animation: drift 3.4s linear both }
@keyframes drift { to { translate: -14px -7px } }
```
⚠ Drift is a real transform on a large subtree — put it on the holding
wrapper, not on each child, and drop both residuals under reduced motion,
where a genuinely still frame is the correct state.
