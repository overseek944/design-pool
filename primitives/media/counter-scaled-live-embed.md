---
id: counter-scaled-live-embed
category: media
tags: [media,iframe,embed,responsive,architecture]
axes: none
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An embed's CSS width is a separate decision from the size of the box it
occupies. Declare the width you want its own layout to answer, set that on the
frame, and cancel the difference with a transform so it still fills the box at
any size. A miniature then shows the real page rather than a screenshot of it,
and enlarging the frame later costs an inverse rather than a reflow. Logical
width 1200–1440.

```js
const r = box.clientWidth / logicalW        // box scales, content does not
f.style.width     = logicalW + 'px'
f.style.height    = box.clientHeight / r + 'px'
f.style.transform = `scale(${r})`           /* transform-origin: 0 0 */
```
⚠ Its media queries answer the logical width, not the box — choose that
breakpoint deliberately, and never let a scaled frame be the only copy of the
text (WCAG 1.4.4). `load` fires before the child paints; re-measure on a
`ResizeObserver` and gate readiness on a bounded poll for known content.
