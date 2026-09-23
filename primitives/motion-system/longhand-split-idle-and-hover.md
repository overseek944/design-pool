---
id: longhand-split-idle-and-hover
category: motion-system
tags: [correctness, hover, idle, loop, transform, cascade]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A running animation outranks every normal declaration, so an idle loop on
`transform` silently cancels a hover or press that also writes `transform` —
the control stops answering the pointer. Put the loop and the interaction on
different properties: `translate`, `rotate` and `scale` are independent
longhands applied before `transform`, so they compose instead of competing.
Idle amplitude 1.5–3%, hover 3–6%, press 0.94–0.97.

```css
.cta { animation: breathe 4s ease-in-out infinite; transition: scale .2s }
@keyframes breathe { 50% { transform: scale(1.025) } }
.cta:hover { scale: 1.04 }  .cta:active { scale: .96 }
```
⚠ The two multiply — keep idle plus hover under ~8% or the peak overshoots the layout gap.
