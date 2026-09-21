---
id: masked-edge-highlight
category: surface
tags: [surface,border,light,mask,detail]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: [emitted-light-not-borders]
---
A hairline that is bright at one point and fades to nothing around the rest of
the ring, so a flat panel reads as catching light from a fixed direction. Draw
the border on an inset pseudo-element with `border: inherit`, then mask that
element with a radial ellipse. The plateau stop holds full strength before the
falloff begins; moving the centre re-aims the light. Plateau 0–20%, falloff
80–100%.

```css
.panel::after {
  content:""; position:absolute; inset:0; pointer-events:none;
  border:inherit; border-radius:inherit;
  mask: radial-gradient(ellipse var(--hi-w,20%) var(--hi-h,30%)
    at var(--hi-x,0) var(--hi-y,0),
    #000 0, #000 var(--hi-plateau,0%), transparent var(--hi-falloff,90%));
}
```
⚠ Not a contrast-bearing edge — on the far side the border is invisible, so never let it be the only thing separating an interactive control.

Across a row of peers the centre is not a constant. A distant source means every
panel takes the *same* centre; a near one means the centre steps with position —
30%, 50%, 70% across three — so the row reads as one lamp above it rather than
three copies of one card. Decide which before tuning any single panel; the usual
mistake is tuning one and repeating it.
```css
.row > * { --hi-x: calc(50% + (var(--i) - 1) * 20%) }
```
⚠ Step past the panel's own edges and the highlight leaves the box entirely —
cap the spread so the extreme origins still land inside 0–100%.

Where the panel is meant to read as a solid object rather than a lit card, one
highlight is wrong — glass catches the source at one corner and the ground's
bounce at the opposite one. Skip the radial mask and put a diagonal gradient in
the ring's own fill: opaque at 0% and 100%, clear across the middle 30–70%. Both
corners light, the perpendicular pair stays dark, and the ring is one
declaration with no centre to re-aim. Angle 300–330° for a light above-left.
```css
.ring { border: 1px solid transparent; border-radius: inherit;
  background: linear-gradient(315deg, #787878e3 0%, #78787800 30% 70%, #787878e3 100%) border-box;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask-composite: exclude }
```
⚠ `mask-composite: exclude` needs the `-webkit-` pair, and without it the fill
floods the whole panel rather than leaving a ring. Grey rather than white keeps
the bright corners from clipping against a light backdrop showing through.
