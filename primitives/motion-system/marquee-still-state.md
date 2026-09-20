---
id: marquee-still-state
category: motion-system
tags: [motion,accessibility,marquee,correctness,overflow]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A marquee's reduced-motion state is not a paused marquee. The track carries its
content twice so the loop can wrap seamlessly, and the copy is hidden only by
being in motion — stop the animation and the list is simply there, read out
twice, half of it clipped. The still state is a different layout: drop the
duplicate, release the single-line width, let the items wrap, and remove the
edge mask that now fades real content.
```css
@media (prefers-reduced-motion: reduce) {
  .track { animation: none; width: auto; flex-wrap: wrap; gap: 20px }
  .track [aria-hidden] { display: none }
  .marquee { mask-image: none }
}
```
⚠ Pause-on-hover is not a substitute: it needs a pointer and never fires.
