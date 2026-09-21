---
id: sub-fusion-tremor
category: motion-system
tags: [motion,loop,drag,state,micro-interaction]
axes: {energy: 5, density: 1, weight: 1, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
Below roughly 100ms a period stops reading as motion and starts reading as
material: the eye cannot resolve the individual positions, so a sub-pixel loop
becomes a texture that says *this thing is live in your hand* — held mid-drag,
unsaved, running. Keep the amplitude under the width of the mark's own stroke
and the rotation under a fifth of a degree, or it reads as a broken animation
rather than a charged one. Author it on `translate` and `rotate`, never
`transform`, so a drag system writing transforms composes with it instead of
fighting it. Period 50–90ms, offset 0.5–1.5px.

```css
@keyframes tremor { 25% { translate: -1px .5px; rotate: -.12deg }
                    50% { translate: .95px -.6px; rotate: .12deg } }
.held { animation: tremor 65ms linear infinite }
```
⚠ 15Hz is inside the photosensitivity band. It must be `animation: none` under
`prefers-reduced-motion`, and it must never be ambient — only ever attached to
something the reader is actively holding.
