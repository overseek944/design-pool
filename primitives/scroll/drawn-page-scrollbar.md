---
id: drawn-page-scrollbar
category: scroll
tags: [scrollbar, accessibility, custom-element, chrome]
axes: {energy: 1, density: 1, weight: 1, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A native scrollbar cannot be restyled to a hairline in every engine. Hide it
and draw one: a thumb translated by scroll ratio, sized by viewport over
document height, with drag via pointer capture, track clicks paging, and arrow,
Page and Home/End keys. Report `aria-valuenow` so it is a real control. Hand
back to the native bar under forced colours, pinch zoom and narrow screens.
Thumb 2–6px wide; key step 40–80px.

```js
const off = matchMedia('(forced-colors: active)').matches || visualViewport.scale !== 1
off ? delete root.dataset.scrollbar : root.dataset.scrollbar = 'custom'
thumb.style.transform = `translateY(${scrollY / maxScroll * travel}px)`
```
⚠ Hiding the native bar before the script runs strands readers without one —
scope `scrollbar-width: none` to the attribute the script sets.
