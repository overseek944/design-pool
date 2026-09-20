---
id: stacking-register
category: layout
tags: [architecture,z-index,tokens,correctness,overlay]
axes: none
cost: 1
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
One file owns every stacking value in the product as named tokens, and no
component may write a raw `z-index` again. Leave wide gaps between bands so a
new surface can be inserted without renumbering, order them by how modal the
thing is, and keep a debug band above everything so instrumentation always
draws on top. The names are the documentation: the register is the
interaction hierarchy, readable without opening a component.

```css
:root {
  --z-header: 100; --z-overlay: 500; --z-popover: 600;
  --z-dialog: 700; --z-toast: 800; --z-tooltip: 1100;
  --z-skip-nav: 5000; --z-debug: 11000;
}
```
⚠ A token is useless across a stacking context boundary — `transform`, `filter` or `will-change` on an ancestor traps a child below unrelated siblings whatever its value.

The trap has a deliberate use. A child at `z-index: -1` paints behind its
parent's background and vanishes; `isolation: isolate` on the parent opens a
stacking context so negative-z children land above that background and below the
content. One section can then carry a photograph and a scrim as two ordinary
children, and the isolation stops either reaching the page behind.

A scrim is not its own band. Number it one step *below* the surface it dims —
`--z-modal-backdrop: 3900` against `--z-modal: 4000` — so the pair is legibly
one thing and moving the dialog up a band carries its backdrop with it. Given a
band of its own, the two drift the first time a new overlay is inserted between
them and the scrim starts dimming the dialog it belongs to.
