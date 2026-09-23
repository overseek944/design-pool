---
id: counter-phased-lamp-pair
category: light
tags: [glow, drift, halo, ambient, keyframes, lamp]
axes: {energy: 2, density: 2, weight: 3, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
One drifting lamp behind a mark pulls the glow off-centre every cycle. Stack two
blurred lamps of different hue on one box and period, running mirrored
keyframes: one arrives where the other leaves. The combined halo stays seated
on the mark while the hue balance swings across it. Period 6–12s, travel ±8–20%, scale 0.9–1.15, blur 60–100px,
alpha 15–30%.

```css
.lamp-a { animation: pair 8s ease-in-out infinite }
.lamp-b { animation: pair 8s ease-in-out infinite reverse }
@keyframes pair { 0%, to { transform: translate(-15%, -10%) scale(1) }
                  50% { transform: translate(15%, 10%) scale(1.15) } }
```
⚠ Two large blurred layers composite every frame — pause offscreen and set
`animation: none` under reduced motion.
