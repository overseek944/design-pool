---
id: bucketed-depth-order
category: canvas
tags: [canvas,performance,depth,particles,batching,quantise]
axes: none
cost: 2
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
Painter's order on a 2D context normally means sorting every mark by depth each
frame — an allocation and n log n at exactly the count where it hurts. Quantise
depth into buckets instead, held as a head/next pair of typed arrays: one
linked-list pass, nothing allocated. Draw buckets far to near, and depth alpha
becomes one `globalAlpha` write per bucket rather than per mark. 32–64 buckets;
under ~24 the alpha steps read as bands.

```js
head.fill(-1)
for (let i = 0; i < n; i++) { const b = (z[i] - lo) * k | 0
  next[i] = head[b]; head[b] = i }
for (let b = 0; b < B; b++) { ctx.globalAlpha = floor + b / B * range
  for (let i = head[b]; i !== -1; i = next[i]) ctx.drawImage(spr, x[i], y[i]) }
```
⚠ Take `lo` and `k` from the frame's own extent, not a fixed range, or the
marks collapse into one bucket as the scene scales. Order holds between buckets
only — marks that must never overlap wrongly still need a sort.

Where depth is assigned once and never changes — a parallax field whose marks
keep their layer for life — neither the sort nor the buckets are needed at all.
Sort the array once at spawn and the storage order *is* the paint order for the
life of the field; the per-frame cost drops to zero and re-sorting is a resize
concern, not a frame concern. Only reach for buckets when z is itself animated.
```js
marks.sort((a, b) => a.z - b.z)          // once, in the same pass that spawns them
```
⚠ Anything that adds marks later must insert in order rather than push, or new
marks paint over near ones regardless of their depth.

Where the scene has exactly one occluder — a hub, a core, a foreground plate
everything else passes behind and in front of — neither the sort nor the
buckets earn their keep. Draw the field with a predicate that admits only marks
behind the divide, draw the occluder, then draw the field again with the
predicate negated. Two passes over the same array, no depth key stored, and the
split is a plane the author names rather than a value the data happens to
carry.
```js
const pass = front => { for (const m of marks) if ((m.y >= SPLIT) === front) draw(m) }
pass(false); drawCore(); pass(true)
```
⚠ Only correct for one occluder: two at different depths need three passes and
the count keeps climbing. Marks that straddle the divide — a long trail, a wide
sprite — pick one side per mark and pop as they cross it.

The single-occluder split can be a scalar rather than a plane. Where one moving
participant passes a set of fixed pieces, derive *how far behind* it is from its
distance to them, ease that 0→1, and let the one number choose the pass it draws
in and carry a dim at the same time. It steps back into the scene and forward
out of it instead of snapping between two layers, and the threshold that flips
the order sits where the dim is already deepest, so the swap is not visible.
Dim 0.3–0.5 at full depth, approach eased over 0.4–0.6s.
```js
lane += Math.sign(near - lane) * Math.min(dt / EASE, Math.abs(near - lane))
ctx.globalAlpha = 1 - DIM * lane                 // same scalar, both jobs
lane > .05 ? (drawActor(), drawSet()) : (drawSet(), drawActor())
```
⚠ The order flips at one value while the alpha is continuous — put the flip
where the dim is deepest, not at 0.5, or the pop lands in plain sight.

Where z is animated but slowly — a cloud turning at well under a revolution a
second — sort an index array rather than the marks, and only every 2nd–4th
frame. Between sorts the order is a frame or two stale, which no one sees while
neighbouring depths barely move; the positions still update every frame.
```js
if (++frame % 3 === 0) order.sort((a, b) => z[a] - z[b])
for (const i of order) draw(i)
```
⚠ Stale order shows as flicker where fast marks cross — raise the cadence, or
use buckets, once anything moves quickly in z.
