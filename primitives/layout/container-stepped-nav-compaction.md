---
id: container-stepped-nav-compaction
category: layout
tags: [layout,container-query,navigation,header,responsive,tokens,i18n]
axes: none
cost: 1
seen: 1
requires: [named-container-scope]
conflicts: []
completes: []
tension: []
---
A header's link rail runs out of room at a width no viewport query predicts:
logo, CTAs and translated labels all vary. Make the rail a named container and
let 3–5 `@container` steps shrink only its spacing tokens, so it tightens
gradually and collapses to a menu button only below the last step. Steps
3–5rem apart; padding .5rem down to .125rem, gaps to 0.

```css
.nav-wrap { container: nav / inline-size }
.rail a { padding-inline: var(--pad, .125rem) }
@container nav (min-width: 38rem) { .rail { --pad: .375rem; gap: .0625rem } }
```
⚠ Keep every link's hit area at 24×24px or more at the smallest step, and
test the longest locale.
