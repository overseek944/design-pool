---
id: node-centred-connector-falloff
category: surface
tags: [surface,mask,connector,sequence,detail]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A rule running the length of a step list is equally present everywhere, so it
describes the whole sequence and nothing about where the reader is. Split it
into two half-segments on the active row's `::before` and `::after`, then mask
each with a linear gradient pointing *away* from the node: the line is at full
strength where it touches the current step and decays toward its neighbours.
Attention falls off with distance instead of being announced. Far end 25–40%
alpha, never 0 — the path has to stay traceable.

```css
.step::before, .step::after { content:""; position:absolute; left:13px;
  border-left: 2px dotted var(--rule); opacity:.3; transition:opacity .4s }
.step::before { top:0; height:50% }   .step::after { top:50%; bottom:0 }
.step.active::before { opacity:1; mask-image: linear-gradient(#0006, #000) }
.step.active::after  { opacity:1; mask-image: linear-gradient(#000, #0006) }
```
⚠ Decorative only — position in the sequence must also live in an `<ol>` or an
`aria-current`, or the cue is invisible to anyone not looking at the rail.
