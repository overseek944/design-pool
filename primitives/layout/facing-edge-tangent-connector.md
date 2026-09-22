---
id: facing-edge-tangent-connector
category: layout
tags: [layout,connector,svg,diagram,geometry]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 2
seen: 4
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

Two boxes stacked vertically want the same construction on the other axis, and
choosing between them is one comparison. Take the larger of |dx| and |dy|:
horizontal-dominant leaves the facing left/right edges with both control points
at the midpoint x, vertical-dominant leaves top/bottom with both at the midpoint
y. One function then routes a whole graph with no layout pass, and a node moved
past its neighbour re-routes instead of swinging an S around the side.
```js
const [dx, dy] = [b.cx - a.cx, b.cy - a.cy]
if (Math.abs(dx) > Math.abs(dy)) { const x1 = dx > 0 ? a.right : a.left
  const x2 = dx > 0 ? b.left : b.right, m = (x1 + x2) / 2
  d = `M ${x1} ${a.cy} C ${m} ${a.cy}, ${m} ${b.cy}, ${x2} ${b.cy}` }
```
⚠ The test is on centre distance, not the gap between edges, so two wide boxes
almost level flip between the two forms on a pixel of movement. Hold the last
choice until the loser leads by a band of 8–24px.
