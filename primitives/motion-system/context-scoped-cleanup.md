---
id: context-scoped-cleanup
category: motion-system
tags: [motion,lifecycle,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Create every animation inside a scoped context and revert it on unmount.
Without this, scroll triggers survive navigation and silently accumulate —
the most common cause of "the site gets slower the longer you browse".
```js
const ctx = gsap.context(() => { /* animations */ }, rootRef)
return () => ctx.revert()
```
