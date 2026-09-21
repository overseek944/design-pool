---
id: provenance-split-label-row
category: layout
tags: [layout,type,label,truncation,provenance,correctness,detail]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A row of labels usually holds two kinds at once: terms from a controlled
vocabulary — short, known, safe to transform — and verbatim strings from
outside the system, whose length nobody owns. Only the second kind can run
away, so only it takes a width cap and an ellipsis. Give the two different
chrome, hairline outline against flat tint, and the asymmetric truncation reads
as a register rather than as a bug. Cap 8–12rem, or about three of the
vocabulary's widest term.

```css
.term     { border: 1px solid var(--line); text-transform: capitalize }
.verbatim { background: var(--tint); max-inline-size: var(--cap, 10rem);
            overflow: hidden; text-overflow: ellipsis; white-space: nowrap }
```
⚠ Never transform a verbatim string — it rewrites proper nouns and acronyms.
A truncated label loses its end silently: keep the full text in `title` or a
visually-hidden copy.
