---
id: inline-target-floor
category: interaction
tags: [accessibility,interaction,correctness,detail]
axes: none
cost: 1
seen: 11
requires: []
conflicts: []
completes: []
tension: []
---
A row of small print — legal links, meta, a footer — fails target size long
before it fails contrast. Make each link `inline-flex` with a `min-height` at the
floor: the hit box grows while the type stays at its intended size, and the
visible text does not move. Give the wrapping row a small cross-axis gap so the
grown boxes cannot overlap into each other's targets. Floor 24px, or 44px where
the row is a primary way out of the page.

```css
.meta { display: flex; flex-wrap: wrap; column-gap: 1.25rem; row-gap: .25rem }
.meta a { display: inline-flex; align-items: center; min-height: 44px }
```
⚠ `min-height` on an inline box does nothing — the display change is the mechanism.

Where the mark cannot grow its box at all — an icon link inline in a heading, a
control on a tight row — decouple the hit box from the layout box instead:
padding out to the floor, then an equal negative margin that hands the space
back to the layout. The element measures 44px to the pointer and its original
size to every sibling, so nothing reflows and the icon stays where it was drawn.
```css
.icon { display: inline-flex; box-sizing: border-box;
        width: 44px; height: 44px; padding: 13px; margin: -13px }
```
⚠ Layout no longer knows the targets grew, so two of them closer than the
padding have overlapping hit boxes and one silently steals the other's taps.
Check spacing between neighbours against twice the padding, and keep the
negative margin off any edge where it would drag the element out of a clipping
parent.

The overlap that ⚠ warns about is arithmetic, not judgement: derive the overhang
from the row's own `gap` rather than from the floor. At `gap / 2 + half the
visible mark`, the hit boxes tile the row exactly — every pixel between two
marks belongs to the nearer one and none of it belongs to both. Publish it as a
property so changing the gap re-solves the targets.
```css
.strip { --gap: .75rem; --hit: calc(var(--gap) / 2 + .35rem); gap: var(--gap) }
.strip button::after { content: ""; position: absolute; inset: calc(var(--hit) * -1) }
```
⚠ This guarantees no overlap, not that the target is big enough — a tight gap
still lands under the floor. Where it does, widen the gap; that is the knob.

Overlap is only a hazard where the pointer is imprecise, so gate the overhang
on `(pointer: coarse)` and it disappears on a mouse: the pad is sized as *at
least* the floor rather than as a fixed negative inset, and a precise pointer
keeps the tight target the layout was drawn for. This is the one reachability
branch a media query may carry, because failing it leaves a target that is
merely small — not one that is absent.
```css
@media (pointer: coarse) {
  .ctl::after { content: ""; position: absolute; inline-size: 100%;
    block-size: 100%; min-inline-size: 44px; min-block-size: 44px }
}
```
⚠ A touchscreen laptop reports `coarse`, so the pads arm for its mouse too —
harmless here, and the reason this gate is safe where hiding a control behind
the same query is not.

The floor is often released at a width breakpoint — full size narrow, the
designed height above it. That gate is the wrong one: input modality and
viewport width are independent, so a touch laptop, a tablet in landscape and a
large phone all take the desktop branch and lose the floor. Gate on the pointer
instead, and keep width for spacing only.
```css
@media (pointer: coarse) { :where(a, button) { min-block-size: 44px } }
```
⚠ `pointer: coarse` reports the *primary* input, so a hybrid device with a
trackpad attached reads fine and still gets touched. Where the page is a
primary way out, hold the floor unconditionally and spend the pixels.
