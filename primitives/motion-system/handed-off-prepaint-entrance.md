---
id: handed-off-prepaint-entrance
category: motion-system
tags: [motion,entrance,hydration,correctness,progressive-enhancement]
axes: none
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An entrance owned by a framework cannot begin until that framework mounts, so a
hydrated page holds its opening frame for however long the bundle takes. Start
it twice: an inline script runs the keyframes through `Animation` at parse time,
and on mount the component asks whether one is already running and adopts its
`startTime` instead of beginning again. Both halves read the same document
timeline, so the seam is invisible. Earns its cost on entrances of 0.4–2s —
shorter ones finish before mount and only need cancelling.

```js
window.__pre = (el, kf, opt) => (el.__a = el.animate(kf, opt))
// on mount: const a = el.__a; if (a) { opt.startTime = a.startTime; a.cancel() }
```
⚠ The two halves must agree on the keyframes exactly — a spring resolved
differently either side jumps at the seam. Adopt, then cancel, in that order.
