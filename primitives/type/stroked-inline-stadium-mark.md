---
id: stroked-inline-stadium-mark
category: type
tags: [type,emphasis,border,hairline,detail,radius]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Emphasis by outline rather than by fill: a hairline capsule drawn around one
word inside a display line. Nothing is painted behind the glyphs, so the word
keeps whatever contrast it already had — the obligation every highlight band
has to argue past. `inline-flex` is what centres it; an `inline-block` inherits
the line's leading and the capsule rides low against the cap height. Keep the
padding lopsided — 1–3px block, 10–16px inline — or the mark reads as a button
rather than as a bracket. Stroke at the system hairline, 1.5–2px once the type
is at display size.

```css
.mark { display: inline-flex; align-items: center; padding: 2px 12px;
  border: 1.5px solid currentColor; border-radius: 999px }
```
⚠ A flex container will not break across lines: a phrase inside one overflows
its column instead of wrapping. One word only. It is decoration, so the stress
it carries must also be in the prose, not only in the ring.
