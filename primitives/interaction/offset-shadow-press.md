---
id: offset-shadow-press
category: interaction
tags: [interaction,state,depth,detail,border]
axes: {energy: 3, density: 2, weight: 4, finish: 2}
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
A hard offset shadow reads as a solid object sitting above the page, and the
honest way to press it is to let the object travel into its own shadow. Hold
translate plus shadow offset constant at every state: at rest all offset, fully
pressed all translate. The outer silhouette never moves, so nothing around the
control reflows or appears to jump — only the gap under it closes.

```css
.slab { --rest: 3px; --lift: var(--rest);      /* rest 3–6px */
        box-shadow: var(--lift) var(--lift) 0 0 var(--edge);
        --sink: calc(var(--rest) - var(--lift));
        transform: translate(var(--sink), var(--sink));
        transition: transform .12s ease-out, box-shadow .12s ease-out }
.slab:hover:not(:disabled)  { --lift: 2px }
.slab:active:not(:disabled) { --lift: 0px }
```
⚠ The travel is real displacement, so guard it with `hover: hover` or a tap
leaves the control stuck pressed. Give the shadow colour 3:1 against the ground
or the depth disappears in forced-colors and for low-vision readers.

The same arithmetic runs in reverse. Let `--lift` *exceed* `--rest` and `--sink`
goes negative: the object rises off the page, gaining shadow as it travels, with
the far edge of the cast still pinned exactly where it was. One step between
rest and peak is the whole effect — the step reads, the absolute does not. Scale
the rest offset to the object rather than shipping one token: 1px on a chip, 2px
on a field or a button, 3–4px on a card, all from a single shadow colour, and a
dense screen gains a depth order nobody had to declare.
```css
.slab:hover:not(:disabled) { --lift: calc(var(--rest) + 1px) }
```
⚠ Rising grows the shadow *outside* the silhouette, unlike pressing — reserve
the extra pixel in the container's padding or a raised card cuts into its
neighbour.

Split the object into pseudo-elements and the control box never moves at all:
`::before` is the slab, fixed at the rest offset; `::after` is the face, and the
label is a child on its own layer above both. Hover translates the face and the
label together, 1–3px up and away from the slab. The hit area is the unmoving
host, so a pointer resting on the bottom edge cannot drop off a rising control
and flicker the state.
```css
.btn { position: relative; isolation: isolate }
.btn::before, .btn::after { content: ""; position: absolute; inset: 0 }
.btn::before { background: var(--edge); translate: 2px 2px }
.btn::after  { z-index: 1; background: var(--fill) }
.btn > span  { position: relative; z-index: 2 }
.btn:hover::after, .btn:hover > span { translate: 0 -2px }
```
⚠ Face and label need one duration and one curve — split them and the label
visibly slides across its own face.
