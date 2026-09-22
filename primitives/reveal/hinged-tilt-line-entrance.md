---
id: hinged-tilt-line-entrance
category: reveal
tags: [reveal,entrance,3d,type,blur,motion]
axes: {energy: 3, density: 1, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A short line — status, title, placeholder — that slides up flat reads as a
toast. Hinge it: start low, tilted back about X under close perspective and
lightly blurred, with opacity finishing at 60–70% of the run while the tilt
settles. Offset 8–14px, tilt −30 to −50deg, blur 1–4px, 0.3–0.5s strong
ease-out.

```css
@keyframes tilt-in { 0% { opacity: 0; filter: blur(3px);
    transform: perspective(600px) translateY(12px) rotateX(-35deg) }
  65% { opacity: 1 } to { transform: perspective(600px) translateY(0) rotateX(0) } }
.line { display: inline-block; animation: tilt-in .45s cubic-bezier(.22,1,.36,1) both }
```
⚠ Blur repaints every frame — single lines only. Reduced motion: opacity only.
