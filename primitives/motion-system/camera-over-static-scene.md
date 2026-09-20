---
id: camera-over-static-scene
category: motion-system
tags: [motion,transform,scale,focus,diagram,narrative]
axes: {energy: 3, density: 2, weight: 3, finish: 5}
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
To walk a reader through a diagram, move the viewport rather than the subject.
One wrapper takes `scale()` plus a `translate()` that re-centres the next point
of interest, returning to neutral between beats so the whole is re-established
before each push. Nothing inside moves relative to anything else, so a complex
scene stays coherent under motion that would scramble it part by part. Push
1.2–1.45×; translations under ±20%; hold 1.5–3s at each stop.
```css
@keyframes camera {
  0%,11% { transform: scale(1) translate(0) }
  15%,21% { transform: scale(1.34) translate(13%,-1%) }
  25%,28% { transform: scale(1) translate(0) }
}
```
⚠ Scaling up resamples raster content — the scene must be SVG, text or DOM to
survive a 1.34× push. Anything positioned `fixed` inside escapes the transform.

The same wrapper transform at a tenth of the amplitude is an idle, not a tour.
Nudge the scene's own resting angle by 2–4° and a few pixels over 8–14s and a
static construction reads as observed rather than printed — parallax appears
between parts at different depths with no per-part animation at all. The
resting transform must be the keyframe's `0%` and `to`, or the scene jumps on
the first frame.
```css
@keyframes idle { 0%, to { transform: rotateX(52deg) rotate(-39deg) }
  50% { transform: rotateX(55deg) rotate(-33deg) translate(4px,-2px) } }
```
⚠ One always-running transform on a large subtree; keep the scene off
`will-change` and let the compositor promote only while it animates.

Keyframes fix the tour at author time. Where the stops come from a script — a
sequence pausing on whatever it just did — publish the camera as four custom
properties instead, destination *and* duration together, and let one CSS
`transition` interpolate. The move runs on the compositor with no frame loop, a
scheduler that knows how long a beat is passes that number alongside the
position, and a stop can be inserted without touching a `@keyframes` block.
The same four properties are what any overlay reads to cancel the zoom.
```css
.stage { transform: translate(var(--cam-x), var(--cam-y)) scale(var(--cam-scale));
         transform-origin: 0 0; transition: transform var(--cam-ms) var(--cam-ease) }
```
```js
const move = (x, y, s, ms) => { const st = stage.style   // one task, one transition
  st.setProperty('--cam-ms', ms + 'ms'); st.setProperty('--cam-scale', s.toFixed(3))
  st.setProperty('--cam-x', Math.round(x) + 'px'); st.setProperty('--cam-y', Math.round(y) + 'px') }
```
⚠ Write all four in the same task. Split across frames it restarts the
transition from wherever it had reached, and each move lands short.
