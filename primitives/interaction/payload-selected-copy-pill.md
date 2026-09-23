---
id: payload-selected-copy-pill
category: interaction
tags: [interaction,clipboard,segmented,control,developer,accessibility]
axes: {energy: 2, density: 3, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [copy-with-selection-fallback]
tension: []
---
One intent often ships in several encodings — a prompt, a config block, a
command. Rather than a tab row above a code block, fold the choice into the copy
control: one pill holding the copy action and a 2–4 option segmented switch in
a smaller mono face. Choosing a segment changes what copies; only the action
copies. Segments 0.6–0.75× the action's size.

```html
<div class="pill" role="group" aria-label="Copy setup">
  <button data-copy>Copy</button>
  <div role="radiogroup"><button role="radio" aria-checked="true">Prompt</button>…</div>
</div>
```
⚠ Siblings in a group, never radios nested inside the copy button — nested
interactive content is invalid and a tap on a segment fires the copy.
