---
id: rejection-shake-field
category: interaction
tags: [interaction,form,input,feedback,validation,keyframes,error]
axes: {energy: 3, density: 1, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A refused entry can answer the way a head shakes: a short horizontal
oscillation on the field, decaying across the run, so the rejection is felt
at the point of input rather than read from a message elsewhere. Horizontal
only — vertical reads as a bounce. Peak 3–6px, halving each swing, 300–450ms.

```css
@keyframes refuse { 20% { translate: -4px } 40% { translate: 4px }
                    60% { translate: -2px } 80% { translate: 2px } }
[aria-invalid="true"].just-failed { animation: refuse .35s ease-out }
```
⚠ Motion is never the error signal — pair `aria-invalid` and a live message.
Drop it under `prefers-reduced-motion`. Re-arm per attempt (remove the class on
`animationend`), or a second failure is silent.
