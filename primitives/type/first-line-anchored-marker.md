---
id: first-line-anchored-marker
category: type
tags: [type,list,marker,alignment,optical,correctness,fluid]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
`::marker` takes no position, so any custom bullet, rule or status dot is an
absolutely positioned pseudo-element — and the two obvious anchors are both
wrong. `top: 50%` centres on the whole item, so it drifts down the moment the
text wraps to a second line; a px `top` is right at one font size only. Anchor
it at a fraction of an em from the item's top and pull it back by half its own
height: the mark then holds the first line's optical centre at every size,
leading and wrap count. 0.55–0.75em, nearer the low end as leading tightens.

```css
li::before { position: absolute; left: 0; top: .7em; translate: 0 -50%;
             width: .35em; aspect-ratio: 1; border-radius: 50%; background: currentColor }
```
⚠ `list-style: none` drops the list semantics in some screen reader modes —
keep `role="list"` on the parent.
