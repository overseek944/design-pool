---
id: breakpoint-scoped-body-reparent
category: layout
tags: [correctness,fixed,containing-block,navigation,drawer,responsive]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A drawer or scrim declared `position: fixed` inside a transformed, filtered or
blurred wrapper pins to that wrapper, not the viewport. When the wrapper's effect
is only needed on wide screens, move the overlay to `<body>` below the
breakpoint and put it back on widen. Record the parent and next sibling before
moving, so the restore is exact and the desktop DOM is untouched.

```js
if (mq.matches && nav.parentNode !== document.body) {
  home = { parent: nav.parentNode, next: nav.nextSibling }; document.body.append(nav)
} else if (!mq.matches && home) home.parent.insertBefore(nav, home.next)
```
⚠ Moving it changes tab order and drops styles scoped to the old ancestor.
Move trigger and panel together, and re-run on the query's `change` event.
