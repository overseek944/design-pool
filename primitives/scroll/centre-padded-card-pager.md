---
id: centre-padded-card-pager
category: scroll
tags: [scroll,snap,carousel,rail,mobile,padding,peek]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [pointer-scoped-snap]
tension: []
---
A narrow card rail starts flush left and ends with its last card stranded at
the edge, so only middle stops look centred. Pad the port by half the leftover
width, scroll padding to match: every card, ends included, snaps centre with an
equal sliver of each neighbour. A floor keeps the pad a real gutter. Card
`min(75–85vw, 300–360px)`, floor 16–24px.

```css
.port { --w: min(80vw, 340px); --pad: max(20px, calc((100% - var(--w)) / 2));
  padding-inline: var(--pad); scroll-padding-inline: var(--pad);
  scroll-snap-type: x mandatory }
.card { width: var(--w); flex: none; scroll-snap-align: start; scroll-snap-stop: always }
```
⚠ The peeks are the only scroll cue — add position dots or arrows.
