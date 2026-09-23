---
id: descending-stamp-entrance
category: motion-system
tags: [motion,entrance,keyframes,scale,rotate,badge,verdict]
axes: {energy: 3, density: 1, weight: 4, finish: 3}
cost: 1
seen: 2
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
A mark that rises into place was placed; one that arrives *oversized and
turned* and settles down to size was applied — pressed onto the surface from
above, like a stamp. It reads as a verdict (approved, flagged, matched) landing
on the item beneath. No overshoot: the settle is a single decelerating move.
Start scale 1.25–1.5, rotation −4 to −10deg, 0.25–0.45s strong ease-out.

```css
.verdict { animation: stamp .35s cubic-bezier(.2,.7,.2,1) both }
@keyframes stamp { from { opacity: 0; transform: scale(1.4) rotate(-6deg) } }
```
⚠ Oversized start frame overflows its slot — clip-free parents only. Under
reduced motion, fade only.

In a dense grid where the verdict *is* the cell — a matched slot, a hit in a
tally — drop the rotation and push the start further: 1.6–1.9 scale collapsing
over 0.3–0.4s reads as the mark slamming into its seat, and a brief 8–12px glow
in the fill hue holds the landing for a beat after it settles.
```css
.cell.hit { animation: land .35s cubic-bezier(.22,1,.36,1);
            box-shadow: 0 0 0 1px var(--ink-40), 0 0 10px var(--accent-80) }
@keyframes land { from { transform: scale(1.8) } }
```
⚠ At this scale the start frame covers its neighbours — keep the cell above
them in `z-index` only for the animation's duration.
