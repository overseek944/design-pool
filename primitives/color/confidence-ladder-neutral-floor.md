---
id: confidence-ladder-neutral-floor
category: color
tags: [tokens, status, ordinal, confidence, semantic, badge]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A grade of *certainty* is not a grade of danger. Ramp it from a confident
saturated hue through warmer steps and end on a desaturated grey, never red:
weak support means "unknown", and an alarm colour makes thin evidence read as a
harmful finding. Each grade class redeclares one mark/wash pair; the badge reads
only those two names. 4–6 grades; wash at 85–93% lightness.

```css
.grade { background: var(--g-soft); color: var(--g) }
.g1 { --g:#1b8a5a; --g-soft:#e2f3ea }  .g5 { --g:#6f7a77; --g-soft:#eceeed }
```
⚠ Mid-ramp ambers rarely clear 4.5:1 on their own wash — darken the label cut.
Print the grade's word or number; hue alone carries nothing.
