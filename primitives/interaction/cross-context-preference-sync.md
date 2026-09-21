---
id: cross-context-preference-sync
category: interaction
tags: [theme,preferences,storage,correctness,accessibility]
axes: none
cost: 1
seen: 2
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
