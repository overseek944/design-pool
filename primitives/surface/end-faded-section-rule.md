---
id: end-faded-section-rule
category: surface
tags: [hairline,divider,gradient,section,restraint]
axes: {energy: 1, density: 1, weight: 1, finish: 5}
cost: 1
seen: 2
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
