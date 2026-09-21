---
id: three-tier-token-redefinition
category: scale
tags: [unit,tokens,architecture]
axes: none
cost: 2
seen: 7
requires: []
conflicts: []
completes: []
tension: []
---
One token name, three definitions: fluid desktop → fluid mobile → static floor.
Consumers never branch; every component reads `var(--fs-md)` and gets the right
value at every width. Breakpoint logic lives in exactly one block.

The narrow tier can change a token's *unit* rather than its number. Author the
ladder in `rem` and redefine it in `em` in the same block that drops the body
size: every heading then rides that one declaration instead of carrying its own
mobile value, and re-tuning the whole page's density at small widths is a single
edit. Ratios are the natural currency of the narrow tier anyway, where what
matters is the step between sizes rather than any absolute one.
```css
:root { --h1: 3.5rem; --h2: 2.5rem }
@media (width <= 40rem) { body { font-size: .8125rem }
                          :root { --h1: 2em; --h2: 1.5em } }   /* 1.6–2.4em */
```
⚠ An `em` token resolves at the point of *use*, not where it is declared, so the
same token yields different sizes at different nesting depths. The tier only
behaves while exactly one size-setting ancestor sits between the root and every
consumer — a heading inside a card that also sets a font-size shrinks twice.
