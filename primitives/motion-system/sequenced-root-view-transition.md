---
id: sequenced-root-view-transition
category: motion-system
tags: [motion,navigation,transition,accessibility]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 2
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
The default root view transition cross-fades outgoing and incoming pages on top
of each other, and on a dense page that reads as a double exposure — two
headlines, two navs, ghosting. Sequence the halves instead: fade out, then fade
in after the first finishes, and extend the *group* duration to their sum or it
clips the second half. Each half .18–.30s.

```css
::view-transition-old(root) { animation: .25s ease-in  both fade-out }
::view-transition-new(root) { animation: .25s ease-out .25s both fade-in }
::view-transition-group(root) { animation-duration: .5s }
```
⚠ Under `prefers-reduced-motion` keep this fade — it is opacity only and marks
that the page changed — and kill every *element-level* transition instead:
`::view-transition-group(*) { animation: none !important }`.

The other answer to the double exposure is to animate only one half. Hold the
outgoing snapshot perfectly still, put the incoming one above it, and open the
new page through a `clip-path` circle grown from wherever the control was
pressed — nothing cross-fades, so nothing ghosts, and the change reads as
originating at the reader's own click rather than at the page. Pass the origin
as custom properties on the root. 0.35–0.5s.
```css
::view-transition-old(root) { animation: none; z-index: 0 }
::view-transition-new(root) { z-index: 1; animation: .4s ease-in-out both reveal }
@keyframes reveal { from { clip-path: circle(0 at var(--x) var(--y)) }
                    to   { clip-path: circle(150% at var(--x) var(--y)) } }
```
⚠ Both pseudos need `mix-blend-mode: normal`; the default blending assumes a
cross-fade and tints the clipped layer. A percentage radius is measured off the
box diagonal, not off the origin — from a corner control, 150% still lands
short, so use `calc()` over the real distance or overshoot to 200%.

Neither half has to fade at all. A stack navigation wants *direction*: put the
axis on the root as an attribute set just before `startViewTransition`, and one
attribute value selects a pair of keyframes. The page being left does not leave
— it holds at a fraction of the travel and dims, which is the depth cue that
separates a stack from a slide, and on the way back it is the outgoing page that
rides above. Travel 100%, the held layer 15–30% and `brightness(.82–.9)`.
Durations 100–250ms; a stack push slower than that stops reading as instant.
```css
[data-nav=push]::view-transition-new(root) { animation: .18s both slide-in }
[data-nav=push]::view-transition-old(root) { animation: .18s both sink }
[data-nav=pop] ::view-transition-old(root) { z-index: 1; animation: .18s both slide-out }
@keyframes slide-in { from { translate: 100% } }
@keyframes sink     { to { translate: -24%; filter: brightness(.86) } }
```
⚠ The attribute has to be cleared when the transition finishes or the next
navigation inherits the last direction. Without the `z-index` on the pop the
incoming page paints over the one supposedly sliding off it, and the gesture
reverses.

Across documents the feature is declarative and so is its off switch.
`@view-transition { navigation: auto }` opts a multi-page site in with no script
at all, and the same rule set to `none` inside a reduced-motion query withdraws
it outright — which is the right call for anything richer than a cross-fade,
since a cross-document transition has no `startViewTransition` call to branch
on.
```css
@view-transition { navigation: auto }
@media (prefers-reduced-motion: reduce) { @view-transition { navigation: none } }
```
⚠ It withdraws the transition, not the navigation — pages still change, they
cut. The rule says nothing about same-document transitions: those still need
their own branch in script.
