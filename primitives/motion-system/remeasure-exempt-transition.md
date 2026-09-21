---
id: remeasure-exempt-transition
category: motion-system
tags: [indicator,transition,resize,measurement,correctness]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A measured indicator — the underline under the active tab, the pill behind a
selected segment — moves for two unrelated reasons. The reader changed the
selection, which should animate; or the layout moved under it on first paint, a
font swap or a resize, which must not. Carry the reason on the write and declare
the transition only for the reader's case, so a re-measure lands silently instead
of sliding in from zero width. Skip a `ResizeObserver`'s first callback — it
fires on `observe`, before anything has resized. 280–380ms for the moved case.

```js
const place = instant => set({ left: el.offsetLeft, width: el.offsetWidth, instant })
useLayoutEffect(() => { place(!placed.current); placed.current = true }, [active])
```
```css
.ind:not([data-instant=true]) { transition: transform .34s var(--ease), width .34s var(--ease) }
```
⚠ Write the flag in the same commit as the geometry. Set it afterwards and one
frame renders the new position with the transition still armed.

The indicator also needs a state for *no* selection. Left at its last geometry
when the active item disappears — a filtered-out tab, a route with no match, a
first paint before hydration resolves — it keeps pointing at something, which is
a stronger claim than showing nothing. Collapse it to zero width and zero
opacity from the same writer that places it, so absence is a branch of the
measurement rather than a class somewhere else.
```js
const el = root.querySelector('[aria-current]')
set(el ? { x: el.offsetLeft, w: el.offsetWidth, on: true } : { w: 0, on: false })
```
⚠ Collapse the width too, not just the opacity — an invisible full-width box
still takes the transition on the way back and slides in from the wrong place.
