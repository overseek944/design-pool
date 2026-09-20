---
id: stride-pruned-decorative-field
category: perf
tags: [perf,responsive,decoration,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A decorative field — dots, marks, ticks, labels — that costs too much on a
small screen is usually cut with a slice, which deletes one contiguous region
and leaves the survivors bunched wherever the generator happened to start. Drop
by stride instead: hide every kth index, and the field holds its spread at half
the node count, so the composition thins rather than collapsing to one corner.
Decide the stride from the element's own width, not the viewport, and hide with
`display: none` so the spare nodes cost no layout.

```js
const stride = w < 520 ? 2 : 1                   // 2–4
el.style.display = i % stride ? 'none' : 'block'
```
⚠ Only for sets with no reading order — pruning a list by index deletes content.
Hold the elements and toggle them rather than rebuilding the set, or the field
reshuffles every time a breakpoint is crossed.
