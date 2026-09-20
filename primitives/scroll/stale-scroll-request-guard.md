---
id: stale-scroll-request-guard
category: scroll
tags: [scroll,correctness,accessibility,events,navigation]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A scroll request crossing an async boundary — posted by an embed, resolved from
a fetch — can land after the reader has moved on, and taking the viewport then
steals it from someone already reading. Stamp it at *initiation*, never at
receipt; drop it on arrival if it is stale or if trusted input followed that
stamp. Freshness 300–800ms, corrections capped at 2–3.

```js
const seen = e => { if (e.isTrusted) last = performance.now() }  // capture, passive
if (req.at <= last || performance.now() - req.at > 600) return   // 300–800
```
⚠ `performance.now()` is per-document: a stamp made in another frame needs
`timeOrigin` added on both sides first. Without `isTrusted`, one synthetic
click discards every later request.
