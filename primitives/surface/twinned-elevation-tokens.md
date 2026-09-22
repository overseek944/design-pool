---
id: twinned-elevation-tokens
category: surface
tags: [shadow,elevation,tokens,hover,card]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 12
requires: []
conflicts: []
completes: []
tension: []
---
`box-shadow` interpolates only when both lists carry the same number of layers;
mismatch and the browser hard-swaps at the midpoint, which reads as a flicker
under the card rather than a lift. Ship the raised state as a *twin* of the
resting token — same layer count, blur, spread and colour, y-offset raised on
every layer — and the transition becomes a real rise. 1px per layer is the whole
effect; past 2–3px it reads as a jump rather than a hover.
```css
--lift-0: 0 12px 12px -6px #00000008, 0 6px 6px -3px #00000008, 0 2px 2px -1px #00000008;
--lift-1: 0 13px 12px -6px #00000008, 0 7px 6px -3px #00000008, 0 3px 2px -1px #00000008;
.card { box-shadow: var(--lift-0); transition: box-shadow .16s ease-out }
@media (hover: hover) { .card:hover { box-shadow: var(--lift-1) } }
```
⚠ A shadow change is invisible in forced-colors and to low-vision readers —
carry the state in a border or colour too.

On a dark ground a conventional shadow has nothing darker to cast and simply
disappears. Give it spread equal and opposite to its y-offset: the shadow box
collapses back onto the element's own rect and only the blur escapes downward,
so the dark pools under the panel as contact rather than haloing its sides and
greying the ground. Offset and blur roughly 1:2, offsets 16–40px.
```css
--contact: 0 30px 60px -30px #00000099;
```
⚠ A blur that large repaints on every size change — carry it on a static
wrapper, not on the element being animated.

The same rule governs an attention pulse. A ring that appears and goes needs
both ends of the keyframe to carry the *same* shadow list, the resting end set
to zero spread and zero alpha — `color-mix(in srgb, var(--accent) 0%,
transparent)` — so the layer interpolates instead of popping, and a spread-only
ring costs no layout and no reflow the way an `outline` or a border would.
Spread 3–6px, alpha 10–18% at the peak, period 2–3s.
```css
@keyframes hint { 0%, to { box-shadow: 0 0 0 0   color-mix(in srgb, var(--accent)  0%, transparent) }
                  50%    { box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 14%, transparent) } }
```
⚠ Stack it after any resting shadow in the same list, at the same index in both
frames — a pulse added as a second list is the mismatch this entry is about.

The same arithmetic governs `background-image`. Two gradients interpolate only
when they are the same function with the same number of stops; differ and the
fill hard-swaps mid-transition, which on a button reads as a flash rather than a
state. Author the hover fill as the resting fill's twin — same type, same stop
count, only the colours and stop positions moved.
```css
.btn       { background-image: linear-gradient(#4dc6ff, #00aeff 62%, #1bb6ff) }
.btn:hover { background-image: linear-gradient(#007bb8, #00aeff 38%, #4dc6ff) }
```
⚠ Gradient interpolation is a paint, not a composite — it repaints the box every
frame. Cheap on a 44px control, not on a full-bleed panel.

On a dark ground the *first* layer of every tier should be an inset hairline
along the top edge, not a shadow at all. A panel one step lighter than its
ground has no cast to give it an edge; a 1px inset highlight at 4–6% white is
the whole read, and the ambient shadow underneath only seats it. Scale the
highlight with the tier the way the blur scales, and put it at the same index
in both members of a twinned pair so the lift still interpolates.
```css
--elev-1: 0 1px 0 oklch(100% 0 0 / .04) inset, 0 2px  8px oklch(0% 0 0 / .5);
--elev-3: 0 1px 0 oklch(100% 0 0 / .06) inset, 0 24px 60px -24px oklch(0% 0 0 / .8);
```
⚠ The inset layer paints inside the border box, so it sits *under* a border and
disappears on any panel with an opaque one. Give those the highlight as the
border colour instead.

The twin argument is not only for two states. An object on a continuous float
loop whose shadow holds still reads as a sticker slid up the page — the ground
says it never left. Put the shadow on its own keyframe track with the same
period and matched layer counts, growing blur and negative spread as the object
rises, so the contact softens exactly when the gap opens. Blur +30–50% and
y +40–60% at the apex; hold both ends on the same keyframe as the transform.
```css
@keyframes lift  { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
@keyframes cast  { 0%,100% { box-shadow: 0 8px 20px -8px #00000014 }
                   50%     { box-shadow: 0 12px 28px -8px #0000001a } }
```
⚠ Two animations on one element is two tracks to keep in phase — same duration,
same timing function, or the shadow leads the object within a few cycles.

Which *channel* carries elevation swaps with the theme, so one set of tier names
has to be rebuilt rather than recoloured. On light ground the separation is
shadow, and the surface ramp can collapse — every tier above the third is the
same white. Invert it and the shadow has nothing left to darken: the surface
ramp does the work and has to keep stepping all the way up, 5–8 L* per tier. The
edge layer inverts with it — an outer `0 0 0 1px` on a dark panel paints onto
the ground as a halo, so it becomes `inset`.
```css
:root { --surface-3: #fff;    --shadow-3: 0 0 0 1px var(--edge), 0 3px 3px -1.5px var(--drop) }
.dark { --surface-3: #252525; --shadow-3: inset 0 0 0 1px var(--edge), 0 3px 3px -1.5px var(--drop) }
```
⚠ The collapsed light ramp hides a whole class of bug: a panel separated by tier
*lightness* alone looks right in dark and vanishes in light. Every tier has to
be checked in both, not derived from one.

A list carrying both a cast layer and an `inset` rim highlight has two halves
that move in *opposite* directions across a theme flip. Paper takes almost no
cast but needs a near-opaque rim to read as a lit edge; against ink the cast
deepens and that same rim must drop to a whisper or the panel looks chalked.
Ship the whole list per theme rather than swapping one colour inside it. Cast
6–10% alpha light against 12–18% dark, rim 70–90% light against 10–20% dark.
```css
:root { --lift: 0 4px 20px #0c124914, inset 0 1px 2px #fffc }
.dark { --lift: 0 4px 20px #00000026, inset 0 1px 2px #ffffff26 }
```
⚠ Both branches still owe the same layer count — a theme that drops the rim
layer entirely hard-swaps at the midpoint of any transition between them, which
is the flicker this entry opens by avoiding.

A panel straddling a section seam — head on one band, foot on the next — is lit
from no direction, and a downward-only list gives it a floor it does not have.
Add an inverted *first* layer: same colour, offset negated at roughly a third of
the downward one, alpha 50–70% of it. The panel then reads as suspended between
the two grounds rather than resting on the lower one, and the token still twins
because the layer count never moved. Up −6 to −12px, down 20–36px.
```css
--float: 0 -8px 40px -20px #0f111424, 0 28px 60px -28px #0f111438;
```
⚠ Both layers want negative spread near their own blur radius. Without it the
upward layer paints a halo along the top edge that reads as a light leak rather
than a lift — the tell is a panel that looks backlit on a white ground.
