---
id: sentence-embedded-field
category: interaction
tags: [form,input,type,composition,accessibility,correctness]
axes: {energy: 2, density: 1, weight: 3, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A single-field form set as a labelled box asks for data; set as the missing word
in a running sentence, it asks a question, and the copy does the work a label
and a placeholder were doing badly. Run the clause and the control in one
baseline-aligned flex line at display size, let the field take the remainder and
wrap to its own row when the clause no longer fits. Field 1.25–2rem, clause and
field on the same size and weight or the seam shows.

```css
.ask { display: flex; flex-wrap: wrap; align-items: baseline; gap: .25em .75em }
.ask input { flex: 1; min-width: 0; font: inherit; border: 0; border-bottom: 1px solid }
```
⚠ The sentence is not the accessible name — carry a real label or `aria-label`,
and keep a visible focus state that is not only the rule changing tone.
