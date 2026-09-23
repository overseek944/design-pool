---
id: tint-overshoot-arrival
category: color
tags: [color,entrance,overshoot,keyframes,indicator,tint]
axes: {energy: 3, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
Overshoot need not be geometric. A mark that arrives from a muted tone can pass
*through* a lighter, warmer tint of its final colour before settling on it —
the flare says "this just became true" where a plain fade only says "visible".
Put the peak at 55–70% of a short 0.3–0.5s move, 15–30% lighter than the rest
value; land geometry at that stop so only colour still moves.

```css
@keyframes land { 0% { opacity: 0; color: var(--muted); translate: -4px }
  60% { opacity: 1; color: var(--flare); translate: 0 }
  to  { color: var(--rest) } }
```
⚠ The flare tint must still clear contrast on its ground; under
`prefers-reduced-motion` show the rest colour directly.
