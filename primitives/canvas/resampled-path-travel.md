---
id: resampled-path-travel
category: canvas
tags: [canvas,performance,motion,connector,architecture]
axes: none
cost: 2
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Moving a marker along a curve by solving the curve every frame costs an
evaluation per marker per frame, and the same maths again for its tangent.
Sample the path once into a fixed array — 20–40 points for a gentle arc — and
travel by fractional index, interpolating between the two nearest. Rebuild the
tables in the resize handler, keyed by endpoint pair, and any number of markers
share one path at two array reads and a lerp each. The curve type stops
mattering to the loop.
```js
const f = t * (pts.length - 1), i = f | 0, k = f - i
const b = pts[Math.min(i + 1, pts.length - 1)]
const x = pts[i].x + (b.x - pts[i].x) * k
```
⚠ Uniform parameter is not uniform arc length: samples bunch through tight
curvature and the marker slows there. Resample by measured length if speed
must read as constant.

A trail behind the marker needs no history buffer either. Re-sample the same
path at 6–12 points between `t − Δ` and `t`, stroking each segment with alpha
and width ramped toward the head — the taper is exact at any speed, survives a
resize that rebuilds the table, and costs a handful of reads rather than a
per-marker ring buffer that drifts whenever frames are dropped. Lag Δ
0.08–0.16 of the path; alpha ramped on the square so the tail vanishes rather
than ending.
```js
for (let i = 1; i <= N; i++) { const k = i / N, p = at(t - LAG + LAG * k)
  ctx.strokeStyle = rgba(ink, .5 * k * k); ctx.lineWidth = .3 + 1.5 * k
  ctx.beginPath(); ctx.moveTo(prev.x, prev.y); ctx.lineTo(p.x, p.y); ctx.stroke(); prev = p }
```
⚠ Clamp the tail end at 0, or a marker near the start of its run trails off the
path's beginning and draws a spur.

The same table serves SVG, where the reason to build it is different:
`getPointAtLength` per frame is a layout-forcing DOM read. Sample once at mount,
derive one cubic per interval, then per frame join a prefix of those strings and
write `d` — the trail is a real `<path>` inheriting stroke tokens and markers,
drawn with one write and no reads. It also smooths: an authored 40-point
polyline resampled and re-emitted as Catmull-Rom cubics renders as a curve while
the source geometry stays the polyline. 150–250 samples.
```js
const seg = i => `C${c1[i]} ${c2[i]} ${pts[i+1].x},${pts[i+1].y}`   // once
path.setAttribute('d', `M${pts[0].x},${pts[0].y} ` + segs.slice(0, n).join(' '))
```
⚠ Rebuild on resize only if `d` or the viewBox actually changed — user-space
geometry is width-independent, so a table keyed to the path is not stale when
the box is.
