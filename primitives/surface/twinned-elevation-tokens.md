---
id: twinned-elevation-tokens
category: surface
tags: [shadow,elevation,tokens,hover,card]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 9
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
