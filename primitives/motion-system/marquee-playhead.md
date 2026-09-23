---
id: marquee-playhead
category: motion-system
tags: [marquee,motion,state,observer,rhythm]
axes: {energy: 3, density: 3, weight: 2, finish: 5}
cost: 3
seen: 2
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

Variant — the marker as a seam between two renderings. Stack two copies of the
track, driven by one shared animation, and clip each to one side of the fixed
line with `clip-path: inset()`. Items look one way before the line and another
after it — muted then resolved, flagged then passing — so a process reads as
something the track goes *through*. Seam at 40–60%; mark it with a 1px rule or
a small disc.
```css
.before { clip-path: inset(0 calc(100% - var(--seam)) 0 0) }
.after  { clip-path: inset(0 0 0 var(--seam)) }
```
⚠ `aria-hidden` one copy — otherwise every item is announced twice.
