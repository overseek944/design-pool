---
id: tonal-lead-in-clause
category: type
tags: [type,emphasis,hierarchy,editorial,colour]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Carry two levels inside one sentence: the clause holding the claim at full text
contrast, the remainder dropped to a muted step of the same ramp. It replaces
the eyebrow-plus-headline pair with a single line, so the fact and its qualifier
stay one grammatical unit instead of two stacked blocks — and it survives
reflow, where a two-block hierarchy starts to look like a stranded label.

```css
.claim   { color: var(--fg-muted) }
.claim b { color: var(--fg); font-weight: inherit }
```
⚠ The muted half is still body copy: hold it at ≥4.5:1, not the 3:1 a
decorative grey gets away with. Put the muted step 55–75% of the way from
background to foreground; below that the split stops reading as deliberate.
