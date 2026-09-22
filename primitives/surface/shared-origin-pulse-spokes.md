---
id: shared-origin-pulse-spokes
category: surface
tags: [surface,decoration,hairline,radial,loop,custom-properties]
axes: {energy: 3, density: 2, weight: 1, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Hairline spokes from one origin read as a diagram; a bright head running out
along each reads as emission. Angle and length are custom properties; each
`::after` head travels on its own delay. 6–20 spokes, head 12–25% of length,
period 3–6s, delays scattered.

```css
.spoke { position: absolute; left: var(--ox); top: var(--oy); width: var(--len);
  height: 1px; background: currentColor; transform-origin: left; rotate: var(--angle) }
.spoke::after { content: ""; position: absolute; inset-block: -1px; width: 18%;
  background: linear-gradient(90deg, #0000, currentColor);
  animation: emit 4s linear var(--delay) infinite }
@keyframes emit { 0% { opacity: 0 } 12%,72% { opacity: 1 } 88%,to { opacity: 0; translate: 450% } }
```
⚠ Travel on `translate`, not `left`, which relayouts. Drop heads under reduce.
