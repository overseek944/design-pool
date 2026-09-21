---
id: bfcache-blanked-surface
category: perf
tags: [performance,canvas,lifecycle,correctness,restoration,flicker]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A page restored from the back/forward cache repaints whatever a live surface
last drew before it was frozen — a stale frame, often mid-animation, sometimes
behind a context the browser has since dropped. Blank it on the way out with the
transition suppressed so nothing is captured, and fade it back only when
`pageshow` reports a restore. Fade 150–300ms, the same curve as first paint.

```js
const out = () => { c.style.transition = 'none'; c.style.opacity = '0' }
addEventListener('pagehide', out)
addEventListener('pageshow', e => { if (!e.persisted) return
  c.style.transition = 'opacity 220ms ease-out'; c.style.opacity = '1' })
```
⚠ Listening on `unload` disqualifies the page from the cache outright. A loop
gated on `visibilitychange` alone still restores its last painted frame.

Control state written on the way *out* comes back the same way. A submit button
disabled and relabelled for the duration of a native form post is still disabled
and still says "Sending…" when the reader presses Back, because the restored
page is the frozen DOM, not a fresh render — and there is no submit in flight to
re-enable it. Re-arm at init rather than on `pageshow`, so the same line covers
a restore, a script re-execution and a router snapshot.
```js
submit.disabled = false; submit.removeAttribute('aria-busy')
label.textContent = IDLE
```
⚠ The guard has to run before any listener binds, or the first press on the
restored page is swallowed by a lock nothing will clear.
