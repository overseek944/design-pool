---
id: distance-cued-focus-wheel
category: motion-system
tags: [list,rotation,blur,depth,mask,custom-property]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A rotating list that only fades its neighbours reads flat. Stack the items on
one line, give each its signed distance from the focus, and derive offset,
scale, opacity *and* blur from it — neighbours recede on four cues at
once and the set turns like a wheel past a reading line. Wrap the distance
the short way round: no seam.

```css
.item { transform: translateY(calc(-50% + var(--d) * var(--step))) scale(var(--s,1));
        opacity: var(--o,1); filter: blur(var(--b,0px)) }
.item.d1 { --s:.93; --o:.42; --b:.5px }   /* d2: .86 / .13 / 1.1px */
```
⚠ Blur is no hierarchy a screen reader sees — keep source order, no live region.
Mask the band's ends or the wheel stops on hard edges.
