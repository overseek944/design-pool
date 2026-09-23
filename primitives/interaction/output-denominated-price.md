---
id: output-denominated-price
category: interaction
tags: [pricing, quantity, estimator, units, value]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

Credits and tokens make a reader do conversion arithmetic before they can judge a price. Restate each tier as what it produces — images, minutes, documents — in a medium switcher, and let the reader set the two or three inputs that change the yield (quality, resolution, size). Offer a budget mode that inverts it: an amount in, output out. Show 3–6 media; lead with an "up to" figure.

```js
const yieldOf = (credits, unitCost, mult) => Math.floor(credits / (unitCost * mult))
out.textContent = yieldOf(plan.credits, medium.cost, res.mult).toLocaleString()
```
⚠ State the assumption beside it — all credit spent on one medium at the cheapest setting — or the figure reads as a promise.
