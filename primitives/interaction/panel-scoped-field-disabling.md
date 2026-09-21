---
id: panel-scoped-field-disabling
category: interaction
tags: [interaction,form,correctness,accessibility,tabs,progressive-enhancement]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A tabset that keeps every panel in the DOM — because the set is one native form
that must submit without script — posts every panel's fields, not the selected
one's. `hidden` stops none of it: a hidden control still serializes, still
validates, and a `required` field in a panel nobody can see blocks submit with a
browser message pointing at nothing. Wrap each panel's controls in a
`<fieldset>` and move `disabled` with the selection: one attribute takes them
out of serialization, validation and the tab order together.

```js
form.querySelectorAll('fieldset[data-panel]').forEach(f =>
  f.disabled = f.dataset.panel !== selected)
```
⚠ Absent is not empty on the server: a disabled checkbox sends nothing at all,
so an unselected panel and an unfilled field arrive alike. Submit which panel
was active and parse against that.
