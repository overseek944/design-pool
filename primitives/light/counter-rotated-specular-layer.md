---
id: counter-rotated-specular-layer
category: light
tags: [light,gradient,rotation,material,3d]
axes: {energy: 2, density: 2, weight: 3, finish: 5}
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
An object with its highlight painted into its own background spins the highlight
with it, and the lamp appears to orbit the room. Split them: the body carries
tint and shadow, a child layer carries the specular and rim gradients, and that
child is rotated by the negative of the body's angle each frame. The light stays
where the page's light lives while the object turns under it — the difference
between a rolling solid and a spinning decal.

```js
body.style.transform  = `rotate(${a}deg)`
sheen.style.transform = `rotate(${-a}deg)`   /* same origin, or it precesses */
```
⚠ Oversize the sheen (`inset: -15 to -25%`) or its corners sweep into view.
Only rotation inverts; translation and scale stay on the body.

In a shader the split is free and the highlight need not be a gradient at all.
Take the angle from the element's centre to the fragment and make the specular
a high power of the cosine of its difference from a light angle that advances
with time — exponent 8–20 sets the tightness, higher for a harder glint. Run
two at non-harmonic rates in opposite directions and the pair never returns to
the same configuration, so a perimeter lit this way does not loop.
```glsl
float a = atan(p.y, p.x), s = 0.0;
s += pow(max(cos(a - mod(uTime *  1.2, TAU)), 0.0), 16.0);
s += pow(max(cos(a - mod(uTime * -0.7, TAU)), 0.0), 12.0) * 0.5;
s = min(s, 1.5);
```
⚠ Two lights sum past 1.0 where they cross — clamp the total, or the crossing
blows out to white and reads as a flicker rather than as a pass.

The split needs no script when the body turns on a keyframe. Clip a light child
inside the body and give it the inverse keyframe at the *same* duration and
`linear` timing, so the two angles cancel on every frame. Scale the child
1.15–1.25 inside that keyframe: a square turned about its centre always covers
its inscribed circle, and the margin absorbs any radius morph on the body.
```css
.body  { overflow: hidden; animation: turn 31s linear infinite }
.light { animation: back 31s linear infinite }
@keyframes back { to { transform: rotate(-360deg) scale(1.18) } }
```
⚠ Divide the gradient's stop positions by that scale, or the highlight lands
off where it was drawn.
