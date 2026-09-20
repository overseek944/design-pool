---
id: inert-tracks-opacity
category: interaction
tags: [accessibility,focus,correctness,overlay,pointer-events]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
An element faded to `opacity: 0` is still in the tab order, still hit-tests and
is still read aloud. Chrome that fades in and out with scroll position, and
panels that belong to one beat of a narrative, therefore collect a pile of
invisible focus stops. Derive all three facts from the one progress value that
drives the fade, at the same threshold, in the same place: `inert` covers focus,
the accessibility tree and pointer events in one property.

```js
const on = p > 0.5
el.style.opacity = p
el.inert = !on
```
⚠ `inert` on an ancestor of the focused element moves focus to the body — check
`el.contains(document.activeElement)` first and hand focus somewhere deliberate.
`visibility: hidden` does the same job declaratively but cannot be transitioned
alongside opacity without a `transition-behavior: allow-discrete` branch.

Where the branch must be declarative and `allow-discrete` is not an option, pair
the two properties on one transition and delay only the discrete one — by the
fade duration on the way out, by zero on the way in. The element stays visible
for the whole fade, then flips out of the tree in the same frame the fade ends,
with no timer to leak and no class to forget.
```css
.panel     { opacity: 0; visibility: hidden;  transition: opacity .3s, visibility 0s .3s }
.panel.on  { opacity: 1; visibility: visible; transition: opacity .3s, visibility 0s }
```
⚠ The delay and the fade are one number written twice: change the duration in
one place and the element vanishes mid-fade or lingers as a dead hit target.
Bind both to the same custom property.
