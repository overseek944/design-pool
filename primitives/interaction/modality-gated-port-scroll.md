---
id: modality-gated-port-scroll
category: interaction
tags: [interaction,accessibility,keyboard,focus,scroll,correctness,carousel]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Cards in a horizontal scroll port belong in the ordinary tab order, so focus
routinely lands on a control the port has scrolled out of sight. Correcting that on
`focusin` breaks the mouse: a press moves focus before `click`, the port slides
the pressed control out from under the pointer, and the activation lands on
nothing. Gate the correction on `:focus-visible`, so only keyboard focus moves
the track, and scroll by the measured shortfall rather than `scrollIntoView`,
which walks every ancestor and the page too.

```js
port.addEventListener('focusin', e => {
  if (!e.target.matches(':focus-visible')) return
  const c = e.target.closest('[data-slide]').getBoundingClientRect()
  const p = port.getBoundingClientRect()
  if (c.left < p.left) port.scrollBy({ left: c.left - p.left })
  else if (c.right > p.right) port.scrollBy({ left: c.right - p.right })
})
```
⚠ Correct both edges or the last card is reachable and never shown. `scrollBy`
ignores the reduced-motion preference that CSS `scroll-behavior` respects — read
the query and pass `instant`.

Selection is not focus and wants a different correction. A reader who picks a
tab in an overflowing strip should see what sits either side of their choice,
so centre it rather than scrolling by the shortfall — then clamp the
destination into `[0, scrollWidth − clientWidth]`, or a pick near either end
asks for a position the port cannot hold and the smooth scroll visibly rebounds
off the limit. Guard the whole thing on the port actually overflowing: above
the breakpoint where every tab fits, the correction is a scroll request against
a port with nowhere to go, which some engines answer by scrolling an ancestor.
A 2–5px slack absorbs sub-pixel widths.

```js
if (port.scrollWidth - port.clientWidth <= 4) return          // not a strip here
const rel = btn.offsetLeft - (port.clientWidth - btn.offsetWidth) / 2
port.scrollTo({ left: Math.max(0, Math.min(rel, port.scrollWidth - port.clientWidth)) })
```
⚠ Measure inside `requestAnimationFrame` after the state write, not before —
the selected tab usually changes weight or padding, and the pre-layout widths
centre the tab it used to be. Never follow the smooth `scrollTo` with a direct
`scrollLeft` assignment as a fallback: the assignment wins immediately and the
animation you asked for never runs.
