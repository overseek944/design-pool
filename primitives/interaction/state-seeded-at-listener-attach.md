---
id: state-seeded-at-listener-attach
category: interaction
tags: [correctness,state,events,scroll,architecture]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
Events report transitions, not the current value. Any class derived from a
continuous input — scroll offset, a media query, online status, document
visibility — is wrong from mount until the first event fires, and a reload
part-way down a page, a restored scroll position or a deep link may mean that is
never. Call the same handler once at registration, so the listener only ever
maintains a state that was already correct.

```js
const sync = () => el.toggleAttribute('data-scrolled', scrollY > 24)  // 16–64
sync()
addEventListener('scroll', sync, { passive: true })
```
⚠ The seeding call runs before paint, so make the handler safe with no event
argument and idempotent. Transition the affected properties, or the seeded state
animates in on load as a flash of the wrong chrome.

A *one-shot* readiness event is the same bug with no second chance:
`loadeddata`, `canplay`, a decode, a font load. A cached resource is ready
before the effect that subscribes runs, the event has already fired, and the
placeholder stays up for the rest of the session. Seed from the element's own
readiness property rather than from a flag some handler sets — `readyState >= 2`,
`img.complete` — and bind more than one event, since which of them arrives at
all depends on buffering.
```js
const ready = () => setLoaded(true)
if (v.readyState >= 2) ready()
;['loadeddata', 'canplay'].forEach(t => v.addEventListener(t, ready))
```
⚠ Both events fire on a slow load, so the handler has to be idempotent — and
remove both on teardown, not the one that happened to win.
