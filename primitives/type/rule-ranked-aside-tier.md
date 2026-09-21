---
id: rule-ranked-aside-tier
category: type
tags: [type,hierarchy,register,annotation,cheap]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A page that argues carries asides at several ranks, and sizing them apart
flattens the measure. Rank them on the leading rule instead: neutral hairline
for an observation, accent for a claim, and only the top rank earns a container
and a full border. Carry the register on the slope — observations italic, a
promoted aside upright — so the rule and the face agree and no aside needs a
label. Rules 2–3px, containers reserved for one or two per page.

```css
.note        { border-inline-start: 2px solid var(--rule); padding-inline-start: 1rem;
               font-style: italic; color: var(--ink-muted) }
.note.claim  { border-inline-start-color: var(--accent); font-style: normal;
               color: var(--ink) }
```
⚠ Rule colour alone is not a rank anyone can hear, and at 2px it fails 3:1 as a
non-text indicator. The slope change is what makes the tier survive
`forced-colors` and a monochrome print.
