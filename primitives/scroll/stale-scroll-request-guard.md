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

The mirror case is a request that was fresh and lands *early*. A page opened at
a fragment scrolls before the media above the target has height — posters,
embeds, lazy images all arrive later — and the section the reader asked for
drifts down the page while they look at it. Re-assert the target on a short
ladder rather than once: the next frame, ~250ms, ~1s, and on `load`. Cheap, and
it converges as soon as layout does.
```js
const go = () => target.scrollIntoView({ block: 'start' })
requestAnimationFrame(go); setTimeout(go, 250); setTimeout(go, 1000)
addEventListener('load', go, { once: true })
```
⚠ Every rung is a scroll the reader did not ask for, so the ladder needs the
same trusted-input guard as anything else here — drop the remaining rungs the
moment a real scroll, wheel or key event arrives, or the page fights a reader
who moved on during the first second.
