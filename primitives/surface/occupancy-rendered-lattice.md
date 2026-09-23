---
id: occupancy-rendered-lattice
category: surface
tags: [grid,cells,dom,simulation,sparse,lattice,interactive,ambient]
axes: {energy: 3, density: 3, weight: 2, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A discrete simulation — a life rule, a spreading state — can run on a lattice far
larger than the screen while the DOM stays tiny. Paint the lattice lines as two
background gradients, and render as elements only the live cells, placed by
`grid-column`/`grid-row`. Node count tracks population, not area. Diff each step
into entering, leaving and stable sets and let a class fade them in or out over
150–350ms. Step every 0.4–1.5s; pitch 40–72px.

```js
const next = step(live)
render([...next, ...[...live].filter(k => !next.has(k))])  // leavers stay for the fade
cell.className = !live.has(k) ? 'enter' : !next.has(k) ? 'exit' : 'stable'
```
⚠ `aria-hidden` on the field. Under reduced motion stop the clock and remove
leavers at once.
