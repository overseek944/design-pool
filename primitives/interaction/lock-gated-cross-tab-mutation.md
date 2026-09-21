---
id: lock-gated-cross-tab-mutation
category: interaction
tags: [state,correctness,concurrency,architecture,async]
axes: none
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Some mutations must not run twice at once across a user's open tabs — switching
the account a cached session belongs to, migrating a local store. Web Locks give
a real reader-writer gate: every tab holds the read lock `shared` while idle,
the mutating tab takes it `exclusive`, and acquisition itself is the signal for
the others to show a blocked state. Probe with `ifAvailable` for the fast path
and pass an `AbortSignal` on the waiting one so a dead tab cannot hang the rest.
10–20s timeout.

```js
const st = useSyncExternalStore(sub, () => phase)          // 'ready' | 'pending'
await navigator.locks.request('mutate', { ifAvailable: true }, async held => {
  if (!held) return setPhase('blocked')
  await navigator.locks.request('read', { mode: 'exclusive', signal }, drain) })
```
⚠ Locks are per-origin and die with the tab, so they coordinate but never
persist a decision — the server still needs its own guard. Absent in some
private modes: feature-detect and fall back to running unguarded, not to
blocking the only tab there is.
