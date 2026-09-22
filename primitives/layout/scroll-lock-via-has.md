---
id: scroll-lock-via-has
category: layout
tags: [overlay,correctness,overflow,dialog,cls]
axes: none
cost: 1
seen: 12
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

Lock the element that actually scrolls. An app shell that pins `html, body` to
`height: 100%; overflow: hidden` and scrolls an inner pane makes every rule
written against the root a no-op — the overlay opens and the pane underneath
still moves. Key the `:has()` off whichever ancestor owns the overflow, and
where more than one pane can scroll, off each of them.

Where the page's own layout is a function of `scrollY` — a fixed stage scrubbed
by a spacer — hiding overflow is the wrong lock entirely: it collapses the
scroll height, and the scene underneath resets to its first frame. Leave
scrolling intact and re-pin instead. Cancel `wheel` and `touchmove`
non-passively, restore the stored offset from any `scroll` that slips through,
and swallow the scrolling keys unless focus is already inside the panel.
```js
const y = scrollY
addEventListener('scroll', () => scrollY !== y && scrollTo(0, y), { passive: true })
addEventListener('wheel', e => e.preventDefault(), { passive: false })
```
⚠ A non-passive `wheel` listener on the document taxes every scroll on the
page — bind it on open and remove it on close, never at startup. Space and
PageDown scroll too, and no pointer handler sees them.

Lock `body`, never the root, on any page that contains a `position: sticky`.
`overflow: hidden` on `html` makes the root a scroll container, and a sticky
element resolves against its nearest scrolling ancestor — so every pinned
section on the page silently stops pinning for as long as the overlay is open
and resumes when it closes, which presents as a scroll bug nowhere near the
overlay. `body`'s overflow propagates to the viewport, so the lock is identical
and nothing below it changes container.
```css
body:has(.overlay) { overflow: hidden; overscroll-behavior: none }
```
⚠ Only one of the two propagates: if `body` already carries a non-`visible`
`overflow` the propagation stops and the root keeps scrolling. Check the reset
before relying on this.

iOS Safari keeps scrolling the page after a touch gesture has begun regardless
of the root's `overflow`, so a lock that must hold on a phone takes `body` out
of flow instead: store `scrollY`, set `position: fixed` with `top` at its
negation, and restore both on release. Nothing can move because nothing is in
flow — the cost is that the offset must be handed back explicitly.
```js
const y = scrollY
body.style.cssText = `position:fixed;top:${-y}px;left:0;width:100%`
// release: body.style.cssText = ''; scrollTo(0, y)
```
⚠ Clearing the styles without the `scrollTo` drops the reader at the top of the
page. Anything sampling `scrollY` while the lock is up reads 0, so a scroll-
driven scene must be frozen for the duration rather than left running.

A lock that is a *design* rule rather than an overlay rule needs an exit in the
same breath. Pinning a one-screen composition to `100dvh` with `overflow:
hidden` is correct until the thing inside it grows — a form gaining a step, a
list gaining a row — and then the last control sits below the fold, clipped and
unreachable, with nothing on screen to say so. Write the release against the
same state the growth is keyed to, so the page becomes an ordinary document the
moment it stops being one screen.
```css
html:has(.stage)            { height: 100%; overflow: hidden }
html:has(.stage.is-flowing) { height: auto;  overflow: visible }
```
⚠ Test at the shortest viewport the layout claims to support, not at the
designer's. A laptop with a browser toolbar open is 100–200px shorter than the
mock, which is exactly where this fails and where it is never checked.

An app shell that scrolls an inner pane has the compensation problem without the
lock: the pane's own scrollbar eats width from a column that is supposed to
reach the viewport edge, and padding the root reaches nothing. Publish the
measured width as a *registered* length so it is legal inside `calc` and
resolves to `0` before script runs, then cancel the gutter on the inner column
with a negative inline margin rather than padding around it — full-bleed rules
and section grounds then still meet both edges.
```css
@property --scrollbar-w { syntax: "<length>"; inherits: true; initial-value: 0px }
.shell  { overflow-y: auto; height: 100dvh }      /* JS: offsetWidth - clientWidth */
.column { margin-inline-end: calc(var(--scrollbar-w) * -1) }
```
⚠ Re-measure on resize and on theme or zoom change — the value is `0` under
overlay scrollbars and jumps to 15–17px the moment a mouse is attached on the
same machine. Nothing interactive may sit in the cancelled strip.
