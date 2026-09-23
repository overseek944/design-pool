---
id: reciprocating-sector-sweep
category: motion-system
tags: [sweep,wedge,rotate,loop,alternate,search,keyframes,ambient]
axes: {energy: 2, density: 2, weight: 3, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
A beam spinning 360° says "monitoring"; one swinging across a half-arc says
"searching". Pivot a wedge from its base, rotate between two bounds with
`alternate` and ease-in-out so it dwells at each edge like a reversing scanner,
and dip opacity through mid-arc so the ends read as the attentive points. Arc ±60–90°,
period 3–6s, mid-arc opacity 0.4–0.6.

```css
@keyframes swing { 0% { rotate: -90deg; opacity: .9 } 50% { opacity: .45 }
                   100% { rotate: 90deg; opacity: .9 } }
.beam { transform-origin: bottom; animation: swing 4s ease-in-out infinite alternate }
```
⚠ Reduced motion: park it at one bound, not at 0° — centred reads as a static fan.
