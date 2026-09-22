---
id: shadow-bled-inline-highlight
category: type
tags: [type,highlight,inline,hover,custom-property,transition]
axes: {energy: 2, density: 2, weight: 3, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A highlight that stops at the first and last glyph reads as a clipped box.
Padding widens it but changes the run's advance, so the wrap can move. A
`box-shadow` at a horizontal offset, no blur and no spread, paints two more
copies of the background box, one each side, so the block grows past the text
with layout untouched. In `ch` it tracks the face's own advance.
0.5–1.5ch.

```css
@property --hl { syntax: "<color>"; inherits: false; initial-value: rgb(95 114 255 / 0) }
.link { background: var(--hl); box-shadow: 1ch 0 0 var(--hl), -1ch 0 0 var(--hl);
        transition: --hl .2s, color .2s }
.link:hover { --hl: rgb(95 114 255); color: #fff }
```
⚠ Unregistered, the colour is an untyped token and the fill snaps at the end.
Start at the accent hue at alpha 0: `transparent` is black at zero alpha
and the fade drags through grey. Sized for running text: on a bordered control
the copies bleed past it as slabs.
