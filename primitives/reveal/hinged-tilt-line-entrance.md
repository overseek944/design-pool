---
id: hinged-tilt-line-entrance
category: reveal
tags: [reveal,entrance,3d,type,blur,motion]
axes: {energy: 3, density: 1, weight: 2, finish: 5}
cost: 1
seen: 3
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

Drop the hinge and the same arrival scales up to a display block: no tilt, a
longer rise and a heavier blur that clears as it lands, so a hero line comes into
focus rather than sliding into place. Offset 16–32px, blur 6–12px, 0.7–1s on the
same strong ease-out; the size of the type is what pays for the longer run.
```css
@keyframes focus-rise { from { opacity: 0; filter: blur(8px); transform: translateY(24px) } }
.display { animation: focus-rise .9s cubic-bezier(.22,1,.36,1) both }
```
⚠ A filled `blur(0)` end state is still a filter: the block keeps a stacking
context and traps fixed descendants. Let the base style own the rest state.
