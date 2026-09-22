---
id: stroked-inline-stadium-mark
category: type
tags: [type,emphasis,border,hairline,detail,radius]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 3
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

One word is the limit of an *inline* capsule, not of the idea. Where the whole
line is set as capsules, move the wrap up a level: a wrapping flex container of
`nowrap` capsules breaks between members where the box demands and every ring
stays intact. Alternate filled and stroked along the line, and set the word
gaps as beats — an empty circle at `aspect-ratio: 1`, sized by the same clamp
as the type — and the line reads as a set of objects rather than a sentence.
Beats at 0.5–0.9 of the cap height.
```css
.line { display: flex; flex-wrap: wrap; align-items: center; gap: .5em }
.line > *    { white-space: nowrap; border-radius: 999px }
.line .beat  { aspect-ratio: 1; inline-size: clamp(2rem, 4.5vw, 4rem) }
```
⚠ The beats carry no text: `aria-hidden` them or the line is announced with
holes in it. A ring that is a word's only boundary is a non-text contrast case
at 3:1, which a hairline over a saturated ground will not make.
