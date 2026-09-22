---
id: focus-handoff-on-self-removal
category: interaction
tags: [accessibility,focus,correctness,form,state]
axes: none
cost: 1
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
A control that removes itself when used — a form replaced by its confirmation, a
row that deletes itself, a chip that vanishes once applied — drops the keyboard
onto `<body>`, and the next Tab restarts from the top of the document. Choose
the successor before the removal, give it `tabindex="-1"`, and focus it after
the swap. Announcement and position are separate problems: a live region tells
the reader what happened, the focus move keeps them where it happened.

```js
const inside = form.contains(document.activeElement)
form.hidden = true; done.hidden = false
if (inside) { done.tabIndex = -1; done.focus() }
```
⚠ Move focus only if it was inside what you removed, or a pointer user is
scrolled to a message already on screen. A `role="status"` present at load and
then unhidden announces reliably; one inserted at that moment often does not.

Nothing has to be removed for the same break to happen. An element made inert in
place — `tabindex="-1"` and `aria-hidden` swapped onto a sibling as a mode flips,
an overlay link handing over to the thing it covered — strands the keyboard on a
node that no longer accepts it. Move focus across at the moment of the swap, and
only when it was on the element being disabled. `preventScroll: true` matters
here in a way it does not on removal: both elements are on screen, so the
default scroll-into-view jumps a page that was already in the right place.
```js
const had = document.activeElement === outgoing
setInert(outgoing); enable(incoming)
if (had) incoming.focus({ preventScroll: true })
```

A restore that is deferred at all has to re-check its target. An overlay that
remembers `document.activeElement` on open and focuses it again on close holds a
reference that may have been unmounted while the overlay was up — a row behind
it re-rendered, a step replaced. Test `isConnected` and fall back to the control
that opened it; focusing a detached node drops the keyboard on `<body>` with no
error to notice.
```js
const back = saved?.isConnected && saved !== document.body ? saved : trigger
back?.focus()
```
