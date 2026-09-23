---
id: collapsing-riser-keycap
category: surface
tags: [surface,detail,border,state,css-only,hairline]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A key drawn as a bordered box reads as a chip. What makes it a cap is the
riser — a bottom border two to four times the others', so the face sits on a
visible edge. Press it by spending that edge: collapse the riser to the base
hairline and translate the face down by the difference, so the travel is the
object deforming rather than a shadow sliding under it. Fix the block size and
box the border inside it, or the collapse is a layout change. Riser 2–4px at
12–16px type.

```css
kbd { display: inline-grid; place-items: center; block-size: 1.7em;
      box-sizing: border-box; border: 1px solid var(--edge);
      border-block-end-width: var(--riser, 3px);
      transition: transform .12s ease, border-block-end-width .12s ease }
[data-down] kbd { border-block-end-width: 1px;
                  transform: translateY(calc(var(--riser, 3px) - 1px)) }
```
⚠ In an illustration these are not controls. `aria-hidden` the row and name the
chord in prose, or a reader is handed a stray unlabelled "Ctrl".

On a filled button the riser can be an inset shadow instead of a border: a
bottom edge in a darker step of the fill, painted inside the box, so the plate
gains its lip with no border-box arithmetic and no height change. Press by
dropping the inset to zero. Edge 2–3px, 20–35% darker than the fill.
```css
.btn { background: var(--accent); box-shadow: inset 0 -2px 0 var(--accent-deep) }
.btn:active { box-shadow: none; transform: translateY(1px) }
```

The lip can be the box itself: paint the element in the edge colour and put the
face on a `::after` translated up by a `--lift` token, so a single variable
owns rest, hover and press — 1–2px at rest, 0 on `:active`, and the face drops
onto its own edge.
```css
.btn { background: var(--edge) }
.btn::after { content: ""; position: absolute; inset: 0; border-radius: inherit;
  background: var(--face); translate: 0 calc(-1 * var(--lift, 1px)) }
.btn:active { --lift: 0px }
```
