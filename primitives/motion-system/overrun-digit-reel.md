---
id: overrun-digit-reel
category: motion-system
tags: [motion,counter,number,figure,reveal,accessibility]
axes: {energy: 3, density: 2, weight: 3, finish: 4}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A figure can arrive rolling like a mechanical counter instead of counting up. Each digit place is a clipped window over a vertical numeral strip that runs one to two laps past zero before its target, so every place spins. The strip's resting transform is the target, so no animation still shows the right number. Stagger places 60–150ms; roll 1.5–3.5s on a hard ease-out.

```css
.win { display: inline-block; height: 1lh; overflow: hidden }
.strip { display: flex; flex-direction: column; transform: translateY(var(--end)) }
.go .strip { animation: roll 2.4s cubic-bezier(0,.75,.15,1) var(--delay) both }
@keyframes roll { from { transform: none } }
```
⚠ Screen readers read every numeral: hide the reel and carry the value in visually-hidden text.
