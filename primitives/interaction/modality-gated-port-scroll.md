---
id: modality-gated-port-scroll
category: interaction
tags: [interaction,accessibility,keyboard,focus,scroll,correctness,carousel]
axes: none
cost: 1
seen: 1
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
