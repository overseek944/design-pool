---
id: click-held-leave-dim
category: motion-system
tags: [navigation,page-transition,mpa,bfcache,progressive-enhancement]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---

A multi-page site can acknowledge a click before the next document exists, with
no view-transition API. Intercept same-origin link clicks in the capture phase,
flag the root, dim the body, navigate once the dim lands. Dim to .85–.92 over
60–120ms; the arriving body fades in over 150–250ms.

```js
addEventListener('click', e => { const a = e.target.closest?.('a')
  if (!a || e.button || e.metaKey || e.ctrlKey || e.shiftKey || a.target) return
  const u = new URL(a.href, location); if (u.origin !== location.origin) return
  e.preventDefault(); root.dataset.leaving = ''; setTimeout(() => location.assign(u), 90) }, true)
addEventListener('pageshow', () => delete root.dataset.leaving)
```
⚠ The delay is added latency — lag past ~120ms. Without the `pageshow` reset, Back restores a dimmed page. Skip under reduced motion.
