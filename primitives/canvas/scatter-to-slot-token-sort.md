---
id: scatter-to-slot-token-sort
category: canvas
tags: [canvas,text,order,progress,illustration,generative]
axes: {energy: 2, density: 3, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
"We make sense of the mess" drawn without art: scatter short text tokens
randomly, give each a grid slot, and lerp every one from its scatter point
toward its slot with one shared eased progress scalar. Ink climbs with
progress, and faint row rules fade in after 30–50% so the table seems to
form under the words. Grid 3–6 columns; ink 0.5→0.9.

```js
for (const t of toks) {
  t.x = t.sx + (t.gx - t.sx) * p; t.y = t.sy + (t.gy - t.sy) * p
  ctx.fillStyle = ink(.55 + .35 * p); ctx.fillText(t.s, t.x, t.y)
}
```
⚠ Canvas text is invisible to assistive tech: aria-hidden it, state the idea in DOM copy.
