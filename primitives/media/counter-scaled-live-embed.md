---
id: counter-scaled-live-embed
category: media
tags: [media,iframe,embed,responsive,architecture]
axes: none
cost: 3
seen: 3
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

Some embeds take a width *parameter* instead of answering CSS, and counter-
scaling is then the wrong tool: measure the host, floor the number, and hand it
over at construction. The floor is load-bearing — below roughly 200–260px most
vendor players decline to render at all and you get an empty box with no error.
Changing the number means rebuilding the embed, so either fix one width per
breakpoint or debounce hard; a width that tracks a drag restarts the video every
frame.
```js
node.dataset.width = String(Math.max(220, Math.round(host.getBoundingClientRect().width)))
```
⚠ Measure the host, never the viewport — inside a grid the two diverge at exactly
the widths where the floor starts to bite.
