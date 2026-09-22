---
id: prose-doubled-key-chord
category: interaction
tags: [accessibility,correctness,navigation,detail,state]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A shortcut drawn as keycaps is a picture of a gesture. Assistive tech is handed
a run of loose words — and nothing where a modifier is a logo rendered as SVG —
with no signal that the keys are held together rather than pressed in turn. Ship
the chord twice: `aria-hidden` the visual row and put one visually-hidden
sentence beside it naming the gesture as an instruction. One sentence per chord,
not per key; *hold* and *twice* live there and the caps cannot say either. 6–12
words, imperative.

```html
<p class="shortcut">
  <span class="visually-hidden">Hold Control and Windows to speak.</span>
  <span aria-hidden="true"><kbd>Ctrl</kbd><kbd><svg …/></kbd></span>
</p>
```
⚠ An `aria-label` on the row is invisible to in-page find and to a translation
layer, and on some engines the caps underneath are still announced.
