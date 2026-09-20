---
id: append-stream-anchor-release
category: scroll
tags: [scroll,correctness,stream,log,architecture]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Engines silently hold the reading position steady when content is inserted
above the viewport. In a log, a transcript or any append-only stream that also
re-renders earlier rows, that correction fights the component's own scroll
handling — the browser adjusts, the code adjusts, and the view jitters or
refuses to settle at the end. Release anchoring on the scroller and own the
position outright: follow the tail only while the reader is already within
50–150px of it, so arriving content never yanks someone reading history.

```css
.stream { overflow-anchor: none }
/* follow only if already near the end */
/* const near = el.scrollHeight - el.scrollTop - el.clientHeight < 120 */
```
⚠ Release it only where something replaces it. On ordinary prose that
lazy-loads images above the fold, anchoring is the thing keeping the reader's
place, and turning it off is a regression with no visible cause.
