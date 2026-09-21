---
id: probe-reach-tail-space
category: scroll
tags: [scroll,layout,observer,correctness]
axes: none
cost: 2
seen: 2
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

Where the tail cannot be padded — a full-bleed section, a last block that is the
footer — clamp the *range* rather than extending the scroller. Compute the
probe's start and end scroll positions as before, then pull the end back to the
document's own maximum and force it above the start: progress reaches 1 exactly
when scrolling stops. No spacer, no `ResizeObserver`, no layout mutation. The
cost is that the final stretch advances faster than the rest — invisible on a
discrete active-item probe, visible on a scrub.
```js
const max = document.documentElement.scrollHeight - innerHeight
let a = top - innerHeight * anchor, b = a + el.offsetHeight
if (b > max) b = max
if (b <= a) b = a + 1                       // degenerate range, never a NaN
const p = Math.min(1, Math.max(0, (scrollY - a) / (b - a)))
```
⚠ Clamping changes the rate, so never run it alongside an unclamped probe on
the same page — two markers reading one scroll then disagree about where they
are.
