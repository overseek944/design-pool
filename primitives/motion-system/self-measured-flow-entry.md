---
id: self-measured-flow-entry
category: motion-system
tags: [motion,layout,measurement,state,lifecycle,detail]
axes: {energy: 3, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---

A row inserted into a live column — a log line, a message, a queued result —
usually arrives on a transform, which slides the node over its neighbours while
the stack jumps to its new height in a single frame. Animate the *space*
instead: append the node hidden, read the height it turned out to be, set a
negative block margin of that height plus the gap, flush, and release it on the
next frame. The column opens as the row arrives and nothing had to know the
height in advance. Removal mirrors it. 0.25–0.4s.

```js
row.style.visibility = 'hidden'; feed.append(row)
row.style.marginBlockStart = `-${row.offsetHeight + gap}px`
row.style.visibility = ''; void row.offsetHeight     // flush the from-value
requestAnimationFrame(() => requestAnimationFrame(() =>
  { row.style.marginBlockStart = ''; row.classList.add('in') }))
```
⚠ Margin is a layout property: every frame relayouts the column and everything
below it, so this belongs in a bounded box, never down a document. Under
reduced motion append settled and skip the whole path.
