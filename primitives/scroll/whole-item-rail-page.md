---
id: whole-item-rail-page
category: scroll
tags: [scroll,rail,pagination,control,measurement,correctness]
axes: none
cost: 1
seen: 1
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
