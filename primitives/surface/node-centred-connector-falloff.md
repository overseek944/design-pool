---
id: node-centred-connector-falloff
category: surface
tags: [surface,mask,connector,sequence,detail]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 2
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

Whatever the rail does, the node sitting on it needs a gap or the line runs
visibly under the mark. Two zero-blur `box-shadow` rings do it without a mask,
a `z-index` or an opaque background on the node: the inner ring in the page's
own ground punches the clearance, the outer one in a low tint reads as a halo
that separates the node from the rule. Clearance 2–4px, halo 1px. The node can
then be any shape and stay transparent.
```css
.node { box-shadow: 0 0 0 3px var(--page), 0 0 0 4px rgb(35 48 28 / .35) }
```
⚠ `--page` has to be the ground actually behind the rail — set from a section
token, not hardcoded, or the clearance paints a visible patch the first time the
list lands on a tinted band.
