---
id: symmetry-stepped-lurch-spin
category: timing
tags: [spinner, loader, rotation, rhythm, indicator, brand-mark]
axes: {energy: 3, density: 1, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A mark spun at constant speed reads as a free-wheeling cog. Turn it in lurches
of 360°/k, where k divides its rotational symmetry, with each lurch overshooting
5–10° into a brief hold and a 2–5% scale swell: it reads as effort in beats and
every rest looks identical. k 3–4, period 1.5–2.4s, holds ~10% of the cycle.

```css
@keyframes lurch { 0%{rotate:0;scale:1} 18%{rotate:120deg;scale:1.04}
  28%{rotate:130deg;scale:1.02} 48%{rotate:250deg;scale:1.05}
  58%{rotate:260deg;scale:1.02} 78%,to{rotate:360deg;scale:1} }
.mark { animation: lurch 1.85s cubic-bezier(.4,0,.2,1) infinite }
```
⚠ Asymmetric marks show every hold as a different pose, which reads as jitter.
Needs a reduced-motion branch and a text status beside it.
