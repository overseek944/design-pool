---
id: micro-interaction-defaults
category: interaction
tags: [interaction,polish,consistency]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 1
seen: 9
requires: []
conflicts: []
completes: []
tension: []
---
One transition duration (`200ms`) and one property set for every non-narrative
state change across the entire site. Hover feedback should be beneath notice;
variation in micro-timing reads as sloppiness, not personality.

Range — `120–200ms` is the usable band, not `200ms` alone. Pick one value inside
it and hold it everywhere; interfaces that want to feel like tools sit at the
bottom of the band, marketing surfaces at the top.

Widened — the band runs `120–300ms` in practice. Marketing and editorial
surfaces sit at `300ms` on a long-tail ease-out, where the settle is meant to be
noticed as finish; tools stay at the bottom. Above `300ms` state feedback stops
reading as response and starts reading as latency.

Name the properties. `transition: all` eventually catches a layout property —
`gap`, `padding`, `width` — and a hover that relayouts its row cannot be
composited and can nudge its neighbours. To open a gap on hover, translate the
child and leave the box alone.

The ceiling is about travel, not time. A repaint-only change — colour, opacity,
border tint — holds at 350–500ms, where the same duration on a transform reads
as lag. Two tokens, if a surface wants slow colour and quick movement.

Ship hover and press as two root tokens, not per-component numbers, and make
them asymmetric around rest: `--hover-scale: 1.02` against `--press-scale: .97`.
The press travels further than the hover lifts because it has to register as
the stronger event under a finger that is covering the control. Useful band is
1.01–1.04 up and .95–.98 down; past that a text button looks like it is
breathing.
