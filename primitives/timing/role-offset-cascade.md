---
id: role-offset-cascade
category: timing
tags: [timing,motion,sequencing,choreography,tokens]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
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
