---
id: overdamped-surface-tilt
category: interaction
tags: [interaction,pointer,transform,motion,restraint,custom-property]
axes: {energy: 2, density: 1, weight: 3, finish: 5}
cost: 1
seen: 8
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

Publish the pose on a stage and stacked children can each read it at their own
signed multiplier, which is where depth comes from: the near layer takes the
pointer at 1, the layer meant to sit behind takes −0.3 to −0.5, so it drifts
*against* the cursor. Counter-motion is the cue — a layer moving the same way
more slowly reads as a slow sibling, not as distance. Share the rotations
unscaled across every layer, or the stack shears instead of turning.
```css
.stage  { --card-x: 0px; --card-y: 0px; perspective: 1200px }
.near   { translate: var(--card-x) var(--card-y) }
.behind { translate: calc(var(--card-x) * -.45) calc(var(--card-y) * -.45) }
```
⚠ Depth needs the parallax and the scale ordering to agree. A back layer drawn
larger than the front one inverts the read no matter what the multipliers do.

Which surfaces get it is a content decision, not a stylistic one. A tilt plus a
shadow lift is the vocabulary of a button, so a display-only card wearing it
collects clicks that do nothing — the reader presses, gets no answer, and
presses harder. Put it only on frames that already answer a click, and where a
card is decorated this way make the whole frame activate its own primary
control so the press the decoration promised lands somewhere.
```js
card.addEventListener('click', e => {
  if (e.target.closest('a, button, input')) return   // controls keep their own
  card.querySelector('[data-primary]')?.click() })
```
⚠ A click handler on a `<div>` is not an affordance — the card still needs a
real control inside it for the keyboard, and this only forwards the pointer.

A tilted card that also has a scroll entrance has two writers on one
`transform`. Arm the pointer handler only once the entrance has finished — a
class the reveal sets — or the first hover overwrites the rise mid-flight and
the card snaps to its resting position. Let the shadow follow the pose: offset
it opposite the tilt at 6–12px per degree with the blur fixed, so the light
source stays put while the surface turns.
```js
if (!card.classList.contains('is-revealed')) return   // entrance owns transform
card.style.boxShadow = `${-ry * 3}px ${rx * 3 + 4}px 34px -6px #0000001a`
```
⚠ Re-read the bounding rect on scroll while tilting; a rect cached on enter is
wrong the moment the page moves under a stationary pointer.

Where the surface should read as sprung rather than heavy, swap the lerp for a
second-order step — carry a velocity, pull it toward the target, damp it — and
the pose overshoots and settles instead of easing in. Give scale its own
stiffer, more damped channel and a press can dip it below 1 while amplifying
the tilt 1.3–1.6×, so the card gives under the finger. Stiffness .05–.09 with
damping .78–.86 on rotation; .10–.14 / .70–.78 on scale; press scale .98–.99.
```js
v += (t - c) * .07; v *= .82; c += v      // rotation; overshoots ~10%
vs += (ts - cs) * .12; vs *= .75; cs += vs // scale channel
```
⚠ Past about .88 damping the pose rings visibly after release; below .75 the
spring is indistinguishable from the lerp and costs a velocity for nothing.
