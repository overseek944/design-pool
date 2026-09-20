---
id: marquee-playhead
category: motion-system
tags: [marquee,motion,state,observer,rhythm]
axes: {energy: 3, density: 3, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Give a moving track one stationary reading position. A marker sits at a fixed
fraction of the port; whatever item crosses it takes an active ground and drives
a detail panel outside the track. The marquee becomes an index rather than
wallpaper. Two lanes want different fractions, so the eye reads one.

```css
.port { position: relative; overflow: clip }
.head { position: absolute; inset-block: 0; left: 27%; width: 1px }  /* .2–.7 */
.item[data-active] { background: var(--rest); transition: background .35s }
```
⚠ The active item changes with no user input, so the linked panel must not be a
live region — it would narrate forever. Mark it `aria-hidden` and ship the same
content as a static list.
