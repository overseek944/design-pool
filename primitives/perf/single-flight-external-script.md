---
id: single-flight-external-script
category: perf
tags: [performance,architecture,correctness,lifecycle,embed]
axes: none
cost: 2
seen: 7
requires: []
conflicts: []
completes: []
tension: []
---
Several components on a page may each need the same third-party script, and each
one injecting it loads it two or three times. Hold the load in module scope, not
component state: one promise created on first demand, resolved by the vendor's
global ready callback, awaited by every later caller. The global deletes itself
once resolved so nothing leaks between navigations.

```js
let p                                        // module scope, survives remounts
export const load = (src, cb = 'onVendorReady') => p ??= new Promise(res => {
  window[cb] = () => { delete window[cb]; res() }
  document.head.append(Object.assign(document.createElement('script'),
    { src, async: true, id: 'vendor-sdk' }))
})
```
⚠ Never reject and clear the promise on error without a backoff — remounting
consumers will then retry the failed load on every render.

Module scope is the wrong holder when the DOM outlives the module — a soft
navigation, a second island, a late-hydrating bundle. The tag is already in the
head and a fresh promise starts a second fetch anyway. Dedupe against the
document instead, and mark the tag itself once it fires so a later caller can
tell *loaded* from *in flight*.
```js
const s = [...document.scripts].find(x => x.src === src)
if (s) return s.dataset.ready ? Promise.resolve()
                              : new Promise(r => s.addEventListener('load', r))
```

The vendor's global ready hook may not be yours to take. A tag manager or a
second widget from the same vendor may already hold it, and a loader that assigns
then deletes breaks that consumer silently. Save what was there, call it before
you resolve — it was waiting on the same event — and restore it only if the slot
still holds your own function. Pair the load with a hard timeout, or an SDK that
arrives and never fires leaves every awaiting consumer pending forever. 10–20s.
```js
const prev = window[cb]
const mine = () => { prev?.(); if (window[cb] === mine) window[cb] = prev; res() }
window[cb] = mine; const t = setTimeout(() => rej(Error('sdk timeout')), 20_000)
```
⚠ Remove only the tag you created. Calling `.remove()` on one you adopted from
the document tears out somebody else's loader mid-flight.

Plenty of vendors publish no ready hook at all: the tag assigns a global some
time after it loads, and `script.onload` fires before that assignment. There is
nothing to await, so poll — on the method you are about to call rather than on
the object existing — with a hard attempt cap so a blocked CDN fails loudly
instead of hanging every consumer. 40–60ms, 60–120 attempts.
```js
const ready = () => typeof window.vendor?.render === 'function'
;(function wait(n = 100) { ready() ? res(window.vendor)
  : n ? setTimeout(() => wait(n - 1), 50) : rej(Error('sdk unavailable')) })()
```
⚠ The object usually appears a tick before its methods do, so a truthiness check
resolves early and the first call throws. This is also the case that most wants
the backoff above — a poller that clears its memo on timeout will re-poll from
zero on the next caller.

The deadline's branch should be a working path, not an error. Where the vendor
only *enhances* something the page can already do — a scheduling popup over a
booking URL, a rich player over a file link, a map over an address — rejecting
on timeout hands the component an exception it has no answer for, and the
reader gets a dead control because a CDN was slow. Resolve into the plain
behaviour instead, so the press always does something and the widget is the
upgrade it claims to be. Poll at 60–100ms and give up at 3–5s, far shorter than
the 10–20s an awaited SDK deserves: this wait is behind a click, not behind
boot.
```js
;(function tryOpen(t = Date.now()) {
  if (window.Vendor?.open) return window.Vendor.open(url)
  if (Date.now() - t > 3500) return window.open(url, '_blank', 'noopener')
  setTimeout(() => tryOpen(t), 80) })()
```
⚠ Injecting the vendor's assets on the same press that needs them means the
fallback fires on every first click over a slow connection — warm them on
intent (hover, focus, viewport) and keep the deadline for the press itself.
A popup opened from a timer rather than from the gesture is blocked; the
fallback must run inside the handler's own task or behind a real link.
