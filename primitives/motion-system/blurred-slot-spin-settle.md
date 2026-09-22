---
id: blurred-slot-spin-settle
category: motion-system
tags: [slot, reel, blur, overshoot, value-change, randomise]
axes: {energy: 4, density: 1, weight: 2, finish: 3}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A value being picked — a randomised option, a generated word — reads as a
draw, not a swap, when it spins first. Loop a short vertical jitter with
blur peaking mid-cycle, swap content while it runs, then land
with an overshooting drop.

```css
@keyframes spin { 25%,75% { filter: blur(1px); translate: 0 -40% }
                  50% { filter: blur(2px) } }            /* ±25–50%, 1–3px */
.spinning { animation: spin .15s linear infinite }     /* 0.1–0.25s */
@keyframes land { 0% { translate: 0 -20%; scale: 1.1 } 40% { translate: 0 8%; scale: .95 } }
.landed { animation: land .4s cubic-bezier(.34,1.56,.64,1) }
```
⚠ Announce only the landed value (`aria-live`); skip the spin under reduced motion.
