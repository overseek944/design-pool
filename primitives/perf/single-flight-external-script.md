---
id: single-flight-external-script
category: perf
tags: [performance,architecture,correctness,lifecycle,embed]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Several components on a page may each need the same third-party script, and each
one injecting it loads it two or three times. Hold the load in module scope, not
component state: one promise created on first demand, resolved by the vendor's
global ready callback, awaited by every later caller. The global deletes itself
once resolved so nothing leaks between navigations.

```js
let p                                        // module scope, survives remounts
export const load = (src, cb = 'onVendorReady') => p ??= new Promise(res => {
  window[cb] = () => { delete window[cb]; res() }
  document.head.append(Object.assign(document.createElement('script'),
    { src, async: true, id: 'vendor-sdk' }))
})
```
⚠ Never reject and clear the promise on error without a backoff — remounting
consumers will then retry the failed load on every render.

Module scope is the wrong holder when the DOM outlives the module — a soft
navigation, a second island, a late-hydrating bundle. The tag is already in the
head and a fresh promise starts a second fetch anyway. Dedupe against the
document instead, and mark the tag itself once it fires so a later caller can
tell *loaded* from *in flight*.
```js
const s = [...document.scripts].find(x => x.src === src)
if (s) return s.dataset.ready ? Promise.resolve()
                              : new Promise(r => s.addEventListener('load', r))
```
