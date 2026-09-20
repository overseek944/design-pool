---
id: status-triad-tokens
category: color
tags: [color,tokens,accessibility,contrast,correctness,state]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A status is three tokens, not one, because the same hue is asked to do three
jobs with three different contrast obligations. The saturated cut is the *mark*
— a rule, a dot, an icon — and owes 3:1 against the ground. The text cut is two
to three steps darker and owes 4.5:1 against the wash. The wash is the tinted
ground and owes nothing. Spending the mark colour on the label is the default
mistake and it fails at every size.
```css
--notice:#f5b50a; --notice-fg:#99710a; --notice-bg:#fff8e3;
.note { background:var(--notice-bg); color:var(--notice-fg);
        border-inline-start:3px solid var(--notice) }   /* rule 2–4px */
```
⚠ Keep the three roles fixed across every status or the set stops being
readable as a system. Colour alone never carries state — pair it with a word or
a shape.
