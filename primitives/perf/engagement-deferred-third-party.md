---
id: engagement-deferred-third-party
category: perf
tags: [performance,third-party,analytics,loading,idle,correctness]
axes: none
cost: 2
seen: 4
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

The same lever serves first-party decoration, with capability rather than
engagement as the predicate. An ambient effect that is wrong on a phone, wrong
under `reduce`, and wrong on half the routes should not merely render nothing
there — it should never be fetched. Resolve pointer class, motion preference and
route into one boolean *above* the dynamic import, and the readers who would
not have seen it pay nothing at all. Hiding it with a media query still costs
every byte.
```js
const ok = matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine)').matches
         && !reducedMotion && EFFECT_ROUTES.has(pathname)
const Effect = ok ? lazy(() => import('./ambient')) : null
```
⚠ Evaluate the gate after mount, not during render, or the server and the
client disagree and the markup is thrown away. Subscribe to the query's
`change` so a window dragged to a large display can still arm it.
