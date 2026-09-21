---
id: offscreen-anchored-wash
category: light
tags: [gradient,ground,atmosphere,ambient,color,cheap]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 12
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

Below roughly 8% peak alpha the rule above stops applying: there is no visible
hot core to hide, so the centre can sit *inside* the box and the ellipse can be
smaller than it — 40–60% of the width — and the result still reads as ground
that happens to be unevenly lit rather than as a lamp aimed at anything. Two of
them at opposed interior corners is the cheapest way to stop a flat near-black
field reading as a void. Peak alpha .03–.08, ellipse 40–70%.
```css
.hero::before { content: ""; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse 60% 45% at 18% 20%, rgb(var(--accent)/.07), transparent 65%),
              radial-gradient(ellipse 45% 40% at 85% 75%, #ffffff08, transparent 60%) }
```
⚠ At this alpha the wash is invisible on a mid-grey or light ground and on any
panel the reader has dimmed — it is a dark-ground device only, and nothing may
depend on seeing it.

The gradient form, unlike the blurred-element lamp above, is cheap enough to put
on *every* card as a hover state: a pseudo-element carrying one ellipse centred
past the bottom edge, transitioning `opacity` alone, so the card lights from
beneath instead of tinting. Nothing animates but a composited opacity, so a
twelve-card grid costs what one card costs. Centre 110–130% down, fade 0.4–0.6s.

The low-alpha interior form does transfer to a light ground, but only if the
wash is *chromatic*: a neutral at 5% on near-white is invisible, where the
accent hue at the same alpha is felt before it is seen. Anchor one per corner
region and rotate which corner across consecutive full-bleed sections — top
right, then top left, then bottom right — and the page reads as one room lit
from a moving source rather than a stack of flat bands. Accent .04–.10, ellipse
90–120%, one or two anchors per section.
```css
.warm { background: radial-gradient(120% 90% at 75% 18%, rgb(var(--accent)/.10), #0000 60%),
          radial-gradient(90% 80% at 12% 95%, rgb(var(--ink)/.07), #0000 55%), var(--paper) }
```
⚠ Keep the set closed — three or four named recipes, chosen per section — or
the anchors stop alternating and every ground drifts to the same corner.

Size the ellipse in `vh` on *both* axes where the wash belongs to the opening
screen rather than to its box. Percentages resolve against the element, so a
wash tuned on a laptop stretches into a flat band on a wide monitor and loses
its shape; stated as `ellipse 120vh 40vh at 50% 0` it holds the same
proportion, and the same fraction of the fold, at every width. Anchor it at the
top edge and the light reads as coming from above the viewport. Width
100–160vh against depth 30–50vh.
```css
.hero::before { background: radial-gradient(ellipse 120vh 40vh at 50% 0,
                  var(--wash), transparent) }
```
⚠ `vh` ignores the mobile URL bar's collapse, so the wash resizes mid-scroll on
iOS — use `svh` where the hero is pinned to the first screen.
