---
id: unowned-frame-message-guard
category: media
tags: [media,iframe,embed,security,correctness,events]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A widget script injects its own iframe, so the page holds no `contentWindow` to
compare against — and an origin check is not a source check: any tab on that
origin can post here and pass it. Bind the message to a frame this document
actually embeds by testing `e.source` for membership in `window.frames`. Accept
one to three named origins, never a pattern, and check the payload's shape
before parsing.

```js
if (e.origin !== VENDOR || typeof e.data !== 'string') return
if (!Array.prototype.some.call(window.frames, (w) => w === e.source)) return
```
⚠ `window.frames` is `window` itself — array-like with no iterator, so spread
throws. It lists direct children only, so a relayed grandchild fails it. Never
post back to `'*'`.
