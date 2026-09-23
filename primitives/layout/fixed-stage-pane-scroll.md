---
id: fixed-stage-pane-scroll
category: layout
tags: [layout,grid,scroll,shell,navigation]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 3
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
A page may decline to scroll. Fix the shell to the viewport as a clipped grid
and give each pane its own scroller. Navigating replaces one pane while the
other — a running demonstration, a map — keeps state and never remounts, which
is the whole argument for it. Hold the split in a variable so the reading pane
claims a *larger* share as the window narrows: 50% wide, 52–56% by the width
before it stacks.

```css
.stage { position: fixed; inset: 0; overflow: clip; display: grid;
         grid-template-columns: minmax(0,1fr) minmax(0, var(--split,50%)) }
.pane  { min-height: 0; overflow-y: auto; overscroll-behavior: contain }
```
⚠ Without `min-height: 0` a child grows instead of scrolling. This gives up the
mobile URL-bar collapse and page-wide find; a pane holding nothing focusable
needs `tabindex="0"` to scroll from the keyboard.

The shell is usually a wide-viewport arrangement, and collapsing it at a
breakpoint changes *which element scrolls* — the pane above, the document
below. Every viewport assumption in the page then has two answers: `sticky`
resolves against the pane, an IntersectionObserver needs `root` set to it,
`scroll(root)` must become `scroll(nearest)`, and `scrollTo` on `window` moves
nothing. Resolve the scroller once and pass it down rather than letting each
consumer guess.
```js
const port = matchMedia('(min-width: 48rem)').matches ? pane : null   // null = document
new IntersectionObserver(cb, { root: port })
```
⚠ `scroll-behavior` and `scroll-margin-top` belong to whichever element
scrolls. Left on the document they stop working at the wide breakpoint with no
error, and in-page links land under the sticky header.

Variant — a single-screen composition can keep the URL-bar collapse it gives up:
lock `html, body` fixed with `overscroll-behavior: none` only under a fine
pointer, and on touch give the body a 150–200vh runway so the first swipe folds
the chrome while the fixed stage stays put. ⚠ That scroll moves nothing — keep
the runway short.
