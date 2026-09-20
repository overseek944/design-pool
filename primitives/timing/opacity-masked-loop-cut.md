---
id: opacity-masked-loop-cut
category: timing
tags: [timing,keyframes,loop,opacity,conveyor]
axes: {energy: 3, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A track that reads as endless usually means duplicated DOM. One element can do
it alone: inside the keyframes drop opacity to zero, move it to the far side on
the next stop, then bring opacity back. The cut lands while nothing is visible,
so a finite travel reads as a continuous feed — and unlike a wrapped marquee it
costs one node and lets each item follow its own path rather than a shared
translate. Give the blind window 8–12% of the cycle.
```css
@keyframes ride {
  0%       { transform: translateY(0);     opacity: 1 }
  36%, 46% { transform: translateY(36px);  opacity: 1 }   /* arrive, rest */
  47%      { transform: translateY(36px);  opacity: 0 }
  48%      { transform: translateY(-64px); opacity: 0 }   /* cut, unseen */
  56%      { transform: translateY(-64px); opacity: 1 }
  100%     { transform: translateY(0);     opacity: 1 }   /* travel home */
}
```
⚠ The stops either side of the cut must hold identical opacity or it strobes.
Peers on one period all cut at the same instant — offset their phase.
