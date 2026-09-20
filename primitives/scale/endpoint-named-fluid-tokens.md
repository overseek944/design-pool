---
id: endpoint-named-fluid-tokens
category: scale
tags: [tokens,fluid,naming,architecture,responsive]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Name a fluid token after the two pixel values it interpolates between —
`--text-fluid-20-80` — so the range is legible at the call site and nobody has
to open the definition to learn what a step does. The body is one `clamp()` in
`vi` rather than `vw`, which follows the writing mode's inline axis and ignores
a vertical scrollbar. A flat list of named ranges replaces an abstract scale
nobody can hold in their head.

```css
--text-fluid-20-80:  clamp(1.25rem, -5.1786rem + 10.7143vi, 5rem);
--space-fluid-16-24: clamp(1rem, .1429rem + 1.4286vi, 1.5rem);
```
⚠ Generate the middle term from the endpoints and a fixed viewport band —
360–1600px is a usable default. Hand-written slopes drift and then the name
lies, which is worse than no name at all.
