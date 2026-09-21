---
id: axis-swapped-disclosure
category: interaction
tags: [disclosure,responsive,layout-animation,breakpoint,accessibility]
axes: none
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A detail panel opens *downward* in a stacked column and *sideways* beside its
trigger once there is width for a second column — one node, one state, two
geometries. The trap is that each mode must release the other axis's clamp:
animating `max-height` while `width` is still `0` opens an invisible panel, and
the reverse leaves the panel permanently short. Swap at 1000–1300px, wherever
the trigger list stops needing the full measure. Give the inner content its own
delayed fade so the box arrives first and the text follows it.

```css
.detail { overflow: hidden; max-height: 0; transition: max-height .55s var(--ease) }
@media (min-width: 1200px) {
  .detail      { max-height: none; width: 0; transition: width .55s var(--ease) }
  .detail-open { width: min(392px, 38vw) }
}
```
⚠ Neither axis interpolates from `auto`, so the open value is a literal — cap
`max-height` generously above the tallest entry and accept the eased tail, or
use `interpolate-size: allow-keywords` where it is supported.

There is one case where the open value is neither a literal nor `auto`: a
trigger that expands *into itself* — a button that becomes the form it submits.
Measure the composite's own width the frame before it opens, pin it as an inline
length, publish it as the track's open size, and flip the state in the same
commit so no frame renders unpinned. The outer width never changes, so nothing
beside it moves; release both properties after the transition and sizing goes
back to the content.
```js
const w = frame.getBoundingClientRect().width       // grid: 1fr 1fr 0 → 1fr 1fr var(--open)
frame.style.width = `${w}px`; frame.style.setProperty('--open', `${w}px`)
flushSync(() => setPhase('open'))
```
⚠ Release on a timer and the two durations drift apart; release on
`transitionend` and a cancelled transition pins the width forever. Either way
clear it on resize as well, and skip the whole mechanism below the width where
the row wraps — there the panel wants the full measure, not the trigger's.
