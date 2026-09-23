---
id: padded-ordinal-counter
category: type
tags: [type,list,counter,detail,technical]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 16
requires: []
conflicts: []
completes: []
tension: []
---
`01 02 … 09 10` numbering without hand-written zeros and without the `::before`
counter hack that breaks the moment a list reaches ten. `@counter-style` with
`system: extends decimal` plus `pad` does the padding natively, and seeding
`counter-reset` from a custom property lets numbering resume across sections
rather than restarting at each list. Pad width 2–3 reads as technical; wider
reads as a serial number.

```css
@counter-style pad { system: extends decimal; pad: 2 "0" }
.steps { counter-reset: step var(--start, 0); list-style: pad }
```
⚠ Markers are announced inconsistently by screen readers. If the number is
referenced anywhere — "see step 04" — put it in the text too, not only in the
marker.

The same ordinal can also be set as scenery: the figure at 8–16rem beside its
section, tinted a few percent off the background so it sits below the text
contrast floor and reads as a position marker, not content. Deliberately
illegible, so `aria-hidden` and duplicated in real text. Alternate the side it
hangs from and a long numbered run gains rhythm.

`::before` with `content: counter(n, decimal-leading-zero)` is the right form
for the one case `list-style` cannot serve: an ordinal that needs text welded
to it — `"FIG." counter(fig) " // "` — or that sits in a caption rather than a
marker box. The built-in style pads to two digits only and then grows, so it
holds a run under a hundred and quietly breaks the column past it; above that,
back to a `@counter-style` with an explicit `pad`.

Scenery reads as a layer rather than as a label once the item *occludes* it.
Set the figure in the same cell as the card, behind it and offset so the card
covers a third to a half of the glyph, and let the row's first numeral run off
the container edge — a mark that is clipped and overlapped is plainly not
content, so it can be tinted much closer to the text colour than a free-standing
one and still not compete. Figure 1.4–2.2× the card's height.
```css
.rank { display: grid } .rank > * { grid-area: 1/1 }
.rank .n { font-size: clamp(6rem, 12vw, 11rem); color: var(--ash); z-index: 0 }
.rank .card { z-index: 1; justify-self: end; inline-size: 72% }
```
⚠ The clipped first numeral must still be the *same* size as the rest — shrink
it to fit and the row reads as a mistake.
When the counter numbers sections by their eyebrow labels, not list items, gate
the increment on the label itself: `counter-increment` goes on the label, and
the section's divider hangs off `section:has(> * > .label)`. A section with no
label then takes no number and no rule, so adding an unlabelled band never
renumbers the page. Reset once on `main`, not per section.
