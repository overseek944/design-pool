---
id: child-reported-frame-height
category: media
tags: [media,correctness,architecture,cls,responsive]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An iframe reporting its own height hands layout control to a channel anything
can post to. Accept the number only when the origin matches *and* the source is
that frame's own `contentWindow`, then clamp it to a band the page survives — a
child mid-reflow reports 0, a broken one reports the document. Pull as well as
listen: the child's first push can precede the listener, so request a
measurement on `load` and after resize.

```js
if (e.origin !== ORIGIN || e.source !== frame.contentWindow) return
frame.style.height = Math.min(2400, Math.max(400, Math.ceil(e.data.h))) + 'px'
```
⚠ Name the child origin when posting back, never `'*'`. Reserve the floor with
`aspect-ratio` or the first measurement shifts everything below it.
