---
id: sentence-embedded-field
category: interaction
tags: [form,input,type,composition,accessibility,correctness]
axes: {energy: 2, density: 1, weight: 3, finish: 4}
cost: 2
seen: 3
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

Variant — the field can *be* the call to action: its placeholder is the CTA
line, uppercase and tracked on an underline, sized by an invisible twin of that
text stacked in the same grid cell, and cleared on focus. ⚠ The prompt vanishes
on the first keystroke, so the accessible name must not rely on it.

Variant — a query with several parameters can stay one sentence if each slot is
a bordered chip rather than an open field: a button showing its current value
(`4 topics`, `12 regions`) that opens a picker, inline on the text baseline at
body size, 1px border, 4–6px radius, 0.3–0.5em side padding. The sentence
states the whole query at a glance and each chip is visibly the part you change.
⚠ Each chip needs an accessible name that includes the slot, not only its value
— "Topics: 4 selected".
