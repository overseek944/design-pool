---
id: uncooperative-corner-reserve
category: layout
tags: [overlay,third-party,footer,layering,spacing,occlusion]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A vendor's floating launcher — support chat, consent, feedback — mounts into a
viewport corner at a z-index you cannot outbid and will never read a token you
publish. Reserve the corner from the page's side instead: derive one root value
from the launcher's diameter plus its own inset, and spend it as end padding on
whatever the page puts last. The footer's final row then clears it at every
width with nothing to negotiate. Diameter 48–64px, inset 16–24px.

```css
:root { --fab-reserve: calc(var(--fab, 56px) + 2 * var(--fab-inset, 20px)) }
.page-end { padding-block-end: var(--fab-reserve) }
@media (width >= 60rem) { .page-end { padding-inline-end: var(--fab-reserve) } }
```
⚠ Two vendors default to the same corner and whichever script loads last wins —
assign corners in each vendor's own config and re-check after any tag-manager
change. The reserve protects your content, not the widgets from each other.

Reserving space does not help when the page puts its own full-viewport surface
up — a mobile menu, a filter sheet, a lightbox. The launcher sits at a z-index
you cannot outbid, so it floats over the overlay and is the one thing on screen
still answering to the old context. Hide it for exactly the overlay's lifetime,
keyed off the root flag the overlay already sets, and target the vendor's own
host element rather than anything inside it.
```css
html.menu-open #vendor-launcher { display: none !important }
```
⚠ `display: none` unmounts an open vendor panel and most do not restore their
state — check whether the widget is expanded before hiding, or move it
off-screen instead. `visibility: hidden` leaves the launcher taking clicks.
