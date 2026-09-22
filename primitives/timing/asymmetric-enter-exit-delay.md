---
id: asymmetric-enter-exit-delay
category: timing
tags: [motion,sequencing,state,transition]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 6
requires: []
conflicts: []
completes: []
tension: []
---
A staggered group should cascade in and collapse out together. Carry the
per-item delay on the *entering* state only, zeroed on exit. Otherwise a group
that reverses spends the whole cascade again leaving, and a panel being
replaced is still dismantling itself as its successor arrives. Steps 60–250ms.
```jsx
transition: 'opacity .38s ease, transform .38s ease',
transitionDelay: on ? `${i * 120}ms` : '0ms'
```
⚠ The delay must flip in the same commit as the state, or the old delay holds
for a frame. Keep the full cascade under ~600ms; longer and a reader who has
already scrolled past sees items still at zero opacity.

`prefers-reduced-motion` is the third state, and collapsing the duration alone
does not serve it: the delay is untouched, so the reader still waits out the
whole ladder for changes that are now instantaneous — a stagger with nothing
staggered, which reads as lag rather than as calm. Zero the delay in the same
block as the duration. Where the per-item value arrives as an inline custom
property it outranks the stylesheet, so override the longhand rather than the
property it reads.
```css
@media (prefers-reduced-motion: reduce) {
  .item { transition-duration: .01ms; transition-delay: 0s !important } }
```
⚠ Collapse rather than cancel — `transition: none` fires no `transitionend`, and
anything sequenced off the last item's completion never runs.

Zeroing the exit is right when the group is being replaced and wrong when it is
being *closed*: a set that collapses together reads as a switch, one that
unwinds along the ladder it arrived on reads as a mechanism. Keep a delay on
both states and reverse the ramp instead — author the resting ladder on the
members, override `transition-delay` in the state rule with the ramp inverted,
and entering and leaving sweep in opposite directions for one extra declaration
per member, no script and no second keyframe set. Take this where the set is a
field the reader is watching; take the zeroed exit where something else is
arriving behind it.
```css
.cell:nth-child(1)        { transition: fill .5s steps(5, end) .45s }
.cell:nth-child(9)        { transition-delay: 0s }
.is-on .cell:nth-child(1) { transition-delay: 0s }        /* inverted ramp */
.is-on .cell:nth-child(9) { transition-delay: .45s }
```
⚠ Only the delay may differ between the two rules — change the duration or the
timing function as well and the two directions stop being the same move, which
reads as a glitch rather than as a reversal. The total still has to clear the
cap above, now in both directions.

The rule that only the delay may differ holds for a group reversing; a *pointer*
affordance is the case where it does not. Entering is the performance — long,
with overshoot — and leaving should be short and monotone, because a pointer
crossing a control on its way somewhere else must not trigger a second one.
Diverge duration and easing, and flip the delay on the secondary property so the
composite un-forms in the order it formed. Enter 0.8–1.1s with an overshoot
curve, leave 0.4–0.6s without.
```css
.btn .slug { transition: transform .6s cubic-bezier(.34,1.15,.5,1),
                         border-radius .35s var(--ease) .2s }
.btn:is(:hover, :focus-visible) .slug {
  transition: transform 1s cubic-bezier(.32,2,.4,1), border-radius .2s var(--ease) 0ms }
```
⚠ An overshoot curve past 1 travels outside its own range, so anything clipped
by an ancestor pops. Give `:focus-visible` the same rule as `:hover` in one
selector, or keyboard users get the resting transition and no affordance.

The delay is sometimes owed to a *neighbour's* duration rather than to the
element's own ladder. A divider a control draws only while closed must not
arrive while the thing it closes off is still visibly collapsing: give it the
neighbour's full duration as a delay on the closed state and none at all on the
open one, so it leaves the instant opening begins and returns only once the
fold has landed. Duration stays `0s` in both — a hairline should land, not fade
— and the start value is a transparent colour rather than `none`, which is not
a defined one to interpolate from.
```css
[data-fold]             { transition: grid-template-rows .5s cubic-bezier(.4,0,.2,1) }
[aria-expanded]         { box-shadow: inset 0 -1px 0 transparent; transition: box-shadow 0s }
[aria-expanded="false"] { box-shadow: inset 0 -1px 0 var(--rule);
                          transition: box-shadow 0s .5s }  /* = the fold's own duration */
```
⚠ Paint the line rather than moving the element to reveal one — a 1px offset
gives the same picture and a visible jump on every press. The two durations are
now coupled by hand: carry both on one custom property, or the delay drifts the
next time the fold is retimed.
