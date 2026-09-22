---
id: readiness-latched-intent
category: interaction
tags: [readiness,hover,lazy,intent,state,custom-element]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: [boot-drained-call-queue]
---
A control acting on a lazily-upgraded target can be used before that target can
answer. Queueing the call replays a stale one: the pointer has left by the time
the component reports ready, and something starts playing for nobody. Latch the
*desired state* instead — written by both enter and leave, reconciled once on
ready. Level-triggered, not edge-triggered, so a fast in-and-out resolves to
what the reader last wanted rather than to both. Gate the first latch on
60–120ms of dwell and a pointer merely crossing never wakes the component.

```js
const want = on => { state = on; if (live) on ? el.play() : el.stop() }
host.addEventListener('pointerenter', () => want(true))
host.addEventListener('pointerleave', () => want(false))
el.addEventListener('ready', () => { live = true; want(state) })
```
⚠ Seed from the target's own state as well — a cached upgrade is ready before
the listener attaches and the event never fires. A leave before ready must
still write the flag.
