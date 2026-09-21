---
id: whole-item-rail-page
category: scroll
tags: [scroll,rail,pagination,control,measurement,correctness]
axes: none
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
An arrow that scrolls a horizontal rail by a fixed distance — 300px, or one
`clientWidth` — leaves a sliver of the next card cut at the edge, and the cut
lands somewhere different at every breakpoint. Page by a whole number of items
instead: measure the first child's offset width, add the gap to get the pitch,
and step by however many pitches fit the port. The rail re-derives itself when
the grid or gap changes, so nothing restates the card width.

```js
const pitch = port.firstElementChild.offsetWidth + gap
port.scrollBy({ left: dir * Math.max(1, Math.floor(port.clientWidth / pitch)) * pitch,
                behavior: 'smooth' })
```
⚠ Items of unequal width make the pitch a lie — measure the child being scrolled
past, or only page rails of one card size.

Read the pitch backwards to answer which item is current. Dividing `scrollLeft`
by the pitch is wrong at the end: the last items share the final scroll position,
so the rounded index sticks two short and the last dots never light. Compare each
item's rect against the port's content origin — its left edge plus the track's
computed `padding-inline-start` — and take the nearest, then clamp: at
`scrollLeft ≤ ~5` the answer is the first, and within ~5px of the maximum it is
the last, whatever the geometry says.
```js
const origin = port.getBoundingClientRect().left + padStart
const i = items.reduce((b, el, n, a) => Math.abs(el.getBoundingClientRect().left
  - origin) < Math.abs(a[b].getBoundingClientRect().left - origin) ? n : b, 0)
```
⚠ One rect read per item per scroll event. Debounce it, or drive it from an
`IntersectionObserver` and keep the rect pass for the two clamped ends.

Read the gap rather than restating it. `getComputedStyle(port).columnGap`
returns the resolved value — including a `clamp()` the stylesheet retunes per
breakpoint — so the pitch tracks the CSS with nothing duplicated in script and
nothing to re-sync when the gap changes. An unset `column-gap` computes to
`normal`, which parses to `NaN` and silently poisons the whole pitch, so the
`|| 0` is load-bearing rather than defensive.
```js
const gap = parseFloat(getComputedStyle(port).columnGap) || 0
```
