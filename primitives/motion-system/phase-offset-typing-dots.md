---
id: phase-offset-typing-dots
category: motion-system
tags: [keyframes,loop,dots,typing,pending,chat,mock,stagger]
axes: {energy: 2, density: 1, weight: 1, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
A "composing" indicator reads as presence, not a spinner, when three dots grow
from nothing and shrink back in turn, resting at zero most of the cycle. Scale,
not opacity, so the row never shifts. Negative delays start the wave mid-flight
on mount instead of all three popping together. Period 1.2–1.6s, peak at 35–45%, offset 10–14% of the period.

```css
@keyframes dot { 0%, 80%, 100% { scale: 0 } 40% { scale: 1 } }
.dot { width: 4px; aspect-ratio: 1; border-radius: 50%;
  animation: dot 1.4s ease-in-out infinite both;
  animation-delay: calc(-.32s + .16s * var(--i)) }
```
⚠ Reduced motion: static dots at full scale — the zero rest shows nothing. Add a text alternative.
