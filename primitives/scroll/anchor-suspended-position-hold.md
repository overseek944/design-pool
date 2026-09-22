---
id: anchor-suspended-position-hold
category: scroll
tags: [scroll,correctness,layout-shift,restore,forms]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Replacing a block in place — a form step, a filtered list — moves everything
below it, and the browser's own scroll anchoring reacts to that height change
on the frame you are writing the scroll position back. Both correct, and the
page lands where neither chose. Set `overflow-anchor: none` on the scrolling
element for the length of the swap, re-apply the captured position across a few
frames while late content settles, then put anchoring back. Hold 0.6–1.5s past
the swap.

```js
const y = scrollY, prev = de.style.overflowAnchor
de.style.overflowAnchor = 'none'
const put = () => scrollTo(0, y)
requestAnimationFrame(() => { put(); requestAnimationFrame(put) })
setTimeout(() => { put(); de.style.overflowAnchor = prev }, 900)
```
⚠ The hold outlives the reader — bind a `once` wheel/touch/key listener that
abandons it, or someone who scrolled on is yanked back. Never leave anchoring
off afterwards; the shift it prevents elsewhere is larger than this one.
