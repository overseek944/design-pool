---
id: precomputed-cell-attenuation-field
category: canvas
tags: [canvas,legibility,performance,ambient,contrast,generative]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 8
requires: []
conflicts: []
completes: []
tension: []
---
A generative field at full strength everywhere either drowns the copy over it or
gets dialled down until it is invisible. Build a per-cell envelope once per
resize into a `Float32Array` — a soft well where the text sits, full strength at
the edges — and the per-frame cost becomes one read and a multiply. Legibility
with no visible mask edge, and the distance maths leaves the hot loop. Well
radius 0.4–0.6 of the shorter axis.

```js
field = new Float32Array(cols * rows)            // rebuilt on resize only
const d = Math.hypot((c*cellW - fx) / rx, (r*lineH - fy) / ry), k = 1 - d
field[r * cols + c] = d < 1 ? k * k * (3 - 2 * k) : 0
const alpha = Math.min(base * (1 - field[i]), .36)
```
⚠ Rebuild in the resize handler, never the frame loop — a stale field leaves the
well off-centre after a rotation. Cap the final alpha too; attenuation alone
guarantees no contrast floor.

Where the copy is a block flush to one edge rather than a centred mass, the
envelope collapses to one axis: a linear ramp over 80–150px from the text's
outer edge, clamped, with a second ramp holding the field off the bottom rule.
Two `clamp`-shaped multiplies and no distance call at all — worth taking when
the well would only ever be rectangular.

Where the field is generated rather than sampled, the cheapest envelope is none:
discard the cell at seed time if it falls inside the copy's box. One normalised
rect, tested once per resize, nothing stored and nothing multiplied per frame —
and the field can then composite additively with no contrast floor to defend
over the text, because nothing is drawn there. Inset 4–8% past the copy.
```js
if (x > .2*w && x < .8*w && y > .16*h && y < .84*h) continue   // copy lives here
```
⚠ A hard boundary becomes legible as an edge once the field is dense enough to
read as a texture. Past that point pay for the soft envelope.

On the GPU the envelope needs no buffer at all: hand the copy's box to the
display pass as one `vec4` — centre and half-extent in the canvas's normalised
space — and evaluate the well per pixel. Measuring the element beats assuming a
fraction, because the well stays correct through a long headline, a translated
string or a breakpoint change, and the whole envelope is four floats that move
only when layout does. Clear 88–95% at the centre, `smoothstep` out to 1.0 of
the half-extent.
```glsl
vec2 q = (vUv - uMask.xy) / uMask.zw;
float keep = 1.0 - 0.93 * (1.0 - smoothstep(0.55, 1.0, length(q)));
```
⚠ Measure on resize and after webfonts land, then cache. Reading
`getBoundingClientRect` inside the render call forces layout every frame, which
costs more than the buffer this was meant to replace.

The envelope need not be inside the renderer at all. A `mask-image` on the
canvas's wrapper — a radial gradient transparent at the copy and opaque past it
— hands the whole problem to the compositor: no buffer, no per-cell multiply,
no resize bookkeeping, because percentage stops follow the box. It is the only
form that is renderer-agnostic, so the same declaration covers a 2D field, a
WebGL pass and a video layer, and it is the right first reach when the well is
roughly elliptical. Clear out to 30–40% of the box, fully opaque by 70–80%.
```css
.field { -webkit-mask-image: var(--hole); mask-image: var(--hole);
  --hole: radial-gradient(ellipse 56% 62% at 50% 42%,
          transparent 34%, #000 74%) }
```
⚠ The mask crops what it fades, so anything the field is meant to bleed past —
a glow, a rule running to the edge — has to live outside the masked element.

Whichever envelope is used, clamp it to a *floor* rather than to zero. A ramp
that reaches 0 behind the copy removes the field from exactly the region the eye
spends longest in, so the panel reads as a rectangle of texture with a hole cut
in it. Hold 0.15–0.25 of full strength there and the field reads as attenuated
instead of absent, which is the whole point of paying for a soft envelope. Bend
the approach with a power of 1.4–1.8 so the recovery happens away from the text
rather than immediately past it.
```js
const u = (x - edge) / RAMP                                  // RAMP 80–150px
const k = FLOOR + (1 - FLOOR) * Math.min(1, Math.max(0, u)) ** 1.6
```
⚠ The floor is a contrast decision, not a taste one — it sets the worst ground
the copy ever sits on, so pick it against the text colour and check it there.
