---
id: axis-turned-spine-label
category: type
tags: [type,label,writing-mode,collapse,chrome,accessibility]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A panel collapsed to a sliver has no room for a horizontal name, and dropping
the name leaves an unlabelled column. Turn the text's own block axis instead:
`vertical-lr` plus a half turn reads bottom-to-top in a 28–56px channel, stays
selectable and findable, and — as an absolutely positioned layer — never
reflows while the width animates. Cross-fade it against the expanded copy over
300–600ms, delayed 150–250ms so it arrives once the collapse is underway.

```css
.spine { position: absolute; inset: 0; display: grid; place-items: center }
.spine > span { writing-mode: vertical-lr; rotate: 180deg; white-space: nowrap }
```
⚠ A vertical line still wraps against the panel's height — without `nowrap` a
long label splits into columns. Where it duplicates a heading, `aria-hidden` it
or the name is announced twice.
