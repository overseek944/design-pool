---
id: state-preserving-frame-relocation
category: media
tags: [media,iframe,embed,lifecycle,dom,correctness]
axes: none
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: [dialog-scoped-embed-lifecycle]
---
`appendChild` removes and reinserts: an iframe reloads, a video restarts, a
canvas drops its context. `moveBefore` relocates without unloading, so one live
embed can follow a reader from a grid tile into a full player instead of being
rebuilt there. Keep a single instance, park it in a 1px hidden host between
owners, and let each owner claim it. Park timeout 0.4–1.5s.

```js
const ok = Element.prototype.moveBefore && host.isConnected && f.isConnected
if (ok) host.moveBefore(f, null)   // survives; else rebuild
```
⚠ Feature-detect — without a fallback path the embed silently never appears.
Defer teardown by a microtask and key it to a claim counter, or the departing
owner destroys the frame the arriving one just took.
