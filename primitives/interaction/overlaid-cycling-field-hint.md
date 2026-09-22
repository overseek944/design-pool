---
id: overlaid-cycling-field-hint
category: interaction
tags: [interaction,input,placeholder,accessibility,hint,typing]
axes: {energy: 3, density: 1, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An empty field can demonstrate what to type by cycling examples, but not
through the `placeholder` attribute: it holds one string, it cannot animate,
and rewriting it per character floods the accessibility tree with name changes
on a focusable control. Paint a sibling over the field instead — absolutely
positioned, `pointer-events: none` so clicks reach the input, `aria-hidden`,
unmounted the moment the field holds a value. Cap the cycle at 4–6 examples;
past that nobody waits for the loop.

```html
<textarea placeholder="Ask anything"></textarea>
<div class="hint" aria-hidden="true"></div>   <!-- inset:0; pointer-events:none -->
```
⚠ Leave a static `placeholder` on the real field: the overlay is the one hint a
screen reader never gets. A click handler on the overlay cannot fire —
`pointer-events: none` is what makes it work.
