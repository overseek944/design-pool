---
id: opt-out-prose-scope
category: type
tags: [prose,typography,cascade,specificity,architecture,rhythm,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A rich-text scope styles bare elements it did not author, and every component
dropped into the body — a card, a code tab, a callout — inherits paragraph
margins it never asked for. Give the scope an escape hatch: match elements
only when they are not inside a marked island, wrapped in `:where()` so the
whole selector carries zero specificity and any component rule wins
unassisted. Flow space as one token, 1–1.5em.

```css
.prose :not(:where(.not-prose, .not-prose *)):where(p, ul, ol, pre) {
  margin-block: var(--flow, 1.25em) 0 }
.prose { margin-trim: block-start }   /* else zero the first child */
```
⚠ `margin-trim` is barely shipped — keep the `:first-child` reset.
