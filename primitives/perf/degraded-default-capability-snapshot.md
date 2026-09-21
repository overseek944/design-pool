---
id: degraded-default-capability-snapshot
category: perf
tags: [perf,progressive-enhancement,hydration,cls,reduced-motion,architecture]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A capability query has no answer before the first paint — no window on the
server, nothing matched yet during hydration — and something is assumed
regardless. Take the degraded branch: reduced motion true, wide-enough false,
can-pin false. The static version is then what ships in the markup and
what paints first, and enhancement only ever adds. Assume the enhanced branch
instead and the page paints a runway it immediately collapses — a hydration
mismatch and a layout shift in one frame, on the devices least able to absorb it.
```js
const wide    = useSyncExternalStore(sub, () => mq.matches, () => false)
const reduced = useSyncExternalStore(sub, () => rm.matches, () => true)
```
⚠ The two snapshots point opposite ways — `false` for a capability, `true` for
a reduction — and one written backwards is invisible on a fast desktop.
