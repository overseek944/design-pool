---
id: published-occupancy-inset
category: layout
tags: [layout,custom-properties,panel,viewport,architecture,correctness]
axes: none
cost: 2
seen: 3
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

Publish the duration beside the length. The root's transition carries everything
derived from the registered property, but a consumer animating something else —
a pinned control fading because the panel now covers it, a ground sliding under
— owns its own transition and drifts against the reflow the moment either is
retuned. One token both read is the whole fix. Give every `var()` on the pair a
fallback: a consumer rendered where no panel exists then resolves to `0px`/`0s`
rather than an invalid declaration that drops the rule entirely.
```css
:root   { --dock-ms: .28s; transition: --dock var(--dock-ms) ease-out }
.pinned { inset-inline-end: calc(var(--edge) + var(--dock, 0px));
          transition: opacity var(--dock-ms, 0s) }
```
⚠ A duration token is not an easing token — two elements on the same clock with
different curves still separate through the middle, which is the part the eye
actually watches. Publish the curve too, or publish neither.
