---
id: floor-merged-autoplay-progress
category: scroll
tags: [scroll,progress,autoplay,accessibility,architecture]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A sequence that moves only while the page moves is a flick on a trackpad and
nothing at all for a reader who stops to watch. Give it a second driver — a ramp
armed once, on first arrival — and merge the two in CSS with `max()`, never in
the script. Whichever is further ahead wins, so scroll pushes the sequence
forward but never rewinds past what has played, and stopping still sees it
finish. Ramp 6–12s, near the scroll budget's own length.

```css
.scene { --p: max(var(--p-scroll, 0), var(--p-auto, 0)) }
```
```js
if (reduced) return el.style.setProperty('--p-auto', '1')   // finished, not played
const t0 = performance.now(), step = t => {
  const k = Math.min(1, (t - t0) / 8000); el.style.setProperty('--p-auto', k.toFixed(4))
  if (k < 1) raf = requestAnimationFrame(step) }
```
⚠ Arm the ramp on first arrival only, never from the scroll handler — re-armed
per frame the clock restarts and the floor never rises. `max()` makes the scalar
monotonic, so any beat that has to play in reverse needs its own driver.
