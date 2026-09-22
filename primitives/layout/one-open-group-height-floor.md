---
id: one-open-group-height-floor
category: layout
tags: [layout,accordion,details,disclosure,measure,reflow,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
In a disclosure group where one item is open at a time, switching items moves
everything below the group. Floor the group at every summary plus the tallest
body: measure each body as a hidden clone at the item's real width. Then the
group is one height whichever item is open. Re-solve on width change only and on
`document.fonts.ready`.

```js
const sums = items.reduce((n, d) => n + d.querySelector('summary').offsetHeight, 0)
const tallest = Math.max(...items.map(d => measureClone(d.querySelector('.body'), d.clientWidth)))
group.style.minHeight = Math.ceil(sums + tallest + 1) + 'px'
```
⚠ Watching height re-triggers on its own write and loops. Past 2–3 surplus lines
of dead space under a short item, the floor costs more than the shift.
