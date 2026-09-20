---
id: context-scoped-cleanup
category: motion-system
tags: [motion,lifecycle,correctness]
axes: none
cost: 1
seen: 3
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

Without a library context, one `AbortController` per component is the whole
mechanism: pass its `signal` to every `addEventListener`, and a single `abort()`
on the router's pre-swap event unbinds listeners, observers and the frame loop
together — nothing to enumerate and nothing to forget. Hang the undo on the
signal too, so state the component wrote outside itself comes back with it.
```js
const c = new AbortController(), { signal } = c
addEventListener('scroll', onScroll, { passive: true, signal })
signal.addEventListener('abort', () => header.classList.remove('over-hero'))
document.addEventListener('astro:before-swap', () => c.abort(), { once: true })
```
⚠ An init that runs both at module evaluation *and* on every route event binds
twice on the first page. Guard with a dataset flag on the element it owns.
