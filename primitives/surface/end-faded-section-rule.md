---
id: end-faded-section-rule
category: surface
tags: [hairline,divider,gradient,section,restraint]
axes: {energy: 1, density: 1, weight: 1, finish: 5}
cost: 1
seen: 6
requires: []
conflicts: []
completes: []
tension: []
---

A full-bleed rule declares a measure it does not have: run it edge to edge and
it contradicts the column, clip it to the column and it announces a container
the eye cannot otherwise see. Paint it as a gradient that reaches zero alpha at
both ends instead and the line has no endpoints to justify. Peak alpha belongs
over the content, not at the viewport's geometric centre, so an asymmetric
layout takes an off-centre peak stop. Peak 20–40% of the line token; a full
strength peak reads as a clipped solid rule.

```css
.seam { height: 1px; border: 0;
  background: linear-gradient(90deg, transparent, var(--line) 50%, transparent) }
```
⚠ Not a contrast-bearing edge anywhere but its middle — never the only
separation between two interactive regions, and never the accessible boundary
of a group.

The opposite answer is to make the ends deliberate. Cap the rule with a small
disc at each end and it stops reading as a cut and becomes a measured span —
the drafting convention — stating the column's width where a faded rule states
nothing. Build the band at the disc's own diameter with the hairline absolutely
centred, so the caps cost no layout and the row is one number tall. Disc 4–7px
in the line token; larger and they read as controls.
```css
.span { position: relative; block-size: var(--cap, 5px) }
.span > i { position: absolute; inset-inline: 0; top: 50%; block-size: 1px;
  background: var(--line); translate: 0 -50% }
.span::before, .span::after { content: ""; position: absolute; top: 0; left: 0;
  inline-size: var(--cap); aspect-ratio: 1; border-radius: 50%; background: var(--line) }
.span::after { left: auto; right: 0 }
```
⚠ Honest only where the caps land on a real boundary — the measure, a column
edge. Capping a rule that ends at an arbitrary padding value announces a
structure that is not there.

The faded rule can carry hue as well as alpha. Pass it through three or four
stops of different hue at very low chroma — held near the ground's own lightness
— and it reads as light refracted through an edge rather than as a coloured
line, which a single tint at any alpha never does. It stays a hairline and it
stays neutral at a glance; the hue is only findable by looking for it. Chroma
low enough that each stop fails a hue-naming test on its own.
```css
.iris { height: 1px; border: 0; background: linear-gradient(90deg, transparent,
  #171b1424 12%, #b48ea866 34%, #8fa8b466 46%, #a8b48e66 58%, #171b1424 88%, transparent) }
```
⚠ Hue at this chroma is the first thing a low-quality panel or a colour-managed
screenshot loses — never the only difference between two rules that mean
different things.

A rule can run the full width and still declare the measure, by *breaking* for a
short gap at each column edge. Paint it as three absolutely-positioned segments
whose ends are all derived from the same gutter expression the container uses —
no wrapper, nothing to keep in sync — and drop a mark in each gap. The line then
reaches the viewport, so the page reads at its true width, while the two
interruptions state the column exactly where a capped rule would have stopped.
Gaps 8–14px, marks 2–5px.
```css
--g: max(48px, (100% - 1104px) / 2);
.seam { position: absolute; inset-block-end: 0; block-size: 1px; background: var(--line) }
.seam--mid  { inset-inline: calc(var(--g) + 10px) }
.seam--left { inset-inline: 0 calc(100% - var(--g) + 10px) }
```
⚠ The gaps are only legible against a quiet ground — over an image or a tint the
rule reads as three unrelated lines rather than one interrupted one.

A rule that is *revealed* rather than static wants its fade tied to the reveal
instead of to its ends. Derive the transparent stop from the same variable that
drives the clip, and the growing tip carries a soft head of fixed length at
every position — the line reads as being drawn rather than as a solid bar being
uncovered, and it never shows the hard edge a clip alone leaves. Head 80–200px;
shorter and it is a clipped end again.
```css
--end: min(100%, max(0px, var(--reveal)));
background: linear-gradient(to bottom, var(--line) 0,
  var(--line) max(0px, calc(var(--end) - 140px)), transparent var(--end));
```
⚠ Every write repaints the gradient over the element's whole box where the clip
alone would not — keep it a 1–2px sliver, and put no `filter` or shadow on it.
