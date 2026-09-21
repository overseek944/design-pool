---
id: overdamped-surface-tilt
category: interaction
tags: [interaction,pointer,transform,motion,restraint,custom-property]
axes: {energy: 2, density: 1, weight: 3, finish: 5}
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Most pointer-reactive surfaces try to keep up, and keeping up reads as a sticker
chasing a cursor. Make the transition far longer than the gesture — 0.9–1.4s —
and the surface never arrives while the pointer is still there: it drifts toward
a pose, and drifts back on the same curve when the pointer leaves. Amplitude is
what turns lag into mass: 2–5° against 800–1200px of perspective, no more.
Write each term to its own custom property and a scroll driver can add to the
same transform without either handler knowing about the other.

```css
.surface { transform: perspective(1000px) rotateX(var(--rx,0deg))
             rotateY(var(--ry,0deg)) translateY(var(--y,0px));
           transition: transform 1.1s cubic-bezier(.2,.7,.2,1) }
```
⚠ Gate the writes on `(hover: hover) and (pointer: fine)`. A touch device fires
one `pointermove` and no `pointerleave`, leaving the surface stuck off-axis with
nothing to reset it.

Where the pose has to be legible to the children — a glare position, a per-child
depth, a dimming — a CSS transition cannot carry it: each child would need its
own. Run one rAF that lerps a stored pose toward the target and publishes the
result as normalised channels on the element; every response downstream is then
a `calc()` in the stylesheet. Give the hover *envelope* a slower rate than the
position and the whole effect fades in and out independently of how the pointer
tracks.
```js
p.x += (t.x - p.x) * .10; p.h += (t.h - p.h) * .08   // .06–.14 / .04–.10
s.setProperty('--px', p.x.toFixed(4))                      // −1…1
s.setProperty('--mx', `${(50 + 50 * p.x).toFixed(2)}%`)    // glare origin
s.setProperty('--hover', p.h.toFixed(4))                   // 0…1 envelope
```
⚠ The loop runs whether or not a pointer is present. Stop it once the pose has
settled after `pointerleave`, or every such surface on the page costs a frame
forever.

The fix that warning asks for is a residual test, not a `pointerleave` handler:
compare the smoothed value against its target at the end of every frame and
stop requesting frames once the difference on every channel falls under an
epsilon. The next input restarts the loop, so a settled surface costs nothing
and a moving one is never a frame behind. Epsilon 5e-4 to 2e-3 of the
normalised range — tighter and the loop never reaches rest against floating
point.
```js
const step = () => { p.x += (t.x - p.x) * .09; publish()
  raf = Math.abs(t.x - p.x) < 5e-4 && Math.abs(t.y - p.y) < 5e-4
      ? 0 : requestAnimationFrame(step) }
const move = e => { read(e); raf ||= requestAnimationFrame(step) }
```
⚠ Teardown must remove the custom properties, not just the listener. Left on the
root at their last value they outlive the feature and the next thing to read
them inherits a stale pose.
