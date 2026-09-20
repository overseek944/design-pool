---
id: pointer-scoped-snap
category: scroll
tags: [scroll,snap,pointer,input,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Mandatory snap is right for a thumb and wrong for a wheel: a trackpad flick
that lands between items gets yanked, and a mouse loses the ability to stop
anywhere. Scope it to the input, not the breakpoint — `any-pointer: coarse`
catches touch at any width where a width query does
not. `scroll-snap-stop: always` keeps a fast flick from skipping items.

```css
@media (any-pointer: coarse) {
  .feed      { scroll-snap-type: y mandatory; scroll-padding-top: var(--chrome) }
  .feed > *  { scroll-snap-align: start; scroll-snap-stop: always }
}
```
⚠ `any-pointer` is true if *any* attached pointer is coarse, so a touchscreen
laptop takes the touch branch while using a mouse. Prefer `proximity` where
being pulled is worse than not snapping.
