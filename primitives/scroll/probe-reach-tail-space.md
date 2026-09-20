---
id: probe-reach-tail-space
category: scroll
tags: [scroll,layout,observer,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A scroll probe sits on a fixed line — the midpoint, or just under the chrome —
and the last item can never reach it: the scroller runs out of travel first, so
the final entry never goes active and the marker sticks one short. A guessed
`50vh` of tail padding is wrong at both ends. Compute it from the same geometry
the probe uses, and recompute under a `ResizeObserver` because it depends on
content height.
```js
const need = lastTop + (port.clientHeight - probeY)
           - (port.scrollHeight - spacer.offsetHeight)
spacer.style.height = `${Math.max(0, Math.ceil(need))}px`
```
⚠ Subtract the spacer's own height from `scrollHeight` or the measurement feeds
itself and grows every pass. Blank tail space reads as a bug unless the container
is visibly a scroller — close it with a rule or a final label.
