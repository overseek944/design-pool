---
id: query-composed-figure-source
category: media
tags: [media,figure,architecture,iframe,product,responsive,build]
axes: none
cost: 3
seen: 1
requires: []
conflicts: []
completes: [counter-scaled-live-embed]
tension: []
---
Every figure of an interface is usually its own exported image. Build the
artifact once as a document that reads its composition from its own query
string — which panes exist, their widths, which state shows — and each figure
becomes a URL in a frame. A retune then reaches all of them, and the figure
stays live text: selectable, translatable, sharp at any pixel ratio. 6–20
parameters before the string stops reading.

```js
const P = new URLSearchParams(location.search)
root.style.setProperty('--railw', (+P.get('railw') || 216) + 'px')
```
⚠ Nothing inside the frame reaches the outer page — title it, and restate any
load-bearing claim in the host's markup. Default every read: the string is a
public surface with no schema.
