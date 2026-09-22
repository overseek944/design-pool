---
id: yielded-program-link
category: canvas
tags: [canvas,webgl,shader,performance,correctness,lifecycle]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

Linking a shader program returns immediately; asking whether it succeeded does
not. Drivers compile on their own threads, and the first read of `LINK_STATUS`
— or the first draw — blocks the main thread until that program is ready, which
on a cold shader cache is a stall exactly as the page is trying to paint.
`KHR_parallel_shader_compile` adds a completion query that does not block: link
everything first, then poll the set, yielding between polls, and read
`LINK_STATUS` only once the driver reports done. Without the extension, force
one program per turn rather than all of them. Poll every 5–20ms.

```js
const ext = gl.getExtension('KHR_parallel_shader_compile')
while (pending.length) { await new Promise(r => setTimeout(r, 10))
  if (!ext) { gl.getProgramParameter(pending.pop(), gl.LINK_STATUS); continue }
  pending = pending.filter(p => !gl.getProgramParameter(p, ext.COMPLETION_STATUS_KHR)) }
```
⚠ Completion is not success — read `LINK_STATUS` and the info log after the poll
clears, or a program that failed to link draws nothing and throws nothing.
