---
id: padded-ordinal-counter
category: type
tags: [type,list,counter,detail,technical]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 2
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
