---
id: context-scoped-cleanup
category: motion-system
tags: [motion,lifecycle,correctness]
axes: none
cost: 1
seen: 2
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

The context only owns what it created. Intervals, observers and scheduled
timeouts started by the same view are outside it and survive as their own leak —
collect their handles and clear them in the same teardown. Under a client-side
router the teardown hook is the pre-swap event, not unmount: it fires while the
outgoing DOM is still addressable, which is the last moment a kill can find its
targets.
