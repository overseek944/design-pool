---
id: pre-hydration-nested-link
category: interaction
tags: [accessibility,links,hydration,progressive-enhancement,correctness]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A card that navigates but contains its own link cannot be an anchor — the
parser unnests `<a>` inside `<a>` — so it ships as a div with a script handler,
dead from first paint until the bundle hydrates. Close that window with a
delegated inline handler that navigates by building a detached anchor, clicking
it and dropping it: `target`, `rel` and modifier-click semantics then come from
the platform. Bind `click`, `auxclick` and Enter, and let each handler retire
once the real component marks the node hydrated.

```js
const nav = (href, rel = '', target = '') => {
  const a = Object.assign(document.createElement('a'), { href, rel, target })
  document.body.append(a); a.click(); a.remove() }
function onClick(e) {
  if (this.dataset.hydrated) return this.removeEventListener('click', onClick)
  e.preventDefault(); e.stopPropagation(); nav(this.dataset.href, this.dataset.rel) }
```
⚠ The region needs `tabindex="0"` and `role="link"` or the shim is mouse-only.
Keep the script inline and classic — a module defers, landing after the bundle
it exists to beat.
