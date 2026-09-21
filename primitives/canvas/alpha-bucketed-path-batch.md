---
id: alpha-bucketed-path-batch
category: canvas
tags: [canvas,svg,performance,generative,texture,batching]
axes: {energy: 2, density: 4, weight: 1, finish: 5}
cost: 3
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Thousands of individually-faded SVG marks means thousands of nodes and a write
to each every frame. Quantise each mark's alpha onto a short ladder instead,
concatenate a bucket's subpaths into one `d`, and ship one `<path>` per bucket
at a fixed opacity. Frame cost is then N writes, not N × marks. 4–6 buckets;
below four the banding reads as bands.

```js
const B = [.22, .4, .65, .9, 1], d = B.map(() => '')
for (const m of marks) { const a = alphaOf(m); if (a < .1) continue
  d[Math.min(B.length - 1, a * B.length | 0)] += subpath(m) }
d.forEach((s, i) => paths[i].setAttribute('d', s))
```
⚠ Round coordinates to ~1 decimal first; full floats dominate the string cost.
Quantised alpha cannot cross-fade, so a mark changing bucket pops — keep marks
too small to read singly.

Once the marks are batched, the field can be made live for the cost of two
animated properties. Deal them into two interleaved halves and animate the two
groups' opacity in exact antiphase — the same ceiling and floor, one starting at
each. Individual marks breathe in and out, but the halves sum to a constant so
the field's overall density never dips, which a single opacity animation on the
whole field cannot avoid. Floor .10–.20 and period 5–9s; a floor of 0 reads as a
blink rather than a shimmer.
```css
.half-a { animation: pulse 7s ease-in-out infinite }
.half-b { animation: pulse 7s ease-in-out infinite; animation-delay: -3.5s }
@keyframes pulse { 0%, to { opacity: 1 } 50% { opacity: .12 } }
```
⚠ Assign halves by interleaving, never by region — a spatial split makes the two
phases visible as two patches.

The same ladder on a 2D canvas is flat coordinate arrays rather than path
strings: one array per bucket, `length = 0` each frame instead of reallocating,
and one `beginPath`/`stroke` per bucket at that bucket's `strokeStyle`.
Hairlines hide the banding a readable mark would show, so the ladder can run
32–64 steps there rather than 4–6. Flush each bucket in fixed runs — a single
path of tens of thousands of segments degrades sharply in the rasteriser, while
runs of 500–1000 segments do not.
```js
for (let b = 1; b <= N; b++) { const a = buf[b]; if (!a.length) continue
  ctx.strokeStyle = ink(b / N)
  for (let i = 0; i < a.length; i += RUN) { ctx.beginPath()
    for (let j = i; j < Math.min(a.length, i + RUN); j += 4) {
      ctx.moveTo(a[j], a[j+1]); ctx.lineTo(a[j+2], a[j+3]) } ctx.stroke() } }
```
⚠ Skip a bucket below ~1/255 alpha rather than drawing it — the clear costs
nothing and the state change costs the same as a visible one.
