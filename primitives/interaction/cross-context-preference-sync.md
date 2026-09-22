---
id: cross-context-preference-sync
category: interaction
tags: [theme,preferences,storage,correctness,accessibility]
axes: none
cost: 1
seen: 5
requires: []
conflicts: []
completes: [override-released-system-preference]
tension: []
---
A stored preference is a fact about the reader, not about one tab: flip the
theme in one and every other window keeps the old one until reloaded. The
`storage` event fires in the document's *other* contexts, so one listener that
re-runs the same resolve step keeps them all honest — and a null `key` means
the whole store was cleared, which has to fall back to the system value rather
than be ignored. Write `color-scheme` at the same time so form controls,
scrollbars and the canvas the UA paints before first paint follow too.

```js
addEventListener('storage', e => { if (e.key === KEY || e.key === null) apply() })
const apply = () => { const d = resolve()
  root.classList.toggle('dark', d); root.style.colorScheme = d ? 'dark' : 'light' }
```
⚠ It does not fire in the tab that wrote the value — apply locally on write as
well, or the originating tab is the one left stale.

`storage` only fires for `localStorage`, so a preference kept anywhere else —
a cookie the server also reads, IndexedDB, a session on the API — changes in one
tab and the others never hear. `BroadcastChannel` is the mechanism there: post
the resolved decision on write, apply it on receipt, and close the channel on
teardown. It carries a structured message rather than a key diff, so the
receiver does not have to re-read the store to learn what happened.
```js
const ch = new BroadcastChannel('prefs')          // in try: throws in some modes
ch.onmessage = e => apply(e.data)
const write = v => { persist(v); apply(v); ch.postMessage(v) }
```
⚠ Same blind spot as `storage` — it does not deliver to the posting context, so
`apply` locally too. Where a revoked permission has already been acted on for
this pageload, a reload is the only honest response to the message.
