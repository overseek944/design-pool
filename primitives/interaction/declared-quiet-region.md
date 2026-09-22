---
id: declared-quiet-region
category: interaction
tags: [interaction,pointer,architecture,legibility,opt-out,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A pointer-driven background sits under the whole document and disturbs
whatever is above it, including the one block that had to stay still. Testing
the event target cannot help: the layer is `pointer-events: none`, so it is
never the target, and the influence radius reaches the block well before the
pointer does. Let regions declare themselves with an attribute and rect-test
the pointer against them plus a cushion. Authors opt out locally; the effect
stays ignorant of the page. Cushion 0.3–0.5 of the radius.

```js
const quiet = [...document.querySelectorAll('[data-quiet]')].map(e => e.getBoundingClientRect())
const off = quiet.some(r => x > r.left - M && x < r.right + M && y > r.top - M && y < r.bottom + M)
```
⚠ Cache the rects and refresh on resize and scroll — measuring them inside a
`mousemove` forces layout on every sample. A fixed effect needs viewport
coordinates, so scroll invalidates them even when nothing moved.
