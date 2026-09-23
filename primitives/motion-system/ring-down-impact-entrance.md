---
id: ring-down-impact-entrance
category: motion-system
tags: [motion,entrance,keyframes,impact,choreography]
axes: {energy: 4, density: 1, weight: 4, finish: 3}
cost: 1
seen: 2
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
An arrival that eases to rest says the element was placed. One that *rings down*
says something landed: overshoot the target, then cross it again at a smaller
amplitude, and again, until the residue is under a pixel. The character is
entirely in the decay ratio — each excursion 0.6–0.75 of the last, alternating
sign on both axes so it reads as recoil rather than a wobble. Earns its place
once per view, on the one block that should feel struck. Peak 4–8px over
0.9–1.4s, six to ten crossings.

```css
@keyframes ring-down {
  0%  { opacity: 0; translate: 0 12px; scale: .985 }
  6%  { opacity: 1; translate: -5px 2px }   /* 24%: 4px 3px, 48%: -2px -1px */
  78% { translate: -1px 0 }
  to  { opacity: 1; translate: 0 0; scale: 1 }
}
```
⚠ Sub-pixel tail crossings are wasted frames — end the list once an excursion
drops below 1px. Must collapse to a plain fade under `prefers-reduced-motion`;
a shortened shake is still a shake.

The same decay works on angle. A mark that spins one full turn overruns by
8–12°, returns 3–5° short, then 1–2° past before resting — and since 360° ≡ 0°
the rest frame is the start frame, so it replays on hover or load with no
seam. Fade a glow .5–.7 → 0 over the same span.
