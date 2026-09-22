---
id: reformatting-box-resize
category: motion-system
tags: [motion,keyframes,layout,mock,type,resize]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An element that changes size mid-demonstration is usually scaled, which blurs
its type and enlarges padding and hairlines with it. Where it is *reformatting*
— denser copy, a smaller icon — animate the box model instead, one keyframe
track per part on a shared duration: size and padding on the box, real
dimensions on the icon, `font-size` on the copy. Each part lands at an authored
size, not a scaled one. Shift 15–25% per dimension.
```css
@keyframes card { 0%,66% { min-block-size: 7.5rem; padding: .85rem }
                  80%,to { min-block-size: 6rem; padding: .75rem } }
```
⚠ Layout and paint every frame, uncomposited — a few small parts only, never
the page's own content.
