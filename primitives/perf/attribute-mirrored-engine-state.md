---
id: attribute-mirrored-engine-state
category: perf
tags: [perf,debug,instrumentation,testing,architecture,state]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An engine that fetches, decodes and caches is invisible the moment it works, and
every later question about it — is the cache thrashing, what size did it settle
on, is it waiting on the network — costs a rebuild to answer. Mirror its state
onto the host element as `data-*` instead: entries held, bytes decoded, requests
in flight, current position against target. The inspector becomes the debugger
and an end-to-end test can wait on readiness without a global hook, for one
attribute write per change.
```js
const report = () => Object.assign(host.dataset,
  { frame: i, target: t, cached: cache.size, inflight: pending.size })
```
⚠ Write on change, never per frame — each assignment invalidates style. Nothing
here may be read back: a path that branches on its own mirror turns a devtools
edit into a bug report.
