---
id: prerendered-renderer-understudy
category: canvas
tags: [canvas,progressive-enhancement,correctness,cls,state,architecture]
axes: none
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A canvas that may not run should degrade to a picture, not to an empty box or to
flattened layout. Author a cheap declarative twin of the same composition in SVG
or CSS, stack both in one box at opacity 0, and let a single attribute choose:
`loading` shows the twin, `webgl` shows the canvas once it has drawn a frame,
`fallback` returns to the twin. Refusal on a metered connection, a constructor
that throws, and `webglcontextlost` — failure *after* success — all become one
assignment, with no blank first frame and no layout shift either way.

```css
.stage > * { opacity: 0; position: absolute; inset: 0 }
[data-renderer=webgl] .canvas,
[data-renderer=loading] .twin, [data-renderer=fallback] .twin { opacity: 1 }
```
⚠ Both layers are `aria-hidden` decoration or neither is. And keep the twin
cheap — a twin that itself costs a frame has no one left to stand in for.
