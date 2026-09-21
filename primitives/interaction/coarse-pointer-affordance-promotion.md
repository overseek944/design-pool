---
id: coarse-pointer-affordance-promotion
category: interaction
tags: [accessibility,interaction,touch,correctness,media-query]
axes: none
cost: 1
seen: 5
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

The opposite gate — arming something *only* for a precise pointer — needs the
same suspicion and one extra clause. `(hover: hover) and (pointer: fine)` is
true on a touchscreen laptop, so a pointer-tracking decoration or a hover-only
control arms for a reader using their thumb. Add `not (pointer: coarse)`, or
test it separately and require both, and a hybrid device falls out of the
precise branch where reachability is at stake.
```js
const precise = matchMedia('(hover: hover) and (pointer: fine)').matches
             && !matchMedia('(pointer: coarse)').matches
```
⚠ Both queries describe the primary pointer only, so a machine with a mouse
attached later still reports the touch answer until something re-evaluates.
Subscribe to `change` on each.

A third modality is neither hover nor touch. A control faded out at rest is
still focusable, so a keyboard reader tabs to something they cannot see — and
making it `inert` instead trades one unreachable state for another. Add the
control's own `:focus-visible` to the reveal selector, not the container's
`:focus-within`, which lights the overlay for any focus passing through the
card. The reveal then has one rule per pointer class and none of them is a
fallback for the others.
```css
.thumb:hover .ctrl, .ctrl:focus-visible { opacity: 1 }
```
⚠ The control must be visible *before* it is operated, so it cannot transition
in from `visibility: hidden` or `display: none` on focus — only opacity and
transform may carry the reveal.
