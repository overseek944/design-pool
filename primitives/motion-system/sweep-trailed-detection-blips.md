---
id: sweep-trailed-detection-blips
category: motion-system
tags: [sweep, conic, radar, blip, monitoring, loop]
axes: {energy: 3, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: [reciprocating-sector-sweep]
---

A full-turn beam reads as "monitoring" only when it finds things. Paint the beam
as one conic layer — hard leading edge at 0°, alpha fading out over 35–70° behind
it — and spin it so the hard edge leads. Marks spawned into the field play a
one-shot life, not a loop: pop in from 0.8–0.9 scale over the first 10–15%,
hold, then fade and shrink slightly. Period 4–8s; mark life 1.5–3s.

```css
.beam { background: conic-gradient(#0000 0deg, #fff3 0deg, #fff1 35deg, #0000 70deg);
  border-radius: 50%; animation: spin 5s linear infinite reverse }
@keyframes life { 0% { opacity: 0; scale: .8 } 12%, 70% { opacity: 1; scale: 1 }
  to { opacity: 0; scale: .85 } }
.blip { animation: life 2s ease-in-out forwards }
```
⚠ Reduced motion: stop the beam and show marks statically; spawned marks must be removed on `animationend` or the DOM grows forever.
