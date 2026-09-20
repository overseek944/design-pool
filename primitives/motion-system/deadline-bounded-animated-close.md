---
id: deadline-bounded-animated-close
category: motion-system
tags: [motion,correctness,state,architecture]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A state change that waits on an animation never happens when the animation
never runs. A backgrounded tab stops ticking, a cancelled animation rejects, a
reduced-motion branch skips it — and the panel stays open forever. Race
`finished` against a timer slightly longer than the duration, and skip the
animation outright when the document is not focused. One re-entrancy flag keeps
a second dismiss from interleaving with the first. Slack 1.1–1.3× the duration.

```js
if (closing) return; closing = true
const a = el.animate(frames, { duration: 340, fill: 'both' })
await Promise.race([a.finished.catch(() => {}),
                    new Promise(r => setTimeout(r, 420))])
a.cancel(); el.close(); closing = false
```
⚠ `finished` rejects on cancel — swallow it inside the race or the close leaves
an unhandled rejection. Cancel after the race, never before the state changes.
