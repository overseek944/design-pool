---
id: counter-drifting-echo-glyph
category: motion-system
tags: [motion,icon,loop,trail,idle]
axes: {energy: 3, density: 1, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A directional glyph idling on a small nudge reads as twitching. Stack a faint
copy that drifts the *opposite* way on the same period, fading in and out as
the glyph moves forward: the opening gap reads as speed, with no blur or path
history. Nudge 2–4px; echo 6–10px back at peak opacity .4–.7; period 2.2–3s.

```css
.glyph { animation: nudge 2.6s cubic-bezier(.33,1,.68,1) infinite }
.echo  { position: absolute; animation: drift 2.6s cubic-bezier(.33,1,.68,1) infinite }
@keyframes drift { 0%, to { opacity: 0; translate: 0 } 25% { opacity: .6; translate: -3px }
                   60% { opacity: 0; translate: -8px } }
```
⚠ Echo is `aria-hidden`; drop it under reduced motion — a static copy reads as a fault.
