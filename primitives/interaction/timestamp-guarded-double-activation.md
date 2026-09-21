---
id: timestamp-guarded-double-activation
category: interaction
tags: [events,click,pointer,correctness,architecture,accessibility]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A component that synthesises its own tap alongside the native `click` hands one
user activation to the handler twice, so an action that toggles opens and closes
in the same gesture — invisible on a fast machine, reproducible on a slow one.
Both must be subscribed, since which one arrives is the component's business, not
yours. Drop the echo by time: hold the last accepted `event.timeStamp` and ignore
anything inside 30–60ms. Keep the mark in a ref — state re-subscribes the
listener and loses it.

```js
const last = useRef(-1)
const once = e => { const t = e.timeStamp ?? Date.now()
  if (Math.abs(t - last.current) < 40) return
  last.current = t; fire(e) }
```
⚠ Not a debounce — a deliberate second press must still land, so the window stays
well under a human repeat interval. Check `defaultPrevented` before the guard, or
an event a child already handled still burns the slot and eats the real one.
