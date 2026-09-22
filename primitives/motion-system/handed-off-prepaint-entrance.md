---
id: handed-off-prepaint-entrance
category: motion-system
tags: [motion,entrance,hydration,correctness,progressive-enhancement]
axes: none
cost: 3
seen: 4
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

The pre-paint half runs with no component context, so every condition the
component would have applied has to be re-implemented inline — which responsive
variant is active, and whether the reader asked for less motion. Serialise the
per-breakpoint states as one JSON blob the inline script reads, resolve the
breakpoint with `matchMedia` before animating, and answer `prefers-reduced-motion`
there too: a framework-side check cannot help, because by the time it runs the
wrong entrance is already playing.
```js
const bp = states[breakpoints.find(b => matchMedia(b.q).matches)?.hash ?? 'default']
if (matchMedia('(prefers-reduced-motion:reduce)').matches) return
```
⚠ A backgrounded tab defers the first frame indefinitely, so the entrance can
start seconds late — record `document.hidden` beside anything you measure here
or the timing is noise.
