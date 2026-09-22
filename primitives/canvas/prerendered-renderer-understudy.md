---
id: prerendered-renderer-understudy
category: canvas
tags: [canvas,progressive-enhancement,correctness,cls,state,architecture]
axes: none
cost: 3
seen: 14
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

Where the animated content is a *fetched payload*, the understudy need not be a
twin at all: bake one elected frame in the same encoding, inline it in the
bundle as base64, and hand it to the same decoder and the same renderer. First
paint is a real frame rather than a stand-in, there is no second composition to
drift out of sync, and the swap is one variable. A single frame of a quantised
field is 200–600 bytes — small enough to inline, unlike a poster image.
```js
let frames = decode(atob(INLINE_FIRST_FRAME))     // one frame, immediately
fetch(url).then(r => r.arrayBuffer()).then(b => { frames = decode(b); redraw() })
```
⚠ Inline bytes are uncacheable and sit in the entry chunk — one frame, never a
handful. Elect it by looking at it; frame zero is usually the empty one.

Where the twin is cheap enough to be gradients, put it on the host's own
pseudo-element rather than in a sibling. One box, one stacking position, one
thing for layout to place — the twin cannot drift out of registration with the
canvas because it *is* the canvas's box, there is no second node to mark
`aria-hidden`, and the state is still one attribute write.
```css
.stage[data-fallback=true]::before { content: ""; position: absolute; inset: 0;
  background: repeating-linear-gradient(84deg, #0000 0 22px, #ffffff12 23px),
              radial-gradient(ellipse at 58% 75%, var(--hot), transparent 70%) }
```
⚠ Only for a twin with no interior structure. Anything needing more than the
pseudo's single box — labels, several layers, a transition between them — wants
the sibling form back.
