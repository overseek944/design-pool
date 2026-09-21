---
id: sibling-deferred-block-spacing
category: layout
tags: [layout,has,spacing,rhythm,css-only,correctness,architecture]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A markdown or CMS renderer emits a figure and its caption as flat siblings, so
the figure's trailing margin lands between them and the pair reads as two
blocks, with no wrapper to add. Let the first element ask whether the second is
there and hand its bottom margin over — spacing is authored once, on whatever
ends the group.

```css
figure { margin-block-end: var(--gap) }             /* 3–7rem */
figure:has(+ p > .cap:only-child) { margin-block-end: 0 }
figure + p:has(> .cap:only-child) { margin-block: 0 var(--gap) }
```
⚠ `:only-child` is load-bearing: without it any paragraph opening with the same
span steals the gap. Zero the follower's top margin in the same rule or
the prose reset reopens it.
