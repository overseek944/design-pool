---
id: slot-permutation-rotation
category: motion-system
tags: [motion,grid,state,responsive]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 3
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
To show more items than a grid has cells, swap one cell at a time rather than
paging the whole set. Picking a random cell clumps and repeats; instead shuffle
the cell *indices* once and walk that permutation, so every cell updates exactly
once per round. Retired items go to the tail of the queue and cannot return
until the pool is exhausted. One swap every 1.5–3s.

```js
const order = shuffle([...cells.keys()])            // reshuffle each round
const step = () => { const c = cells[order[i++ % cells.length]]
  const next = queue.shift(); swap(c, next); queue.push(c.current) }
```
⚠ Derive the live cell set from computed `display`, not from a breakpoint list,
and rebuild when it changes — otherwise a responsive grid animates into a cell
nobody can see and that item vanishes for a full round.

Paging the whole set at once is the right call when the sets are curated
groups rather than a pool. Stack one absolutely-positioned layer per set in
every cell and drive them all from one index: the outgoing layer leaves over
200–260ms, the incoming waits 80–150ms, then rises 3–6px from scale .96–.98.
The delay is what keeps two marks from ever sharing the cell. Interval 2–4s.
```js
animate={{ opacity: on ? 1 : 0, y: on ? 0 : 4, scale: on ? 1 : .97 }}
transition={on ? { duration: .3, delay: .12 } : { duration: .25 }}
```
⚠ Hidden layers still carry `alt` — hide every non-current layer from the
accessibility tree, and stop the interval under reduced motion.
