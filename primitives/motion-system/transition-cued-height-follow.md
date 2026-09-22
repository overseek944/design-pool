---
id: transition-cued-height-follow
category: motion-system
tags: [correctness,measurement,transition,resize,layout,motion]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Inline content that changes width re-wraps its copy and the block's height
jumps a line — the target does not exist until after that reflow. Cue off the cause: on the descendant's `transitionstart`, filtered by
`propertyName`, pin the measured height, let a `ResizeObserver` report the new
one mid-transition, animate between them and clear the inline height on finish.
250–400ms.

```js
content.addEventListener('transitionstart', e => { if (e.propertyName !== 'width') return
  from = box.getBoundingClientRect().height; box.style.height = from + 'px' })
new ResizeObserver(() => run(from, from = content.offsetHeight)).observe(content)
```
⚠ Release to `auto` on finish or the block freezes at one pixel height, deaf
to resize, zoom and font swaps. `transitionstart` bubbles and fires per
property — filter it.
