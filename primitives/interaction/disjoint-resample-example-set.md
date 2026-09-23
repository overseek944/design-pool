---
id: disjoint-resample-example-set
category: interaction
tags: [interaction,input,examples,suggestion,state,accessibility]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A row of clickable starting points under an empty field can draw from a much
larger pool than it shows, with a refresh control that deals a fresh hand.
Deal from a shuffled bag and exclude the current hand, so a refresh never
repeats an example that is already on screen. Show 3–5 at a time from a pool of
at least 3× that. Keep row height fixed so a refresh never shifts the layout.

```js
const deal = () => { if (bag.length < N) bag = shuffle(pool.filter(x => !hand.includes(x))); hand = bag.splice(0, N) }
```
⚠ Keep focus on the refresh button, and announce the swap in a polite live
region. Otherwise keyboard users lose their place.
