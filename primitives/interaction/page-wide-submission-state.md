---
id: page-wide-submission-state
category: interaction
tags: [form,cta,state,correctness,signup]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A page that repeats one signup form — header, hero, footer — must treat it as
one form. On success, flip every instance to the submitted state, not only the
one used, and persist the flag for the session so a reload or return visit does
not ask again. Unfilled copies inviting a second entry read as a failed first
one. Hold the confirmation as a disabled pill, not a removed form, so the
layout keeps its shape.
```js
const done = () => { sessionStorage.setItem('signed', '1')
  forms.forEach(f => f.classList.add('is-submitted')) }
if (sessionStorage.getItem('signed')) done()
```
⚠ The flag is per-device — say "request received", not "you're on the list",
and keep a path to submit a different address.
