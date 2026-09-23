---
id: rate-split-channel-ensemble
category: canvas
tags: [canvas,field,ambient,technical,measurement,hierarchy]
axes: {energy: 2, density: 2, weight: 1, finish: 5}
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
Several line traces in one box read as output from several instruments only if
the channels differ in more than phase: give each its own baseline, amplitude,
wavelength and time coefficient, drawn from mutually incommensurate ranges so
the set never re-aligns into one chord. Peers alone are a graph. Promote exactly
one channel — heavier stroke, the only saturated colour — and the rest become
context for it. Baselines 0.25–0.7 of the height, amplitudes 8–28px,
coefficients 1.5e-4–3e-4, sampled every 3–5px.

```js
const ch = [{ y: .30, a: 14, f: .011, s: .00022 }, { y: .46, a: 20, f: .008, s: .00016 },
            { y: .55, a: 26, f: .006, s: .00019, lw: 1.6 }]   // last is the subject
for (const c of ch) { ctx.beginPath(); ctx.lineWidth = c.lw || 1
  for (let x = 0; x <= w; x += 4) ctx.lineTo(x, c.y * h + Math.sin(x * c.f + t * c.s) * c.a)
  ctx.stroke() }
```
⚠ The sample step is a function of the shortest wavelength drawn, not of the
box — coarser than about 5px and the fastest channel resolves as a zigzag.

Where the channels need not change shape, stop rebuilding them. Bake each once
into a static SVG path 2–3× the box width and move only its layer — a vertical
drift of 15–25px on its own period, 6–9s, eased both ways. The trace never
redraws and the motion is compositor-only; the unequal periods alone keep the
stack from reading as one rigid sheet.
```js
layer.animate({ transform: ['translateY(-20px)', 'translateY(20px)'] },
  { duration: 7000, direction: 'alternate', iterations: Infinity, easing: 'ease-in-out' })
```
⚠ A fixed shape drifting is not a signal changing — right for ambient texture,
wrong wherever the traces pretend to be live data.

The ensemble can resolve. Give each channel two parameter sets — its own, and
one target shared by all — and interpolate every term by a single 0–1 progress:
at 1 the traces coincide into one wave. Fade all but the promoted channel out
on the same value and lerp its colour to the resolved hue, or overlapping
strokes under a darkening blend sum to near-black at unison. Converge over
2–5s, hold 1–3s, release.
```js
const p = lerpSet(c.own, shared, t)   // amp, freq, phase, speed
c.opacity = c.promoted ? lerp(c.a, 1, t) : lerp(c.a, 0, t)
```
