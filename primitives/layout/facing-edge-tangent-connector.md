---
id: facing-edge-tangent-connector
category: layout
tags: [layout,connector,svg,diagram,geometry]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A straight rule between a box and a line of text in the facing column reads as
a strike across both. Give the curve horizontal tangents: a cubic
whose two control points both sit at the endpoints' midpoint x, each keeping
its own endpoint's y, so it leaves one edge and arrives at the other flat.
Leave the overlay `viewBox`-less — user space is CSS pixels, so rects measured
against the wrapper drop straight into `d`. Re-solve per frame
when one end is sticky and the other scrolls — resize and intersection both
miss that. Inset the arrival end 4–8px.

```js
const w = wrap.getBoundingClientRect(), a = from.getBoundingClientRect()
const b = to.getBoundingClientRect(), mx = (a.right + b.left) / 2 - w.left
const y1 = a.top + a.height / 2 - w.top, y2 = b.top + b.height / 2 - w.top
path.setAttribute('d', `M ${a.right - w.left} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${b.left - w.left - 6} ${y2}`)
```
⚠ Three rect reads per frame force layout every frame — one connector at most,
and stop the loop offscreen.

A cubic reads as *flow*; a route that should read as *wiring* wants right
angles. Run out horizontally, take one diagonal, arrive horizontally — three
segments, the diagonal absorbing the whole vertical difference. The bend
distance is what keeps a set of them consistent: take a fraction of the
horizontal run and clamp it, so a short connector and a long one leave their
labels by the same amount instead of the short one bending immediately. Fraction
0.3–0.4, clamped to 70–170px.
```js
const bend = x1 + Math.min(170, Math.max(72, (x2 - x1) * .34))
path.setAttribute('d', `M ${x1} ${y1} H ${bend} L ${x2 - 32} ${y2} H ${x2}`)
```
⚠ Clamp against the run, not the viewport — an unclamped fraction puts every
connector's bend at a different x and the bundle reads as a fan.

Resize is not what moves the endpoints. A webfont swap reflows the labels, an
image decode resizes the figure the markers sit on, and a breakpoint change
relayouts both — all after load, none of them a window resize. Observe the
container *and* the art with one `ResizeObserver`, add `document.fonts.ready`, a
one-shot `load` per image and the `matchMedia` change, then coalesce every one
of them into a single `requestAnimationFrame` so a burst costs one pass.
```js
const sync = () => { cancelAnimationFrame(f); f = requestAnimationFrame(solve) }
new ResizeObserver(sync).observe(body); document.fonts?.ready.then(sync)
imgs.forEach(i => i.addEventListener('load', sync, { once: true }))
```
⚠ Solve *after* the reveal settles, not inside the observer callback that starts
it — `getBoundingClientRect` reports the painted box, so connectors measured
mid-entrance land where the markers currently are rather than where they stop.
