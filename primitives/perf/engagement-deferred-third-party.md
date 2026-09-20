---
id: engagement-deferred-third-party
category: perf
tags: [performance,third-party,analytics,loading,idle,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A tag that only observes engaged sessions should not compete with first paint.
Arm it on the first real signal of engagement — one `once` listener each on
`pointerdown`, `keydown` and `scroll` — with `requestIdleCallback` carrying a
timeout as the floor, so a session that never interacts still reports. Whichever
fires first wins; it unhooks the others and dynamically imports the vendor
bundle, which keeps it out of the entry chunk entirely. Idle timeout 1.5–3s.

```js
const arm = () => { if (started) return; started = true
  EV.forEach(e => removeEventListener(e, arm)); cancelIdleCallback(id)
  import('./vendor').then(m => m.default.init(KEY)) }
EV.forEach(e => addEventListener(e, arm, { once: true, passive: true }))
const id = requestIdleCallback?.(arm, { timeout: 2500 }) ?? setTimeout(arm, 1800)
```
⚠ Guard the whole thing on hostname so preview and local builds never report.
`requestIdleCallback` is absent in Safari — the `setTimeout` fallback is the
path most readers take, not an edge case.
