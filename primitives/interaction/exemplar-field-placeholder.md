---
id: exemplar-field-placeholder
category: interaction
tags: [form,input,placeholder,accessibility,copy,correctness]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A placeholder that restates its label teaches nothing. Write it as a filled-in
answer instead — a plausible name, a sentence of the length and specificity the
free-text field actually wants — and it carries granularity no label can state
without becoming help text. Only viable above a visible persistent `<label>`:
the string disappears on the first keystroke, so it can never hold a constraint.
Keep the long example to 1–2 lines.

```html
<label for="size">Workforce size</label>
<input id="size" placeholder="80 frontline workers">
```
⚠ Placeholder ink still has to clear 4.5:1, and a realistic value reads as
pre-filled — keep it visibly lighter than entered text, and never as the only
statement of a format.
