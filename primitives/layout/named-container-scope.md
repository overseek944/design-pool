---
id: named-container-scope
category: layout
tags: [layout,container-query,correctness,components,responsive]
axes: none
cost: 1
seen: 6
requires: []
conflicts: []
completes: []
tension: []
---
Any ancestor carrying `container-type` captures every unnamed `@container` rule
below it, so a card querying its own width starts answering to whatever
group it was dropped inside — nothing reports it: the query is still valid,
aimed at the wrong box. Name the container and query the name: the rule
states which element it measures, however deeply nested. Name every
container a shared component ships, not only today's ambiguous ones.
Thresholds 20–60rem, read against the container.

```css
.field-group { container: field-group / inline-size }
@container field-group (min-width: 28rem) { .field { grid-template-columns: 12rem 1fr } }
```
⚠ A name matching no ancestor matches nothing — there is no fall back to the
nearest container — so a typo fails silently, in the opposite direction from the
bug it fixes. Names are document-global, not scoped to the declaring file.
