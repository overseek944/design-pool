---
id: swapped-target-pass-chain
category: canvas
tags: [canvas,shader,webgl,architecture,correctness]
axes: none
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

One long fragment shader cannot be reordered, disabled or tuned in parts. Split
it into independent full-screen programs over a shared unit quad and run them as
an ordered list: each reads the texture last written and draws into the other of
two same-sized targets, which are then swapped. Adding or reordering a stage is
then an edit to an array, not a new render path. Reallocate both targets only
when the canvas dimensions change. Chains of 3–6 stages; two targets whatever
the length.

```js
let [read, write] = [a, b]
chain.forEach((p, i) => { const last = i === chain.length - 1
  gl.useProgram(p.prog); bindTex(p.prog, 'tInput', read.tex); p.uniforms()
  gl.bindFramebuffer(gl.FRAMEBUFFER, last ? null : write.fbo)
  gl.viewport(0, 0, w, h); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  if (!last) [read, write] = [write, read] })
```
⚠ A target bound as both source and destination is undefined — no stage may
read what it writes. Set the viewport on every bind or a stage following a
smaller-target one renders into a corner.
