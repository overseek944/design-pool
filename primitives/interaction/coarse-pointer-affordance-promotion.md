---
id: coarse-pointer-affordance-promotion
category: interaction
tags: [accessibility,interaction,touch,correctness,media-query]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Controls that fade in on `:hover` — a play button on a thumbnail, row actions, a
delete — are unreachable by thumb: the first tap is the hover. The coarse-pointer
block has to do three things. Unhide them, grow them to the target floor, and
hand the container back the space they now occupy permanently — a transient
overlay becomes furniture the moment it cannot hide, and a reveal without the
reserve parks it over the last line of every card. Floor 44px, reserve 2.5–4rem.

```css
@media (hover: none), (pointer: coarse) {
  .card-action { opacity: 1; transform: none; min-inline-size: 44px; min-block-size: 44px }
  .card-body   { padding-block-end: 3.5rem }
}
```
⚠ Both queries describe only the *primary* pointer, so a touchscreen laptop
reports `hover: hover` and gets the hover-only build. Where reachability is the
stake, do not gate it on a media query.
