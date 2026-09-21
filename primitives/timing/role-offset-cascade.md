---
id: role-offset-cascade
category: timing
tags: [timing,motion,sequencing,choreography,tokens]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Split a cascade into two independent halves: the group's entry time, carried as
one custom property, and each part's offset inside the group, fixed per semantic
role in the stylesheet. Markup then only ever says *when this group starts*, and
the internal rhythm — container, then portrait, then name, then words — is
authored once and identical everywhere. Role offsets 100–350ms apart; a
per-item index rides on top for lists.
```css
[data-part="card"]   { animation-delay: var(--in) }
[data-part="avatar"] { animation-delay: calc(var(--in) + .15s) }
[data-part="word"]   { animation-delay: calc(var(--in) + .35s + var(--i)) }
```
⚠ The offsets are additive, so the last role sets the group's true length —
check it against the gap to the next group or two cascades overlap.

A row's separators are not items and should not take the item's offset. Dots,
slashes and pipes cascaded on the same index arrive *after* the word they
introduce, so the row lands as words-then-punctuation rather than as one sweep.
Bias each separator ahead of its follower by a fraction of the step — it reads
as the line being drawn left to right instead of assembled. Lead 30–50% of the
step.
```css
.item { animation-delay: calc(var(--i) * 55ms) }
.sep  { animation-delay: calc(var(--i) * 55ms - 25ms) }   /* clamp at 0 */
```
⚠ A negative delay is not a lead — it starts the animation already part-played.
Clamp the first separator's value at zero, or it appears fully formed while
everything after it is still arriving.
