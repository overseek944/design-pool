---
id: scroll-lock-via-has
category: layout
tags: [overlay,correctness,overflow,dialog,cls]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Lock the page behind an overlay from CSS alone by keying off the overlay's
presence in the DOM. The lock cannot leak, because there is no class for a
close path to forget to remove — unmount the overlay and the page scrolls
again. Pad the root by the measured scrollbar width, published once as a custom
property, so nothing shifts when the scrollbar disappears.

```css
html:has(.overlay) { overflow: hidden; overscroll-behavior: none;
                     padding-inline-end: var(--scrollbar-w, 0px) }
```
⚠ Fixed-position siblings need the same compensation or they jump sideways.
This does not stop the overlay's own descendants from chaining their scroll to
the page — `overscroll-behavior: contain` on the panel is still required.

Where the lock must stay imperative, restore the *previous* value, never the
empty string. Two stacked overlays that each write `overflow: hidden` and clear
it to `''` unlock the page when the inner one closes, and a root that carried
its own `overflow` loses it permanently.
