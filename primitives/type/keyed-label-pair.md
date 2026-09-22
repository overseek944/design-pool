---
id: keyed-label-pair
category: type
tags: [type,label,mono,identifier,schema,form,technical,hierarchy]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A field that exists both for people and for a system has two names: the
human label and a stable key the data is stored under. Set both, stacked —
label first in the UI face, key directly beneath in mono, one to two tiers
down and muted — and the interface doubles as its own data dictionary without
a second view. Key 0.7–0.85em, 50–65% of label ink, gap 0–0.2em.

```css
.field-name { display: grid; gap: .1em }
.field-name code { font: .78em/1.2 var(--mono); color: var(--ink-muted);
  letter-spacing: .02em; user-select: all }
```
⚠ Keep the key out of the accessible name — `<label>` holds the human text only,
or a screen reader reads codes before every input. Muted mono falls under 4.5:1
fast; check it.
