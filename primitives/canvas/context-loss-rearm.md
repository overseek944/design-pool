---
id: context-loss-rearm
category: canvas
tags: [canvas,correctness,lifecycle,architecture]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A 2D context is lost the same way a WebGL one is — a GPU process restart, a
starved tab returning to the foreground — and every draw after it silently does
nothing. On `contextlost`, add the canvas to a set the scheduler and every draw
path consult, and stop requesting frames. On `contextrestored`, re-acquire the
context, zero the cached backing-store size so the next frame re-sizes and
re-applies its transform, discard timing samples spanning the gap, and restart
only once the set is empty. An offscreen sampling canvas loses its context
independently of the displayed one.

```js
for (const c of [view, sample]) {
  c.addEventListener('contextlost', () => { lost.add(c); stop() })   // do not cancel
  c.addEventListener('contextrestored', () => { ctx = c.getContext('2d', opts)
    w = h = 0; lost.delete(c); if (!lost.size) start() })
}
```
⚠ Inverted from WebGL, where `webglcontextlost` must be cancelled or nothing is
restored: cancelling a 2D `contextlost` hands the job back to you and
`contextrestored` never comes. Context options do not survive a restore.
