---
id: parked-optimistic-fill
category: timing
tags: [timing,feedback,progress,state,forms]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A request of unknown length can still be reported as a fill rather than a
spinner, as long as the fill never claims to finish. Send it toward a parked
fraction on one long eased transition, then drive it to full in a fraction of
that time when the response lands. The ease does the guessing: nothing polls and
no timeline is authored. Park at 80–90% — far enough to read as progress, short
enough that arriving early is impossible. Approach over 500–800ms, close in
120–200ms.

```css
.fill { transform: scaleX(0); transform-origin: left }
[data-phase=pending] .fill { transition: transform .6s var(--ease); transform: scaleX(.85) }
[data-phase=done]    .fill { transition: transform .15s var(--ease); transform: scaleX(1) }
```
⚠ A failure has to retract it, not freeze it — a bar parked at 85% forever
reads as hung rather than failed. It reports nothing aloud, so the outcome still
belongs in a live region, and `prefers-reduced-motion` wants the fill swapped
for a static pending state, not removed.
