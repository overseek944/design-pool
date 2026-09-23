---
id: enveloped-voice-level-bars
category: motion-system
tags: [audio, waveform, bars, mock, decorative, speech]
axes: {energy: 3, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A row of level bars read as speech, not a loop, when each bar's height is two
incommensurate sines times a slow shared gain times a centre-weighted envelope.
Distinct per-bar rates and phases stop the row pulsing as one; the envelope
keeps the middle loudest. Silent, drop to a small per-bar floor rather than
zero so the row still reads as a live channel. 16–32 bars, rates 3–9 rad/s,
gain 0.6–1, floor 0.04–0.08.

```js
const env = 1 - Math.abs(i - mid) / mid
const a = Math.abs(Math.sin(t*(3.4 + i%5*.4) + i*.7)), b = Math.abs(Math.sin(t*(8.8 + i%3*.6) + i*1.3))
bar.style.transform = `scaleY(${talking ? Math.min(.98, .1 + (.25+a*.5+b*.25)*g*(.45+env*.55)) : .05 + i%4*.008})`
```
⚠ Decorative only: `aria-hidden`, pause off-screen, hold the floor under reduced motion.
