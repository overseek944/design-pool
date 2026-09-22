---
id: circling-offset-shadow
category: surface
tags: [shadow,ambient,loop,light,card,elevation]
axes: {energy: 2, density: 2, weight: 3, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
A still card reads as lit by a slowly circling lamp when its shadow's offset
travels a loop — centred, down-right, down-left, back — while the card stays
put. Offsets 4–10px under a 15–30px blur, period 5–10s; faster reads as the card
wobbling. A slight hue shift between stops tints the light.

```css
.card { position: relative; isolation: isolate }
.card::after { content: ""; position: absolute; inset: 0; z-index: -1;
  border-radius: inherit; box-shadow: 0 6px 24px var(--cast);
  animation: circle 7s ease-in-out infinite }
@keyframes circle { 25% { translate: 5px 5px } 75% { translate: -5px 5px } }
```
⚠ Animating `box-shadow` itself repaints every frame; translate a shadowed
pseudo-element instead. Under `reduce`, hold the centred pose.
