---
id: capped-total-stagger
category: timing
tags: [motion,sequencing,scale]
axes: none
cost: 1
seen: 9
requires: []
conflicts: []
completes: []
tension: []
---
For unknown-length collections use `stagger:{amount}` not `stagger:<per-item>`.
Total choreography time stays fixed whether there are 6 items or 60.

A list that never ends — infinite scroll, a stream, anything appending after
first paint — cannot cap the *total*, because there is no total. Cap the
*index* instead: `delay = min(i, 6) * step`, so the seventh item and the
seven-hundredth arrive together and no reader ever waits on a queue that grew
behind them. Ceiling 5–8 slots, step inside the sibling band.
```css
.item { animation-delay: var(--arrive-delay, 0s); animation-fill-mode: backwards }
```
The delay belongs on a custom property with a `0s` default, so one class serves
both the staggered grid and the single item rendered on its own.

Where no index reaches the markup — server-rendered rows, a static list, a
collection the stylesheet sees but the script never touches — the same cap is
pure CSS: a short ladder of `:nth-child()` delays closed by an
`:nth-child(n+N)` rule that catches every remaining sibling at the ceiling.
`backwards` is what holds the pre-delay frame; without it every row paints
settled first and then jumps back to start.
```css
.row              { animation: in .24s var(--ease) backwards }
.row:nth-child(2) { animation-delay: 30ms }   /* … through the ceiling … */
.row:nth-child(n+8) { animation-delay: .21s }
```

Inside a scroll container the right ceiling is not a chosen index but the number
of items that actually fit: rows past the fold cascade where nobody is looking,
and on a short viewport the reader waits out a queue they cannot see. Measure
the port against the item's own height, stagger that many, and set the rest at
once. Re-measure on resize, and remember which collections have played so a tab
returned to does not replay.
```js
const visible = Math.ceil((port.clientHeight - pad) / rowHeight)
const n = Math.min(visible, rows.length)          // stagger n, snap the rest
```
⚠ Read the row height from a token or one measured row, never a constant — it
moves with the type scale and the miscount is silent.

The same ladder in `transition-delay` needs no keyframes and no `backwards` fill:
the from-state is an authored rule, the to-state is one class on the *container*,
and a single write plays the group. It is the cheapest form wherever one observer
already watches the group rather than its members.
```css
.group > *                { opacity: 0; translate: 0 22px; transition: .6s var(--ease) }
.group.in > *             { opacity: 1; translate: none }
.group.in > :nth-child(2) { transition-delay: 70ms }   /* … ladder … */
```
⚠ Transition delays are symmetric — if the class ever comes off, the last child
is also the last to leave, so zero them in the off-state. An unclosed ladder
costs more here than under `animation`: the sibling past the final rule takes no
delay at all and arrives with the first.

Between the fixed total and the capped index sits the pair written as one
expression: `min(step, budget / count)`. A short set keeps the step it was
designed at, a long one compresses to fit, and there is no branch and no chosen
ceiling — the collection decides which rule applies. This is the right form
wherever the count is known when the group plays but varies by an order of
magnitude: marks on a plot, rows of a returned result. Step 6–12ms, budget
400–700ms.
```js
const step = Math.min(STEP, BUDGET / Math.max(1, items.length))
items.forEach((el, i) => setTimeout(() => show(el), LEAD + i * step))
```
⚠ Floor the step as well. Under about 4ms apart the sequence stops reading as
one, and a large enough collection drives the budget term to zero.

Where the reveal already runs through an observer, the index need not be
authored at all: read it from the element's position among its annotated
siblings at the moment it intersects, write the capped delay to its style, and
unobserve. One observer then serves every staggered group on the page — a grid,
a nav, a pair of cards — with no `--i`, no `:nth-child` ladder and nothing to
keep in sync when the markup is reordered. Step 40–70ms, ceiling 3–5.
```js
const sibs = [...el.parentElement.children].filter(n => n.hasAttribute('data-reveal'))
el.style.transitionDelay = `${55 * Math.min(Math.max(sibs.indexOf(el), 0), 4)}ms`
```
⚠ The index is positional, so an element that is the only annotated child of its
own wrapper always scores zero — the cascade collapses silently wherever the
markup nests one per box rather than listing peers.
