---
id: measured-copy-keepout
category: layout
tags: [layout,measurement,legibility,canvas]
axes: none
cost: 2
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
Background art told to keep clear of the copy is usually given a fraction —
"the left 45% is text". That fraction is wrong at the first long headline, the
first translated string, the first reader at 200% zoom. Measure instead: the
block's own rectangle plus its computed sticky offset, taken as the max across
every block sharing the stage so the art does not jump between scenes, handed
to the renderer as one number. Clearance 24–72px beyond it.
```js
const keepout = Math.max(...blocks.map(b => b.getBoundingClientRect().height
  + (parseFloat(getComputedStyle(b).top) || 0)))
```
⚠ Observe the blocks, not the window — a reflow with no resize still moves the
box. Measure on resize and cache; reading geometry inside the frame loop
thrashes layout.

The number is half the job — what the art does with it decides whether the
keepout is visible. Clamping every offending element to the boundary line packs
them into a flat row along it, which draws more attention than the collision
would have. Push each one back along its own direction from the composition's
centre instead, or drop it and resample; either keeps the field's distribution
intact. Where the art is a connected structure, move the whole subgraph rather
than its members, or the links stretch into a visible fan at the edge.

An element that is `display: none` has no box to measure, and the scenes a
scrubbed stage has not reached yet are usually exactly that. Rather than
building a parallel model of what their layout would be, borrow it: set
`display` for the length of one synchronous read, take the offsets, put the
previous value back. The write and the read are in the same task, so nothing
paints — the cost is one forced reflow, not a flash.
```js
const prev = el.style.display; el.style.display = 'block'
const centre = el.offsetTop + el.offsetHeight / 2
el.style.display = prev
```
⚠ Once per resize, cached per element, never in the frame loop — this is the
most expensive reflow on the page. Read every measurement needed in one pass;
alternating writes and reads across several elements forces one each time.

`getBoundingClientRect` reports the *painted* box, so any element mid-entrance —
sliding in, scaled, settling — measures where it currently is rather than where
it belongs. Anything laying connectors, hit regions or a coordinate table over
animated nodes should read `offsetLeft`/`offsetTop` instead: they are layout
positions and transforms do not touch them. The geometry is then correct on the
first frame of the entrance rather than after it settles.
```js
const cx = el.offsetLeft, cy = el.offsetTop      // immune to the slide-in
```
⚠ Offsets are relative to `offsetParent`, so the container needs its own
positioning context — and they round to integers, which shows on hairlines.
