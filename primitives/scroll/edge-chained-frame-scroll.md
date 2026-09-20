---
id: edge-chained-frame-scroll
category: scroll
tags: [scroll,iframe,embed,correctness,interaction]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: [embed-claims-wheel-on-hover]
---
A same-origin embed that scrolls internally traps the gesture at both ends:
reach the bottom of the inner document and the page behind it stops dead.
Listen inside the frame's own `contentWindow` and, when its scroller already
sits against the edge the delta is pushing toward, apply that delta to the host
instead. The boundary disappears without the reader ever learning where it was.

```js
const el = doc.scrollingElement, top = el.scrollTop <= 0
const end = el.scrollTop + win.innerHeight >= el.scrollHeight - 1
if ((d < 0 && top) || (d > 0 && end)) scrollBy({ top: d, behavior: 'auto' })
```
⚠ Same-origin only — a cross-origin frame exposes neither window nor document.
Touch carries no `deltaY`: hold the last `touchmove` Y and pass the difference.
Passive listeners cannot `preventDefault`, so chain strictly at the edges or
both documents move at once.
