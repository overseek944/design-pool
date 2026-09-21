---
id: visibility-probed-app-escape
category: interaction
tags: [interaction,navigation,link,mobile,correctness,fallback]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A control that hands off to a native app has no success callback: assigning a
custom scheme either opens the app or does nothing, and nothing is
indistinguishable from slow. Probe it with the page lifecycle. Attempt the
scheme, then navigate to the web fallback only if neither `visibilitychange`
nor `pagehide` fired and the document is still visible after 600–2000ms. Under
~600ms the handoff loses the race and both destinations open; over ~2s the
reader has already decided it is broken.

```js
let gone = false
const seen = () => { gone = true; off() }
addEventListener('pagehide', seen); addEventListener('visibilitychange',
  () => document.hidden && seen())
location.href = scheme
setTimeout(() => { off(); gone || document.hidden || (location.href = web) }, 1200)
```
⚠ Detach both listeners once decided — a page restored from bfcache fires them
later and a stale escape reads as success.

The same deadline covers a handoff to a script that has not arrived. A control
opening a vendor overlay — a scheduler, a chat, a lightbox — must stay a real
link to the destination that overlay would have shown, so the interception
queues the click against the loader and arms a timer; if the bundle has not
landed, release the queue and follow the element's own `href`. The reader
reaches the booking page either way, and nothing has to guess whether the vendor
is reachable. 3–6s, well past a slow load and short of abandonment.
```js
pending = el
queue.push(() => { clearTimeout(t); open(pending) })
t = setTimeout(() => { location.href = pending.getAttribute('href') }, 5000)
```
⚠ The queued entry must be cleared by whichever path wins or a late script opens
the overlay over the page the timer already navigated to. This only works while
the trigger is an anchor with a working `href` — a `<button>` has nothing to
fall back to, which is the argument for the anchor.
