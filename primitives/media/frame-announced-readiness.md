---
id: frame-announced-readiness
category: media
tags: [media,iframe,embed,loading,progressive-enhancement,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: [unowned-frame-message-guard]
tension: []
---
An iframe's `load` fires when its document parses, not when the application
inside has painted, so revealing on `load` shows a half-built shell. Let the
child announce itself: hold the frame at `opacity: 0` over a real placeholder
and reveal it only on a ready message from that frame. Keep `src` in a data
attribute and assign it from script, so the request costs nothing without JS
and a `<noscript>` rule can turn the overlay into ordinary static content
instead of a spinner pinned over a blank box. Fade 150–300ms.

```js
const ready = e => { if (e.source !== f.contentWindow || e.origin !== o) return
  f.dataset.loaded = ''; ph.hidden = true; removeEventListener('message', ready) }
addEventListener('message', ready); f.src = f.dataset.src
```
⚠ Nothing arrives if the child never posts — a stale deploy leaves the
placeholder forever. Reveal on a timeout as well, and give the slot a fixed
height so neither state shifts the page.
