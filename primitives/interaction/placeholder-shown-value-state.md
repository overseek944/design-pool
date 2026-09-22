---
id: placeholder-shown-value-state
category: interaction
tags: [interaction,input,form,state,css-only,feedback]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A field can answer "you've written something" with no script. `:placeholder-shown`
is true only while the input is empty, so its negation is a pure-CSS has-value
state that sibling decoration can key on — an underline that brightens, a hint
that changes colour, a faint glow on the typed text. Pair it with `:focus-within`
for a three-state field: rest, focused-empty, holding a value. Lift 1.3–1.8×
brightness; glow 8–20px at low alpha.

```css
.field input:not(:placeholder-shown) ~ .rule { filter: brightness(1.5) }
.field:focus-within .hint { opacity: 1 }
```
⚠ Requires a placeholder attribute (a single space works). Whitespace-only
input counts as a value, so never use this as validation.
