---
id: non-converging-decorative-meter
category: motion-system
tags: [motion,mock,meter,progress,accessibility]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A meter animated inside a product mock gets read as data. Fill it to 100% and
the reader goes looking for the finished thing; leave it frozen and the
screenshot reads as dead. Oscillate it inside a mid band instead — 35–80% is
visibly alive and never near enough to either end to claim a state.

```css
.meter { animation: drift 4s ease-in-out infinite alternate }   /* 3–6s */
@keyframes drift { from { inline-size: 40% } to { inline-size: 75% } }
```
⚠ Without `alternate` the first and last frames must be identical or the bar
snaps back at every wrap. It reports nothing: keep it `aria-hidden`, never
`role="progressbar"`, and stop it under `prefers-reduced-motion`.
