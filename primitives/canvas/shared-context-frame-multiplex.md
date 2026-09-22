---
id: shared-context-frame-multiplex
category: canvas
tags: [canvas,webgl,performance,architecture,lifecycle,budget]
axes: none
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A browser keeps eight to sixteen live WebGL contexts and kills the oldest
silently, so one context per card breaks at the twelfth. Hold one offscreen
context with a single full-screen quad. Each element owns a plain 2D canvas and
registers its material; one loop swaps the quad's material per subscriber,
renders, and blits the frame in. Start on first registration, dispose when the
registry empties.

```js
for (const s of subs.values()) {
  if (s.w !== cw || s.h !== ch) r.setSize(cw = s.w, ch = s.h, false)
  quad.material = s.material; s.material.uniforms.uTime.value = t
  r.render(scene, cam); s.ctx.drawImage(r.domElement, 0, 0)
}
```
⚠ `premultipliedAlpha: false`, or blitted edges darken. Mixed sizes force a
resize per subscriber per frame — group by size, and cap the set at 6–12.
