---
id: name-pinned-transition-chrome
category: motion-system
tags: [motion,navigation,transition,chrome,accessibility]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 2
seen: 6
requires: []
conflicts: []
completes: []
tension: []
---
A root view transition snapshots the whole page, so a tab bar present on both
sides of a navigation leaves with the old page and returns with the new — the
one thing an application never does. Give it its own `view-transition-name` to
lift it out of the root snapshot, then pin its group with `animation-name: none`
and it holds still while the page slides beneath. Cross-fade old to new at
60–140ms so an active-tab mark still updates.

```css
[data-tabbar] { view-transition-name: tabbar }
::view-transition-group(tabbar) { animation-name: none; z-index: 60 }
::view-transition-old(tabbar), ::view-transition-new(tabbar) { animation-duration: .1s }
```
⚠ The name must be unique at capture time — apply it from the attribute marking
the transition in flight, or two instances abort the transition outright. The
group needs a `z-index` above the root or the pinned bar paints under the page.

A name is per element, so pinning or retiming a *family* — every card in a grid,
every row in a list — is one rule per name and a name generator to keep them
unique. `view-transition-class` is the other half of the pair: elements keep
their unique names for identity and share a class for styling, and one rule set
reaches all of them. Declare the class in CSS beside whatever assigns the name,
so nothing in script knows about presentation.
```css
.card { view-transition-class: card }        /* name still assigned per element */
::view-transition-group(.card) { animation-duration: .2s; animation-timing-function: ease-out }
::view-transition-old(.card), ::view-transition-new(.card) { animation-duration: .2s }
```
⚠ The class selects only groups that were actually captured — an element that
never received a unique name is absent from the pseudo tree and the rule misses
it silently, which looks identical to the animation being wrong.

A named region's snapshot does not inherit its `border-radius`. The group, the
image pair and both snapshots are square boxes, so a rounded panel morphs with
hard corners for the whole transition and snaps round only at the end. Give all
four the radius as `clip-path: inset(0 round R)` — which clips the snapshot
image, not merely the box — from the same token the element itself reads. And
where the rest of the page should not move at all, `animation: none` on the root
pair leaves exactly the named region animating.
```css
::view-transition-group(panel), ::view-transition-image-pair(panel),
::view-transition-old(panel),   ::view-transition-new(panel) { clip-path: inset(0 round .375rem) }
::view-transition-old(root), ::view-transition-new(root) { animation: none }
```
⚠ Killing the root pair's animation stacks both snapshots at full opacity with
the new one on top, so everything outside the named region swaps instantly.
Anything that was meant to cross-fade needs a name of its own.
