---
id: role-leading-ladder
category: type
tags: [type,tokens,scale,rhythm,precision]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Leading is a function of role, not of size, and the ladder is steeper than most
scales admit: display wants less than single, prose wants noticeably more.
Name the rungs after what they set so a component picks a role instead of
inventing a number, and a multi-line display block closes into a single mass
while body copy stays open.
```css
:root { --lead-display: .9;  --lead-display-soft: .95; --lead-body: 1.2;
        --lead-text: 1.3;    --lead-prose: 1.45 }
h1 { line-height: var(--lead-display) }
```
⚠ Below ~.9 descenders foul the next line's caps and accented uppercase clips —
safe only on short, known display lines. Buttons and single-line labels want
just under 1, not 1, or the box rounds a pixel taller than the control.
