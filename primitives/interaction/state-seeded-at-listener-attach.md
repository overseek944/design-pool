---
id: state-seeded-at-listener-attach
category: interaction
tags: [correctness,state,events,scroll,architecture]
axes: none
cost: 1
seen: 1
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
