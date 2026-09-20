---
id: layout-release-broadcast
category: scroll
tags: [scroll,measurement,correctness,overlay,architecture,events]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Anything holding the document at a size it will not keep — an entry gate locking
the root's `overflow`, a drawer, a late font swap — invalidates every
measurement taken while it was up. Scroll-driven systems cached `scrollHeight`
and each trigger's start and end at mount, and they do not know the gate exists.
Do not call into them: dispatch one named event on release and let each measurer
subscribe, so a second gate added later needs no wiring.
```js
root.style.overflow = prev
requestAnimationFrame(() => dispatchEvent(new Event('layout:released')))
```
⚠ Fire after the release has laid out — same-frame and the refresh re-reads the
locked height. One frame, or the overlay's own `transitionend`.
