---
id: pointer-anchored-surface-light
category: light
tags: [light,pointer,hover,gradient,custom-properties,surface]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Let a panel light where the pointer is rather than uniformly. One radial
gradient on a pseudo-element, centred on two custom properties, faded in by
`opacity` so entry never recomputes the gradient. A single delegated
`pointermove` finds the nearest lit ancestor of the event target and writes the
properties there, so a hundred panels cost one listener and one rect read.
Radius 8–16rem, peak alpha 8–20%, fade 120–200ms.

```css
.lit::after { content: ""; position: absolute; inset: 0; opacity: 0; pointer-events: none;
  background: radial-gradient(circle 13rem at var(--lx,50%) var(--ly,50%), var(--glow), transparent 72%) }
@media (hover: hover) and (pointer: fine) { .lit:hover::after { opacity: 1 } }
```
⚠ The pseudo-element paints over the panel's own children — raise them with
`position: relative; z-index: 1` or the light washes the text. Bail on
`pointerType === 'touch'`, or a tap strands the glow where the finger left it.

Put the gradient in the *border band* rather than the fill and the light traces
the panel's edge instead of washing its contents — no raised children, no
pointer-transparent copy layer, and the interior stays exactly the flat surface
it was. A transparent border with the fill clipped to `padding-box` and the
pointer-centred gradient to `border-box`; fade the whole thing in on `opacity`
from a second, identical pseudo-element so the rim appears rather than sweeps.
```css
.card::after { inset: 0; border: 1px solid transparent; opacity: 0;
  background: linear-gradient(var(--bg), var(--bg)) padding-box,
    radial-gradient(24rem circle at var(--px) var(--py), var(--rim), transparent)
    border-box }
```
⚠ At a 1px band the gradient has almost no area to resolve in — keep the radius
large relative to the card, or the rim reads as a flat colour change.

Do not reset the coordinates on leave. Fading `opacity` out while the centre
snaps back to the box middle drags the light across the panel as it dims, which
reads as a second animation nobody asked for; leave the last position written
and the lamp goes out where the pointer left it. Fade out over 400–700ms
against 120–200ms in — the asymmetry is what makes the exit read as dimming
rather than as retreat.
⚠ The stale position is then live if the pointer returns by teleport — a tab
switch, a scroll under a still mouse — so re-read the coordinates on
`pointerenter` before raising the opacity, not after.
