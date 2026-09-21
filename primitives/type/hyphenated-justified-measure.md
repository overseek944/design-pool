---
id: hyphenated-justified-measure
category: type
tags: [type,prose,editorial,measure,correctness]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Justified body copy sets a page as a printed specification rather than a web
document — a register worth reaching for where the text argues rather than
sells. It holds only with hyphenation enabled and a language the engine has a
dictionary for, because word breaks are what absorb the slack instead of the
word spaces. Below roughly 45 characters a line there are too few gaps to
spread it over and every paragraph rivers.

```css
html   { hyphens: auto }                 /* and a real lang attribute */
.prose { text-align: justify; max-width: 60ch }   /* 45–75ch */
```
⚠ `hyphens: auto` is inert without a supported `lang`, and a wrong one
hyphenates wrongly. Fall back to `text-align: start` under ~480px: a phone
column has no width to distribute, and that is where rivers ship.
