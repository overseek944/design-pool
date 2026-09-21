---
id: published-occupancy-inset
category: layout
tags: [layout,custom-properties,panel,viewport,architecture,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A side panel that pushes the page rather than covering it needs one number in
four places — the document's end padding, every viewport-anchored control's
offset, a centred column's margin, and a ground that must keep running
underneath. Publish it once as a registered inherited length; each consumer
derives its own compensation. Registration makes it interpolable, so one
transition on the root reflows the page and the panel's width is the only thing
written. Open 320–480px over 200–320ms.

```css
@property --dock { syntax: "<length>"; inherits: true; initial-value: 0px }
:root        { transition: --dock .28s ease-out }
body         { padding-inline-end: var(--dock) }
.pinned      { inset-inline-end: calc(var(--edge) + var(--dock)) }
.centred     { margin-inline-end: max(calc(50vw - var(--measure) - var(--dock)), 0px) }
.ground      { margin-inline-end: calc(0px - var(--dock)) }
```
⚠ Interpolating a length that feeds padding costs a layout pass per frame —
affordable once per open, never bound to scroll or drag. A consumer that drops
the `max(…, 0)` goes negative at narrow widths and throws its column off-screen.
