---
id: fused-run-highlight
category: type
tags: [type,annotation,editorial,diff,state]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Marking a run of blocks — changed lines, an annotated passage — one at a time
gives a column of chips with a seam at every break. Let each block ask about
its neighbour: a flagged block *followed* by another
drops its bottom radius and bottom margin, and the run fuses into one band
reading as a region rather than as paragraphs. Wash 8–15% alpha. Carry the same
test across a list boundary or every nested list reopens the band.

```css
.flag { background: hsl(40 80% 55% / .1); border-radius: 3px }
.flag + .flag { border-start-start-radius: 0; border-start-end-radius: 0; margin-block-start: 0 }
.flag:has(+ .flag), .flag:has(+ ul > .flag:first-child) {
  border-end-start-radius: 0; border-end-end-radius: 0; margin-block-end: 0 }
```
⚠ A wash alone does not say *what* changed — pair it with a word or a marker.
A list item cannot take the bleed as padding without dragging its marker along;
paint that ground on a negatively-inset `::after`.

The transient counterpart marks what *just* changed rather than what differs: a
tint at full strength held briefly, then decayed to transparent in one shot with
`animation-fill-mode: both`. Holding before the fade is what makes it legible —
a mark that begins decaying at 0% is gone before the eye reaches it. Hold 25–35%
of the cycle, total 1.2–3s. The mark leaves no residue, so a row that changes
ten times does not accumulate ten highlights.
```css
@keyframes flash { 0%, 30% { background: color-mix(in oklab, var(--accent) 6%, transparent) }
                   to      { background: transparent } }
.changed { animation: flash 1.6s var(--ease) both; border-radius: var(--r-control) }
```
⚠ Colour alone announces nothing. Pair it with a live region or a persistent
marker for anyone who was not looking at that row when it fired.

The hold is longer when the change was not the reader's. A value the reader
just edited needs only the short hold above; one a background process rewrote
has to survive a glance away, so the hold runs to half the cycle or past it and
the fade becomes a tail rather than the event. Hold 25–60% of the cycle, total
1.2–3s, and let the longer holds take the longer periods.
```css
@keyframes flash { 0%, 60% { opacity: 1 } to { opacity: 0 } }
.agent-touched::after { animation: flash 2.4s ease-out forwards }
```
⚠ Under `prefers-reduced-motion` cancel this one outright rather than collapsing
its duration — the whole content of the mark is its decay, and a 1ms version is
a colour that appears and vanishes between two frames, which is worse than the
untouched row. Whatever announces the change to assistive tech has to keep
working with the animation gone.
