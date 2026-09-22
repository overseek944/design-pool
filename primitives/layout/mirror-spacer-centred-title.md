---
id: mirror-spacer-centred-title
category: layout
tags: [layout,centring,overlay,optical,pseudo-element,media]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A caption stacked over a control in a centred overlay puts the *pair* at the
centre, so the words sit high and the frame reads unbalanced. Add an empty
`::before` exactly as tall as the control plus its gap: the column stays
symmetric about the title, which lands on the geometric centre while the
control hangs below it. Restate the spacer wherever the control or gap changes
size — typically 40–110px.

```css
.overlay { display: flex; flex-direction: column; justify-content: center }
.overlay::before { content: ""; flex: none; block-size: calc(var(--ctl) + var(--gap)) }
.overlay .ctl { block-size: var(--ctl); margin-block-start: var(--gap) }
```
⚠ Derive the spacer from the same tokens as the control, never a number of its own.
