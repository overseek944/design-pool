---
id: offscreen-anchored-wash
category: light
tags: [gradient,ground,atmosphere,ambient,color,cheap]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 9
requires: []
conflicts: []
completes: [eased-fade-stop-ramp]
tension: []
---
A radial gradient centred inside its box shows its hot core and reads as a
spotlight aimed at the page. Put the centre *past* the frame and oversize the
ellipse, so only the shoulder of the falloff is ever visible: the same gradient
now reads as light arriving from somewhere off-screen. Two anchors of opposed
temperature, pushed toward opposite corners, give a hue that drifts across the
width instead of one flat tint. Ellipse 120–200% of the box, centre 85–110%
down, peak alpha .15–.35.

```css
.ground { background:
  radial-gradient(ellipse 140% 120% at 25% 102%, var(--warm) 0, transparent 100%),
  radial-gradient(ellipse 130% 110% at 75% 102%, var(--cool) 0, transparent 100%),
  var(--page) }
```
⚠ Wide low-alpha ramps band on 8-bit panels — hand-place the stops rather than
letting two interpolate. Nothing here may carry meaning: at these alphas the
whole wash disappears under `forced-colors`.

Three anchors hold where two read as a single diagonal, provided the third is
a low-chroma neutral-warm placed between the other two — it fills the seam
without adding a colour the palette has to account for. Past three the hues
average into a flat mud.

Lamps spend contrast; a scrim buys it back. Stack a directional
semi-transparent black *over* the finished wash — heavier at the edges, lightest
through the middle — and light text holds at every corner while the hue drift
survives underneath. This is what lets the wash be bright enough to see at all.
Edge alpha .30–.45, centre .10–.20.
```css
.ground::after { content: ""; position: absolute; inset: 0;
  background: linear-gradient(90deg, #0006, #00000026, #0000004d) }
```

Author the lamp as an *element* rather than as the ground's background and the
banding above largely stops being a problem: a heavy `filter: blur()` over the
same low-alpha radial gradient low-passes its own stop transitions, so the ramp
smooths without hand-placing anything. It also sizes independently of the
section — a lamp hung past a clipped edge can grow 30–50% at the wide
breakpoint while the section does not. Blur 60–90px, diameter 1.5–3× the blur.
```css
.lamp { position: absolute; inset-block-start: -8rem; inline-size: 24rem;
  aspect-ratio: 1; border-radius: 50%; filter: blur(72px);
  pointer-events: none;                                  /* and aria-hidden */
  background: radial-gradient(circle at 30% 30%, #6366f180, #0000 62%) }
```
⚠ Each lamp is a composited buffer the size of its box plus the blur on every
side. One or two per view — never one per card.

Inset the same element lamp *inside a subject's own box* and it stops being room
light and becomes backlight: a blurred disc sized to sit behind an alpha cutout,
not behind the section. Percentage insets, so it tracks the subject through
every breakpoint instead of needing a second set of numbers, and it pairs with a
long `drop-shadow` on the silhouette in front — the cutout is then lit from
behind and grounded at once. Inset 10–20% block, 6–12% inline.
```css
.subject { position: relative }
.subject > .lamp { position: absolute; inset: 17% 8%; border-radius: 50%;
  filter: blur(64px); background: radial-gradient(circle, rgb(var(--accent)/.3), #0000 65%) }
```
⚠ Sized to the box rather than to the silhouette, so a subject that does not
fill its frame shows the disc's edge past its own — pull the inset in until the
falloff, not the circle, is what clears the outline.

The wide-breakpoint growth above is a range, not a step, and the top of it is
higher than most systems reach. Content stops at its max measure around
1200–1400px while the viewport keeps going, so a lamp anchored to a viewport
corner at a fixed size shrinks in relative terms until it reads as a stray
mark on a 27" display. Give decoration its own ladder *above* the content's
last breakpoint — three or four steps between 1440 and 1800px, ~15% a step,
1.5–2.5× the base size at the top.
⚠ Tie the steps to the same custom property the lamp's blur or stop positions
read, or the falloff scales and the softness does not — a doubled lamp with a
fixed 120px blur reads twice as hard-edged as the one at the base size.
