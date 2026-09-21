---
id: boot-drained-call-queue
category: perf
tags: [architecture,third-party,progressive-enhancement,events,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A `defer`red script cannot be called while the page is still parsing, so every
caller either awaits it or feature-tests it forever. Publish a plain array as
the contract instead: callers push and move on, and the module — whenever it
lands — drains the backlog through the *same* validated entry point a live call
takes, then replaces the array with the real API. The UI never branches on
whether the script arrived, and nothing between first paint and boot is lost.

```js
if (window.api) return                        // second copy: do nothing
const early = window.q || []; window.q = []   // claim the backlog first
window.api = { track }                        // later callers go straight in
early.forEach(a => Array.isArray(a) && track(a[0], a[1]))   // same validator
```
⚠ Cap the array at 20–50 entries, or a page whose script never arrives grows it
unbounded. Queued calls carry the state of their push, not of the drain.
