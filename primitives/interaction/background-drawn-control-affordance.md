---
id: background-drawn-control-affordance
category: interaction
tags: [forms,native-control,dark-ground,affordance,select]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
`appearance: none` on a `<select>` deletes its arrow, and it takes no
pseudo-element or child to replace it — its children are options. Draw the
chevron in the element's own `background-image`: two 45° gradients with a hard
half-and-half stop. Wedge 4–7px, inset from the edge by its own size.

```css
.sel { appearance: none; padding-inline-end: 22px; background-repeat: no-repeat;
  background-image: linear-gradient(45deg, transparent 50%, var(--ink) 50%),
                    linear-gradient(135deg, var(--ink) 50%, transparent 50%);
  background-size: 5px 5px; background-position: right 10px top 17px }
```
⚠ The vertical offset is a constant and drifts when line-height changes. The
popup is UA-drawn and none of this reaches it: on a dark ground set
`color-scheme` and an `option` background, or the open list is black on black.

The same trick draws any orthogonal mark, not just a wedge. Each arm is one
flat `linear-gradient(<ink> 0 0)` given its own `background-size` and a corner
keyword for `background-position` — eight layers make four L-brackets, six
make a plus, on a single element with no children and no SVG. The whole mark
is one declaration, so a custom property swaps it wholesale.
```css
.mark { width: 16px; height: 16px; background-repeat: no-repeat;
  background-image: linear-gradient(var(--ink) 0 0), linear-gradient(var(--ink) 0 0);
  background-size: 6px 2px, 2px 6px;
  background-position: 0 0, 0 0 }   /* repeat the pair per corner */
```
⚠ Every layer is one paint of the element's box — past roughly a dozen the
mark costs more than an inline SVG and is far harder to edit. Sizes are in px
against a px box, so it does not scale with type; hand it `em` on both if it
sits in a text run.
